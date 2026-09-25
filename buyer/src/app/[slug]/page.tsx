import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  ChevronDown,
  Building2,
  BookOpen,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { getSeoPageData, getRelatedSeoPages, getMatchingProperties } from "@/lib/getSeoPage";
import MatchingPropertiesList from "@/components/seo/MatchingPropertiesList";
import AboutusDataSync from "@/components/footer/AboutusDataSync";
import HomeFooter from "@/components/footer/homeFooter";
import HomeHeader from "@/components/header/homeHeader";

export const revalidate = 3600;

interface PageProps {
  params: Promise<{ slug: string }> | { slug: string };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const data = await getSeoPageData(resolvedParams.slug);

  if (!data) return {};

  return {
    title: data.meta_title,
    description: data.meta_description,
    alternates: {
      canonical: data.canonical_url || `https://kmaglobalproperty.com/${resolvedParams.slug}/`,
    },
    robots: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
    },
    openGraph: {
      title: data.meta_title,
      description: data.meta_description,
      url: data.canonical_url || `https://kmaglobalproperty.com/${resolvedParams.slug}/`,
      type: "article",
    },
  };
}

export default async function DynamicSeoLandingPage({ params }: PageProps) {
  const resolvedParams = await params;

  const data = await getSeoPageData(resolvedParams.slug);
  if (!data || data.is_active === false) {
    notFound();
  }

  const [fallbackRelatedPages, matchingProperties] = await Promise.all([
    getRelatedSeoPages(resolvedParams.slug),
    getMatchingProperties(
      resolvedParams.slug,
      data.city_name,
      data.listing_type,
      data.search_filters
    ),
  ]);

  const relatedLinks = Array.isArray(data.related_links) && data.related_links.length > 0
    ? data.related_links
    : null;

  return (
    <>
      {data.json_ld ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: typeof data.json_ld === "string" ? data.json_ld : JSON.stringify(data.json_ld),
          }}
        />
      ) : (
        <>
          {data.faqs && data.faqs.length > 0 && (
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{
                __html: JSON.stringify({
                  "@context": "https://schema.org",
                  "@type": "FAQPage",
                  mainEntity: data.faqs.map((faq: any) => ({
                    "@type": "Question",
                    name: faq.question,
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: faq.answer,
                    },
                  })),
                }),
              }}
            />
          )}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "BreadcrumbList",
                itemListElement: [
                  {
                    "@type": "ListItem",
                    position: 1,
                    name: "Home",
                    item: "https://kmaglobalproperty.com/",
                  },
                  {
                    "@type": "ListItem",
                    position: 2,
                    name: data.h1_heading,
                    item: `https://kmaglobalproperty.com/${data.slug}/`,
                  },
                ],
              }),
            }}
          />
        </>
      )}

      <div className="bg-blue fixed left-0 right-0 top-0 z-[60] flex justify-center pointer-events-none pb-10 rounded-br-4xl rounded-bl-4xl">
        <div className="pointer-events-auto w-full flex justify-center">
          <HomeHeader />
        </div>
      </div>

      <div className="w-full min-h-screen bg-[#F8F9FC] pb-16 pt-28 md:pt-40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <nav className="flex items-center gap-2 text-xs font-medium text-slate-500 mb-6" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-[#010048] transition">Home</Link>
            <span>/</span>
            <span className="text-[#010048] truncate font-semibold">{data.h1_heading}</span>
          </nav>
        </div>

        {/* Paginated Property Section with automatic random zone fallback */}
        {matchingProperties && matchingProperties.length > 0 && (
          <MatchingPropertiesList
            properties={matchingProperties}
            cityName={data.city_name}
          />
        )}

        {/* SEO Article and Content Section */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="rounded-2xl bg-gradient-to-r from-[#010048] to-[#0A0E67] text-white p-6 sm:p-10 shadow-md mb-10">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-medium backdrop-blur-xs mb-3 border border-white/15">
              <Building2 className="h-3.5 w-3.5 text-cyan-300" />
              <span>{data.city_name || "Delhi NCR"} Real Estate</span>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight">
              {data.h1_heading}
            </h1>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-10 md:p-12 shadow-xs">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6">
              <div className="flex items-center gap-2 text-xs font-semibold text-blue">
                <Sparkles className="h-4 w-4" />
                <span>Comprehensive Buyer&apos;s Guide</span>
              </div>
              {/* <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                Written by KMA Global Properties
              </span> */}
            </div>

            <style
              dangerouslySetInnerHTML={{
                __html: `
                  .seo-article-content a {
                    color: #0056D2 !important;
                    font-weight: 600 !important;
                    text-decoration: underline !important;
                    text-underline-offset: 4px !important;
                    cursor: pointer !important;
                    transition: color 0.15s ease-in-out;
                  }
                  .seo-article-content a:hover {
                    color: #010048 !important;
                    text-decoration-color: #010048 !important;
                  }
                  .seo-article-content table {
                    width: 100% !important;
                    border-collapse: collapse !important;
                    margin: 24px 0 !important;
                    border: 1px solid #E2E8F0 !important;
                    font-size: 14px !important;
                    background-color: #FFFFFF !important;
                    border-radius: 8px !important;
                    overflow: hidden !important;
                  }
                  .seo-article-content th {
                    background-color: #010048 !important;
                    color: #FFFFFF !important;
                    font-weight: 600 !important;
                    padding: 12px 14px !important;
                    text-align: left !important;
                    border: 1px solid #010048 !important;
                  }
                  .seo-article-content td {
                    padding: 12px 14px !important;
                    border: 1px solid #E2E8F0 !important;
                    color: #334155 !important;
                    vertical-align: top !important;
                  }
                  .seo-article-content tr:nth-child(even) {
                    background-color: #F8FAFC !important;
                  }
                  .seo-article-content tr:hover {
                    background-color: #EFF6FF !important;
                  }
                  .seo-article-content h2 {
                    color: #010048 !important;
                    font-size: 24px !important;
                    font-weight: 700 !important;
                    margin-top: 36px !important;
                    margin-bottom: 14px !important;
                    border-bottom: 1px solid #E2E8F0 !important;
                    padding-bottom: 8px !important;
                  }
                  .seo-article-content h3 {
                    color: #010048 !important;
                    font-size: 19px !important;
                    font-weight: 600 !important;
                    margin-top: 24px !important;
                    margin-bottom: 10px !important;
                  }
                  .seo-article-content p {
                    color: #334155 !important;
                    line-height: 1.75 !important;
                    margin-bottom: 16px !important;
                    font-size: 15px !important;
                  }
                  .seo-article-content ul {
                    list-style-type: disc !important;
                    padding-left: 24px !important;
                    margin-bottom: 16px !important;
                  }
                  .seo-article-content li {
                    color: #334155 !important;
                    margin-bottom: 6px !important;
                  }
                `,
              }}
            />

            <article
              className="seo-article-content max-w-none space-y-4"
              dangerouslySetInnerHTML={{ __html: data.article_body }}
            />

            {data.faqs && data.faqs.length > 0 && (
              <section className="mt-14 pt-10 border-t border-slate-200">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#010048] mb-6">
                  Frequently Asked Questions
                </h2>
                <div className="space-y-3">
                  {data.faqs.map((faq: any, idx: number) => (
                    <details
                      key={idx}
                      className="group rounded-xl border border-slate-200 bg-[#F9FAFB] p-4 sm:p-5 transition-all [&_summary::-webkit-details-marker]:hidden cursor-pointer hover:border-slate-300"
                    >
                      <summary className="flex items-center justify-between font-semibold text-slate-900 text-sm sm:text-base">
                        <span>{idx + 1}. {faq.question}</span>
                        <ChevronDown className="h-4 w-4 text-slate-400 transition-transform duration-200 group-open:-rotate-180 shrink-0 ml-3" />
                      </summary>
                      <p className="mt-3 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-200/60 pt-3">
                        {faq.answer}
                      </p>
                    </details>
                  ))}
                </div>
              </section>
            )}

            {relatedLinks ? (
              <section className="mt-14 pt-10 border-t border-slate-200">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-2xl font-extrabold text-[#010048]">
                      Related Pages
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-500 mt-1">
                      Explore linked property formats, corridors, and investment guides.
                    </p>
                  </div>
                  <BookOpen className="h-5 w-5 text-[#010048] hidden sm:block" />
                </div>

                <div className="flex flex-wrap gap-2.5">
                  {relatedLinks.map((item: any, idx: number) => {
                    const rawUrl = item.url || item.href || "";
                    const targetHref = rawUrl.replace("https://kmaglobalproperty.com", "") || `/${item.slug || ""}`;

                    return (
                      <Link
                        key={idx}
                        href={targetHref}
                        className="text-xs md:text-sm bg-[#F0F3F9] hover:bg-[#010048] hover:text-white text-[#010048] font-medium px-4 py-2 rounded-full transition-all duration-150 border border-slate-200/60 shadow-2xs"
                      >
                        {item.name || item.title}
                      </Link>
                    );
                  })}
                </div>
              </section>
            ) : fallbackRelatedPages && fallbackRelatedPages.length > 0 ? (
              <section className="mt-14 pt-10 border-t border-slate-200">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-2xl font-extrabold text-[#010048]">
                      Explore Other NCR Property Guides
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-500 mt-1">
                      Deep dive into specific corridors, societies, and micro-markets.
                    </p>
                  </div>
                  <BookOpen className="h-5 w-5 text-[#010048] hidden sm:block" />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {fallbackRelatedPages.map((page: any) => (
                    <Link
                      key={page.slug}
                      href={`/${page.slug}`}
                      className="group flex flex-col justify-between rounded-xl border border-slate-200 bg-[#F9FAFB] p-4 transition-all duration-200 hover:border-[#010048] hover:bg-white hover:shadow-xs cursor-pointer"
                    >
                      <div>
                        <span className="inline-block rounded-md bg-blue/10 px-2 py-0.5 text-[10px] font-semibold text-blue uppercase tracking-wider mb-2">
                          {page.city_name || "NCR"}
                        </span>
                        <h3 className="font-semibold text-slate-900 text-sm leading-snug group-hover:text-blue transition line-clamp-2">
                          {page.h1_heading.replace(/<[^>]*>/g, "").trim()}
                        </h3>
                        {page.meta_description && (
                          <p className="text-xs text-slate-500 mt-1.5 line-clamp-2 leading-relaxed">
                            {page.meta_description}
                          </p>
                        )}
                      </div>

                      <div className="mt-4 flex items-center gap-1 text-xs font-semibold text-[#010048] group-hover:translate-x-1 transition-transform">
                        <span>Read Guide</span>
                        <ArrowRight className="h-3 w-3" />
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            ) : null}
          </div>
        </div>
      </div>

      <AboutusDataSync />
      <HomeFooter />
    </>
  );
}