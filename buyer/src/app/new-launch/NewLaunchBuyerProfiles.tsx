import NewLaunchSectionHeading from "./NewLaunchSectionHeading";
import { newLaunchPageData } from "./newLaunchData";

export default function NewLaunchBuyerProfiles() {
  const { buyerProfiles: section } = newLaunchPageData;

  return (
    <section className="relative w-full bg-[#010048] text-white py-20 px-6 md:px-12 overflow-hidden border-t border-white/5">
      <div className="max-w-7xl mx-auto space-y-10">
        <NewLaunchSectionHeading
          title={section.section.title}
          titleAccent={section.section.titleAccent}
          titleSuffix={section.section.titleSuffix}
          description={section.section.description}
          theme="blue"
          align="left"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {section.items.map((profile) => (
            <div key={profile.title} className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-cyan-400/30 transition-all">
              <h4 className="text-base font-extrabold mb-2">{profile.title}</h4>
              <p className="text-xs text-white/50 font-medium leading-relaxed">{profile.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
