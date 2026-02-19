import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ImageIcon, MessageCircle, PhoneCall, VideoIcon } from "lucide-react";
import MainLayout from "@/components/myList/mainLayout";
import HomeFooter from "@/components/footer/homeFooter";
import { fetchPropertyMasterData } from "@/app/api/home";

const categoryTabs = ["Cover Image", "Floor Plan", "Bedroom", "Team Area"] as const;

const mediaSections: Array<{
    title: string;
    images: string[];
}> = [
        {
            title: "Cover Image",
            images: [
                "/assets/property/img-4.png",
                "/assets/property/img-2.png",
                "/assets/property/img-3.png",
                "/assets/property/img-1.png",
            ],
        },
        {
            title: "Floor Plan",
            images: ["/assets/property/img-2.png", "/assets/property/img-3.png", "/assets/property/img-1.png"],
        },
        {
            title: "Bedroom",
            images: ["/assets/property/img-3.png", "/assets/property/img-1.png"],
        },
        {
            title: "Team Area",
            images: ["/assets/property/img-2.png", "/assets/property/img-3.png", "/assets/property/img-1.png"],
        },
    ];

export default async function ListingGalleryPage() {
    const response = await fetchPropertyMasterData();
    let propertyMasterData: unknown[] = [];
    if (response && response.success) {
        propertyMasterData = response.data as unknown[];
    }

    return (
       <>
        <MainLayout>
            <div>
                <div className="py-8">
                    <div className="text-4xl ml-6 mb-5 rounded-lg font-semibold text-white">
                        Property Gallery
                    </div>
                    <div className="mx-auto w-full min-w-[1440px] px-4 lg:px-6">
                        <div className="rounded-lg border border-border bg-white p-4 shadow-sm lg:p-6">
                            <div className="flex flex-col gap-4 border-b border-border pb-5 lg:flex-row lg:items-center lg:justify-between">
                                <div className="flex items-center gap-4">
                                    <Link
                                        href="/projects"
                                        className="inline-flex h-[60px] w-[60px] items-center justify-center rounded-xl border border-[#D8DADF] bg-[#F8F8F9] text-text-black"
                                    >
                                        <ChevronLeft className="h-6 w-6" />
                                    </Link>
                                    <div>
                                        <span className="text-lg font-semibold leading-none text-text-black ">
                                            Property name lorem Ipsum
                                        </span>
                                        <p className="mt-3 text-sm font-semibold leading-none text-text-black ">
                                            &#8377;85,000
                                            <span className="ml-1 text-xs font-normal text-text-gray sm:text-sm md:text-base">
                                                /month
                                            </span>
                                        </p>
                                    </div>
                                </div>

                                <div className="inline-flex w-fit rounded-md border border-[#D4D5D8] bg-white p-1">
                                    <button
                                        type="button"
                                        className="min-w-[110px] rounded-md bg-[#05085E] px-3 py-2 text-xs font-semibold text-white sm:min-w-[125px] sm:px-4 sm:py-2.5 sm:text-sm md:min-w-[140px] md:px-5 md:text-base"
                                    >
                                        Listing
                                    </button>
                                    <button
                                        type="button"
                                        className="min-w-[110px] rounded-md px-3 py-2 text-xs font-medium text-text-light-black sm:min-w-[125px] sm:px-4 sm:py-2.5 sm:text-sm md:min-w-[140px] md:px-5 md:text-base"
                                    >
                                        Project
                                    </button>
                                    <button
                                        type="button"
                                        className="min-w-[110px] rounded-md px-3 py-2 text-xs font-medium text-text-light-black sm:min-w-[125px] sm:px-4 sm:py-2.5 sm:text-sm md:min-w-[140px] md:px-5 md:text-base"
                                    >
                                        Units
                                    </button>
                                </div>
                            </div>

                            <div className="mt-5 inline-flex flex-wrap items-center gap-3">
                                <span className="inline-flex items-center gap-2 rounded-full border border-[#D3D4D7] bg-[#F5F6F8] px-1.5 py-1 text-xs text-text-black    ">
                                    <ImageIcon className="h-5 w-5" />
                                    40 Photos
                                </span>
                                <span className="inline-flex items-center gap-2 rounded-full border border-[#D3D4D7] bg-[#F5F6F8] px-1.5 py-1 text-xs text-text-black ">
                                    <VideoIcon className="h-5 w-5" />
                                    2 Videos
                                </span>
                            </div>

                            <div className="mt-6 border-b border-border">
                                <div className="flex w-max min-w-full items-center gap-6 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                                    {categoryTabs.map((tab, idx) => (
                                        <button
                                            key={tab}
                                            type="button"
                                            className={`whitespace-nowrap border-b-2 px-4 py-2 text-sm font-medium sm:px-5 sm:py-2.5 sm:text-base md:px-6 md:py-3 md:text-md ${idx === 0
                                                    ? "border-[#13181F] text-text-black"
                                                    : "border-transparent text-text-light-black"
                                                }`}
                                        >
                                            {tab}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="mt-8 grid grid-cols-1 gap-8 xl:grid-cols-[1fr_360px]">
                                <main className="space-y-8">
                                    {mediaSections.map((section) => (
                                        <section key={section.title}>
                                            <h2 className="text-lg font-semibold text-text-black ">
                                                {section.title}
                                            </h2>
                                            <div className="mt-4 rounded-lg border border-[#D7D8DC] p-4">
                                                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
                                                    {section.images.map((src, idx) => (
                                                        <div
                                                            key={`${section.title}-${idx}`}
                                                            className="relative h-[170px] overflow-hidden rounded-lg"
                                                        >
                                                            <Image
                                                                src={src}
                                                                alt={`${section.title} ${idx + 1}`}
                                                                fill
                                                                className="object-cover"
                                                            />
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </section>
                                    ))}
                                </main>

                                <aside className="h-fit rounded-xl border border-[#D2D3D7] bg-[#F9F9FA] p-5 xl:sticky xl:top-4">
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
                                </aside>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </MainLayout>
        <HomeFooter propertyMasterData={propertyMasterData} />
       </>
    );
}
