import Image from "next/image";
import { areas } from "./newLaunchData";

export default function NewLaunchAreas() {
  return (
    <section id="newLaunchAreas" className="relative w-full bg-white text-[#010048] py-20 px-6 md:px-12 overflow-hidden border-t border-gray-100">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-6 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-6 h-[1px] bg-blue" />
              <p className="text-[11px] font-bold tracking-[0.25em] text-blue uppercase">Prime Corridors</p>
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight leading-[1.15]">
              Top Locations for{" "}
              <span className="font-serif font-bold italic text-transparent bg-clip-text bg-gradient-to-r from-[#00D4FF] to-[#00F5C8] tracking-tight">New Launches</span>
            </h2>
          </div>
          <p className="text-sm text-gray-600 max-w-sm font-medium leading-relaxed">
            Gurgaon&apos;s premium micro-markets — each with distinct advantages for homebuyers &amp; investors.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {areas.map((area) => (
            <div key={area.name} className="relative rounded-[22px] overflow-hidden border border-gray-200 group cursor-pointer hover:-translate-y-1 hover:border-blue/30 transition-all duration-300">
              <Image src={area.image} alt={area.alt} width={600} height={200} className="w-full h-[200px] object-cover transition-transform duration-500 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#010048]/95 via-[#010048]/30 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <p className="text-[10px] tracking-[0.14em] uppercase text-cyan-400 font-bold mb-1">{area.count}</p>
                <h3 className="text-lg font-extrabold text-white mb-2">{area.name}</h3>
                <div className="flex flex-wrap gap-1.5">
                  {area.tags.map((tag) => (
                    <span key={tag} className="text-[10px] px-2 py-0.5 rounded-full border border-cyan-400/20 text-white/70">{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
