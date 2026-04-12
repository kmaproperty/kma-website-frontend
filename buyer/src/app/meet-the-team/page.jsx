'use client'
// import HomdeHeader from '@/components/header/homeHeader'
import { BadgePercent, CircleCheckBig, House, Lightbulb, ListCheck, ListChecks, PhoneCall, Section } from 'lucide-react';
import PageTitle from '@/components/common/PageTitle';
import { TbBulb } from "react-icons/tb";
import SectionHeading from '@/components/common/SectionHeading';
import Image from 'next/image';
import BlogSection from '@/components/home/blogSection';
import HomdeHeader from '@/components/header/homeHeader'
import HomeFooter from '@/components/footer/homeFooter';
import AboutusDataSync from '@/components/footer/AboutusDataSync';
import { FaFacebook, FaLinkedin, FaTwitter, FaYoutube } from 'react-icons/fa';
import ContactFormComponent from '@/components/contactUs/contactForm';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { getAboutusData } from '@/store/homeHeaderSlice';

const MeetTheTeam = () => {
    const aboutusData = useSelector(getAboutusData);
    const { instagramLink, fbLink } = aboutusData || {};

    const breadcrumps = [
        {
            name: 'Home',
            link: '/',
            icon: <House className='w-5' />
        },
        {
            name: 'Meet The Team',
        }
    ];

    const foundersDetails = [
        {
            name: ' Tomer Fridman',
            image: '/assets/team/founder1.png',
            position: 'Co-Founder/Broker Associate',
            number: '(970) 948-3876',
            mail: "joshua.saslove@elliman.com"
        },
        {
            name: 'Isidora Fridman',
            image: '/assets/team/founder2.png',
            position: 'Founder of The KMA Group',
            number: '(970) 948-3876',
            mail: "joshua.saslove@elliman.com"
        }
    ]

    const teamDetails = [
        {
            name: 'Emery Holton',
            image: '/assets/team/team1.png',
            position: 'Broker Associate',
            number: '(970) 948-3876',
            mail: "joshua.saslove@elliman.com"
        },
        {
            name: 'Hannah Surnow',
            image: '/assets/team/team2.png',
            position: 'Broker Associate',
            number: '(970) 948-3876',
            mail: "joshua.saslove@elliman.com"
        },
        {
            name: 'Isaac Silverman',
            image: '/assets/team/team3.png',
            position: ' Broker Associate',
            number: '(970) 948-3876',
            mail: "joshua.saslove@elliman.com"
        },
    ]

    return (
        <div className='overflow-x-hidden'>
            <div className="fixed -top-[25px] left-0 right-0 z-[60] flex justify-center pointer-events-none">
                <div className="pointer-events-auto w-full flex justify-center">
                    <HomdeHeader />
                </div>
            </div>
            <div className="relative pt-[25px] h-[100vh] max-h-[600px]" style={{ backgroundImage: 'url(assets/team/meet-the-team-herobg.png)', backgroundSize: 'cover', backgroundPosition: 'bottom' }}>
                <div className="w-[90%] md:w-[75%] max-w-[600px] mx-auto mt-[140px]">
                    <PageTitle
                        title="Meet our dedicated team"
                        description="Working together to help you find your perfect property."
                        breadcrumps={breadcrumps}
                    />
                    <div className='flex gap-3 justify-center mt-5'>
                        <a
                            className='flex w-10 h-10 items-center justify-center rounded-full bg-white'
                            href={instagramLink || '#'}
                            target={instagramLink ? '_blank' : undefined}
                            rel={instagramLink ? 'noopener noreferrer' : undefined}
                        >
                            <Image height={46} width={46} src="assets/app/instagram.svg" className='w-6 h-6' />
                        </a>
                        <a
                            className='flex w-10 h-10 items-center justify-center rounded-full bg-white'
                            href='https://www.linkedin.com/company/kma-global-properties-pvt-ltd/?viewAsMember=true'
                            target='_blank'
                            rel='noopener noreferrer'
                        >
                            <Image height={46} width={46} src="assets/app/linkedin.svg" className='w-6 h-6' />
                        </a>
                        <a
                            className='flex w-10 h-10 items-center justify-center rounded-full bg-white'
                            href={fbLink || '#'}
                            target={fbLink ? '_blank' : undefined}
                            rel={fbLink ? 'noopener noreferrer' : undefined}
                        >
                            <Image height={46} width={46} src="assets/app/facebook.svg" className='w-6 h-6' />
                        </a>
                    </div>
                </div>
            </div>
            <div className='w-full py-[100px] px-4 sm:px-6 md:px-[50px]'>
                <div className='max-w-[1444px] mx-auto'>
                    <div className='flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-0'>
                        <div className='w-full lg:w-[44%] max-w-[580px]'>
                            <SectionHeading title="" subtitle="Who We Are" type={'left'} color='' lineTop={false}
                                description="KMA has a strong and experienced team that works every day to make property buying, selling, and posting simple for everyone. We connect property owners, buyers, and channel partners on one easy platform."
                            />
                        </div>
                        <div className='w-full lg:w-[50%]'>
                            <Image src="/assets/team/who-we-are.png" width={720} height={360} className='w-full' />
                        </div>
                    </div>
                    <div className='flex flex-col-reverse lg:flex-row items-center justify-between gap-8 lg:gap-0'>
                        <div className='w-full lg:w-[50%]'>
                            <Image src="/assets/team/why-choose-us.png" width={720} height={360} className='w-full' />
                        </div>
                        <div className='w-full lg:w-[44%] max-w-[580px]'>
                            <SectionHeading title="" subtitle="What We Do" type={'left'} color='' lineTop={false}
                                description="Our team handles residential and commercial property listings, RERA-approved projects, and builder tie-ups. We guide people step-by-step to post their property, find good options, or grow their real estate business."
                            />
                        </div>
                    </div>
                    <div className='flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-0'>
                        <div className='w-full lg:w-[44%] max-w-[580px]'>
                            <SectionHeading title="" subtitle="Why Choose Us" type={'left'} color='' lineTop={false}
                                description="From small towns to big cities, the KMA team is working to bring the best real estate experience to all. We believe in trust, transparency, and service. Our team is always ready to help you—whether you are an owner or a partner."
                            />
                        </div>
                        <div className='w-full lg:w-[50%]'>
                            <Image src="/assets/team/what-we-do.png" width={720} height={360} className='w-full' />
                        </div>
                    </div>
                </div>
            </div>
            <div className='w-full py-[120px] px-4 sm:px-6 md:px-[50px]' style={{ backgroundImage: 'url(assets/team/work-with-us-bg.jpg)' }}>
                <div className='max-w-[800px] mx-auto space-y-6 flex flex-col items-center'>
                    <h2 className={`text-[28px] leading-9 text-center font-semibold text-white`}>Work With Us</h2>
                    <p className='text-center text-md leading-6 font-normal text-white'>We are committed to building lasting trust by delivering transparent, tech-enabled, and customer-first real estate experiences across India.</p>
                    <Link href="/contact-us" className="w-auto text-sm 1xl:text-base text-white! hover:text-text-black! animated-button-white px-8 py-2 border border-white bg-transparent! text-center cursor-pointer">
                        <span className="gap-3 relative flex justify-center">
                            <p className={`text-nowrap`}>Contact Us</p>
                        </span>
                    </Link>
                </div>
            </div>
            <div className='w-full py-[100px] px-4 sm:px-6 md:px-[50px] bg-[#F5F5F5]'>
                <div className='max-w-[800px] mx-auto space-y-6 flex flex-col items-center'>
                    <h2 className={`text-[40px] leading-9 text-center font-semibold text-text-black`}>Our Founders</h2>
                    <span
                        className="w-10 h-[4px] flex items-center justify-end"
                        style={{ backgroundColor: "#0D1520" }}
                    >
                        <span
                            className="w-5 h-[4px]"
                            style={{ backgroundColor: "#778f9c" }}
                        />
                    </span>
                </div>
                <div className='flex flex-col md:flex-row max-w-[1444px] mx-auto items-center justify-center gap-5 mt-12'>
                    {
                        foundersDetails.map((founder, index) => (
                            <div key={index} className='w-full md:w-[50%] max-w-[468px] rounded-lg overflow-hidden'>
                                <Image src={founder.image} width={500} height={500} className='w-full aspect-square' />
                                <div className='bg-white px-5 py-4 flex items-center justify-center flex-col'>
                                    <h3 className='text-[28px] font-semibold text-text-black mb-1'>{founder.name}</h3>
                                    <i className='text-md font-regular text-[#888]'>{founder.position}</i>
                                    {/* <div className='flex flex-col my-1'>
                                        <a href={`tel:${founder.number}`} className='text-md font-normal text-[#7575BC] no-underline'>{founder.number}</a>
                                        <a href={`mailto:${founder.mail}`} className='text-md font-normal text-[#7575BC] no-underline'>{founder.mail}</a>
                                    </div> */}
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
            <div className='w-full pb-[100px] px-4 sm:px-6 md:px-[50px] bg-[#F5F5F5]'>
                <div className='max-w-[800px] mx-auto space-y-6 flex flex-col items-center'>
                    <h2 className={`text-[40px] leading-9 text-center font-semibold text-text-black`}>Our Team</h2>
                    <span
                        className="w-10 h-[4px] flex items-center justify-end"
                        style={{ backgroundColor: "#0D1520" }}
                    >
                        <span
                            className="w-5 h-[4px]"
                            style={{ backgroundColor: "#778f9c" }}
                        />
                    </span>
                </div>
                <div className='flex flex-col md:flex-row max-w-[1444px] mx-auto items-center justify-center gap-5 mt-12'>
                    {
                        teamDetails.map((founder, index) => (
                            <div key={index} className='w-full md:w-[33.33%] max-w-[468px] rounded-lg overflow-hidden'>
                                <Image src={founder.image} width={500} height={500} className='w-full aspect-square' />
                                <div className='bg-white px-5 py-4 flex items-center justify-center flex-col'>
                                    <h3 className='text-[28px] font-semibold text-text-black mb-1'>{founder.name}</h3>
                                    <i className='text-md font-regular text-[#888]'>{founder.position}</i>
                                    {/* <div className='flex flex-col my-1'>
                                        <a href={`tel:${founder.number}`} className='text-md font-normal text-[#7575BC] no-underline'>{founder.number}</a>
                                        <a href={`mailto:${founder.mail}`} className='text-md font-normal text-[#7575BC] no-underline'>{founder.mail}</a>
                                    </div> */}
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
            <div className='py-[100px] px-4 sm:px-6 md:px-[50px] bg-[#EFEFEF]'>
                <div className='max-w-[850px] mx-auto'>
                    <i className='text-[40px] text-black font-light'><p className='text-center'>“At KMA, we don’t just list properties, we help people find their perfect place.”</p></i>
                </div>
            </div>
            <div className="bg-text-black flex justify-center">
                    <AboutusDataSync />
                    <HomeFooter tab={1} />
            </div>
        </div>
    )
};

export default MeetTheTeam;