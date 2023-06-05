import Image from "next/image"
import Button from "@/components/Button"

const LessonCard = () => {
  return (
    <div className='text-white hover:bg-gray-800 w-[90%] rounded-xl mx-auto p-8 flex-col md:flex-row flex items-center justify-between gap-8'>
        <Image src="/profile1.png" width={300} height={300} alt="lesson image" />
        <div className="flex flex-col justify-center gap-4 w-full">
            <p className="text-[#2D95B2]">Introductory Lesson</p>
        <h1 className="text-2xl font-bold">Introduction to Robolabs</h1>
        <p className="text-2xl font-bold">20% completed</p>
        <div className="h-1 bg-gray-500 rounded-lg">
            <div className="h-1 bg-green-500 rounded-lg w-[20%]"></div>
        </div>
        </div>
        <Button>Go To Course</Button>

    </div>
  )
}

export default LessonCard