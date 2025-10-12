'use client';

import MobileInput from '../common/mobileInput';
import RadioSwitch from '../common/radioSwitch';

import { useState } from 'react';

interface OptionType {
  value: string;
  label: string;
}

const partnerType: OptionType[] = [
  {
    value: 'owner',
    label: "I'm an Owner",
  },
  {
    value: 'channel_partner',
    label: "I'm a Channel Partner",
  },
];

const propertyType: OptionType[] = [
  {
    value: 'sell',
    label: 'I want to Sell',
  },
  {
    value: 'rent',
    label: 'I want to Rent',
  },
];

export default function SignIn() {
  
  
  const [selectedPartnerType, setSelectedPartnerType] = useState<string>('owner');
  const [selectedPropertyType, setSelectedPropertyType] = useState<string>('sell');

  const handlePartnerChange = (value: string) => {
    setSelectedPartnerType(value);
  };

  const handlePropertyChange = (value: string) => {
    setSelectedPropertyType(value);
  };

  return (
    <div
      className="bg-white relative w-full md:min-w-96 h-auto rounded-b-xl rounded-tr-xl"
      style={{ boxShadow: '0px 4px 20px 0px #0000000D', flexGrow: 11 }}
    >
      <div className="absolute rounded-full w-[90%] -top-[32px] rounded-[100px] bg-white h-[60px]" />
      <div>
        <div className="relative flex flex-wrap w-[90%] -top-[32px] text-sm gap-4 bg-white p-2 rounded-full">
          {partnerType.map((item) => (
            <RadioSwitch
              key={item.value}
              label={item.label}
              value={item.value}
              checked={selectedPartnerType === item.value}
              labelStyle="text-black text-xs md:text-sm font-medium font-ibm-plex-sans"
              onChagne={() => handlePartnerChange(item.value)}
            />
          ))}
        </div>

        <div className="relative -top-[32px] p-4 sm:px-8 flex flex-col w-full">
          <p className="text-base lg:text-lg 2xl:text-2xl font-semibold text-text-black mb-1">
            Sell or Rent Your Property – <span className="text-accent">Absolutely FREE!</span>
          </p>
          <p className="text-sm lg:text-sm 2xl:text-lg text-text-gray">
            No Agent Needed. List your home directly and connect with genuine buyers or tenants in
            minutes.
          </p>

          <p className="text-sm lg:text-sm 2xl:text-lg font-semibold text-text-black mt-8">
            What do you want to do?
          </p>
          <div className="flex flex-wrap w-full text-sm gap-4 bg-white pt-2 rounded-full">
            {propertyType.map((item) => (
              <div className="box-border flex-1" key={item.value}>
                <RadioSwitch
                  label={item.label}
                  value={item.value}
                  checked={selectedPropertyType === item.value}
                  labelStyle="text-black text-xs md:text-sm font-medium font-ibm-plex-sans"
                  onChagne={() => handlePropertyChange(item.value)}
                />
              </div>
            ))}
          </div>

          <p className="text-sm lg:text-sm 2xl:text-lg font-semibold text-text-black mt-8">
            Mobile Number
          </p>
          <p className="text-sm lg:text-sm 2xl:text-lg text-text-gray mb-4">
            We'll send you a verification code to get started.
          </p>

          <MobileInput/>

          <div className="flex justify-start flex-col md:flex-row gap-4 items-center mt-8">
            <button className="w-full md:w-auto animated-button px-12 py-3 border border-blue text-center cursor-pointer">
              <span className="gap-3 relative">
                <p className="text-nowrap">Continue</p>
              </span>
            </button>
            <p className="text-sm lg:text-sm 2xl:text-lg text-text-gray">
              Already have an account?{' '}
              <span className="text-sm lg:text-sm 2xl:text-lg font-semibold underline text-text-black cursor-pointer">
                Login Here
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
