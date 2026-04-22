import HomdeHeader from '@/components/header/homeHeader'
import { House } from 'lucide-react';
import PageTitle from '@/components/common/PageTitle';
import SectionHeading from '@/components/common/SectionHeading';
import Image from 'next/image';
import HomeFooter from '@/components/footer/homeFooter';
import AboutusDataSync from '@/components/footer/AboutusDataSync';
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
        <div className='overflow-x-hidden'>
            <div className="relative rounded-bl-[24px] rounded-br-[24px] md:rounded-bl-[60px] md:rounded-br-[60px] lg:rounded-bl-[100px] lg:rounded-br-[100px] pt-[18px] h-[clamp(280px,44dvh,340px)] md:h-[380px] lg:h-[100vh] max-h-[340px] md:max-h-[420px] lg:max-h-[600px] overflow-hidden flex flex-col" style={{ backgroundImage: 'url(assets/join-us-hero.png)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
                <HomdeHeader />
                <div className="w-[92%] md:w-[75%] max-w-[600px] mx-auto mt-auto pb-6 md:mt-[130px] md:pb-0 lg:mt-[150px]">
                    <div className='md:hidden flex flex-col items-center text-center'>
                        <h1 className='text-[clamp(32px,5.4vw,38px)] leading-[1.1] font-semibold text-white'>Join As A Chanel Partner</h1>
                        <a
                            href="#joinus-form"
                            className='mt-3 inline-flex items-center justify-center rounded-full bg-white px-8 py-2.5 text-[13px] font-medium text-[#0A0F3C]'
                        >
                            Join Us
                        </a>
                    </div>
                    <div className='hidden md:block'>
                        <PageTitle
                            title="Join Us as a Channel Partner"
                            description=""
                            actions={actionButtons}
                            breadcrumps={breadcrumps}
                        />
                    </div>
                </div>
            </div>
            <div className='relative w-[92%] md:w-[90%] mx-auto max-w-[1440px] bg-white rounded-2xl shadow-lg px-5 md:px-8 lg:px-16 py-6 md:py-8 lg:py-12 mt-2 md:-mt-[6%] mb-2 md:-mb-[2%]'>
                <div className='flex flex-col lg:flex-row lg:items-center justify-between gap-5 md:gap-8'>
                    <h3 className='text-[22px] sm:text-[24px] md:text-[26px] lg:text-[28px] leading-[1.2] font-bold text-black mb-0 w-full lg:w-[36%]'>Become a Channel Partner to post unlimited listings with 80% operational support.</h3>
                    <div className='w-full lg:w-[48%]'>
                        <p className='text-[14px] md:text-[15px] lg:text-[18px] leading-[1.6] font-normal text-[#888888] mb-0'>Join Gurgaon’s most transparent network for brokers and owners. Post unlimited luxury properties for free, track every lead through our real-time CRM, and get exclusive pre-sales & field support to close deals faster. We handle the follow-ups and filtering so you can focus only on the final meetings.</p>
                    </div>
                </div>
            </div>
            <div className='w-full pb-[70px] md:pb-[100px] lg:pb-[150px] pt-2 md:pt-8 lg:pt-16 px-4 md:px-8 lg:px-[50px]'>
                <div className='max-w-[1440px] mx-auto'>
                    <div id='joinus-form' className='flex flex-col xl:flex-row gap-6 md:gap-8 lg:gap-10 justify-between items-start xl:items-center'>
                        <Image
                            src={'/assets/app/real-estate-agent.png'}
                            width={500}
                            height={700}
                            className='w-full max-w-[340px] md:max-w-[620px] xl:w-[40%] xl:max-w-[500px] h-[420px] md:h-[500px] xl:h-auto object-cover rounded-[16px] md:rounded-[20px] order-1 xl:order-2 mx-auto xl:mx-0'
                            alt='channel partner'
                        />
                        <div className='space-y-4 md:space-y-6 w-full xl:w-[55%] order-2 xl:order-1 bg-[#F8F8F8] md:bg-transparent rounded-[16px] md:rounded-none p-4 md:p-0'>
                            <SectionHeading title="" subtitle="Join Now" type={'left'} color='' lineTop={true}
                                description=""
                            />
                            <JoinUsForm />
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

export default JoinUs;