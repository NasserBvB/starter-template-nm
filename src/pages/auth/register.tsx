import FormGroup from '@/components/FormGroup'
import Button from '@/components/Button'
import Input from '@/components/Input'
import React from 'react'
import { useAuth } from '@/src/hooks/useAuth'
import parseForm from '@/src/utils/forms'

export default function Register() {

  const {register} = useAuth()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData =  parseForm(e.currentTarget as HTMLFormElement);
    console.log(formData);
    
    register(formData.email, formData.password, formData.fullName);
  }

  return (
    <div className='min-h-screen m-auto container flex flex-col justify-center items-center'>
      <div className="title text-2xl">Register</div>
      <form onSubmit={handleSubmit} className='container rounded-sm flex flex-col justify-center items-center gap-4'>
        <FormGroup label='Full name'>
          <Input name='fullName' id="fullName" placeholder='Your complete name' />
        </FormGroup>
        <FormGroup label='Email'>
          <Input name='email' id="email" placeholder='example@gmail.com' />
        </FormGroup>
        <FormGroup label='password'>
          <Input name='password' type='password' id="password" placeholder='password' />
        </FormGroup>
        <Button type="submit">Login</Button>
      </form>
    </div>
  )
}
