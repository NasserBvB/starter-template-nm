import React, { ComponentProps, PropsWithRef } from 'react'

interface InputProps extends  ComponentProps<'input'> {}

export default function Input(props: InputProps) {
  return (
    <input className='p-4 rounded-sm border border-1 border-gray-300 bg-inherit' {...props}/>
  )
}
