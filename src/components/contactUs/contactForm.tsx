"use client"
import { submitContactForm } from '@/services/contactService';
import React, { cache } from 'react'
import { toast } from 'react-toastify';

const ContactFormComponent = () => {
  const [formValue, setFormValue] = React.useState({
    name: '',
    email: '',
    mobile: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormValue({
      ...formValue,
      [e.target.name]: e.target.value
    })
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    const [firstName, lastName] = formValue.name.trim().split(" ");
    const payload = {
      firstName,
      lastName,
      email: formValue.email,
      phoneNumber: formValue.mobile,
      message: formValue.message
    }
    try {
      const response = await submitContactForm(payload);
      if(response.success){
        toast.success(response.message);
        setFormValue({
          name: '',
          email: '',
          mobile: '',
          message: ''
        })
      }
    } catch (error: any) {
      console.log('error', error)
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
      <form action="" className='flex flex-col gap-4' onSubmit={handleSubmit}>
        <div className='flex gap-4'>
          <input type="text" value={formValue.name} onChange={handleChange} name="name" placeholder='Your name' className='w-full border border-[#D9D9D9] rounded-full px-4 py-3' />
          <input type="number" name="mobile" value={formValue.mobile} onChange={handleChange} placeholder='Your phone number' className='w-full border border-[#D9D9D9] rounded-full px-4 py-3' />
        </div>
        <input type="email" name="email" value={formValue.email} onChange={handleChange} placeholder='Email' className='w-full border border-[#D9D9D9] rounded-full px-4 py-3' />
        <textarea name="message" id="" value={formValue.message} placeholder='Your message' onChange={handleChange} className='w-full border border-[#D9D9D9] rounded-xl px-4 py-3'></textarea>
        <button
          type='submit'
          className="w-fit text-sm 1xl:text-base animated-button px-10 py-3 border border-blue text-center cursor-pointer"
        >
          <span className="gap-3 relative flex justify-center">
            <p className={`text-nowrap`}>Send your inquiry</p>
          </span>
        </button>
      </form>
    </div>
  )
}

export default ContactFormComponent