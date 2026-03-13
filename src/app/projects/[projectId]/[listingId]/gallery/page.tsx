import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ImageIcon, MessageCircle, PhoneCall, VideoIcon } from "lucide-react";
import MainLayout from "@/components/myList/mainLayout";
import HomeFooter from "@/components/footer/homeFooter";
import HeaderDataSync from "@/components/header/HeaderDataSync";
import AboutusDataSync from "@/components/footer/AboutusDataSync";
import { fetchPropertyMasterData, fetchPropertyMedia, type PropertyMediaCategory } from "@/app/api/home";
import { GalleryContent, type GallerySection } from "./GalleryContent";

const awsBaseUrl = process.env.NEXT_PUBLIC_AWS_URL ?? "";

function toFullImageUrl(fileKey?: string | null): string {
  if (!fileKey) return "";
  if (fileKey.startsWith("http://") || fileKey.startsWith("https://")) return fileKey;
  return awsBaseUrl ? `${awsBaseUrl}${fileKey}` : fileKey;
}

const fallbackSections: GallerySection[] = [
  { name: "Cover Image", imageUrls: ["/assets/property/img-4.png", "/assets/property/img-2.png", "/assets/property/img-3.png", "/assets/property/img-1.png"] },
  { name: "Floor Plan", imageUrls: ["/assets/property/img-2.png", "/assets/property/img-3.png", "/assets/property/img-1.png"] },
  { name: "Bedroom", imageUrls: ["/assets/property/img-3.png", "/assets/property/img-1.png"] },
  { name: "Team Area", imageUrls: ["/assets/property/img-2.png", "/assets/property/img-3.png", "/assets/property/img-1.png"] },
];

