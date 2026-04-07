import {
  channelPartnerMenuList,
  headerMenuList,
  helpMenuList,
  moreMenuList,
  projectMenuList,
} from "@/lib/constants";
import Image from "next/image";
import RentSellHeaderView from "./rentSellHeaderView";
import CityView from "./cityView";
import { useRouter } from "nextjs-toploader/app";

export default function HomeMobileHeader({
  open,
  onClose,
  activeSubMenu,
  openSubMenu,
  closeSubMenu,
}: {
  open: boolean;
  onClose: () => void;
  activeSubMenu: string | null;
  openSubMenu: (label: string) => void;
  closeSubMenu: () => void;
}) {
  const router = useRouter();

  const listMapping = {
    project: projectMenuList,
    channel_partner: channelPartnerMenuList,
    help: helpMenuList,
    more: moreMenuList,
  };
  const renderSubMenuList = () => {
    return listMapping[activeSubMenu] ?? [];
  };

  return (
    <div
      className={`pt-5 px-4 pb-6 fixed top-0 left-0 w-[85%] h-[100dvh] flex flex-col bg-white z-[9999] transition-transform duration-500 ease-in-out overflow-y-auto 2md:hidden ${open ? "translate-x-0" : "-translate-x-full"
        }`}
    >


      <div className="flex justify-between items-center cursor-pointer mb-6">
        <div
          onClick={() => router.push("/")}
          className="cursor-pointer"
        >
          <Image
            src="/assets/kma-logo-blue.svg"
            width={100}
            height={29}
            alt="logo"
            className="w-fit h-[29px]"
          />
        </div>
        <Image
          onClick={onClose}
          src={"/assets/close-icon.svg"}
          width={16}
          height={16}
          alt="close"
          className="hover:rotate-180 rotate-0 transition-transform duration-500 ease-in-out"
        />
      </div>



      <div className="relative w-full flex-1">
        {!activeSubMenu && (
          <div className="flex flex-col text-text-black">
            <div onClick={() => { openSubMenu('city') }} className="group flex sm:hidden justify-between items-center cursor-pointer border-b border-[#0000001A]">
              <div className="flex items-center gap-2">
                <Image
                  src="/assets/location-blue.svg"
                  className="text-gray-300"
                  width={20}
                  height={20}
                  alt="location"
                  style={{ width: "20px", height: "20px" }}
                />
                <p className="break-word text-[15px] nowrap font-medium w-max py-3.5"> City </p>
              </div>
              {/* <Image
                src="/assets/down-arrow-blue.svg"
                width={25}
                height={25}
                alt="arrow"
              /> */}
              <svg className="text-[#B0B0C4] group-hover:text-text-black" width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M0.189095 8.95039C0.0778363 8.839 0.015343 8.68799 0.015343 8.53055C0.015343 8.37311 0.0778363 8.2221 0.189095 8.1107L3.73004 4.56975L0.189095 1.0288C0.130724 0.974414 0.083905 0.908823 0.0514329 0.835944C0.0189607 0.763066 0.00149996 0.684393 9.24606e-05 0.604621C-0.00131503 0.524848 0.0133596 0.44561 0.0432406 0.371632C0.0731217 0.297653 0.117597 0.230452 0.174014 0.174035C0.230431 0.117619 0.297632 0.0731421 0.37161 0.0432615C0.445589 0.0133801 0.524827 -0.00129318 0.6046 0.000113487C0.684373 0.00152111 0.763045 0.0189819 0.835923 0.0514536C0.908801 0.0839262 0.974392 0.130744 1.02878 0.189116L4.98958 4.14991C5.10084 4.26131 5.16333 4.41231 5.16333 4.56975C5.16333 4.7272 5.10084 4.8782 4.98958 4.9896L1.02878 8.95039C0.917386 9.06165 0.766381 9.12415 0.608939 9.12415C0.451497 9.12415 0.300493 9.06165 0.189095 8.95039Z" fill="currentcolor" />
              </svg>
            </div>

            {headerMenuList.map((item) => (
              <div
                key={item.value}
                onClick={() => {
                  if (item.value === "refer_and_earn") {
                    router.push("/refer-and-earn");
                    onClose();
                  } else {
                    openSubMenu(item.value);
                  }
                }}
                className="group flex justify-between items-center cursor-pointer border-b border-[#0000001A]"
              >
                <div className="flex items-center gap-2">
                  <Image
                    src={item.img}
                    className="text-gray-300"
                    width={20}
                    height={20}
                    alt="location"
                    style={{ width: "20px", height: "20px" }}
                  />
                  <p
                    key={item.value}
                    className="break-word text-[15px] nowrap font-medium w-max py-3.5"
                  >
                    {item.label}
                  </p>
                </div>

                {item.value != "refer_and_earn" && (
                  // <Image
                  //   src="/assets/down-arrow-blue.svg"
                  //   width={25}
                  //   height={25}
                  //   alt="arrow"
                  // />
                  <svg className="text-[#B0B0C4] group-hover:text-text-black" width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M0.189095 8.95039C0.0778363 8.839 0.015343 8.68799 0.015343 8.53055C0.015343 8.37311 0.0778363 8.2221 0.189095 8.1107L3.73004 4.56975L0.189095 1.0288C0.130724 0.974414 0.083905 0.908823 0.0514329 0.835944C0.0189607 0.763066 0.00149996 0.684393 9.24606e-05 0.604621C-0.00131503 0.524848 0.0133596 0.44561 0.0432406 0.371632C0.0731217 0.297653 0.117597 0.230452 0.174014 0.174035C0.230431 0.117619 0.297632 0.0731421 0.37161 0.0432615C0.445589 0.0133801 0.524827 -0.00129318 0.6046 0.000113487C0.684373 0.00152111 0.763045 0.0189819 0.835923 0.0514536C0.908801 0.0839262 0.974392 0.130744 1.02878 0.189116L4.98958 4.14991C5.10084 4.26131 5.16333 4.41231 5.16333 4.56975C5.16333 4.7272 5.10084 4.8782 4.98958 4.9896L1.02878 8.95039C0.917386 9.06165 0.766381 9.12415 0.608939 9.12415C0.451497 9.12415 0.300493 9.06165 0.189095 8.95039Z" fill="currentcolor" />
                  </svg>

                )}
              </div>
            ))}

            <div
              onClick={() => {
                openSubMenu("more");
              }}
              className="group flex justify-between items-center cursor-pointer border-b border-[#0000001A]"
            >
              <div className="flex items-center gap-2">
                <Image
                  src="/assets/more-icon.svg"
                  className="text-gray-300"
                  width={20}
                  height={20}
                  alt="location"
                  style={{ width: "20px", height: "20px" }}
                />
                <p
                  key={"more"}
                  className="break-word text-[15px] nowrap font-medium w-max py-3.5"
                >
                  {"More"}
                </p>
              </div>

              {/* <Image
                src="/assets/down-arrow-blue.svg"
                width={25}
                height={25}
                alt="arrow"
              /> */}
              <svg className="text-[#B0B0C4] group-hover:text-text-black" width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M0.189095 8.95039C0.0778363 8.839 0.015343 8.68799 0.015343 8.53055C0.015343 8.37311 0.0778363 8.2221 0.189095 8.1107L3.73004 4.56975L0.189095 1.0288C0.130724 0.974414 0.083905 0.908823 0.0514329 0.835944C0.0189607 0.763066 0.00149996 0.684393 9.24606e-05 0.604621C-0.00131503 0.524848 0.0133596 0.44561 0.0432406 0.371632C0.0731217 0.297653 0.117597 0.230452 0.174014 0.174035C0.230431 0.117619 0.297632 0.0731421 0.37161 0.0432615C0.445589 0.0133801 0.524827 -0.00129318 0.6046 0.000113487C0.684373 0.00152111 0.763045 0.0189819 0.835923 0.0514536C0.908801 0.0839262 0.974392 0.130744 1.02878 0.189116L4.98958 4.14991C5.10084 4.26131 5.16333 4.41231 5.16333 4.56975C5.16333 4.7272 5.10084 4.8782 4.98958 4.9896L1.02878 8.95039C0.917386 9.06165 0.766381 9.12415 0.608939 9.12415C0.451497 9.12415 0.300493 9.06165 0.189095 8.95039Z" fill="currentcolor" />
              </svg>

            </div>
          </div>
        )}

        <div className={`bg-white absolute top-0 left-0 w-full transition-transform duration-300 ease-in-out ${activeSubMenu ? "translate-x-0" : "-translate-x-full"
          }`}>
          {/* {activeSubMenu && ( */}

          <div
            onClick={closeSubMenu}
            className="group flex items-center gap-2 w-fit cursor-pointer text-base text-text-black text-[15px] font-medium"
          >
            <div className="border border-[#0100481A] bg-[#0D15200F] group-hover:text-white group-hover:bg-text-black rounded-[5px] w-7 h-7 flex items-center justify-center">
              <svg width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0.204617 7.49963L6.50035 13.7933C6.77661 14.0688 7.22418 14.0688 7.50113 13.7933C7.77738 13.5177 7.77738 13.0701 7.50113 12.7946L1.70476 7.00032L7.50043 1.20605C7.77668 0.930493 7.77668 0.482919 7.50043 0.206666C7.22418 -0.0688888 6.77591 -0.0688888 6.49966 0.206666L0.20392 6.50025C-0.0680894 6.77296 -0.0680893 7.22757 0.204617 7.49963Z" fill="currentcolor" />
              </svg>
            </div>
            <span className="text-text-black">Back</span>
          </div>

          {(activeSubMenu != "buy" ||
            activeSubMenu != "rent" ||
            activeSubMenu != "city") && (
              <div className="flex flex-col gap-2 mt-3">
                {renderSubMenuList().map((item, index) => {
                  return (
                    <>
                      <p
                        onClick={() => {
                          const routes: Record<string, string> = {
                            "Join Us": "/signup",
                            "Sales Enquiry": "/sales-enquiry",
                            "Meet The Team": "/meet-the-team",
                            "Help Center": "/contact-us",
                            "Find an agent": "/channel-partner",
                          };
                          const route = routes[item.label];
                          if (route) {
                            router.push(route);
                            onClose();
                          }
                        }}
                        className="text-base text-text-black hover:bg-list-background cursor-pointer px-2 py-1.5 rounded-lg"
                      >
                        {item.label}
                      </p>
                      {index != moreMenuList.length - 1 && (
                        <div className="border-b border-border mx-2"></div>
                      )}
                    </>
                  );
                })}
              </div>
            )}
          {
            (activeSubMenu == 'buy' || activeSubMenu == 'rent') && <div>
              <RentSellHeaderView type={activeSubMenu} />
            </div>
          }
          {
            activeSubMenu == 'city' && <div>
              <CityView handleScroll={onClose} />
            </div>
          }
        </div>
        {/* )} */}
      </div>



      <div className="bg-white">
        <div className="space-y-0.5">
          <p className="text-base text-[#888888]">Contact Us Toll Free on</p>
          <p className="text-text-black text-sm"><strong>1800 41 00000</strong> ( 9AM - 11PM IST )</p>
          <p className="text-text-black text-sm">Email Us at <strong>Services@kma.com</strong></p>
        </div>
      </div>


    </div>
  );
}
