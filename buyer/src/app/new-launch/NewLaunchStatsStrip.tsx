import { statsStrip } from "./newLaunchData";

export default function NewLaunchStatsStrip() {
  return (
    <section className="relative w-full bg-white text-[#010048] py-12 md:py-16 px-6 md:px-12 border-t border-gray-100">
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-5 gap-6 md:gap-0 md:divide-x md:divide-gray-200">
        {statsStrip.map((stat) => (
          <div key={stat.label} className="text-center px-4">
            <p className="text-3xl md:text-4xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">
              {stat.val}
            </p>
            <p className="text-[10px] md:text-xs text-gray-500 font-bold mt-1 uppercase tracking-wider">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
