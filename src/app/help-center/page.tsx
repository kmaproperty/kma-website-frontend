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
            answer: "Property Owners and verified Channel Partners (builders, brokers, agents) can list properties and projects."
        },
        {
            question: "How do I join as a Channel Partner?",
            answer: "Apply through our partner portal. Our team will verify your credentials within 2–3 business days."
        },
    ];
    const postPropertiesAccordionData = [
        {
            question: "Is it free to post a project/property?",
            answer: "Yes. Owners can post up to 3 properties for free. To post unlimited, switch to a Channel Partner account."
        },
        {
            question: "What documents are required to list a project?",
            answer: "Apply through our partner portal. Our team will verify your credentials within 2–3 business days."
        },
        {
            question: "Can I edit my listing after posting?",
            answer: "Apply through our partner portal. Our team will verify your credentials within 2–3 business days."
        },
    ];
    const propertySearchAccordionData = [
        {
            question: "How can I search for a property on KMA?",
            answer: "Use the home page search bar to find by location, project name, or property type. Apply filters to refine results."
        },
        {
            question: "Do I need to log in to search?",
            answer: "Apply through our partner portal. Our team will verify your credentials within 2–3 business days."
        },
        {
            question: "Are the properties verified?",
            answer: "Apply through our partner portal. Our team will verify your credentials within 2–3 business days."
        },
    ];
    const generalQuestionsAccordionData = [
        {
            question: "What types of properties can be posted?",
            answer: "KMA supports both residential (flats, villas, floors, plots) and commercial (offices, shops, commercial plots) listings."
        },
        {
            question: "How long does it take for my project to go live?",
            answer: "Apply through our partner portal. Our team will verify your credentials within 2–3 business days."
        },
        {
            question: "Can I share property listings?",
            answer: "Apply through our partner portal. Our team will verify your credentials within 2–3 business days."
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
                        +91 7709904943
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
                        +91 7709904943
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