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
  video?: string;
  module: string;
  __v: number;
};
type Sublesson = {
  title: string;
  images: any[];
  content: string;
  _id: number;
};

type Quiz = {
  _id: number;
  question: string;
  options: {
    option: string;
    _id: number;
  }[];
  correctOption: string;
  level: number;
  __v: 0;
};

const Lesson = ({ params }: { params: { id: number } }) => {
  const router = useRouter();

  const updateProgress = async (setProgress?:number) => {
    // console.log(bigLessons.indexOf(activeBigLesson));
    const updateId = localStorage.getItem("progress-id");
    const progress: number = setProgress ??
      ((bigLessons.indexOf(activeBigLesson!) + 1) / bigLessons.length) * 100;
    // console.log(bigLessons.indexOf(activeBigLesson!), activeBigLesson);
    try {
      const url = baseUrl + `progress/${updateId}`;
      const body = {
        progress: Math.round(progress),
        level: module.id,
      };
      const token = localStorage.getItem("user-token");
      // console.log(body, token);
      // console.log(body);
      const update = await axios.put(url, body, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(update);
    } catch (error: any) {
      toast.error(error.response.data.message);
      console.log(error.response.data.message);
      setTimeout(() => toast.dismiss, 2000);

      // updateProgress()
    }
  };

  
  const [bigLessons, setBigLessons] = useState<Lesson[]>([]);
  const [activeBigLesson, setActiveBigLesson] = useState<Lesson>();
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [isTakingQuiz, setIsTakingQuiz] = useState(false);
  const [isWatchingVideo, setIsWatchingVideo] = useState<boolean>(false);
  // const [isDoneWatchingVideo,setIsDoneWatchingVideo] = useState<boolean>(false)
  const [quizIndex, setQuizIndex] = useState<number>(0);
  const [quizCompleted, setQuizCompleted] = useState<boolean>(false);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  useEffect(() => {
    const startUrl = baseUrl + `lesson/${params.id}`;
    const quizUrl = baseUrl + `qa/${params.id}`;
    const token = localStorage.getItem("user-token");
    const config = { headers: { Authorization: `Bearer ${token}` } };
    const getLessons = async (url: string, config: any) => {
      const cachedLessons = localStorage.getItem("lessons");
      if (cachedLessons) {
        setBigLessons(JSON.parse(cachedLessons));
        toast.dismiss();
      } else {
        try {
          toast.loading("Loading lesson", {
            autoClose: false,
          });
          const start = await axios.get(url, config);
          console.log(JSON.stringify(start.data, null, 2));
  
          setBigLessons(start.data);
          localStorage.setItem("lessons", JSON.stringify(start.data, null, 2));
          // setActiveBigLesson(bigLessons[0]);
          toast.dismiss();
  
          toast.success("Lessons loaded");
          toast.info("Select a lesson to begin")
        } catch (error: any) {
          toast.error(
            error.response?.data.message || error.response || "Network Error"
          );
          setTimeout(() => toast.dismiss, 2000);
          // setTimeout(() => getLessons(url, config), 3000);
        }
      }
    };
    const getQuiz = async (url: string, config: any) => {
      const cachedQuizzes = localStorage.getItem("quizzes");
      if (cachedQuizzes) {
        setQuizzes(JSON.parse(cachedQuizzes));
      } else {
        try {
          toast.loading("Loading quizzes", {
            autoClose: false,
          });
          const start = await axios.get(url, config);
  
          setQuizzes(start.data);
          localStorage.setItem("quizzes", JSON.stringify(start.data, null, 2));
          toast.dismiss();
          toast.success("Quizzes loaded");
        } catch (error: any) {
          toast.error(
            error.response?.data.message || error.response || "Network Error"
          );
          setTimeout(() => toast.dismiss, 2000);
          // setTimeout(() => getQuiz(url, config), 1000);
        }
      }
    };

    getLessons(startUrl, config);
    getQuiz(quizUrl, config);
    console.log("useEffect")
  }, [params.id]);


  function getNextLesson() {
    setCurrentIndex(currentIndex - 1);
  }

  function getPreviousLesson() {
    setCurrentIndex(currentIndex + 1);
  }
  const activeLesson = activeBigLesson?.lessons[currentIndex];
  // console.log(activeLesson)
  const activeQuiz: Quiz = quizzes[quizIndex];
  // console.log("aaaaaaaaaaaaaaaaaaaa",quizIndex)

  const [selectedOption, setSelectedOption] = useState<string>();
  const [answer, setAnswer] = useState<string>();

  const checkAnswer = () => {
    if (activeQuiz) {
      // console.log("wow",activeQuiz.correctOption);
      setAnswer(activeQuiz.correctOption);
    }
  };

  const goToPrevious = () => {
    if (isTakingQuiz) {
      if (quizIndex > 0) {
        setQuizIndex(quizIndex - 1);
      } else {
        setIsTakingQuiz(false);
      }
    } else if(currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      if(isWatchingVideo){
        setIsWatchingVideo(false)
      }
    }
    // setActiveLesson(activeBigLesson.lessons[currentIndex-1])
  };
  const goToNext = () => {
    if(currentIndex===activeBigLesson!.lessons.length-1){
      updateProgress();
      if (
        activeBigLesson &&
        bigLessons.indexOf(activeBigLesson) < bigLessons.length - 1
      ) {
        if(!quizCompleted){
          setCurrentIndex(0)
        }
        setActiveBigLesson(bigLessons[bigLessons.indexOf(activeBigLesson) + 1]);
        setIsWatchingVideo(false)
      }else {
        setIsTakingQuiz(true)
      }
    } else{
      setCurrentIndex(currentIndex + 1);
    }
    // setActiveLesson(activeBigLesson.lessons[currentIndex+1])
  };

  const watchVideo = () => {
    setIsWatchingVideo(true);
  };

  const takeQuiz = () => {
    setIsTakingQuiz(true);
  };

  const goToNextQuestion = () => {
    setSelectedOption(undefined);
    setAnswer(undefined);
    if (quizIndex < quizzes.length - 1) {
      setQuizIndex(quizIndex + 1);
    } else {
      if (
        activeBigLesson &&
        bigLessons.indexOf(activeBigLesson) + 1 < bigLessons.length - 1
      ) {
        
        setActiveBigLesson(bigLessons[bigLessons.indexOf(activeBigLesson) + 1]);
      }
      setIsTakingQuiz(false);
      setQuizCompleted(true);
      updateProgress();
      
    }
  };

  const checkQuizAnswer = () => {
    checkAnswer();
    setTimeout(() => {
      setAnswer(undefined);
      setSelectedOption(undefined);
      if (quizIndex < quizzes.length - 1) {
        setQuizIndex(quizIndex + 1);
      } else {
        if (
          activeBigLesson &&
          bigLessons.indexOf(activeBigLesson) + 1 < bigLessons.length - 1
        ) {
          setActiveBigLesson(
            bigLessons[bigLessons.indexOf(activeBigLesson) + 1]
          );
        }
        setIsTakingQuiz(false);
        setQuizCompleted(true);
        updateProgress();
        setIsWatchingVideo(false)
      }
    }, 1000);
  };

  const simulate = ()=> {
    updateProgress(100)
    toast.success("Lessons Completed")
    localStorage.removeItem("module-data")
    router.push('/lessons')

    // setCurrentIndex(0)
    // setIsTakingQuiz(false)
    // setQuizCompleted(false)
  }

  const Option = ({ option }: { option: string }) => {
    const getColor = () => {
      if (option === selectedOption) {
        if (answer) {
          if (answer === option) {
            return "bg-[#5ECA69]";
          } else {
            return "bg-red-600";
          }
        }
        return "bg-yellow-500";
      } else {
        if (answer && option === answer) {
          return "bg-[#5ECA69]";
        }
        return "bg-[#B488D4]";
      }
    };

    return (
      <div
        onClick={() => setSelectedOption(option)}
        className={` mx-auto hover:bg-yellow-500

      ${getColor()}
      flex justify-center items-center rounded-[96px] text-2xl font-bold w-[300px] min-h-[65px] transition-all cursor-pointer hover:scale-110 hover:text-white`}
      >
        {option}
      </div>
    );
  };

  const LessonContent = () => {
    return (
      <section
        className={`relative max-h-[250px] lg:max-h-[380px] 2xl:max-h-[460px] bg-[#662C91] grid min-h-[300px] min-w-[850px] gap-8 text-white bg-no-repeat  overflow-hidden items-center ${!isWatchingVideo && "justify-center rounded-[90px]"} ${
          isWatchingVideo && !isTakingQuiz ? "  self-center ":
          activeLesson?.images[0].avatar 
            ? "pr-8 bg-[#662C91]  bg-[url('/lessonBgRobot.svg')] bg-right grid-cols-[4fr,6fr]"
            : "p-[5%] flex bg-black bg-[url('/noimgbg.svg')] bg-cover text-center w-full h-full "
        }`}
      >
        {isTakingQuiz && !quizCompleted ? (
          <div className="flex flex-col gap-12 p-8 2xl:p-16 col-span-2 text-center">
            <h1 className="text-7xl font-bold">Q{quizIndex + 1}</h1>
            <h1 className="text-3xl">{activeQuiz.question}</h1>
            <div className="flex flex-wrap gap-4 items-center justify-center">
              {activeQuiz.options &&
                activeQuiz.options.map(
                  ({ option, _id }: { option: string; _id: number }) => (
                    <Option key={_id} option={option} />
                  )
                )}
            </div>
          </div>
        ) : isWatchingVideo && activeBigLesson?.video && !quizCompleted ?(
          <div className="m-0 min-w-full min-h-full bg-white">

          <video className=" object-cover w-full h-full " autoPlay loop controls>
          <source src={activeBigLesson.video || "https://drive.google.com/uc?id=1IAYD5J-VIXwAslaGQgt4ClVWoilegMm8/"} type="video/mp4"/>
Your browser does not support the video tag.
</video>
          </div>
          // <video src={activeBigLesson?.video || "https://drive.google.com/file/d/1IAYD5J-VIXwAslaGQgt4ClVWoilegMm8/view?usp=drive_link"}/> 
        ): !isTakingQuiz && quizCompleted ? (
          <>
            <div className=" col-span-2 ">
              <h1 className="text-center  text-7xl">Quiz Completed</h1>
            </div>
          </>
        ) : (
          <>
          {activeLesson?.images[0].avatar && 
            <div className="h-full w-full">
              {activeLesson?.images[0].avatar && (
                <div className="flex items-center w-full h-full">
                  <Image
                    className="absolute top-[5%] right-[5%]"
                    height={40}
                    width={40}
                    src="/lightBulb.svg"
                    alt="light bulb"
                  />
                  <div className="w-full h-full object-cover ">
                    <Image
                      src={activeLesson?.images[0].avatar}
                      height={4000}
                      width={4000}
                      alt="lesson image"
                      className="w-full h-full"
                    />
                  </div>
                </div>
              )}
            </div>
          }
            <div className="text-left w-full flex flex-col justify-center">
              <h1 className="text-[2rem] font-bold">{activeLesson?.title}</h1>
              <p
                className={` ${
                  activeLesson?.images[0].avatar || "text-center text-2xl"
                } `}
              >
                {activeLesson?.content}
              </p>
            </div>
          </>
        )}
      </section>
    );
  };

  const LessonButtons = () => {
    return (
      <div className="w-full flex justify-between items-center">
        <div className="">
          {currentIndex !== 0 && (
            <Button onClick={goToPrevious}>Previous</Button>
          )}
        </div>
        <div className="">
          {
            activeBigLesson && ((bigLessons.indexOf(activeBigLesson)!== bigLessons.length-1)?(
              currentIndex!==activeBigLesson.lessons.length-1?(<Button onClick={goToNext} disabled={isTakingQuiz}>
                Next
              </Button>):(activeBigLesson.video && !isWatchingVideo?(                <Button onClick={watchVideo} disabled={isTakingQuiz}>
                Watch Video
              </Button>):
              <Button onClick={goToNext} disabled={isTakingQuiz}>
                Next
              </Button>)
              
            ):(
              quizzes && !quizCompleted  && currentIndex===activeBigLesson?.lessons.length-1 ?(!isTakingQuiz ?
                (<Button onClick={takeQuiz}>Take Quiz</Button>):(                  <Button disabled={!selectedOption} onClick={checkQuizAnswer}>
                Check Answer
              </Button>)
              ):(                currentIndex!==activeBigLesson.lessons.length-1?(<Button onClick={goToNext} disabled={isTakingQuiz}>
                Next
              </Button>):              <Link
                href={"https://robolabssimulation.vercel.app/"}
                target="_blank"
                onClick={simulate}
              >
                <Button>Go To Simulation</Button>
              </Link>)
                
              
            ))
          }
        </div>
      </div>
    );
  };

  return (
    <>
      <main className=" bg-purple bg-[url('/adinkra.svg')] h-screen overflow-clip  bg-blend-overlay">
        <header className=" p-5 flex justify-between items-center">
          <Image src="/logo2.svg" alt="logo" width={200} height={20} />
          <h1 className="text-3xl font-extrabold">Introduction to RoboLabs</h1>
          <div className="flex gap-4">
            <div className="flex justify-center gap-4 w-[200px]">
              <Image src="/box.svg" alt="Coding Area" width={20} height={20} />
              <Image src="/chat.svg" alt="Chat" width={20} height={20} />
            </div>
          </div>
        </header>
        <section className="flex min-h-[calc(100vh-5rem)] w-screen text-white">
          <aside className="min-w-[200px] pb-10 w-[30%] flex flex-col gap-4  items-center justify-between">
            <div className="flex flex-col h-full gap-4 w-full items-center m-0">
              <Image
                src="/lessonsRobot.svg"
                height={200}
                width={200}
                alt="lessons Robot"
              />
              {/* <ul className="flex flex-col gap-8"> */}
              {bigLessons.map((lesson, index) => (
                // <details key={index} className="">
                <button
                  disabled={isTakingQuiz || Boolean(activeBigLesson)}
                  key={index}
                  className={`${isTakingQuiz || (activeBigLesson && activeBigLesson?.subject!==lesson.subject)? "text-gray-800":
                    lesson.subject === activeBigLesson?.subject
                      ? "text-purple bg-white rounded-l-[25px]"
                      : ""
                  } p-4  w-full ml-8 border-transparent cursor-pointer text-2xl text-left font-bold `}
                  onClick={() => {
                    setActiveBigLesson(lesson);
                    setCurrentIndex(0);

                    // setActiveLesson(activeBigLesson.lessons[currentIndex])
                  }}
                >
                  1.{index} {lesson.subject}
                </button>
              ))}
            </div>
            <Button onClick={() => router.push("lessons")}>
              Go To Dashboard
            </Button>
          </aside>
          <main className="w-full min-h-full max-h-fit p-16 bg-white grid grid-rows-[auto,auto] justify-center gap-16 ">
            <LessonContent />
            <LessonButtons />
          </main>
          {/* <pre>{JSON.stringify(activeBigLesson,null,2)}</pre> */}
          {/* <pre>{JSON.stringify(quizzes, null, 2)}</pre> */}
        </section>
      </main>
    </>
  );
};

export default Lesson;
