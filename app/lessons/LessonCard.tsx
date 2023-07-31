import Image from "next/image";
import Link from "next/link";
import Button from "@/components/Button";
import { useRouter } from "next/navigation";
import axios from "axios";
import { baseUrl } from "@/constants";
import { toast } from "react-toastify";

const LessonCard = ({ ...data }) => {
  let course: any
  if(data.level) {
    course = data.level
    localStorage.setItem("progress-id",data._id)
  }else {
    course = data
  }
  // localStorage
  const router = useRouter();
  const createProgress = async () => {
    const token = localStorage.getItem("user-token");
    try {
      const url = baseUrl + "progress/create";
      const body = {
        level: course._id,
      };
      const start = await axios.post(url, body, {
        headers: { Authorization: `Bearer ${token}` },
      });
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  };

  const startCourse = () => {
    toast.info("Loading course");
    if (data.level) {
      router.push(`lessons/${data.level._id}`);
    } else {
      createProgress();
      router.push(`lessons/${course._id}`);
    }
  };

  const progress:string =data.progress
  console.log(progress)
  return (
    <div className="text-white h-[320px] bg-purple w-[90%] max-w-[1280px] rounded-[50px] shadow-x mx-auto p-8 grid grid-cols-2 gap-8">
      {/* <Image src="/profile1.png" width={300} height={300} alt="lesson image" /> */}
      <div className="flex flex-col justify-center gap-4 w-full h-full">
        <h1 className="text-4xl font-extrabold">Introductory Lesson</h1>
        <h1 className="text-2xl text-white font-bold">
          {course.name}
        </h1>
        {data.progressType && (
          <>
            <p className="text-2xl font-bold">{progress}% completed</p>
            <div className="h-2 bg-white w-1/2 rounded-xl">
              {data.progress ? (
                <div
                  className={`h-2 bg-[#D87F60] rounded-xl w-[${progress}%]`}
                ></div>
              ) : (
                ""
              )}
            </div>
          </>
        )}
        <Button onClick={startCourse}>Go To Course</Button>
      </div>
      <div className="flex w-[600px] items-start justify-between relative">
        {course.images?.map((image: any,index:number) => (
          <div key={image.id} className={`${index===0 ? "":""}  `}>
            <Image
            
              fill
              src={image.avatar}
              alt="course image"
              style={{
                  objectFit: "scale-down",
                }}
                />
                </div>
        ))}
      </div>
    </div>
  );
};

export default LessonCard;
