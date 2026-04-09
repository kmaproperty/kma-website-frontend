'use client'

export default function ContentLayout({
  cardContent,
  infoContent,
}: {
  cardContent: React.ReactNode;
  infoContent: React.ReactNode;
}) {
  return (
    <div className="w-full grid grid-cols-1 md:flex md:flex-wrap justify-between items-start gap-10">
      <div style={{ flex: "2.6 1 " }}>
        {infoContent}
      </div>
      <div style={{ flex: "1.5 1 " }} className="mt-2 md:mt-[4.5rem]">
        {cardContent}
      </div>
    </div>
  );
}
