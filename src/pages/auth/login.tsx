import FormGroup from '@/components/FormGroup'
import Button from '@/components/Button'
import Input from '@/components/Input'
import React from 'react'
import parseForm from '@/src/utils/forms'
import { useAuth } from '@/src/hooks/useAuth'

export default function Login() {
  const {login} = useAuth()
  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData =  parseForm(e.currentTarget as HTMLFormElement);
    login(formData.email, formData.password);
  }

  return (
    <div className='min-h-screen m-auto container flex flex-col justify-center items-center'>
      <div className="title text-2xl">Login</div>
      <form onSubmit={handleSubmit} className='container rounded-sm flex flex-col justify-center items-center gap-4'>
        <FormGroup label='Email'>
          <Input name='email' id="email" placeholder='example@gmail.com'/>
        </FormGroup>
        <FormGroup label='password'>
          <Input name='password' type='password' id="password" placeholder='password'/>
        </FormGroup>
        <Button type="submit">Login</Button>
      </form>
    </div>
  )
}
