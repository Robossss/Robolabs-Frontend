"use client"
import React from 'react'
import Image from "next/image"
import Button from "@/components/Button";


const page = () => {
  return (
    <main>
        <header className="bg-[#1E1E1E] ml-4 px-7 flex justify-between items-center">
        <Image src='/logo2.svg' alt="logo" width={200} height={20} />
        <div className="flex flex-col text-center">
            <h1 className='text-2xl font-bold'>Coding Area</h1>
            <p>Lesson 1 Practice</p>
         </div>
        <div className="flex gap-4">
            <div className="flex gap-4">
                <Image src="/chat.svg" alt="Chat" width={20} height={20}/>
            </div>
            <Button>Back To Lesson Area</Button>
        </div>
        </header>
        <aside className=' absolute top-0 left-0 h-screen w-[40px] bg-[#1E1E1E] flex flex-col items-center justify-center'>hi</aside>
        
        
    </main>
  )
}

export default page