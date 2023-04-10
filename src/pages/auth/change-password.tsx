import FormGroup from '@/components/FormGroup'
import Button from '@/components/Button'
import Input from '@/components/Input'
import React from 'react'
import { useAuth } from '@/src/hooks/useAuth'
import parseForm from '@/src/utils/forms'
import { useRouter } from "next/router";
export default function ChangePassword() {
  const {changePassword} = useAuth()
  const {query} = useRouter()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData =  parseForm(e.currentTarget as HTMLFormElement);
    console.log(formData);
    console.log(query);
    
    if (!query.token) {
      alert('Invalid token');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      alert('Password and confirm password does not match');
      return;
    }
    
    changePassword(formData.password, query.token as string);
  }

  return (
    <div className='min-h-screen m-auto container flex flex-col justify-center items-center'>
      <div className="title text-2xl">Change Password</div>
      <form onSubmit={handleSubmit} className='container rounded-sm flex flex-col justify-center items-center gap-4'>
        <FormGroup label='password'>
          <Input name='password' type='password' id="password" placeholder='password'/>
        </FormGroup>
        <FormGroup label='Confirm password'>
          <Input name='confirmPassword' type='password' id="confirmPassword" placeholder='Confirm your password'/>
        </FormGroup>
        <Button type="submit">Submit</Button>
      </form>
    </div>
  )
}
