import Image from "next/image";

const activityCards = Array.from({ length: 6 }).map((_, index) => ({
  id: index + 1,
  title: "Royal Apartment",
  address: "25, Willow Crest Apartment",
  price: "INR 84L",
  category: index % 2 === 0 ? "Buy" : "Rent",
}));

export default function MyActivityScreen() {
  return (
    <div className="rounded-xl bg-white p-4 sm:p-5">
      <h2 className="text-[30px] font-semibold leading-none text-text-black">My Activity</h2>

      <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {activityCards.map((card) => (
          <article key={card.id} className="rounded-xl border border-[#E6E8EC] p-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-lg font-semibold text-text-black">{card.title}</p>
                <p className="mt-1 flex items-center gap-1 text-xs text-text-gray">
                  <Image src="/assets/location-blue.svg" width={12} height={12} alt="location" />
                  <span>{card.address}</span>
                </p>
              </div>
              <span className="rounded-full bg-light-purple px-2.5 py-1 text-xs font-medium text-blue">
                {card.category}
              </span>
            </div>

            <div className="mt-4 border-t border-border pt-3">
              <p className="text-sm text-text-gray">You viewed this property recently.</p>
              <p className="mt-2 text-base font-semibold text-blue">{card.price}</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
