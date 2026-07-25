import NewLaunchSectionHeading from "./NewLaunchSectionHeading";
import { newLaunchPageData } from "./newLaunchData";

export default function NewLaunchKeyFactors() {
  const { keyFactors } = newLaunchPageData;

  return (
    <section className="relative w-full bg-white text-[#010048] py-10 px-6 md:px-12 overflow-hidden">
      <div className="max-w-7xl mx-auto space-y-10">
        <NewLaunchSectionHeading
          title={keyFactors.section.title}
          titleAccent={keyFactors.section.titleAccent}
          description={keyFactors.section.description}
          theme="white"
          align="left"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {keyFactors.items.map((item) => (
            <div key={item.num} className="p-6 rounded-2xl bg-gray-50/80 border border-gray-200 hover:border-blue/30 hover:-translate-y-1 hover:shadow-md transition-all">
              <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-blue/10 text-blue font-extrabold text-sm mb-3">{item.num}</span>
              <h4 className="text-sm font-extrabold text-[#010048] mb-2">{item.title}</h4>
              <p className="text-xs text-gray-600 font-medium leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
