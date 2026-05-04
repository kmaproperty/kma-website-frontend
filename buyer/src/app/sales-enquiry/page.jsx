import HomdeHeader from '@/components/header/homeHeader'
import { BadgePercent, CircleCheckBig, House, Lightbulb, ListCheck, ListChecks, Mail, MapPin, Phone, PhoneCall, PhoneIncoming, Section } from 'lucide-react';
import PageTitle from '@/components/common/PageTitle';
import { TbBulb } from "react-icons/tb";
import SectionHeading from '@/components/common/SectionHeading';
import Image from 'next/image';
import BlogSection from '@/components/home/blogSection';
import HomeFooter from '@/components/footer/homeFooter';
import AboutusDataSync from '@/components/footer/AboutusDataSync';
import { FaFacebook, FaLinkedin, FaTwitter, FaYoutube } from 'react-icons/fa';
import ContactFormComponent from '@/components/contactUs/contactForm';
import Link from 'next/link';
import ContactTable from '../../components/contactUs/ContactTable';
import ContactInformation from '@/components/contactInformation';

const SalesEnquiry = () => {

    const breadcrumps = [
        {
            name: 'Home',
            link: '/',
            icon: <House className='w-5' />
        },
        {
            name: 'Sales Enquiry',
        }
    ]
    return (
        <div className='overflow-x-hidden'>
            <div className="fixed  left-0 right-0 z-[60] flex justify-center pointer-events-none">
                <div className="pointer-events-auto w-full flex justify-center">
                    <HomdeHeader />
                </div>
            </div>
            <div
                className="relative min-h-[385px] max-h-[385px] rounded-bl-[40px] rounded-br-[40px] pt-[25px] sm:min-h-[min(100dvh,560px)] sm:max-h-[560px] sm:rounded-bl-[72px] sm:rounded-br-[72px] md:min-h-[500px] md:max-h-[500px] lg:min-h-[min(100dvh,600px)] lg:max-h-[600px] lg:rounded-bl-[100px] lg:rounded-br-[100px]"
                style={{ backgroundImage: 'url(assets/app/sales-enquiry-bg.jpg)', backgroundSize: 'cover', backgroundPosition: 'bottom' }}
            >
                <div className="mx-auto mt-[120px] w-full max-w-full px-4 sm:mt-28 sm:px-6 md:mt-32 lg:px-10 xl:mt-[150px]">
                    <PageTitle
                        title="Contact KMA"
                        description="Want to sell, list, or promote your property? Our experts are here to make the process simple."
                        breadcrumps={breadcrumps}
                        actions={null}
                        innerClassName="w-full max-w-full"
                    />

                </div>
            </div>
            <div className='relative hidden md:flex md:flex-row items-center justify-between w-[90%] md:w-[75%] mx-auto max-w-[1020px] bg-white rounded-lg shadow-lg px-4 md:px-6 py-4 gap-4 md:gap-6 lg:gap-8' style={{ transform: 'translateY(-50%)' }}>
                <div className='flex items-center gap-3 min-w-0 flex-1'>
                    <Image
                        src={'/assets/app/call-person.svg'}
                        width={60}
                        height={60}
                        className='w-[66px] h-[66px] rounded-full'
                    />
                    <div>
                        <h3 className='text-[20px] font-semibold text-text-black mb-0'>Ready to showcase your property or project?</h3>
                        <p className='text-md font-normal text-[#888888] mb-0'>Get expert support from listing to successful closure</p>
                    </div>
                </div>
                <Link href="?isContactInformation=true" scroll={false} className="animated-button flex items-center px-6 py-3.5 cursor-pointer w-auto shrink-0">
                    <span className="flex items-center justify-between gap-[10px] relative z-11">
                        <PhoneIncoming className='w-5 h-5 text-white' />
                        <p className="text-nowrap text-xs lg:text-sm">Request a Callback</p>
                    </span>
                </Link>
            </div>
            <div className='w-full py-[80px] px-4 sm:px-6 md:px-[50px]'>
                <div className='max-w-[1440px] mx-auto'>
                    <SectionHeading title="" subtitle="KMA Headquarters" type={'left'} color='' lineTop={false}
                        description=""
                    />
                    <div className='flex items-center gap-3 mt-7'>
                        <MapPin className='w-5 h-5 text-[#7575BC]' />
                        <p className='text-md font-normal text-[#0D1520] mb-0'>Gurgaon, Haryana, India</p>
                    </div>
                    <div className='flex items-center gap-3 mt-3'>
                        <Phone className='w-5 h-5 text-[#7575BC]' />
                        <a href='tel:+919056580022' className='text-md font-normal text-[#0D1520] mb-0'>+91 9056580022</a>
                    </div>
                    <div className='flex items-center gap-3 mt-3'>
                        <Mail className='w-5 h-5 text-[#7575BC]' />
                        <a href='mailto:md.karmjeet@kmaglobalproperty.com' className='text-md font-normal text-[#0D1520] mb-0'>md.karmjeet@kmaglobalproperty.com</a>
                    </div>
                </div>
            </div>
            {/* <div className='w-full pb-[100px] px-4 sm:px-6 md:px-[50px]'>
                <div className='max-w-[1440px] mx-auto'>
                    <SectionHeading title="" subtitle="KMA Regional Offices" type={'left'} color='' lineTop={false}
                        description=""
                    />
                    <ContactTable />
                </div>
            </div> */}
            <div className='w-full px-4 pb-[48px] md:hidden'>
                <div className='max-w-[360px] mx-auto rounded-[18px] bg-[#f7f8fc] px-4 py-5 text-center'>
                    <Image
                        src={'/assets/app/call-person.svg'}
                        width={60}
                        height={60}
                        className='w-[56px] h-[56px] rounded-full mx-auto'
                    />
                    <h3 className='mt-3 text-[22px] leading-[1.1] font-semibold text-[#0D1520]'>Confused about how to post or promote your property/project?</h3>
                    <p className='mt-2 text-[12px] leading-5 font-normal text-[#8A8FA0]'>Our KMA Partner Specialist will guide you step-by-step.</p>
                    <Link href="?isContactInformation=true" scroll={false} className="animated-button flex items-center px-5 py-2.5 cursor-pointer w-fit mx-auto mt-4">
                        <span className="flex items-center justify-between gap-[8px] relative z-11">
                            <PhoneIncoming className='w-4 h-4 text-white' />
                            <p className="text-[11px] leading-4 whitespace-nowrap">Request a Callback</p>
                        </span>
                    </Link>
                </div>
            </div>
            <div className='py-[100px] px-4 sm:px-6 md:px-[50px] bg-[#f5f5f5]'>
                <div className='max-w-[1440px] mx-auto flex flex-col lg:flex-row gap-10 justify-between'>
                    <div className='w-full lg:w-[50%] max-w-[720px]'>
                        <h2 className={`text-[28px] leading-9 font-semibold text-text-black mb-6`}>About KMA</h2>
                        <p className='text-md leading-7 font-normal text-[#888888] mb-0'>KMA Global Properties is a fast-growing real estate platform built for brokers, channel partners, and property buyers across Gurgaon. We empower every partner with free listings, exclusive leads, and a complete support system — so they can focus on closing deals, not chasing them.
                           <br /> <br />
                            With a Live CRM dashboard, a dedicated Pre-Sales and Field Support team, and a trusted network of 2500+ brokers and 200+ societies, KMA is redefining what transparent and efficient real estate looks like in India. Whether you&apos;re looking to list a property, find your dream home, or grow your brokerage business — KMA connects the right people with the right properties. Smarter, faster, and always fair.</p>
                    </div>
                    <div className='w-full lg:w-[45%] max-w-[624px]'>
                        <h2 className={`text-[28px] leading-9 font-semibold text-text-black mb-6`}>Popular Cities in India</h2>
                        <p className='text-md leading-7 font-normal text-[#888888] mb-0'><b className='font-semibold'>Buy / Rent / Sell in:</b><br/> Gurgaon </p>
                    </div>
                </div>
            </div>
            <div className="bg-text-black flex justify-center">
                    <AboutusDataSync />
                    <HomeFooter tab={1} />

            </div>
            <ContactInformation />
        </div>
    )
};

export default SalesEnquiry;