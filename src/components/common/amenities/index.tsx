import Image from "next/image";

export default function AmenitiesCard({icon, label, checked} : {icon:string, label: string, checked: boolean}) {
  return (
    <div className={`min-w-[220px] flex flex-1 justify-between border ${checked ? 'border-text-black bg-light-purple' : 'border-border'} rounded-[10px]`}>
      <div className="flex gap-3 items-center p-3">
        <Image alt="" src={`/assets/${icon}`} width={24} height={24}/>
        <p className="text-base text-text-black">{label}</p>
      </div>
      <div className={`bg-white rounded-r-[10px] flex flex-col items-center justify-center py-1 gap-1 px-2 border-l ${checked ? 'border-text-black' : 'border-border'}`}>
        <div className={`font-light border border-border rounded-full w-5 h-5 text-[16px] leading-[16px] text-center`}>
          –
        </div>
        <p>3</p>
        <div className="font-light border border-border rounded-full w-5 h-5 text-[16px] leading-[16px] text-center">
          +
        </div>
      </div>
    </div>
  );
}
