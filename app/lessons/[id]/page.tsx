"use client";
import Button from "@/components/Button";
import { baseUrl } from "@/constants";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import Link from "next/link";

type Lesson = {
  _id: string;
  subject: string;
  lessons: Sublesson[];
  module: string;
  __v: number;
};
type Sublesson = {
  title: string;
  avatar: string;
  content: string;
  _id: number;
};

const Lesson = ({ params }: { params: { id: number } }) => {
  const router = useRouter();

  const updateProgress = async () => {
    console.log(bigLessons.indexOf(activeBigLesson));
    const progress =
      ((bigLessons.indexOf(activeBigLesson) + 1) / bigLessons.length) * 50;
    try {
      const url = baseUrl + `progress/${params.id}`;
      const body = {
        progress: progress,
        level: activeBigLesson.module,
      };
      const token = localStorage.getItem("user-token");
      console.log(body);
      const update = await axios.put(url, body, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(update);
    } catch (error: any) {
      toast.error(error.response.data.message);
      console.log(error.response.data.message);
      // updateProgress()
    }
  };

  const getLessons = async (url: string, config: any) => {
    try {
      toast.info("Loading lesson");
      const start = await axios.get(url, config);
      console.log(start);
      setBigLessons(start.data);
      setActiveBigLesson(bigLessons[0]);
      // setActiveLesson({title:"Lessons",content:"Select lesson to begin",avatar:"/lessonimage.svg",_id:0})
    } catch (error: any) {
      toast.error(error.response);
      setTimeout(() => getLessons(url, config), 1000);
    }
  };
  useEffect(() => {
    const startUrl = baseUrl + `lesson/${params.id}`;
    const token = localStorage.getItem("user-token");
    getLessons(startUrl, { headers: { Authorization: `Bearer ${token}` } });
  }, [params.id]);

  const [bigLessons, setBigLessons] = useState<Lesson[]>([]);
  const [activeBigLesson, setActiveBigLesson] = useState<any>();
  const [currentIndex, setCurrentIndex] = useState(0);

  if (currentIndex + 1 === activeBigLesson?.lessons?.length) {
    updateProgress();
  }

  function getNextLesson() {
    setCurrentIndex(currentIndex - 1);
    // if (!activeBigLesson?.lesson) {
    //   return
    // }
    // const sublessonCount = activeBigLesson.lesson.length
    // const currentLessonIndex = activeBigLesson.lesson.indexOf(activeLesson)
    // if (currentLessonIndex < sublessonCount) {
    // setNextLesson(activeBigLesson.lessons[currentLessonIndex+1])
    // }
  }

  function getPreviousLesson() {
    setCurrentIndex(currentIndex + 1);
    // if (!activeBigLesson?.lesson) {
    //   return
    // }
    // const currentLessonIndex = activeBigLesson.lesson.indexOf(activeLesson)
    // if (currentLessonIndex > 0) {
    //   return activeBigLesson.lessons[currentLessonIndex - 1]
    // }
  }

  // const changeSubLesson = (currentIndex:number,add:boolean)=> {
  //   if(add){
  //     setCurrentIndex(currentIndex+1)
  //   }else{
  //     setCurrentIndex(currentIndex-1)
  //   }
  //   setActiveLesson(bigLessons[0].lessons[currentIndex])
  // }
  const activeLesson = activeBigLesson?.lessons[currentIndex];
  return (
    <main className=" bg-purple bg-[url('/adinkra.svg')] min-h-screen  bg-blend-overlay">
      <header className=" p-5 flex justify-between items-center">
        <Image src="/logo2.svg" alt="logo" width={200} height={20} />
        <h1 className="text-3xl">Introduction to RoboLabs</h1>
        <div className="flex gap-4">
          <div className="flex justify-center gap-4 w-[200px]">
            <Image src="/box.svg" alt="Coding Area" width={20} height={20} />
            <Image src="/chat.svg" alt="Chat" width={20} height={20} />
          </div>
        </div>
      </header>
      <section className="flex h-full max-h-[800px] text-white">
        <aside className="min-w-[200px] py-10 w-[30%] flex flex-col justify-between items-center">
          <div className="flex flex-col items-end m-0">
            <Image
              src="/lessonsRobot.svg"
              height={300}
              width={300}
              alt="lessons Robot"
            />
            {/* <ul className="flex flex-col gap-8"> */}
            {bigLessons.map((lesson, index) => (
              // <details key={index} className="">
              <h1
                key={index}
                className={`${
                  lesson === activeBigLesson &&
                  "text-purple bg-white rounded-l-[50px]"
                } py-4 pl-4 w-full -mr-4 cursor-pointer text-2xl font-bold `}
                onClick={() => {
                  setActiveBigLesson(lesson);
                  setCurrentIndex(0);
                  // setActiveLesson(activeBigLesson.lessons[currentIndex])
                }}
              >
                1.{lesson.subject}
              </h1>
              // {
              //   lesson.lessons.map((lesson,index)=> {
              //     // setCurrentIndex(index)
              //     return (
              //       <li className={`ml-4 cursor-pointer ${lesson===activeLesson && "bg-white text-purple rounded-md text-xl"}`} key={index} onClick={()=>setActiveLesson(lesson)}>{lesson.title}</li>
              //     )
              //   })s
              //   }

              //   </details>
            ))}
            {/* </ul> */}
          </div>
          <Button onClick={() => router.push("lessons")}>
            Go To Dashboard
          </Button>
        </aside>
        <main className="w-full max-h-[800px] p-16 bg-white h-full grid grid-rows-5 ">
          <section className="relative bg-[#662C91] text-white bg-[url('/lessonBgRobot.svg')] rounded-[90px] bg-no-repeat bg-right overflow-clip row-span-4 pr-8 grid gap-4 grid-cols-2 items-center justify-center">
              <Image className="absolute top-[5%] right-[5%]" height={40} width={40} src="/lightBulb.svg" alt="light bulb"/>
            <div className="w-full h-full ">
              <Image
                src={activeLesson?.avatar}
                height={477}
                width={454}
                alt="lesson image"
              />
            </div>
            <div className="text-left z-10">
              <h1 className="text-[2rem]">{activeLesson?.title}</h1>
              <p className="">{activeLesson?.content}</p>
            </div>
          </section>
          <div className="w-full flex justify-between items-center">
            <div className="">
              {currentIndex !== 0 && (
                <Button
                  onClick={() => {
                    setCurrentIndex(currentIndex - 1);
                    // setActiveLesson(activeBigLesson.lessons[currentIndex-1])
                  }}
                >
                  Previous
                </Button>
              )}
            </div>
            <div className="">
              {activeBigLesson &&
              currentIndex !== activeBigLesson.lessons.length - 1 ? (
                <Button
                  onClick={() => {
                    setCurrentIndex(currentIndex + 1);
                    // setActiveLesson(activeBigLesson.lessons[currentIndex+1])
                  }}
                >
                  Next
                </Button>
              ) : (
                activeBigLesson && (
                  <Link href={"https://lesson1-robolabssimulation.vercel.app/"}>
                    <Button>Go To Simulation</Button>
                  </Link>
                )
              )}
            </div>
          </div>
        </main>
        {/* <pre>{JSON.stringify(activeBigLesson,null,2)}</pre> */}
      </section>
    </main>
  );
};

export default Lesson;
