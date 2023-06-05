import React from 'react'
import Link from 'next/link'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children:string
   
}
const Button = (props:ButtonProps) => {
    const {children,...rest} = props
  return (
    <button {...rest}  className="rounded-md my-6 bg-[#2D95B2] py-4 px-10 text-white font-bold w-max whitespace-nowrap">
        {children}
    </button>
  )
}

export default Button