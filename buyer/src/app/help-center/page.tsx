 'use client'

import HomdeHeader from '@/components/header/homeHeader'
import { BadgePercent, CircleCheckBig, House, Lightbulb, ListCheck, ListChecks, Mail, MapPin, Phone, PhoneCall, PhoneIncoming, Section } from 'lucide-react';
import PageTitle from '@/components/common/PageTitle';
import { TbBulb } from "react-icons/tb";
import SectionHeading from '@/components/common/SectionHeading';
import Image from 'next/image';
import BlogSection from '@/components/home/blogSection';
import HomeFooter from '@/components/footer/homeFooter';
import { FaFacebook, FaLinkedin, FaTwitter, FaYoutube } from 'react-icons/fa';
import ContactFormComponent from '@/components/contactUs/contactForm';
import Link from 'next/link';
import ContactTable from '../../components/contactUs/ContactTable';
import AccordionComponent from '@/components/common/accordion';
import AboutusDataSync from '@/components/footer/AboutusDataSync';
import { useSelector } from 'react-redux';
import { getAboutusData } from '@/store/homeHeaderSlice';

const HelpCenter = () => {
    const aboutusData: any = useSelector(getAboutusData);
    const contactPhoneNumber = aboutusData?.phoneNumber
        ? (aboutusData.phoneNumber.startsWith('+') ? aboutusData.phoneNumber : `+91 ${aboutusData.phoneNumber}`)
        : '+91 2589645266';
    const contactEmail = aboutusData?.email || 'info@kmaproperty.com';

    const breadcrumps = [
        {
            name: 'Home',
            link: '/',
            icon: <House className='w-5' />
        },
        {
            name: 'Help Center',
        }
    ]

    const gettingStartedAccordionData = [
        {
            question: "Who can post a property on KMA?",
            answer: "Property Owners, Individual Brokers, and Builders can list. We welcome anyone who wants a transparent, spam-free way to close deals in Gurgaon."
        },
        {
            question: "How do I join as a Channel Partner?",
            answer: "Simply sign up and complete your profile. Once you want to scale beyond 3 properties, you can upgrade to a Channel Partner for unlimited access."
        },
    ];
    const postPropertiesAccordionData = [
        {
            question: "Is it free to post a project/property?",
            answer: "Yes, 100% Free. Owners can post up to 3 listings after a digital MOU. For unlimited listings and advanced CRM access, you can join as a Channel Partner."
        },
        {
            question: "What documents are required to list a project?",
            answer: "We keep it simple. Just basic property details and a digitally signed MOU to ensure all listings on our platform are genuine and verified."
        },
        {
            question: "Can I edit my listing after posting?",
            answer: "Yes, you can manage and update your listings 24/7 through your personalized dashboard or KMA partner panel."
        },
    ];
    const propertySearchAccordionData = [
        {
            question: "How can I search for a property on KMA?",
            answer: "Use our smart filters on the home page. You can search by location, budget, or property type. No fake ads—only verified luxury options."
        },
        {
            question: "Do I need to log in to search?",
            answer: "You can browse freely, but logging in allows you to save favorites and get direct WhatsApp updates for new properties matching your profile."
        },
    ];
    const generalQuestionsAccordionData = [
        {
            question: "What makes KMA different from other portals?",
            answer: "We don't sell your leads to 50 people. We provide 80% operational support, including pre-sales, WhatsApp filtering, and field support for site visits."
        },
        {
            question: "How long does it take for my project to go live?",
            answer: "Once submitted, our team verifies the details within 24 hours. After verification, your property goes live and matching leads are synced to your CRM"
        },
    ];

    return (
        <div className='bg-[#f5f5f5]'>
            <div className='fixed left-0 right-0 z-[60] flex justify-center pointer-events-none'>
                <div className='pointer-events-auto w-full flex justify-center'>
                    <HomdeHeader />
                </div>
            </div>
            <div className="relative min-h-[385px] max-h-[385px] pt-[25px] rounded-br-[40px] rounded-bl-[40px] sm:min-h-[min(100dvh,600px)] sm:max-h-[600px] sm:rounded-br-[72px] sm:rounded-bl-[72px] lg:rounded-br-[100px] lg:rounded-bl-[100px]" style={{ backgroundImage: 'url(assets/app/help-center-herobg.jpg)', backgroundSize: 'cover', backgroundPosition: 'bottom' }}>
        <div className="mx-auto mt-[120px] w-full max-w-[600px] px-4 sm:mt-28 sm:w-[85%] sm:px-0 md:mt-32 md:w-[75%] xl:mt-[150px] ">
                    <PageTitle
                        title="Help Center"
                        description="Have Questions? We've All the Answers"
                        breadcrumps={breadcrumps}
                        actions={null}
                    />
                </div>
            </div>
            <div className='w-full min-w-0 px-4 py-10 md:py-12 lg:py-16 xl:py-20 2xl:py-[100px]'>
                <div className='mx-auto max-w-[1440px]'>
                    <div className='flex flex-col gap-8 2md:flex-row 2md:gap-10'>
                        <div className='col-auto space-y-8'>
                            <SectionHeading title="" subtitle="Getting Started" type={'left'} color='' lineTop={true}
                                description=""
                            />
                            <AccordionComponent
                                data={gettingStartedAccordionData}
                            />
                        </div>
                        <div className='col-auto space-y-8'>
                            <SectionHeading title="" subtitle="Posting Projects & Properties" type={'left'} color='' lineTop={true}
                                description=""
                            />
                            <AccordionComponent
                                data={postPropertiesAccordionData}
                            />
                        </div>
                    </div>
                </div>

                <div className='mx-auto mt-10 max-w-[1440px] min-w-0 sm:mt-12 2md:mt-16'>
                    <div className='flex flex-col gap-8 2md:flex-row 2md:gap-10'>
                        <div className='col-auto space-y-8'>
                            <SectionHeading title="" subtitle="Property Search & User Assistance" type={'left'} color='' lineTop={true}
                                description=""
                            />
                            <AccordionComponent
                                data={propertySearchAccordionData}
                            />
                        </div>
                        <div className='col-auto space-y-8'>
                            <SectionHeading title="" subtitle="General Questions" type={'left'} color='' lineTop={true}
                                description=""
                            />
                            <AccordionComponent
                                data={generalQuestionsAccordionData}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className='w-full min-w-0 bg-[#fff] px-4 py-10 md:py-12 lg:py-16 xl:py-20 2xl:py-[100px]'>
                <div className='mx-auto w-full max-w-[720px] 2md:w-[50%]'>
                    <h2 className="mb-4 text-center text-xl font-semibold leading-snug text-text-black sm:text-2xl md:text-[28px] md:leading-9">
                      Need More Help?
                    </h2>
                    <p className='text-md leading-7 text-center font-normal text-[#0D1520] mb-0'>If your question isn’t listed above, feel free to reach out: <br /> <b>Mon–Sat, 10am–6pm</b></p>
                </div>
                <div className='flex flex-wrap 2md:gap-3 gap-2 justify-center 2md:mt-8 mt-5'>
                    <div className='flex items-center gap-1 text-gray-600 text-[15px]'>
                        <Image
                            src={'/assets/telephone.png'}
                            width={24}
                            height={24}
                            alt='phone'
                        />
                        {contactPhoneNumber}
                    </div>
                    <div className='flex items-center gap-1 text-gray-600 text-[15px]'>
                        <Image
                            src={'/assets/mail.png'}
                            width={24}
                            height={24}
                            alt='mail'
                        />
                        {contactEmail}
                    </div>
                    <div className='flex items-center gap-1 text-gray-600 text-[15px]'>
                        <Image
                            src={'/assets/whatsapp.png'}
                            width={24}
                            height={24}
                            alt='whatsapp'
                        />
                        {contactPhoneNumber}
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

export default HelpCenter;