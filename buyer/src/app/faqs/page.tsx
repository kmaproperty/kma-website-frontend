import React from 'react'
import FaqHeroSection from './FaqHeroSection'
import HomdeHeader from "@/components/header/homeHeader";
import FaqScroll from './FaqScroll';
import FaqStatsBar from './FaqStatsBar';
import AboutusDataSync from '@/components/footer/AboutusDataSync';
import HomeFooter from '@/components/footer/homeFooter';
import ContactExpertCta from './ContactExpertCta';

const FaqPage = () => {
  return (
    <>
    <div className="fixed left-0 right-0 z-[60] flex justify-center pointer-events-none">
            <div className="pointer-events-auto w-full flex justify-center">
              <HomdeHeader />
            </div>
          </div>
    <FaqHeroSection/>
    <FaqScroll/>
    <FaqStatsBar/>
    <ContactExpertCta/>
    <div className="bg-text-black flex justify-center">
                          <AboutusDataSync />
                          <HomeFooter tab={1} />
                      </div>
    </>
  )
}

export default FaqPage
