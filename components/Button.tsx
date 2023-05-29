import React from 'react'
import Link from 'next/link'

interface ButtonProps {
    text:string
    destination?:string 
}
const Button = (props:ButtonProps) => {
    const {text,destination="#"} = props
  return (
        <Link href={destination}>
      <button className="rounded-md my-6 bg-[#2D95B2] py-4 px-10 text-white font-bold w-max">
        {text}
            </button>
    </Link>
  )
}

export default Button