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
            <div className="relative min-h-[385px] max-h-[385px] pt-[25px] rounded-br-[40px] rounded-bl-[40px] sm:min-h-[min(100dvh,600px)] sm:max-h-[600px] sm:rounded-br-[72px] sm:rounded-bl-[72px] lg:rounded-br-[100px] lg:rounded-bl-[100px]" style={{ backgroundImage: 'url(assets/app/help-center-herobg.jpg)', backgroundSize: 'cover', backgroundPosition: 'bottom' }}>
                <HomdeHeader />
        <div className="mx-auto mt-[70px] w-full max-w-[600px] px-4 sm:mt-28 sm:w-[85%] sm:px-0 md:mt-32 md:w-[75%] xl:mt-[150px] ">
                    <PageTitle
                        title="Help Center"
                        description="Have Questions? We've All the Answers"
                        breadcrumps={breadcrumps}
                    />
                </div>
            </div>
            <div className='w-full min-w-0 px-4 py-10 md:py-12 lg:py-16 xl:py-20 2xl:py-[100px]'>
                <div className='mx-auto max-w-[1444px]'>
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

                <div className='mx-auto mt-10 max-w-[1444px] min-w-0 sm:mt-12 2md:mt-16'>
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