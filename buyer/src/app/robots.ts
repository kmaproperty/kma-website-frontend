import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = "https://kmaglobalproperty.com";

  return {
    rules: [
      {
        userAgent: '*',
        allow: [
          '/',
          '/wp-admin/admin-ajax.php',
        ],
        disallow: [
          '/wp-admin/',
          '/wp-login.php',
          '/xmlrpc.php',
          '/?s=',
          '/search/',
        ],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}