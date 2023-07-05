"use client"
import Image from "next/image"
import LessonCard from "./LessonCard"
import ImageCarousel from "./ImageCarousel"
import { GetServerSideProps } from "next"
import axios from "axios"
import { baseUrl } from "@/constants"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"

export type Module =  {
    _id: number,
    name: string,
    __v: number
  }



const Lessons = () => {
    const [data,setData] = useState<Module[]>([])
    const getModules = async (url:string,config:any) => {
        try {
            const response =await axios.get(url,config)
            console.log(response.data[0])
            setData(response.data[0].modules)
            
        }catch(error:any){
            toast.error(error.response.data.message)
        }
    }
    useEffect(()=>{
        const url = baseUrl + "module"
        
        const token = localStorage.getItem("user-token")
        getModules(url,{headers: { Authorization: `Bearer ${token}` }})
    },[])
    console.log(data)
    return (
    <main className="">
        <header className="bg-[#1E1E1E] p-5 flex justify-between items-center">
        <Image src='/logo2.svg' alt="logo" width={200} height={20} />
        <div className="flex items-center  border-2
         border-[#2D95B2] rounded-xl px-3 py-1">
            <i><Image src="/searchicon.svg" height={20} width={20} alt="search"/></i>
        <input type="search" className="outline-none bg-transparent text-center" placeholder="Search Courses" />
         </div>
        <div className="flex gap-4">
            <div className="flex gap-4">
                <Image src="/box.svg" alt="Coding Area" width={20} height={20}/>
                <Image src="/chat.svg" alt="Chat" width={20} height={20}/>
            </div>
            <div className="flex gap-4 border-l-2 border-[#2D95B2] px-4">
                <Image src="/recommendation1.png" className="rounded-[50%]" alt="Profile" width={50} height={50}/>
                <div className="flex flex-col">
                    <h1 className="text-xl">Name</h1>
                    <p className="text-sm">profile</p>
                </div>
            </div>
        </div>
        </header>
        <ImageCarousel/>
        {data && data.map(item=> <LessonCard key={item._id} {...item}  />)}
    </main>
  )
}


export default Lessons
