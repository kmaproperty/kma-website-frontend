'use client'

export default function ContentLayout({
  cardContent,
  infoContent,
}: {
  cardContent: React.ReactNode;
  infoContent: React.ReactNode;
}) {
  return (
    <div className="grid w-full min-w-0 grid-cols-1 items-start gap-8 lg:grid-cols-[minmax(0,1.12fr)_minmax(0,0.88fr)] lg:gap-10">
      <div className="min-w-0 order-2 md:order-1">{infoContent}</div>
      <div className="mt-2 min-w-0 lg:mt-[4.5rem] order-1 md:order-2">{cardContent}</div>
    </div>
  );
}
