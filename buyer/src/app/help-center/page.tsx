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

const HelpCenter = () => {

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
            <div className="relative pt-[25px] h-[100vh] rounded-br-[100px] rounded-bl-[100px] max-h-[600px]" style={{ backgroundImage: 'url(assets/app/help-center-herobg.jpg)', backgroundSize: 'cover', backgroundPosition: 'bottom' }}>
                <HomdeHeader />
                <div className="w-[75%] max-w-[600px] mx-auto mt-[150px]">
                    <PageTitle
                        title="Help Center"
                        description="Have Questions? We've All the Answers"
                        breadcrumps={breadcrumps}
                    />
                </div>
            </div>
            <div className='w-full pt-[100px] pb-[70px] px-[50px]'>
                <div className='max-w-[1444px] flex gap-10 mx-auto'>
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
            <div className='w-full pb-[70px] px-[50px]'>
                <div className='max-w-[1444px] flex gap-10 mx-auto'>
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
            <div className='py-[100px] px-[50px] bg-[#fff]'>
                <div className='w-[50%] max-w-[720px] mx-auto'>
                    <h2 className={`text-[28px] text-center leading-9 font-semibold text-text-black mb-4`}>Need More Help?</h2>
                    <p className='text-md leading-7 text-center font-normal text-[#0D1520] mb-0'>If your question isn’t listed above, feel free to reach out: <br/> <b>Mon–Sat, 10am–6pm</b></p>
                </div>
                <div className='flex gap-3 justify-center mt-8'>
                    <div className='flex items-center gap-1 text-gray-600 text-[15px]'>
                        <Image 
                            src={'/assets/telephone.png'}
                            width={24}
                            height={24}
                            alt='phone'
                        />
                        +91 2589645266
                    </div>
                    <div className='flex items-center gap-1 text-gray-600 text-[15px]'>
                        <Image 
                            src={'/assets/mail.png'}
                            width={24}
                            height={24}
                            alt='mail'
                        />
                        info@kmaproperty.com
                    </div>
                    <div className='flex items-center gap-1 text-gray-600 text-[15px]'>
                        <Image 
                            src={'/assets/whatsapp.png'}
                            width={24}
                            height={24}
                            alt='whatsapp'
                        />
                        +91 2589645266
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