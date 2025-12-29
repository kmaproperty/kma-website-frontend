import Image from "next/image";

export default function ContactUs() {
  return (
    <div
      className="
        absolute top-1/2 right-0
        -translate-y-1/2
        bg-[#010048]
        rounded-l-xl
        px-3.5 py-2
        gap-2
        text-white
        shadow-lg
        cursor-pointer
        flex
        items-center
        justify-center
        flex-row
      "
      style={{ writingMode: "sideways-rl" }}
    >
      <Image
        src="/assets/mobile-white.svg"
        alt="Phone"
        width={12}
        height={12}
      />

      <span className="text-[11px] font-medium">
        Contact Us
      </span>
    </div>
  );
}
