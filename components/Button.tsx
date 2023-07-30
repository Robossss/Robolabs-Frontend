import React from 'react'
import Link from 'next/link'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children:string
   
}
const Button = (props:ButtonProps) => {
    const {children,...rest} = props
  return (
    <button {...rest}  className=" shadow-md capitalize rounded-3xl bg-linear-orange py-4 px-10 text-white font-bold w-max whitespace-nowrap transition-all hover:scale-110 ">
        {children}
    </button>
  )
}

export default Button