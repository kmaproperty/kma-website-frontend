import { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://kmaglobalproperty.com";

  const staticPages = [
    '',
    '/about-us',
    '/blogs',
    '/careers',
    '/careers/detail',
    '/contact-us',
    '/faqs',
    '/help-center',
    '/join-us',
    '/meet-the-team',
    '/new-launch',
    '/privacy-policy',
    '/projects',
    '/refer-and-earn',
    '/success-stories',
    '/terms-and-conditions',
  ];

  const staticRoutes: MetadataRoute.Sitemap = staticPages.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' || route === '/new-launch' || route === '/blogs' ? 'daily' : 'monthly',
    priority: route === '' ? 1.0 : route === '/projects' || route === '/new-launch' ? 0.9 : 0.8,
  }));

  let projectRoutes: MetadataRoute.Sitemap = [];
  try {
    const propertiesApiUrl =
      'https://kmaglobalproperty.com/api/backend/end-user/properties?page=1&limit=100&cityId=e8894ea7-b8fc-43da-b983-b1d43c77597e&sortBy=price&sortOrder=ASC';

    const res = await fetch(propertiesApiUrl, {
      next: { revalidate: 3600 },
    });

    if (res.ok) {
      const responseData = await res.json();

      // 🎯 Direct Array Extraction for {"success": true, "properties": [...]}
      const properties = responseData?.properties || responseData?.data || [];

      properties.forEach((item: any) => {
        // Safe Key Extraction based on actual API
        const listingId = item.id || item._id;
        const projectId = item.projectId || item.project?.id || "project";

        // Route 1: Individual Property Listing (/projects/project/[listingId] or /projects/[projectId]/[listingId])
        if (listingId) {
          projectRoutes.push({
            url: `${baseUrl}/projects/${projectId}/${listingId}`,
            lastModified: item.updatedAt ? new Date(item.updatedAt) : new Date(),
            changeFrequency: 'weekly',
            priority: 0.8,
          });
        }
      });
    }
  } catch (error) {
    console.error('Error fetching properties for sitemap:', error);
  }

  let blogRoutes: MetadataRoute.Sitemap = [];
  try {
    const wpBlogsApiUrl =
      'https://kmaglobalproperty.in/wp-json/wp/v2/posts?_embed&per_page=100';

    const res = await fetch(wpBlogsApiUrl, {
      next: { revalidate: 3600 },
    });

    if (res.ok) {
      const posts = await res.json();

      if (Array.isArray(posts)) {
        blogRoutes = posts.map((post: any) => ({
          url: `${baseUrl}/blogs/${post.slug}`,
          lastModified: post.modified ? new Date(post.modified) : new Date(),
          changeFrequency: 'weekly',
          priority: 0.7,
        }));
      }
    }
  } catch (error) {
    console.error('Error fetching WordPress blogs for sitemap:', error);
  }

  const allRoutes = [...staticRoutes, ...projectRoutes, ...blogRoutes];

  const uniqueRoutesMap = new Map();
  allRoutes.forEach((item) => {
    uniqueRoutesMap.set(item.url, item);
  });

  return Array.from(uniqueRoutesMap.values());
}