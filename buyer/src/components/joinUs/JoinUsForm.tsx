"use client"
import { submitContactForm } from '@/services/contactService';
import { getEndUserStates, getEndUserStateCities, type EndUserStateCityRow } from '@/services/homeService';
import { ChevronDown } from 'lucide-react';
import React from 'react'
import { toast } from 'react-toastify';

const toastApiError = (error: unknown, fallback: string) => {
  const err = error as { message?: string | string[] };
  if (Array.isArray(err?.message)) {
    err.message.forEach((item) => toast.error(item));
  } else if (typeof err?.message === 'string') {
    toast.error(err.message);
  } else {
    toast.error(fallback);
  }
};

const JoinUsForm = () => {
  const [formValue, setFormValue] = React.useState({
    firstName: '',
    lasstName: '',
    state: '',
    city: '',
    email: '',
    mobile: '',
    message: ''
  });

  const [states, setStates] = React.useState<string[]>([]);
  const [cities, setCities] = React.useState<EndUserStateCityRow[]>([]);
  const [statesLoading, setStatesLoading] = React.useState(true);
  const [citiesLoading, setCitiesLoading] = React.useState(false);

  React.useEffect(() => {
    let cancelled = false;
    (async () => {
      setStatesLoading(true);
      try {
        const list = await getEndUserStates();
        if (!cancelled) setStates(list);
      } catch (error) {
        if (!cancelled) toastApiError(error, 'Failed to load states');
      } finally {
        if (!cancelled) setStatesLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  React.useEffect(() => {
    if (!formValue.state) {
      setCities([]);
      return;
    }
    let cancelled = false;
    (async () => {
      setCitiesLoading(true);
      try {
        const list = await getEndUserStateCities(formValue.state);
        if (!cancelled) setCities(list);
      } catch (error) {
        if (!cancelled) {
          setCities([]);
          toastApiError(error, 'Failed to load cities');
        }
      } finally {
        if (!cancelled) setCitiesLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [formValue.state]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    if (e.target.name === 'state') {
      setFormValue({
        ...formValue,
        state: e.target.value,
        city: '',
      });
      return;
    }

    setFormValue({
      ...formValue,
      [e.target.name]: e.target.value
    })
  }
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fullName = [formValue.lasstName, formValue.firstName].filter(Boolean).join(' ').trim();
    const payload = {
      firstName: fullName,
      email: formValue.email,
      phoneNumber: formValue.mobile,
      message: formValue.message
    }
    try {
      const response = await submitContactForm(payload);
      if(response.success){
        toast.success(response.message);
        setFormValue({
          firstName: '',
          lasstName: '',
          state: '',
          city: '',
          email: '',
          mobile: '',
          message: ''
        })
      }
    } catch (error: any) {
      if (Array.isArray(error.message)) {
        error.message.map((item: string) => {
          toast.error(item)
        })
      } else {
        toast.error(error.message)
      }
    }
  }
  return (
    <div className='mt-6'>
      <form action="" className='flex flex-col gap-4.5' onSubmit={handleSubmit}>
        <div className='flex gap-4'>
          <input type="text" value={formValue.lasstName} onChange={handleChange} name="lasstName" placeholder='First Name' className='w-full border border-[#D9D9D9] rounded-full px-5 py-3' />
          <input type="text" value={formValue.firstName} onChange={handleChange} name="firstName" placeholder='Last Name' className='w-full border border-[#D9D9D9] rounded-full px-5 py-3' />
        </div>
        <div className='flex gap-4'>
          <div className='relative w-full'>
            <select
              name="state"
              value={formValue.state}
              onChange={handleChange}
              disabled={statesLoading}
              className='w-full appearance-none border border-[#D9D9D9] rounded-full pl-5 pr-12 py-3 bg-white text-[#0D1520] disabled:bg-[#F5F5F5] disabled:text-[#9AA0AE] disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-[#E6E8FF] focus:border-[#AEB4FF]'
            >
              <option value="">
                {statesLoading ? 'Loading states...' : 'Select State'}
              </option>
              {states.map((state) => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
            </select>
            <ChevronDown className='pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#6F7685]' />
          </div>
          <div className='relative w-full'>
            <select
              name="city"
              value={formValue.city}
              onChange={handleChange}
              disabled={!formValue.state || citiesLoading}
              className='w-full appearance-none border border-[#D9D9D9] rounded-full pl-5 pr-12 py-3 bg-white text-[#0D1520] disabled:bg-[#F5F5F5] disabled:text-[#9AA0AE] disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-[#E6E8FF] focus:border-[#AEB4FF]'
            >
              <option value="">
                {!formValue.state
                  ? 'Select state first'
                  : citiesLoading
                    ? 'Loading cities...'
                    : 'Select City'}
              </option>
              {cities.map((city) => (
                <option key={city.id} value={city.id}>
                  {city.name}
                </option>
              ))}
            </select>
            <ChevronDown className='pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#6F7685]' />
          </div>
        </div>
        <div className='flex gap-4'>
            <input type="email" name="email" value={formValue.email} onChange={handleChange} placeholder='Email address' className='w-full border border-[#D9D9D9] rounded-full px-5 py-3' />
            <input type="number" name="mobile" value={formValue.mobile} onChange={handleChange} placeholder='Phone number' className='w-full border border-[#D9D9D9] rounded-full px-5 py-3' />
        </div>
        <textarea name="message" rows={4} id="" value={formValue.message} placeholder='Your message' onChange={handleChange} className='w-full border border-[#D9D9D9] rounded-xl px-5 py-3'></textarea>
        <button
          type='submit'
          className="w-fit text-sm 1xl:text-base animated-button px-10 mt-6 py-3 border border-blue text-center cursor-pointer"
        >
          <span className="gap-3 relative flex justify-center">
            <p className={`text-nowrap`}>Submit Application</p>
          </span>
        </button>
      </form>
    </div>
  )
}

export default JoinUsForm
