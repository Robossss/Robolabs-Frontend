import LessonCard from "./LessonCard"
import Image from "next/image"

const Lessons
 = () => {
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
        <LessonCard />
    </main>
  )
}

export default Lessons
