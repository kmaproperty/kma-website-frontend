'use client';

import { House } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import PageTitle from '@/components/common/PageTitle';
import SectionHeading from '@/components/common/SectionHeading';
import AboutusDataSync from '@/components/footer/AboutusDataSync';
import HomeFooter from '@/components/footer/homeFooter';
import HeaderDataSync from '@/components/header/HeaderDataSync';
import HomeHeader from '@/components/header/homeHeader';
import { getAboutusData } from '@/store/homeHeaderSlice';

const breadcrumps = [
  {
    name: 'Home',
    link: '/',
    icon: <House className='w-5' />,
  },
  {
    name: 'Meet The Team',
  },
];

const foundersDetails = [
  {
    name: 'Karmjeet Dahiya',
    image: '/assets/team/karmjeet Sir .png',
    position: 'Founder',
  },
  {
    name: `Anipal Singh, Parmjeet Dahiya`,
    image: "/assets/team/Co founder's.jpg",
    position: 'Co-Founders',
    members: [
      {
        name: 'Anipal Singh',
        designation: 'Indian Navy (Retd.)'
      },
      {
        name: 'Parmjeet Dahiya',
        designation: 'Indian Army (Retd.)'
      }
    ],
  },
];

const teamDetails = [
  {
    name: 'Abhishek Nandal',
    image: '/assets/team/Abhishek j.png',
    position: 'Field Team Leader',
  },
  {
    name: 'Surender Sharma',
    image: '/assets/team/Surender ji.jpeg',
    position: 'Pre Sales Team Leader',
  },
  {
    name: 'Ananjay Gupta',
    image: '/assets/team/Ananjay j.png',
    position: 'Digital Team Leader',
  },
];

