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
            <div className="fixed -top-[25px] left-0 right-0 z-[60] flex justify-center pointer-events-none">
                <div className="pointer-events-auto w-full flex justify-center">
                    <HomdeHeader />
                </div>
            </div>
            <div className="relative pt-[25px] h-[100vh] max-h-[600px]" style={{ backgroundImage: 'url(assets/app/sales-enquiry-bg.jpg)', backgroundSize: 'cover', backgroundPosition: 'bottom' }}>
                <div className="w-[90%] md:w-[75%] max-w-[600px] mx-auto mt-[150px]">
                    <PageTitle
                        title="Contact KMA"
                        description="Looking to list or promote your property? Our team is ready to guide you every step of the way."
                        breadcrumps={breadcrumps}
                    />

                </div>
            </div>
            <div className='relative flex flex-col lg:flex-row items-start lg:items-center justify-between w-[90%] md:w-[75%] mx-auto max-w-[1020px] bg-white rounded-lg shadow-lg px-4 md:px-6 py-4 gap-6 lg:gap-8' style={{ transform: 'translateY(-50%)' }}>
                <div className='flex items-start md:items-center gap-3 min-w-0'>
                    <Image
                        src={'/assets/app/call-person.svg'}
                        width={60}
                        height={60}
                        className='w-[66px] h-[66px] rounded-full'
                    />
                    <div>
                        <h3 className='text-[20px] font-semibold text-text-black mb-0'>Confused about how to post or promote your property/project?</h3>
                        <p className='text-md font-normal text-[#888888] mb-0'>Our KMA Partner Specialist will guide you step-by-step.</p>
                    </div>
                </div>
                <button className="animated-button px-6 py-3.5 cursor-pointer w-full lg:w-auto">
                    <span className="flex items-center justify-between gap-[10px] relative z-11">
                        <PhoneIncoming className='w-5 h-5 text-white' />
                        <p className="text-nowrap text-xs lg:text-sm">Request a Callback</p>
                    </span>
                </button>
            </div>
            <div className='w-full py-[80px] px-4 sm:px-6 md:px-[50px]'>
                <div className='max-w-[1444px] mx-auto'>
                    <SectionHeading title="" subtitle="KMA Headquarters" type={'left'} color='' lineTop={false}
                        description=""
                    />
                    <div className='flex items-center gap-3 mt-7'>
                        <MapPin className='w-5 h-5 text-[#7575BC]' />
                        <p className='text-md font-normal text-[#0D1520] mb-0'><b className='font-semibold'>KMA Realty Services Pvt. Ltd. -</b> Tower A, Business Park, Sector 62, Noida - 201309, U.P.</p>
                    </div>
                    <div className='flex items-center gap-3 mt-3'>
                        <Phone className='w-5 h-5 text-[#7575BC]' />
                        <a href='tel:+919876543210' className='text-md font-normal text-[#0D1520] mb-0'>+91 9876543210</a>
                    </div>
                    <div className='flex items-center gap-3 mt-3'>
                        <Mail className='w-5 h-5 text-[#7575BC]' />
                        <a href='mailto:info@kma.com' className='text-md font-normal text-[#0D1520] mb-0'>info@kma.com</a>
                    </div>
                </div>
            </div>
            <div className='w-full pb-[100px] px-4 sm:px-6 md:px-[50px]'>
                <div className='max-w-[1444px] mx-auto'>
                    <SectionHeading title="" subtitle="KMA Regional Offices" type={'left'} color='' lineTop={false}
                        description=""
                    />
                    <ContactTable />
                </div>
            </div>
            <div className='py-[100px] px-4 sm:px-6 md:px-[50px] bg-[#f5f5f5]'>
                <div className='max-w-[1440px] mx-auto flex flex-col lg:flex-row gap-10 justify-between'>
                    <div className='w-full lg:w-[50%] max-w-[720px]'>
                        <h2 className={`text-[28px] leading-9 font-semibold text-text-black mb-6`}>About KMA</h2>
                        <p className='text-md leading-7 font-normal text-[#888888] mb-0'>KMA (Knowledge Market Advisors) is a fast-growing digital real estate platform designed for builders, brokers, agents, and property buyers. We empower our partners to showcase unlimited properties and projects, generate verified leads, and scale their business digitally — all in one place.
                           <br /> <br />
                            With an intuitive listing dashboard, verified buyer engagement tools, and a trusted partner community, KMA is building the future of transparent and efficient property marketing in India.
                            Whether you're looking to post a project, explore new launches, or buy your dream home, KMA connects the right people with the right properties — smarter and faster.</p>
                    </div>
                    <div className='w-full lg:w-[45%] max-w-[624px]'>
                        <h2 className={`text-[28px] leading-9 font-semibold text-text-black mb-6`}>Popular Cities in India</h2>
                        <p className='text-md leading-7 font-normal text-[#888888] mb-0'><b className='font-semibold'>Buy / Rent / Sell in:</b><br/> Delhi NCR | Mumbai | Noida | Pune | Gurgaon | Bengaluru | Hyderabad | Ahmedabad | Jaipur | Lucknow </p>
                        <div className='flex gap-3  mt-4'>
                            <a className='flex w-10 h-10 items-center justify-center rounded-full border border-[#ccc]' href='#'>
                                <Image height={46} width={46} src="assets/app/instagram.svg" className='w-6 h-6' />
                            </a>
                            <a className='flex w-10 h-10 items-center justify-center rounded-full border border-[#ccc]' href='#'>
                                <Image height={46} width={46} src="assets/app/linkedin.svg" className='w-6 h-6' />
                            </a>
                            <a className='flex w-10 h-10 items-center justify-center rounded-full border border-[#ccc]' href='#'>
                                <Image height={46} width={46} src="assets/app/facebook.svg" className='w-6 h-6' />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <div className="bg-text-black flex justify-center">
                <div className="my-13 w-[75%]">
                    <AboutusDataSync />
                    <HomeFooter tab={1} />
                </div>
            </div>
        </div>
    )
};

export default SalesEnquiry;