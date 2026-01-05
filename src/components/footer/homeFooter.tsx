import Image from "next/image";

export default function HomeFooter({ tab }) {
  return (
    <>
    {
        tab == '1' && <div>
      {/* Top Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        
        {/* About KMA */}
        <div className="space-y-5">
          <h3 className="text-base text-white font-semibold">About KMA</h3>
          <p className="text-xs text-white leading-relaxed pr-3">
            We are committed to building lasting trust by delivering transparent,
            tech-enabled, and customer-first real estate experiences across India.
          </p>

          <ul className="space-y-3 text-xs text-white">
            <li className="flex items-center gap-3">
              <span><Image src={'/assets/footor/mobile.svg'} width={25} height={25} alt="mobile" /> </span> +00 (123) 456 789 012
            </li>
            <li className="flex items-center gap-3">
              <span><Image src={'/assets/footor/email.svg'} width={25} height={25} alt="mobile" /></span> infomail123@domain.com
            </li>
            <li className="flex items-center gap-3">
              <span><Image src={'/assets/footor/location.svg'} width={25} height={25} alt="mobile" className="w-[37px] h-[25px]"/></span> West 2nd lane, Inner circular road, New York City
            </li>
          </ul>
        </div>

        {/* Featured Home */}
        <div>
          <h3 className="text-base text-white font-semibold mb-5">Featured Home</h3>
          <ul className="space-y-3 text-xs text-white">
            <li># Villa</li>
            <li># Commercial</li>
            <li># Apartments</li>
            <li># Other Abcd</li>
          </ul>
        </div>

        {/* Company */}
        <div>
          <h3 className="text-base text-white font-semibold mb-5">Company</h3>
          <ul className="space-y-3 text-xs text-white">
            <li>About Us</li>
            <li>Careers</li>
            <li>Services</li>
            <li>Contact Us</li>
            <li>Terms & Conditions</li>
            <li>Privacy Policy</li>
          </ul>
        </div>

        {/* Location Map */}
        <div>
          <h3 className="text-base text-white font-semibold mb-5">KMA Location</h3>
          <div className="overflow-hidden rounded-xl border border-gray-700">
            <iframe
                src="https://www.google.com/maps?q=Gurugram%2C%20Haryana%2C%20India&output=embed"
                width="100%"
                height="150"
                loading="lazy">
            </iframe>

          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-text-gray my-10" />

      {/* Gallery Section */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-10 items-center">
        <div className="flex justify-between">
          <Image src="/assets/kma-logo-white.svg" width={100} height={35} alt="logo" style={{height:'38px'}} />
          <div>
          <p className="text-xs text-[#FFBB55] mt-2">@kma on Instagram</p>
          <p className="text-sm font-semibold text-white mt-1">Nice Gallery</p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
          {[1, 2, 3, 4, 5].map((i) => (
            <img
              key={i}
              src={`/assets/blogs/blog-img-1.png`}
              alt="Gallery"
              className="h-28 w-full object-cover rounded-[5px]"
            />
          ))}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-text-gray mt-10 pt-6 flex flex-col md:flex-row items-center justify-between text-xs text-white">
        <p>Copyright © 2025 KMA. All Rights Reserved.</p>

        <div className="flex items-center gap-3 mt-4 md:mt-0">
          <span>Social Media:</span>
          <span><Image src='/assets/footor/facebook.svg' width={9} height={9} alt="facebook" /></span>
          <span><Image src='/assets/footor/x.svg' width={14} height={14} alt="x" /></span>
          <span><Image src='/assets/footor/youtube.svg' width={16} height={16} alt="youtube" /></span>
          <span><Image src='/assets/footor/instagram.svg' width={14} height={14} alt="instagram" /></span>
        </div>
      </div>
    </div>
    }
    {
        tab == '2' && <div>
            <div className="flex flex-col gap-5">

                <div className="flex flex-col gap-3">
                    <p className="text-white text-base font-semibold">Find Properties for Rent</p>
                    <div className="grid grid-cols-4 gap-3">
                        <div className="flex flex-col gap-2">
                            <p className="text-white text-xs">Flats for rent in Mumbai</p>
                            <p className="text-white text-xs">Flats for rent in Mumbai</p>
                            <p className="text-white text-xs">Flats for rent in Mumbai</p>
                            <p className="text-white text-xs">Flats for rent in Mumbai</p>
                            <p className="text-white text-xs">Flats for rent in Mumbai</p>
                            <p className="text-white text-xs">Flats for rent in Mumbai</p>  
                        </div>
                        <div className="flex flex-col gap-2">
                            <p className="text-white text-xs">Flats for rent in Mumbai</p>
                            <p className="text-white text-xs">Flats for rent in Mumbai</p>
                            <p className="text-white text-xs">Flats for rent in Mumbai</p>
                            <p className="text-white text-xs">Flats for rent in Mumbai</p>
                            <p className="text-white text-xs">Flats for rent in Mumbai</p>
                            <p className="text-white text-xs">Flats for rent in Mumbai</p>  
                        </div>
                        <div className="flex flex-col gap-2">
                            <p className="text-white text-xs">Flats for rent in Mumbai</p>
                            <p className="text-white text-xs">Flats for rent in Mumbai</p>
                            <p className="text-white text-xs">Flats for rent in Mumbai</p>
                            <p className="text-white text-xs">Flats for rent in Mumbai</p>
                            <p className="text-white text-xs">Flats for rent in Mumbai</p>
                            <p className="text-white text-xs">Flats for rent in Mumbai</p>  
                        </div>
                        <div className="flex flex-col gap-2">
                            <p className="text-white text-xs">Flats for rent in Mumbai</p>
                            <p className="text-white text-xs">Flats for rent in Mumbai</p>
                            <p className="text-white text-xs">Flats for rent in Mumbai</p>
                            <p className="text-white text-xs">Flats for rent in Mumbai</p>
                            <p className="text-white text-xs">Flats for rent in Mumbai</p>
                            <p className="text-white text-xs">Flats for rent in Mumbai</p>  
                        </div>
                    </div>
                </div>
                <div className="flex flex-col gap-3">
                    <p className="text-white text-base font-semibold">Find Properties for Rent</p>
                    <div className="grid grid-cols-4 gap-3">
                        <div className="flex flex-col gap-2">
                            <p className="text-white text-xs">Flats for rent in Mumbai</p>
                            <p className="text-white text-xs">Flats for rent in Mumbai</p>
                            <p className="text-white text-xs">Flats for rent in Mumbai</p>
                            <p className="text-white text-xs">Flats for rent in Mumbai</p>
                            <p className="text-white text-xs">Flats for rent in Mumbai</p>
                            <p className="text-white text-xs">Flats for rent in Mumbai</p>  
                        </div>
                        <div className="flex flex-col gap-2">
                            <p className="text-white text-xs">Flats for rent in Mumbai</p>
                            <p className="text-white text-xs">Flats for rent in Mumbai</p>
                            <p className="text-white text-xs">Flats for rent in Mumbai</p>
                            <p className="text-white text-xs">Flats for rent in Mumbai</p>
                            <p className="text-white text-xs">Flats for rent in Mumbai</p>
                            <p className="text-white text-xs">Flats for rent in Mumbai</p>  
                        </div>
                        <div className="flex flex-col gap-2">
                            <p className="text-white text-xs">Flats for rent in Mumbai</p>
                            <p className="text-white text-xs">Flats for rent in Mumbai</p>
                            <p className="text-white text-xs">Flats for rent in Mumbai</p>
                            <p className="text-white text-xs">Flats for rent in Mumbai</p>
                            <p className="text-white text-xs">Flats for rent in Mumbai</p>
                            <p className="text-white text-xs">Flats for rent in Mumbai</p>  
                        </div>
                        <div className="flex flex-col gap-2">
                            <p className="text-white text-xs">Flats for rent in Mumbai</p>
                            <p className="text-white text-xs">Flats for rent in Mumbai</p>
                            <p className="text-white text-xs">Flats for rent in Mumbai</p>
                            <p className="text-white text-xs">Flats for rent in Mumbai</p>
                            <p className="text-white text-xs">Flats for rent in Mumbai</p>
                            <p className="text-white text-xs">Flats for rent in Mumbai</p>  
                        </div>
                    </div>
                </div>
            </div>
            <div className="border-t border-text-gray mt-10 pt-6 flex flex-col md:flex-row items-center justify-between text-xs text-white">
        <p>Copyright © 2025 KMA. All Rights Reserved.</p>

        <div className="flex items-center gap-3 mt-4 md:mt-0">
          <span>Social Media:</span>
          <span><Image src='/assets/footor/facebook.svg' width={9} height={9} alt="facebook" /></span>
          <span><Image src='/assets/footor/x.svg' width={14} height={14} alt="x" /></span>
          <span><Image src='/assets/footor/youtube.svg' width={16} height={16} alt="youtube" /></span>
          <span><Image src='/assets/footor/instagram.svg' width={14} height={14} alt="instagram" /></span>
        </div>
      </div>
        </div>
    }
    </>
  );
}