const MeetTheTeamPage = ({ propertyMasterData, propertyCitiesData }) => {
  const aboutusData = useSelector(getAboutusData);
  const { instagramLink, fbLink } = aboutusData || {};

  return (
    <div className='overflow-x-hidden'>
      <HeaderDataSync propertyMasterData={propertyMasterData} propertyCitiesData={propertyCitiesData} />
      <div className='fixed left-0 right-0 z-[60] flex justify-center pointer-events-none'>
        <div className='pointer-events-auto w-full flex justify-center'>
          <HomeHeader />
        </div>
      </div>
      <div
        className='relative pt-[25px] h-[100vh] max-h-[600px]'
        style={{
          backgroundImage: 'url(assets/team/meet-the-team-herobg.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'bottom',
        }}
      >
        <div className='w-[90%] md:w-[75%] max-w-[600px] mx-auto mt-[140px]'>
          <PageTitle
            title='Meet the People Behind KMA'
            description='A team built on trust, driven by transparency, and committed to you.'
            breadcrumps={breadcrumps}
          />
          <div className='flex gap-3 justify-center mt-5'>
            <a
              className='flex w-10 h-10 items-center justify-center rounded-full bg-white'
              href={instagramLink || '#'}
              target={instagramLink ? '_blank' : undefined}
              rel={instagramLink ? 'noopener noreferrer' : undefined}
            >
              <Image height={46} width={46} src='assets/app/instagram.svg' className='w-6 h-6' />
            </a>
            <a
              className='flex w-10 h-10 items-center justify-center rounded-full bg-white'
              href='https://www.linkedin.com/company/kma-global-properties-pvt-ltd/?viewAsMember=true'
              target='_blank'
              rel='noopener noreferrer'
            >
              <Image height={46} width={46} src='assets/app/linkedin.svg' className='w-6 h-6' />
            </a>
            <a
              className='flex w-10 h-10 items-center justify-center rounded-full bg-white'
              href={fbLink || '#'}
              target={fbLink ? '_blank' : undefined}
              rel={fbLink ? 'noopener noreferrer' : undefined}
            >
              <Image height={46} width={46} src='assets/app/facebook.svg' className='w-6 h-6' />
            </a>
          </div>
        </div>
      </div>
      <div className='w-full py-[100px] px-4 sm:px-6 md:px-[50px]'>
        <div className='max-w-[1444px] mx-auto'>
          <div className='flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-0'>
            <div className='w-full lg:w-[44%] max-w-[580px]'>
              <SectionHeading
                title=''
                subtitle='Who We Are'
                type='left'
                color=''
                lineTop={false}
                description='KMA Global Properties is a Gurgaon-based real estate platform built on one simple belief — every broker, owner, and buyer deserves a fair and transparent experience. With a network of 2500+ brokers and 200+ societies, we are redefining how real estate works in India.'
              />
            </div>
            <div className='w-full lg:w-[50%]'>
              <Image src='/assets/team/who-we-are.png' width={720} height={360} className='w-full' />
            </div>
          </div>
          <div className='flex flex-col-reverse lg:flex-row items-center justify-between gap-8 lg:gap-0'>
            <div className='w-full lg:w-[50%]'>
              <Image src='/assets/team/why-choose-us.png' width={720} height={360} className='w-full' />
            </div>
            <div className='w-full lg:w-[44%] max-w-[580px]'>
              <SectionHeading
                title=''
                subtitle='What We Do'
                type='left'
                color=''
                lineTop={false}
                description='We handle everything — from free property listings and lead generation to Pre-Sales follow-ups, Field Support, and deal closure. Our Live CRM, VC System, and dedicated support team ensure that 80% of the heavy lifting is done by us, so you don’t have to do it alone.'
              />
            </div>
          </div>
          <div className='flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-0'>
            <div className='w-full lg:w-[44%] max-w-[580px]'>
              <SectionHeading
                title=''
                subtitle='Why Choose Us'
                type='left'
                color=''
                lineTop={false}
                description='Because we dont just list properties — we work on them. No paid packages. No shared leads. No hidden charges. Just a system built around your success. Whether you&apos;re a buyer, owner, or broker — KMA Global Properties is the partner that actually shows up.'
              />
            </div>
            <div className='w-full lg:w-[50%]'>
              <Image src='/assets/team/what-we-do.png' width={720} height={360} className='w-full' />
            </div>
          </div>
        </div>
      </div>
      <div className='w-full py-[120px] px-4 sm:px-6 md:px-[50px]' style={{ backgroundImage: 'url(assets/team/work-with-us-bg.jpg)' }}>
        <div className='max-w-[800px] mx-auto space-y-6 flex flex-col items-center'>
          <h2 className='text-[28px] leading-9 text-center font-semibold text-white'>Work With Us</h2>
          <p className='text-center text-md leading-6 font-normal text-white'>
          We build lasting trust through transparent, tech-driven, and customer-first real estate solutions across Gurgaon.
          </p>
          <Link
            href='/contact-us'
            className='w-auto text-sm 1xl:text-base text-white! hover:text-text-black! animated-button-white px-8 py-2 border border-white bg-transparent! text-center cursor-pointer'
          >
            <span className='gap-3 relative flex justify-center'>
              <p className='text-nowrap'>Contact Us</p>
            </span>
          </Link>
        </div>
      </div>
      <div className='w-full py-[100px] px-4 sm:px-6 md:px-[50px] bg-[#F5F5F5]'>
        <div className='max-w-[800px] mx-auto space-y-6 flex flex-col items-center'>
          <h2 className='text-[40px] leading-9 text-center font-semibold text-text-black'>Our Founders</h2>
          <span className='w-10 h-[4px] flex items-center justify-end' style={{ backgroundColor: '#0D1520' }}>
            <span className='w-5 h-[4px]' style={{ backgroundColor: '#778f9c' }} />
          </span>
        </div>
        <div className='flex flex-col md:flex-row max-w-[1444px] mx-auto items-stretch justify-center gap-5 mt-12'>
          {foundersDetails.map((founder, index) => (
            <div key={index} className='w-full md:w-[50%] max-w-[468px] rounded-lg overflow-hidden flex flex-col'>
              <Image src={founder.image} width={500} height={500} className='w-full aspect-square' />
              <div className='bg-white px-5 py-4 flex items-center justify-center flex-col flex-1 min-h-[170px]'>
                {/* <h3 className='text-[28px] font-semibold text-text-black mb-1'>{founder.name}</h3> */}
                {founder.members && founder.members.length > 0 ? (
                  <div className="space-x-2 grid grid-cols-2 gap-5">
        {founder.members.map((member, idx) => (
          <div key={idx} className="">
            <p className="font-semibold text-[16px] md:text-[20px]">{member.name}</p>
            <p className="text-sm text-gray-500 font-medium">{member.designation}</p>
          </div>
        ))}
      </div>
    ) : (
      /* Normal Single Founder ke liye (Karmjeet Dahiya) */
      <p className="font-semibold text-[28px]">{founder.name}</p>
    )}
    <i className='text-md font-regular text-[#888] pt-3'>{founder.position}</i>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className='w-full pb-[100px] px-4 sm:px-6 md:px-[50px] bg-[#F5F5F5]'>
        <div className='max-w-[800px] mx-auto space-y-6 flex flex-col items-center'>
          <h2 className='text-[40px] leading-9 text-center font-semibold text-text-black'>Our Team</h2>
          <span className='w-10 h-[4px] flex items-center justify-end' style={{ backgroundColor: '#0D1520' }}>
            <span className='w-5 h-[4px]' style={{ backgroundColor: '#778f9c' }} />
          </span>
        </div>
        <div className='flex flex-col md:flex-row max-w-[1444px] mx-auto items-center justify-center gap-5 mt-12'>
          {teamDetails.map((founder, index) => (
            <div key={index} className='w-full md:w-[33.33%] max-w-[468px] rounded-lg overflow-hidden'>
              <Image src={founder.image} width={500} height={500} className='w-full aspect-square' />
              <div className='bg-white px-5 py-4 flex items-center justify-center flex-col'>
                <h3 className='text-[28px] font-semibold text-text-black mb-1'>{founder.name}</h3>
                <i className='text-md font-regular text-[#888]'>{founder.position}</i>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className='py-[100px] px-4 sm:px-6 md:px-[50px] bg-[#EFEFEF]'>
        <div className='max-w-[850px] mx-auto'>
          <i className='text-[40px] text-black font-light'>
            <p className='text-center'>“At KMA, we don’t just list properties, we help people find their perfect place.”</p>
          </i>
        </div>
      </div>
      <div className='bg-text-black flex justify-center'>
        <AboutusDataSync />
        <HomeFooter tab={1} />
      </div>
    </div>
  );
};

export default MeetTheTeamPage;
