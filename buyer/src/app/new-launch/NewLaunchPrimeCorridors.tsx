import NewLaunchSectionHeading from "./NewLaunchSectionHeading";
import { newLaunchPageData } from "./newLaunchData";

export default function NewLaunchPrimeCorridors() {
  const { primeCorridors } = newLaunchPageData;

  return (
    <section className="relative w-full bg-white text-[#010048] py-20 px-6 md:px-12 overflow-hidden">
      <div className="max-w-7xl mx-auto space-y-10">
        <NewLaunchSectionHeading
          title={primeCorridors.section.title}
          titleAccent={primeCorridors.section.titleAccent}
          description={primeCorridors.section.description}
          theme="white"
          align="left"
        />

        <div className="overflow-x-auto border border-gray-200 rounded-[22px] bg-gray-50/50">
          <table className="w-full border-collapse text-sm min-w-[640px]">
            <thead>
              <tr className="bg-[#010048]/5">
                {primeCorridors.tableHeaders.map((header) => (
                  <th key={header} className="text-left px-5 py-4 text-[10px] tracking-wider uppercase text-blue font-bold">{header}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {primeCorridors.rows.map((row) => (
                <tr key={row.corridor} className="border-t border-gray-200 hover:bg-blue/[0.03] transition-colors">
                  <td className="px-5 py-4 font-semibold text-[#010048]">{row.corridor}</td>
                  <td className="px-5 py-4 text-gray-600 font-medium">{row.suited}</td>
                  <td className="px-5 py-4 text-gray-600 font-medium">{row.strength}</td>
                  <td className="px-5 py-4 text-gray-600 font-medium">{row.profile}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
