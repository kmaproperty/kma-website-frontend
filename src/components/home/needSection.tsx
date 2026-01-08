import SectionHeader from "../common/home/secionHeader";

const featureDetails = [
  {
    icon: "home.svg",
    heading: "Home Loan",
    subHeading: "Make Your Dream Home a Reality",
    text: "Get easy and fast home loans with minimum documentation and competitive interest rates.",
    background: "#FDF3E2",
  },
  {
    icon: "money.svg",
    heading: "Plot Loan",
    subHeading: "Turn That Plot into a Home",
    text: "Easy financing for residential land purchases in approved locations.",
    background: "#FCEDF4",
  },
  {
    icon: "key.svg",
    heading: "Rent Agreement",
    subHeading: "Hassle-Free Online Rent Agreements",
    text: "Create, verify, and register your rent agreement online quick, legal, and secure.",
    background: "#D5E7E8",
  },
];

export default function NeedSection() {
  return (
    <div className="">
      <SectionHeader
        heading="All Your Needs. One Trusted Platform."
        subHeading="Reliable support for all your property, loan, and agreement needs."
      />
      <div className="mt-10 flex gap-4 flex-col md:flex-row">
        {featureDetails.map((item, index) => {
          return (
            <div
              className="rounded-[8px] p-5 flex-1 transition-all duration-500 ease-out
             hover:-translate-y-2 cursor-pointer"
              style={{ background: item.background }}
            >
              <div className="flex gap-4 items-center mb-2">
                <img
                  src={`/assets/${item.icon}`}
                  alt={item.heading}
                  className="w-11 h-11"
                />
                <div>
                  <h2 className="text-base font-semibold text-black">
                    {item.heading}
                  </h2>
                  <h3 className="text-blue  text-xs mb-2">
                    {item.subHeading}
                  </h3>
                </div>
              </div>
              <p className="text-text-gray text-xs">{item.text}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
