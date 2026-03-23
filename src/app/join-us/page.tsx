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
import JoinUsForm from '@/components/joinUs/JoinUsForm';

const JoinUs = () => {

    const breadcrumps = [
        {
            name: 'Home',
            link: '/',
            icon: <House className='w-5' />
        },
        {
            name: 'Join Us',
        }
    ]

    const actionButtons = [
        {
            name: 'Join Us',
            link: '#joinus-form',
        }
    ]

    return (
        <div>
            <div className="relative rounded-bl-[100px] rounded-br-[100px] pt-[25px] h-[100vh] max-h-[600px]" style={{ backgroundImage: 'url(assets/join-us-hero.png)', backgroundSize: 'cover', backgroundPosition: 'bottom' }}>
                <div className="w-[75%] mx-auto">
                    <HomdeHeader />
                </div>
                <div className="w-[75%] max-w-[600px] mx-auto mt-[150px]">
                    <PageTitle
                        title="Join As a Chanel Partner"
                        description=""
                        actions={actionButtons}
                        breadcrumps={breadcrumps}
                    />

                </div>
            </div>
            <div className='relative flex items-center justify-between w-[90%] mx-auto max-w-[1440px] bg-white rounded-2xl shadow-lg px-16 py-15 gap-8' style={{ transform: 'translateY(-25%)' }}>
                <div className='flex items-center justify-between gap-8'>
                    <h3 className='text-[28px] font-bold text-black mb-0 w-[36%]'>A KMA partner unlocks growth with unlimited listings and exclusive access.</h3>
                    <div className='w-[48%]'>
                        <p className='text-[18px] font-normal text-[#888888] mb-0'>Join KMA as a Channel Partner and post your projects and properties without any limits. Whether you're an agent, broker, or builder, KMA offers a powerful platform to showcase your brand, gain real-time exposure, attract genuine buyers, and grow your business effortlessly with advanced tools designed to help you close more deals.</p>
                    </div>
                </div>
            </div>
            <div className='w-full pb-[150px] pt-16 px-[50px]'>
                <div className='max-w-[1444px] mx-auto'>
                    <div className='flex gap-10 justify-between items-center'>
                        <div className='space-y-6 w-[55%]'>
                            <SectionHeading title="" subtitle="Join Now" type={'left'} color='' lineTop={true}
                                description=""
                            />
                            <JoinUsForm />
                        </div>
                        <Image
                            src={'/assets/app/real-estate-agent.png'}
                            width={500}
                            height={700}
                            className='w-40% max-w-[500px] h-full rounded-[20px]'
                            alt='channel partner'
                        />
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

export default JoinUs;