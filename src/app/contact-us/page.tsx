'use client'
// import HomdeHeader from '@/components/header/homeHeader'
import { BadgePercent, CircleCheckBig, House, Lightbulb, ListCheck, ListChecks, PhoneCall, Section } from 'lucide-react';
import PageTitle from '@/components/common/PageTitle';
import { TbBulb } from "react-icons/tb";
import SectionHeading from '@/components/common/SectionHeading';
import Image from 'next/image';
import BlogSection from '@/components/home/blogSection';
import HomeFooter from '@/components/footer/homeFooter';
import { FaFacebook, FaLinkedin, FaTwitter, FaYoutube } from 'react-icons/fa';
import ContactFormComponent from '@/components/contactUs/contactForm';
import Link from 'next/link';

const ContactUs = () => {

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
    return (
        <div>
            <div className="relative pt-[25px] h-[100vh] max-h-[600px]" style={{ backgroundImage: 'url(assets/About-bg.jpg)', backgroundSize: 'cover' }}>
                <div className="w-[75%] mx-auto">
                    {/* <HomdeHeader /> */}
                </div>
                <div className="w-[75%] max-w-[600px] mx-auto mt-[100px]">
                    <PageTitle
                        title="Let’s Connect"
                        description="Let our team of real estate specialists assist you with bespoke solutions for buying, selling, or renting luxury properties in Gurugram."
                        breadcrumps={breadcrumps}
                    />

                </div>
            </div>
            <div className='w-full py-[100px] px-[50px]'>
                <div className='max-w-[1444px] mx-auto'>
                    <SectionHeading title="Get in Touch" subtitle="Do you have some questions for us?" type={'center'} color='' lineTop={false}
                        description="Whether you're buying, selling, or just exploring—we’ve got answers."
                    />
                    <div className='grid grid-cols-3 gap-x-8 mt-12 items-center'>
                        <div className='bg-[#F2F2F2] px-10 py-6 rounded-lg flex flex-col gap-2 h-full justify-center'>
                            <div className='flex gap-4'>
                                <div className='bg-white min-w-[60px] w-[60px] h-[60px] flex items-center justify-center rounded-lg mb-2'><PhoneCall className='w-8 h-8 text-[#010048]' /></div>
                                <div>
                                    <h3 className='text-[#010048] text-[20px] leading-6 font-medium mb-0'>Give us a call</h3>
                                    <p className='text-[#5C727D] text-md leading-7'>Need help or have questions? Call us.</p>
                                </div>
                            </div>
                            <a href='tel:+919056580022' className='text-[#010048] text-[18px] leading-6 font-medium'>+91- 9056580022</a>
                        </div>
                        <div className='bg-[#F2F2F2] px-10 py-6 rounded-lg flex flex-col gap-2 h-full justify-center'>
                            <div className='flex gap-4'>
                                <div className='bg-white min-w-[60px] w-[60px] h-[60px] flex items-center justify-center rounded-lg mb-2'><PhoneCall className='w-8 h-8 text-[#010048]' /></div>
                                <div>
                                    <h3 className='text-[#010048] text-[20px] leading-6 font-medium mb-0'>Send us an email</h3>
                                    <p className='text-[#5C727D] text-md leading-7'>Got questions? Drop us a message.</p>
                                </div>
                            </div>
                            <a href='mailto:kmaproperty22@gmail.com' className='text-[#010048] text-[18px] leading-6 font-medium'>kmaproperty22@gmail.com</a>
                        </div>
                        <div className='bg-[#F2F2F2] px-10 py-6 rounded-lg flex flex-col gap-2 h-full justify-center'>
                            <div className='flex gap-4'>
                                <div className='bg-white min-w-[60px] w-[60px] h-[60px] flex items-center justify-center rounded-lg mb-2'><PhoneCall className='w-8 h-8 text-[#010048]' /></div>
                                <div>
                                    <h3 className='text-[#010048] text-[20px] leading-6 font-medium mb-0'>Visit our office</h3>
                                    <p className='text-[#5C727D] text-md leading-7'>PLOT NO. 3A, Northern Peripheral Rd, Shastri Nagar Industrial Area, Sector 106, Gurugram, Haryana 122006, India.</p>
                                </div>
                            </div>
                            <a href='https://maps.app.goo.gl/RfEn4XmFPCPAfNrT7' target='_blank' className='text-[#010048] text-[18px] leading-6 font-medium'>GG, Gurugram, Haryana 122016</a>
                        </div>
                    </div>
                    <div className='mt-12 flex items-center border border-[#D9D9D9] rounded-lg'>
                        <div className='w-[50%] h-[568px]'>
                            <iframe className='w-full h-full' src="https://www.google.com/maps/embed?pb=!1m13!1m8!1m3!1d448830.65552007704!2d77.000389!3d28.494917!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMjjCsDI5JzQxLjciTiA3N8KwMDAnMDEuNCJF!5e0!3m2!1sen!2sus!4v1767879656314!5m2!1sen!2sus" width="400" height="300" style={{ border: 0 }} loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                        </div>
                        <div className='px-16 w-[50%]'>
                            <SectionHeading title="" subtitle="Contact us" type={'left'} color='' lineTop={false}
                                description="send us a message and we will get back to you soon."
                            />
                            <ContactFormComponent />
                        </div>
                    </div>
                </div>
            </div>
            <div className='w-full py-[100px] pr-[50px] bg-[#F2F2F2]'>
                <div className='flex items-center justify-between gap-6 max-w-[1440] mx-auto'>
                    <div className='w-[30%] max-w-[350px]  space-y-3'>
                        <h2 className={`text-[38px] leading-11 font-semibold text-[#010048]`}>What People Are Saying</h2>
                        <p className={`text-[#5C727D] text-md leading-7`}>Real stories from real people who've found their dream properties with us.</p>
                        <Link href={'/blogs'}>
                            <button
                                className="w-fit text-sm 1xl:text-base animated-button px-10 py-3 border border-blue text-center cursor-pointer"
                            >
                                <span className="gap-3 relative flex justify-center">
                                    <p className={`text-nowrap`}>View More</p>
                                </span>
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
            <div className="bg-text-black flex justify-center">
                <div className="my-13 w-[75%]">
                    <HomeFooter tab={1} />
                </div>
            </div>
        </div>
    )
};

export default ContactUs;