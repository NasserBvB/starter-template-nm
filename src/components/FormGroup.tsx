import React, { ComponentProps } from 'react'

interface FormGroupProps extends ComponentProps<'div'> {
  labelProps?: ComponentProps<'label'>;
  label: string;
}

export default function FormGroup({children, label, labelProps, ...rest}: FormGroupProps) {
  return (
    <div className='flex flex-col max-w-xs' {...rest}>
      <label {...labelProps}>{label}</label>
      {children}
    </div>
  )
}
