import Image from "next/image"
import Link from "next/link"
import Button from "@/components/Button"
import { useRouter } from "next/navigation"
import axios from "axios"
import { baseUrl } from "@/constants"
import { toast } from "react-toastify"

const LessonCard = ({...module}) => {
  
  const token = localStorage.getItem("user-token")
  const router = useRouter()
  const createProgress = async ()=> {
    try {
    const url = baseUrl + "progress/create"
      const body = {
        level:module._id,
        
      }
      console.log(body,module)
      const start = await axios.post(url,body,{headers: { Authorization: `Bearer ${token}` }})
      console.log(start)
    } catch (error:any) {
      toast.error(error.response.data.message)
    }
  }

  const startCourse =()=> {
    createProgress()
    router.push(`lessons/${module._id}`)
  }
  return (
    <div className='text-white hover:bg-gray-800 w-[90%] rounded-xl mx-auto p-8 flex-col md:flex-row flex items-center justify-between gap-8'>
        <Image src="/profile1.png" width={300} height={300} alt="lesson image" />
        <div className="flex flex-col justify-center gap-4 w-full">
            <p className="text-[#2D95B2]">Introductory Lesson</p>
        <h1 className="text-2xl text-white font-bold">{module.name}</h1>
        <p className="text-2xl font-bold">20% completed</p>
        <div className="h-1 bg-gray-500 rounded-lg">
            <div className="h-1 bg-green-500 rounded-lg w-[20%]"></div>
        </div>
        </div>
        <Button onClick={startCourse}>Go To Course</Button>

    </div>
  )
}

export default LessonCard