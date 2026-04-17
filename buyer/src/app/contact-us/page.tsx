export const dynamic = 'force-dynamic';
"use client"
import HomdeHeader from '@/components/header/homeHeader'
import { BadgePercent, CircleCheckBig, House, Lightbulb, ListCheck, ListChecks, MailOpen, MapPinned, PhoneCall, Section } from 'lucide-react';
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
import { fetchPropertyCitiesData, fetchPropertyMasterData } from '../api/home';
import BannerSlider from '@/components/home/bannerSlider';
import { useState } from 'react';

const ContactUs = async () => {
    const [contactInformation, setContactInformation] = useState([
        {
            title: 'Phone',
            subTitle: 'Need help or have questions? Call us.',
            icon: <PhoneCall className='w-8 h-8 text-[#010048]' />,
            description: '+91-9056580022',
            link: 'tel:+919056580022'
        },
        {
            title: 'Send us an email',
            subTitle: 'Got questions? Drop us a message.',
            icon: <MailOpen className='w-8 h-8 text-[#010048]' />,
            description: 'info.gurufram@gmail.com',
            link: 'mailto:info.gurufram@gmail.com'
        },
        {
            title: 'Visit our office',
            subTitle: 'Visit our office with your project in your mind.',
            icon: <MapPinned className='w-8 h-8 text-[#010048]' />,
            description: 'GG, Gurugram, Haryana 122016',
            link: 'https://www.google.com/maps/place/Gurugram,+Haryana/@28.4594965,76.9904873,12z/data=!3m1!4b1!4m6!3m5!1s0x390d19d582e38859:0x2cf5fe8e5c64b1e!8m2!3d28.4594965!4d77.0266383!16zL20vMDVfMjg0?entry=ttu'
        }
    ]);

    const breadcrumps = [
        {
            name: 'Home',
            link: '/',
            icon: <House className='w-5' />
        },
        {
            name: 'Contact Us',
        }
    ]
    const sliderImage = [
        {
            imagePath: '/assets/contact-hero-bg.png',
            alt: "Background Image 1",
        },
    ]
    return (
        <div>
            <div className="relative non_home_page_slider">
                <BannerSlider bannerHeight={'min-h-[600px] 2md:h-[60vh]'} backgroundImages={sliderImage} overlayClass='about-us-gradient-overlay' />
                <div className="absolute flex flex-col items-center top-0 w-[100%] ">
                    <HomdeHeader />
                    <div className="mt-[150px]">
                        <PageTitle
                            title="Let’s Connect"
                            description="Let our team of real estate specialists assist you with bespoke solutions for buying, selling, or renting luxury properties in Gurugram."
                            breadcrumps={breadcrumps}
                        />
                    </div>
                </div>
            </div>
            <div className='w-full px-4 2xl:py-[100px] xl:py-20 lg:py-16 md:py-12 py-10'>
                <div className='max-w-[1444px] mx-auto'>
                    <SectionHeading title="" subtitle="Do you have some questions for us?" type={'center'} color='' lineTop={false}
                        description="Whether you're buying, selling, or just exploring—we’ve got answers."
                    />
                    <div className='grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-5 md:mt-12 mt-6 items-center'>
                        {
                            contactInformation.map((item, index) => (
                                <div className='bg-[#F2F2F2] px-10 py-6 rounded-lg flex flex-col gap-2 h-full justify-center'>
                                    <div className='flex gap-4 items-center'>
                                        <div className='bg-white min-w-[60px] w-[60px] h-[60px] flex items-center justify-center rounded-lg mb-2'>{item.icon}</div>
                                        <div>
                                            <h3 className='text-[#010048] text-[20px] leading-6 font-medium mb-0'>{item.title}</h3>
                                            <p className='text-[#5C727D] text-md leading-7'>{item.subTitle}</p>
                                        </div>
                                    </div>
                                    <a href={item.link} className='text-[#010048] text-[18px] leading-6 font-medium'>{item.description}</a>
                                </div>
                            ))
                        }
                        {/* <div className='bg-[#F2F2F2] px-10 py-6 rounded-lg flex flex-col gap-2 h-full justify-center'>
                            <div className='flex gap-4 items-center'>
                                <div className='bg-white min-w-[60px] w-[60px] h-[60px] flex items-center justify-center rounded-lg mb-2'><PhoneCall className='w-8 h-8 text-[#010048]' /></div>
                                <div>
                                    <h3 className='text-[#010048] text-[20px] leading-6 font-medium mb-0'>Give us a call</h3>
                                    <p className='text-[#5C727D] text-md leading-7'>Need help or have questions? Call us.</p>
                                </div>
                            </div>
                            <a href='tel:+919056580022' className='text-[#010048] text-[18px] leading-6 font-medium'>+91- 9056580022</a>
                        </div>
                        <div className='bg-[#F2F2F2] px-10 py-6 rounded-lg flex flex-col gap-2 h-full justify-center'>
                            <div className='flex gap-4 items-center'>
                                <div className='bg-white min-w-[60px] w-[60px] h-[60px] flex items-center justify-center rounded-lg mb-2'><PhoneCall className='w-8 h-8 text-[#010048]' /></div>
                                <div>
                                    <h3 className='text-[#010048] text-[20px] leading-6 font-medium mb-0'>Send us an email</h3>
                                    <p className='text-[#5C727D] text-md leading-7'>Got questions? Drop us a message.</p>
                                </div>
                            </div>
                            <a href='mailto:kmaproperty22@gmail.com' className='text-[#010048] text-[18px] leading-6 font-medium'>kmaproperty22@gmail.com</a>
                        </div>
                        <div className='bg-[#F2F2F2] px-10 py-6 rounded-lg flex flex-col gap-2 h-full justify-center'>
                            <div className='flex gap-4 items-center'>
                                <div className='bg-white min-w-[60px] w-[60px] h-[60px] flex items-center justify-center rounded-lg mb-2'><PhoneCall className='w-8 h-8 text-[#010048]' /></div>
                                <div>
                                    <h3 className='text-[#010048] text-[20px] leading-6 font-medium mb-0'>Visit our office</h3>
                                    <p className='text-[#5C727D] text-md leading-7'>PLOT NO. 3A, Northern Peripheral Rd, Shastri Nagar Industrial Area, Sector 106, Gurugram, Haryana 122006, India.</p>
                                </div>
                            </div>
                            <a href='https://maps.app.goo.gl/RfEn4XmFPCPAfNrT7' target='_blank' className='text-[#010048] text-[18px] leading-6 font-medium'>GG, Gurugram, Haryana 122016</a>
                        </div> */}
                    </div>
                    <div className='md:mt-12 mt-6 flex xl:flex-row flex-col-reverse border border-[#D9D9D9] rounded-lg'>
                        <div className='xl:w-[50%] w-full xl:h-[568px] h-[400px]'>
                            <iframe className='w-full h-full' src="https://www.google.com/maps/embed?pb=!1m13!1m8!1m3!1d448830.65552007704!2d77.000389!3d28.494917!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMjjCsDI5JzQxLjciTiA3N8KwMDAnMDEuNCJF!5e0!3m2!1sen!2sus!4v1767879656314!5m2!1sen!2sus" width="400" height="300" style={{ border: 0 }} loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                        </div>
                        <div className='xl:px-16 p-5 xl:w-[50%] w-full'>
                            <SectionHeading title="" subtitle="Contact us" type={'left'} color='' lineTop={false}
                                description="send us a message and we will get back to you soon."
                            />
                            <ContactFormComponent />
                        </div>
                    </div>
                </div>
            </div>
            <div className='w-full px-4 2xl:py-[100px] xl:py-20 lg:py-16 md:py-12 py-10 bg-[#F2F2F2]'>
                <div className='flex items-center justify-between gap-6 max-w-[1440] mx-auto'>
                    <div className='     max-w-[350px]  space-y-3'>
                        <h2 className={`xl:text-[38px] text-[28px] leading-11 font-semibold text-[#010048]`}>What People Are Saying</h2>
                        <p className={`text-[#5C727D] text-md leading-7`}>Real stories from real people who've found their dream properties with us.</p>
                        <div className='flex gap-3'>

                            <Link href={'/blogs'}>
                                <button
                                    className="w-fit text-sm 1xl:text-base animated-button px-10 py-2.5 border border-blue text-center cursor-pointer"
                                >
                                    <span className="gap-3 relative flex justify-center">
                                        <p className={`text-nowrap`}>View More</p>
                                    </span>
                                </button>
                            </Link>
                            <Link href={'/blogs'}>
                                <button className="w-auto text-sm 1xl:text-base text-blue! py-2.5 hover:text-white! animated-button px-8 border border-blue bg-transparent! text-center cursor-pointer">
                                    <span className="gap-3 relative flex justify-center">
                                        <p className={`text-nowrap`}>Add a Review</p>
                                    </span>
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className="bg-text-black flex justify-center">
                    <AboutusDataSync />
                    <HomeFooter tab={1} />
            </div>
        </div>
    )
};

export default ContactUs;