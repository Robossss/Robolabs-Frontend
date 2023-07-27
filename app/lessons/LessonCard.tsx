import Image from "next/image";
import Link from "next/link";
import Button from "@/components/Button";
import { useRouter } from "next/navigation";
import axios from "axios";
import { baseUrl } from "@/constants";
import { toast } from "react-toastify";

const LessonCard = ({ ...module }) => {
  const token = localStorage.getItem("user-token");
  const router = useRouter();
  const createProgress = async () => {
    try {
      const url = baseUrl + "progress/create";
      const body = {
        level: module._id,
      };
      const start = await axios.post(url, body, {
        headers: { Authorization: `Bearer ${token}` },
      });
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  };

  const startCourse = () => {
    toast.info("Loading module");
    if (module.level) {
      router.push(`lessons/${module.level._id}`);
    } else {
      createProgress();
      router.push(`lessons/${module._id}`);
    }
  };
  return (
    <div className="text-white h-[320px] bg-purple w-[90%] max-w-[1280px] rounded-[50px] shadow-x mx-auto p-8 grid grid-cols-2 gap-8">
      {/* <Image src="/profile1.png" width={300} height={300} alt="lesson image" /> */}
      <div className="flex flex-col justify-center gap-4 w-full h-full">
        <h1 className="text-4xl font-extrabold">Introductory Lesson</h1>
        <h1 className="text-2xl text-white font-bold">
          {module.name || module.level.name}
        </h1>
        {module.progressType && (
          <>
            <p className="text-2xl font-bold">{module.progress}% completed</p>
            <div className="h-2 bg-white w-1/2 rounded-xl">
              {module.progress ? (
                <div
                  className={`h-2 bg-[#D87F60] rounded-xl w-[${module.progress}%]`}
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
        {module.images.map((image: any,index:number) => (
          <div key={image.id} className={`${index===0 ? "":""} h-[400*${index+1}] `}>
            <Image
              fill
              src={image.avatar}
              alt="module image"
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
