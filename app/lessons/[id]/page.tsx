"use client"
import Button from "@/components/Button";
import { baseUrl } from "@/constants";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";



type Lesson = {
  _id: string,
  subject: string,
  title: string,
  content: string,
  module: string,
  __v: number
}


  const Lesson = ({ params }: { params: { id: number } }) => {
    const router = useRouter()

    const getLessons =async (url:string,config:any) => {
      try {

        const start = await axios.get(url,config)
        console.log(start)
        setLessons(start.data)
        console.log(lessons)
      }catch(error:any) {
        toast.error(error.response.data.message)
        console.error(error.response.data.message)
      }
      
    }
  useEffect(() =>  {
    const startUrl = baseUrl +`lesson/${params.id}`
    const token = localStorage.getItem("user-token")
    getLessons(startUrl,{headers: { Authorization: `Bearer ${token}`, }})
  console.log(lessons)
  }, [])

  const [lessons,setLessons] = useState<Lesson[]>([])

//   const getLesson = async (url:string,config:any) => {
//     try {
//         const response =await axios.get(url,config)
//         console.log(response)
//         setLesson(response.data)
//     }catch(error:any){
//         toast.error(error.response.data.message)
//     }
// }
// useEffect(()=>{
//     const url = baseUrl + `module/${params.id}`
//     const token = localStorage.getItem("user-token")
//     getLesson(url,{headers: { Authorization: `Bearer ${token}` }})
// })
  // const lessons = [
  //   {
  //     title: "lesson1",
  //     sublessons: [
  //       {
  //         title: "sublesson1",
  //         content:
  //           "content 1 Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque, repellat!",
  //       },
  //       {
  //         title: "sublesson2",
  //         content:
  //           "content 2 Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque, repellat!",
  //       },
  //       {
  //         title: "sublesson3",
  //         content:
  //           "content 3 Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque, repellat!",
  //       },
  //     ],
  //   },
    //   {
    //     lesson1: {
    //     sublesson1: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Consequatur, atque?",
    //     sublesson2: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Consequatur, atque?",
    //     sublesson3: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Consequatur, atque?",
    //   },
    //     lesson2: {
    //     sublesson1: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Consequatur, atque?",
    //     sublesson2: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Consequatur, atque?",
    //     sublesson3: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Consequatur, atque?",
    //   },
    //     lesson3: {
    //     sublesson1: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Consequatur, atque?",
    //     sublesson2: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Consequatur, atque?",
    //     sublesson3: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Consequatur, atque?",
    //   }
    // }
  // ];
  const [activeLesson,setActiveLesson] = useState("Select a lesson to begin")

  return (
    <>
      <header className="bg-[#1E1E1E] p-5 flex justify-between items-center">
        <Image src="/logo2.svg" alt="logo" width={200} height={20} />
        <h1 className="text-3xl">Introduction to RoboLabs</h1>
        <div className="flex gap-4">
          <div className="flex justify-center gap-4 w-[200px]">
            <Image src="/box.svg" alt="Coding Area" width={20} height={20} />
            <Image src="/chat.svg" alt="Chat" width={20} height={20} />
          </div>
        </div>
      </header>
      <section className="flex">
        <aside className="min-w-[200px] p-10 w-1/5 h-screen flex flex-col justify-between items-center">
          <div className=""></div>
          <ul className="flex flex-col gap-8">
          {lessons.map((lesson, index) => (
            // <details key={index}>
              // <summary >{lesson.title}</summary>
                <li className={`cursor-pointer ${lesson.content===activeLesson && "text-xl"}`} key={index} onClick={()=>setActiveLesson(lesson.content)}>{lesson.title}</li>
                // </details>
                ))}
                </ul>
        <Button onClick={()=>router.push("lessons")}>Go To Dashboard</Button>
        </aside>
        <main className="w-full  text-white p-16 bg-gray-900 h-screen grid grid-rows-5 ">
          <section className="bg-[#091519] row-span-4 grid grid-cols-2 items-center justify-center">
            <div className="w-full h-full flex items-center justify-center overflow-hidden">

<Image src="/lessonimage.svg" height={477} width={454} alt="lesson image"/>
            </div>
          {activeLesson}
          </section>
        <div className="flex justify-between items-center">
          <Button>Previous</Button>
          <Button onClick={()=>setActiveLesson(lessons[lessons.findIndex(lesson=>lesson.content===activeLesson)+1].content)}>Next</Button>
        </div>
        </main>
      </section>
    </>
    // <h1>hi</h1>
  );
};

export default Lesson;
