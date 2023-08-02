import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

const links = ["home","about","features","pricing"]

const Header = () => {
  return (
    <header className="text-gray-300 w-full  h-[100px] pl-8 flex justify-between items-center">
          <Image src="/logo2.svg" alt="logo" width={200} height={20} />
          <nav className=" max-w-[50%] mx-24">
              <ul className="grid gap-11 grid-flow-col">
            {links.map((link,index)=>(

              <Link key={index} href={`#${link}`}>
                <li className="hover:text-white font-bold cursor-pointer text-3xl capitalize">{link}</li>
              </Link>
            ))}
            </ul>
          </nav>
        </header>
  )
}

export default Header