import NewLaunchSectionHeading from "./NewLaunchSectionHeading";
import { newLaunchPageData } from "./newLaunchData";

export default function NewLaunchDevelopers() {
  const { developers: section } = newLaunchPageData;

  return (
    <section className="relative w-full bg-white text-[#010048] py-20 px-6 md:px-12 overflow-hidden border-t border-gray-100">
      <div className="max-w-7xl mx-auto">
        <NewLaunchSectionHeading
          kicker={section.section.kicker}
          title={section.section.title}
          titleAccent={section.section.titleAccent}
          theme="white"
          align="center"
          className="mb-12"
        />

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 border border-blue/20 rounded-[22px] overflow-hidden bg-[#010048]/5 backdrop-blur shadow-[0_20px_80px_rgba(1,0,72,0.06)]">
  {section.items.map((dev) => (
    <div
      key={dev.abbr}
      className="p-6 flex flex-col items-center gap-2 text-center transition-all hover:bg-blue/[0.03] border border-blue/20"
    >
      <span className="text-2xl font-extrabold">{dev.abbr}</span>
      <span className="text-[10px] h-[30px] tracking-wider uppercase text-gray-600 font-bold">
        {dev.name}
      </span>
      <span className="text-[10px] text-cyan-800 font-bold">
        {dev.projects}
      </span>
    </div>
  ))}
</div>
      </div>
    </section>
  );
}