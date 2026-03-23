"use client"
import { submitContactForm } from '@/services/contactService';
import React, { cache } from 'react'
import { toast } from 'react-toastify';

const JoinUsForm = () => {
  const [formValue, setFormValue] = React.useState({
    firstName: '',
    lasstName: '',
    state:"",
    city: '',
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
          <input type="text" value={formValue.state} onChange={handleChange} name="state" placeholder='State' className='w-full border border-[#D9D9D9] rounded-full px-5 py-3' />
          <input type="text" name="city" value={formValue.city} onChange={handleChange} placeholder='City' className='w-full border border-[#D9D9D9] rounded-full px-5 py-3' />
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