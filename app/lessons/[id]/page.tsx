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

  const updateProgress = async () => {
    // console.log(bigLessons.indexOf(activeBigLesson));
    const updateId = localStorage.getItem("progress-id");
    const progress =
      ((bigLessons.indexOf(activeBigLesson!) + 1) / bigLessons.length) * 50;
    console.log(bigLessons.indexOf(activeBigLesson!), activeBigLesson);
    try {
      const url = baseUrl + `progress/${updateId}`;
      const body = {
        progress: progress,
        level: activeBigLesson?.module,
      };
      const token = localStorage.getItem("user-token");
      console.log(body, token);
      // console.log(body);
      const update = await axios.put(url, body, {
        headers: { Authorization: `Bearer ${token}` },
      });
      // console.log(update);
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
      // console.log(start);
      setBigLessons(start.data);
      setActiveBigLesson(bigLessons[0]);
      toast.dismiss();
      toast.success("Lessons loaded");
    } catch (error: any) {
      toast.error(error.response.data.message || "Network Error");
      setTimeout(() => getLessons(url, config), 1000);
    }
  };
  const getQuiz = async (url: string, config: any) => {
    try {
      toast.info("Loading quizzes", {
        autoClose: false,
      });
      const start = await axios.get(url, config);
      console.log(start);
      setQuizzes(start.data);
      toast.dismiss();
      toast.success("Quizzes loaded");
    } catch (error: any) {
      if(error.response.data.message){
        toast.error(error.response.data.message);
      } else {
        toast.error("Network Error")
      }
      setTimeout(() => getQuiz(url, config), 1000);
    }
  };

  const [bigLessons, setBigLessons] = useState<Lesson[]>([]);
  const [activeBigLesson, setActiveBigLesson] = useState<Lesson>();
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [isTakingQuiz, setIsTakingQuiz] = useState(false);
  // const [activeQuiz,setActiveQuiz] = useState()
  const [quizIndex, setQuizIndex] = useState<number>(0);
  const [quizCompleted, setQuizCompleted] = useState<boolean>(false);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  useEffect(() => {
    const startUrl = baseUrl + `lesson/${params.id}`;
    const quizUrl = baseUrl + `qa/${params.id}`;
    const token = localStorage.getItem("user-token");
    const config = { headers: { Authorization: `Bearer ${token}` } };
    getLessons(startUrl, config);
    getQuiz(quizUrl, config);
  }, []);
  if (quizCompleted && activeBigLesson) {
    updateProgress();
  }

  function getNextLesson() {
    setCurrentIndex(currentIndex - 1);
  }

  function getPreviousLesson() {
    setCurrentIndex(currentIndex + 1);
  }
  const activeLesson = activeBigLesson?.lessons[currentIndex];
  const activeQuiz:Quiz = quizzes[quizIndex];
  // console.log("aaaaaaaaaaaaaaaaaaaa",quizIndex)

  const [selectedOption, setSelectedOption] = useState<string>();
  const [answer, setAnswer] = useState<string>();

  const checkAnswer = () => {
    if (activeQuiz) {
      // console.log("wow",activeQuiz.correctOption);
      setAnswer(activeQuiz.correctOption);
    }
  };

  const goToPrevious =()=> {
    if (isTakingQuiz) {
      if (quizIndex > 0) {
        setQuizIndex(quizIndex - 1);
      } else {
        setIsTakingQuiz(false);
      }
    } else {
      setCurrentIndex(currentIndex - 1);
    }
    // setActiveLesson(activeBigLesson.lessons[currentIndex-1])
  }
  const goToNext = ()=> {
    setCurrentIndex(currentIndex + 1);
    // setActiveLesson(activeBigLesson.lessons[currentIndex+1])
  }

  const takeQuiz = ()=>{
    setIsTakingQuiz(true);
    // setAnswer(activeQuiz.correctOption)
    // setActiveQuiz(activeQuiz)
  }
  

  const goToNextQuestion = ()=> {
    setSelectedOption(undefined);
    setAnswer(undefined);
    if (quizIndex < quizzes.length - 1) {
      setQuizIndex(quizIndex + 1);
    } else {
      if(activeBigLesson && bigLessons.indexOf(activeBigLesson)+1 < bigLessons.length-1) {
        setActiveBigLesson(bigLessons[bigLessons.indexOf(activeBigLesson)+1])
      }
      setIsTakingQuiz(false)
      setQuizCompleted(true);
    }
  }

  const checkQuizAnswer = ()=> {
    checkAnswer();
    setTimeout(() => {
      setAnswer(undefined);
      setSelectedOption(undefined);
      if (quizIndex < quizzes.length - 1) {
        setQuizIndex(quizIndex + 1);
      } else {
        if(activeBigLesson && bigLessons.indexOf(activeBigLesson)+1 < bigLessons.length-1) {
          setActiveBigLesson(bigLessons[bigLessons.indexOf(activeBigLesson)+1])
        }
        setIsTakingQuiz(false)
        setQuizCompleted(true);
      }
    }, 1000);
  }

  
  const Option = ({ option }: { option: string }) => {


    const getColor =()=> {
  
      if(option===selectedOption){
        if(answer){
          if(answer===option){
            return "bg-[#5ECA69]"
          }else{
            return "bg-red-600"
          }
        }
        return "bg-yellow-500"
    }else{
      if(answer && option===answer){
        return "bg-[#5ECA69]"
      }
      return "bg-[#B488D4]"
    }
  }

    return (
      <div
        onClick={() => setSelectedOption(option)}
        className={` mx-auto hover:bg-yellow-500

      ${getColor()}
      flex justify-center items-center rounded-[96px] text-2xl font-bold w-[400px] h-[93px] transition-all cursor-pointer hover:scale-110 hover:text-white`}
      >
        {option}
      </div>
    );
  };

  const LessonContent = () => {
    return (
      <section
        className={`relative min-h-[50%]   bg-[#662C91] min-w-full h-fit w-fit text-white  rounded-[90px] bg-no-repeat  overflow-clip row-span-4  grid gap-4  items-center justify-center ${
          activeLesson?.images[0].avatar
            ? "pr-8 bg-[#662C91] grid bg-[url('/lessonBgRobot.svg')] bg-right grid-cols-2"
            : "p-32 flex bg-black bg-[url('/noimgbg.svg')] bg-cover text-center"
        }`}
      >
        {isTakingQuiz && !quizCompleted ? (
          <div className="flex flex-col gap-12 p-16 col-span-2 text-center">
            <h1 className="text-7xl font-bold">Q{quizIndex + 1}</h1>
            <h1 className="text-3xl">{activeQuiz.question}</h1>
            <div className="grid gap-4 grid-cols-2 place-content-center items-center justify-center">
              {activeQuiz.options &&
                activeQuiz.options.map(
                  ({ option, _id }: { option: string; _id: number }) => (
                    <Option key={_id} option={option} />
                  )
                )}
            </div>
          </div>
        ) : (
          <>
            <div className="">
              {activeLesson?.images[0].avatar && (
                <div className="">
                  <Image
                    className="absolute top-[5%] right-[5%]"
                    height={40}
                    width={40}
                    src="/lightBulb.svg"
                    alt="light bulb"
                  />
                  <div className="w-full h-full ">
                    <Image
                      src={activeLesson?.images[0].avatar}
                      height={4770}
                      width={4540}
                      alt="lesson image"
                    />
                  </div>
                </div>
              )}
            </div>
            <div className="text-left z-10">
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

  return (
    <main className=" bg-purple bg-[url('/adinkra.svg')] min-h-screen  bg-blend-overlay">
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
      <section className="flex min-h-[calc(100vh-5rem)]  text-white">
        <aside className="min-w-[200px]  py-10 w-[30%] flex flex-col justify-between items-center">
          <div className="flex flex-col h-full gap-4 w-full items-center m-0">
            <Image
              src="/lessonsRobot.svg"
              height={300}
              width={300}
              alt="lessons Robot"
            />
            {/* <ul className="flex flex-col gap-8"> */}
            {bigLessons.map((lesson, index) => (
              // <details key={index} className="">
              <button
                disabled={isTakingQuiz}
                key={index}
                className={`${
                  lesson.subject === activeBigLesson?.subject ?
                  "text-purple bg-white rounded-l-[25px]" : ""
                } p-4 h-[70px] w-full -mr-4 cursor-pointer text-2xl text-left font-bold `}
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
        <main className="w-full min-h-full max-h-fit p-16 bg-white grid grid-rows-[auto,auto] gap-16 ">
          <LessonContent />
          <div className="w-full flex justify-between items-center">
            <div className="">
              {currentIndex !== 0 && (
                <Button
                  onClick={goToPrevious}
                >
                  Previous
                </Button>
              )}
            </div>
            <div className="">
              {activeBigLesson &&
                (currentIndex !== activeBigLesson.lessons.length - 1 &&
                !quizCompleted ? (
                  <Button
                    onClick={goToNext}
                    disabled={isTakingQuiz}
                  >
                    Next
                  </Button>
                ) : currentIndex === activeBigLesson.lessons.length - 1 &&
                  quizzes &&
                  !isTakingQuiz ? (
                  <Button
                    onClick={takeQuiz}
                  >
                    Take Quiz
                  </Button>
                ) : isTakingQuiz ? (
                  !selectedOption ? (
                    <Button
                      disabled={Boolean(!answer)}
                      onClick={goToNextQuestion}
                    >
                      Next Question
                    </Button>
                  ) : (!quizCompleted &&
                    <Button
                      disabled={Boolean(answer)}
                      onClick={checkQuizAnswer}
                    >
                      Check Answer
                    </Button>
                  )
                ) : (
                  <Link
                    href={"https://lesson1-robolabssimulation.vercel.app/"}
                    onClick={() => localStorage.removeItem("module-data")}
                  >
                    <Button>Go To Simulation</Button>
                  </Link>
                ))}
            </div>
          </div>
        </main>
        {/* <pre>{JSON.stringify(activeBigLesson,null,2)}</pre> */}
        {/* <pre>{JSON.stringify(quizzes, null, 2)}</pre> */}
      </section>
    </main>
  );
};

export default Lesson;
