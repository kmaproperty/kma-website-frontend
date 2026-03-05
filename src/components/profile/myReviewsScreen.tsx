import Image from "next/image";

type Review = {
  id: number;
  title: string;
  address: string;
  rating: string;
  description: string;
};

const reviews: Review[] = Array.from({ length: 6 }).map((_, index) => ({
  id: index + 1,
  title: "Royal Apartment",
  address: "25, Willow Crest Apartment",
  rating: "5.0",
  description:
    "This is the best place for living peacefully, and there are available all type of facilities include schools, hospitals, banks, colleges and medical.",
}));

export default function MyReviewsScreen() {
  return (
    <div className="rounded-xl bg-white p-4 sm:p-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-[30px] font-semibold leading-none text-text-black">My Reviews</h2>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <span className="text-sm font-medium text-text-black">Sort By :</span>
          <button className="flex items-center gap-2 rounded-full border border-border px-3 py-1.5 text-xs text-text-gray">
            <span>Newest first</span>
            <Image src="/assets/down-arrow-outline-black.svg" width={12} height={12} alt="sort" />
          </button>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {reviews.map((review) => (
          <article key={review.id} className="relative rounded-xl border border-[#E6E8EC] p-4">
            <div className="flex items-start gap-3">
              <div className="flex h-[44px] w-[44px] shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#6F88D9] via-[#B1C4EA] to-[#DFA473] text-xs font-semibold text-white">
                RA
              </div>

              <div className="min-w-0">
                <p className="truncate text-lg font-semibold text-text-black">{review.title}</p>
                <p className="mt-1 flex items-center gap-1 text-xs text-text-gray">
                  <Image src="/assets/location-blue.svg" width={11} height={11} alt="location" />
                  <span className="truncate">{review.address}</span>
                </p>
              </div>
            </div>

            <div className="mt-3 flex items-center gap-2">
              <span className="text-sm tracking-[1px] text-[#FFB300]">★★★★★</span>
              <span className="text-sm font-medium text-text-black">{review.rating}</span>
            </div>

            <p className="mt-2 pr-8 text-xs leading-5 text-text-gray">{review.description}</p>

            <button className="absolute bottom-3 right-3 flex h-[32px] w-[32px] items-center justify-center rounded-full border border-border">
              <Image src="/assets/navigate-arrow-blue.svg" width={14} height={14} alt="open review" />
            </button>
          </article>
        ))}
      </div>
    </div>
  );
}
