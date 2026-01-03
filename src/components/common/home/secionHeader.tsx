export default function SectionHeader({ heading='', subHeading='', sectionName ='', hideButton = false, channelPartnerBtn = false }) {
    return (
        <div className="flex gap-4 justify-between items-center">
            <div>
                <div className="bg-gray-400 h-0.5 w-8 mb-2">
                    <div className="w-1/2 h-0.5 bg-gray-900" />
                </div>
                <h2 className="text-2xl text-black font-semibold">{heading}</h2>
                <h3 className="text-text-gray text-xs">{subHeading}</h3>
            </div>
            <div className="flex gap-3">
            {channelPartnerBtn && 
            <button className="w-auto text-sm 1xl:text-base animated-button px-8 py-2 border border-blue text-blue! hover:text-white! bg-transparent! text-center cursor-pointer">
                    <span className="gap-3 relative flex justify-center">
                        <p className={`text-nowrap`}>Contact Us</p>
                    </span>
                 </button>
            }
            {!hideButton && <button
            className="w-auto text-sm 1xl:text-base animated-button px-8 py-2 border border-blue text-center cursor-pointer"
          >
            <span className="gap-3 relative flex justify-center">
                <p className={`text-nowrap`}>View More</p>
            </span>
          </button>}
          {
            sectionName == 'featureProperties' && (
                 <button className="w-auto text-sm 1xl:text-base animated-button px-8 py-2 border border-blue text-blue! hover:text-white! bg-transparent! text-center cursor-pointer">
                    <span className="gap-3 relative flex justify-center">
                        <p className={`text-nowrap`}>Contact Us</p>
                    </span>
                 </button>
            )
          }
          </div>
        </div>
    )
}