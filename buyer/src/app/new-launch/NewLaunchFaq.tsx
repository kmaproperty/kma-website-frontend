import FaqAccordionPanel from "@/components/FaqAccordionPanel";
import NewLaunchSectionHeading from "./NewLaunchSectionHeading";
import { newLaunchPageData } from "./newLaunchData";

export default function NewLaunchFaq() {
  const { faq } = newLaunchPageData;

  return (
    <section id="newLaunchFaq" className="relative w-full bg-white text-[#010048] py-20 px-6 md:px-12 overflow-hidden border-t border-gray-100">
      <div className="max-w-3xl mx-auto space-y-10">
        <NewLaunchSectionHeading
          kicker={faq.section.kicker}
          title={faq.section.title}
          titleAccent={faq.section.titleAccent}
          description={faq.section.description}
          theme="white"
          align="center"
        />

        <FaqAccordionPanel categories={[faq.category]} showCategoryHeaders={false} variant="light" />
      </div>
    </section>
  );
}
