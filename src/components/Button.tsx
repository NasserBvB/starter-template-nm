import React from 'react'

interface ButtonProps extends React.ComponentProps<'button'> {}

export default function Button(props: ButtonProps) {
  return (
    <button className='p-4 rounded-sm shadow-md bg-red-400' {...props}/>
  )
}
