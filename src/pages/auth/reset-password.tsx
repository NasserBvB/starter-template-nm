import FormGroup from '@/components/FormGroup'
import Button from '@/components/Button'
import Input from '@/components/Input'
import React from 'react'
import { useAuth } from '@/src/hooks/useAuth'
import parseForm from '@/src/utils/forms'

export default function ResetPassword() {

  const {resetPassword} = useAuth()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData =  parseForm(e.currentTarget as HTMLFormElement);
    console.log(formData);
    
    resetPassword(formData.email);
  }


  return (
    <div className='min-h-screen m-auto container flex flex-col justify-center items-center'>
      <div className="title text-2xl">Reset Password</div>
      <form onSubmit={handleSubmit} className='container rounded-sm flex flex-col justify-center items-center gap-4'>
        <FormGroup label='Email'>
          <Input name='email' id="email" placeholder='example@gmail.com'/>
        </FormGroup>
        <Button type="submit">Submit</Button>
      </form>
    </div>
  )
}