export default async function ListingGalleryPage({
  params,
}: {
  params: { projectId: string; listingId: string };
}) {
  const { projectId, listingId } = params ?? {};
  const [mediaResponse, masterResponse] = await Promise.all([
    fetchPropertyMedia(listingId),
    fetchPropertyMasterData(),
  ]);

  const propertyMasterData: unknown[] =
    masterResponse && "data" in masterResponse && Array.isArray(masterResponse.data)
      ? masterResponse.data
      : [];

  const mediaData = mediaResponse && mediaResponse.success ? mediaResponse : null;
  const property = mediaData?.property;
  const categories: PropertyMediaCategory[] = mediaData?.categories ?? [];
  const photoCount = mediaData?.photoCount ?? 0;
  const videoCount = mediaData?.videoCount ?? 0;
  const videos = mediaData?.videos ?? [];

  const sections: GallerySection[] =
    categories.length > 0
      ? categories.map((c) => ({
          name: c.name,
          imageUrls: c.photos.map((p) => toFullImageUrl(p.fileKey)).filter((url): url is string => Boolean(url)),
        }))
      : fallbackSections;
  const videoUrls = categories.length > 0 ? (videos.map((v) => toFullImageUrl(v.fileKey)).filter(Boolean) as string[]) : [];
  const categoryTabs =
    categories.length > 0
      ? [...categories.map((c) => c.name), ...(videoUrls.length > 0 ? ["Videos"] : [])]
      : fallbackSections.map((s) => s.name);

  const listingHref = `/projects/${projectId}/${listingId}`;
  const projectHref = `/projects/${projectId}`;

  return (
    <>
      <MainLayout>
        <div className="min-w-0 w-full">
          <div className="py-8">
            <div className="text-4xl ml-6 mb-5 rounded-lg font-semibold text-white">
              Property Gallery
            </div>
            <div className="mx-auto w-full min-w-0 max-w-[1440px] px-4 lg:px-6">
              <div className="rounded-lg border border-border bg-white p-4 shadow-sm lg:p-6">
                <div className="flex flex-col gap-4 border-b border-border pb-5 lg:flex-row lg:items-center lg:justify-between">
                  <div className="flex items-center gap-4">
                    <Link
                      href={listingHref}
                      className="inline-flex h-[60px] w-[60px] items-center justify-center rounded-xl border border-[#D8DADF] bg-[#F8F8F9] text-text-black"
                    >
                      <ChevronLeft className="h-6 w-6" />
                    </Link>
                    <div>
                      <span className="text-lg font-semibold leading-none text-text-black ">
                        {property?.name ?? "Property"}
                      </span>
                      <p className="mt-3 text-sm font-semibold leading-none text-text-black ">
                        {property?.price ?? "—"}
                      </p>
                      {property?.address ? (
                        <p className="mt-1 text-xs text-text-gray">{property.address}</p>
                      ) : null}
                    </div>
                  </div>

                  <div className="inline-flex w-fit rounded-md border border-[#D4D5D8] bg-white p-1">
                    <Link
                      href={listingHref}
                      className="min-w-[110px] rounded-md bg-[#05085E] px-3 py-2 text-xs font-semibold text-white sm:min-w-[125px] sm:px-4 sm:py-2.5 sm:text-sm md:min-w-[140px] md:px-5 md:text-base inline-flex items-center justify-center"
                    >
                      Listing
                    </Link>
                    <Link
                      href={projectHref}
                      className="min-w-[110px] rounded-md px-3 py-2 text-xs font-medium text-text-light-black sm:min-w-[125px] sm:px-4 sm:py-2.5 sm:text-sm md:min-w-[140px] md:px-5 md:text-base inline-flex items-center justify-center"
                    >
                      Project
                    </Link>
                    <Link
                      href={listingHref}
                      className="min-w-[110px] rounded-md px-3 py-2 text-xs font-medium text-text-light-black sm:min-w-[125px] sm:px-4 sm:py-2.5 sm:text-sm md:min-w-[140px] md:px-5 md:text-base inline-flex items-center justify-center"
                    >
                      Units
                    </Link>
                  </div>
                </div>

                <div className="mt-5 inline-flex flex-wrap items-center gap-3">
                  <span className="inline-flex items-center gap-2 rounded-full border border-[#D3D4D7] bg-[#F5F6F8] px-1.5 py-1 text-xs text-text-black">
                    <ImageIcon className="h-5 w-5" />
                    {photoCount} Photos
                  </span>
                  <span className="inline-flex items-center gap-2 rounded-full border border-[#D3D4D7] bg-[#F5F6F8] px-1.5 py-1 text-xs text-text-black">
                    <VideoIcon className="h-5 w-5" />
                    {videoCount} Videos
                  </span>
                </div>

                <GalleryContent
                  tabs={categoryTabs}
                  sections={sections}
                  videoUrls={videoUrls}
                  propertyName={property?.name ?? "Property"}
                >
                  {/* <aside className="h-fit min-h-0 overflow-visible rounded-xl border border-[#D2D3D7] bg-[#F9F9FA] p-5 xl:sticky xl:top-4 xl:self-start">
                                    <h3 className="text-sm font-semibold leading-tight text-text-black ">
                                        Talk to Our Real Estate Specialists
                                    </h3>
                                    <p className="mt-2 text-xs text-text-gray sm:text-sm md:text-sm">
                                        Buy • Sell • Invest with Expert Advice
                                    </p>
                                    <div className="mt-6 flex items-center gap-3">
                                        <Image
                                            src="/assets/profile.png"
                                            alt="Manjeet Skyzen"
                                            width={66}
                                            height={66}
                                            className="h-[66px] w-[66px] rounded-full object-cover"
                                        />
                                        <div>
                                            <p className="text-sm font-semibold text-text-black sm:text-base md:text-xl">
                                                Manjeet Skyzen
                                            </p>
                                            <span className="mt-1 inline-block rounded bg-[#E69D48] px-2.5 py-1 text-[10px] text-white sm:px-3 sm:text-xs md:text-sm">
                                                KMA Expert Pro
                                            </span>
                                        </div>
                                    </div>
                                    <button
                                        type="button"
                                        className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#05085E] px-4 py-2.5 text-xs font-medium text-white sm:px-5 sm:py-3 sm:text-sm md:text-base"
                                    >
                                        <PhoneCall className="h-5 w-5" />
                                        Contact Now
                                    </button>
                                    <a
                                        href="https://wa.me/919056580022"
                                        target="_blank"
                                        rel="noreferrer"
                                        className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-full border border-[#1B8836] px-4 py-2.5 text-xs font-medium text-[#1B8836] sm:px-5 sm:py-3 sm:text-sm md:text-base"
                                    >
                                        <MessageCircle className="h-5 w-5" />
                                        WhatsApp Expert
                                    </a>
                  </aside> */}
                </GalleryContent>
              </div>
            </div>
          </div>
        </div>

        </MainLayout>
        <HeaderDataSync propertyMasterData={propertyMasterData} />
        <AboutusDataSync />
        <HomeFooter />
       </>
    );
}
