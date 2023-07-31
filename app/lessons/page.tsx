"use client";
import Image from "next/image";
import LessonCard from "./LessonCard";
import ImageCarousel from "./ImageCarousel";
import { GetServerSideProps } from "next";
import axios from "axios";
import { baseUrl } from "@/constants";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { Module } from "module";
import { useRouter } from "next/navigation";
import { boolean } from "zod";

export type Module = {
  _id: number;
  name: string;
  __v: number;
};

const Lessons = () => {
  const router = useRouter()
  const [data, setData] = useState<{ progress: []; modules: Module[] }>();
  const sections = ["featured", "in progress", "completed"];
  const [activeSection, setActiveSection] = useState(sections[0]);
  
  const getModules = async (url: string, config: any) => {
    const data =localStorage.getItem("module-data")
    if(data){
      setData(JSON.parse(data))
      // console.log("using cached data")
    }else {
      try {
        const response = await axios.get(url, config);
        setData(response.data[0]);
        localStorage.setItem("module-data",JSON.stringify(response.data[0],null,2))
        toast.success("Modules loaded")
      } catch (error: any) {
        // console.log(error.response.data.message);
        // if(error.response){
          toast.error(error.response?.data.message || error.message);
          console.log(error.response?.data.message || error.message);
  
        // }else{
        //   console.log(error)
        //   toast("Something went wrong")
        // }
      }
    }
  };
  useEffect(() => {
    toast.info('Loading Modules',{
      autoClose: false
    })
    const url = baseUrl + "module";

    const token = localStorage.getItem("user-token");
    getModules(url, { headers: { Authorization: `Bearer ${token}` } });
   setUsername(localStorage.getItem("username") || "no user")
    setRole(localStorage.getItem("user-role") || "student")
    toast.dismiss()
  }, []);

  const [username, setUsername] = useState("Jon Doe");
  const [role, setRole] = useState("student");

  let modules;
  if (activeSection === "featured") {
    modules = data?.modules;
  } else if (activeSection === "in progress") {
    modules = data?.progress
  }else {
    modules = data?.progress.filter(item=> item["completed"]===100)
    //   modules = data?.progressType = "Completed"
  }
  // console.log(activeSection)

  return (<>
    <main className="bg-white text-white min-h-screen ">
      
      <section className="h-1/2 bg-purple bg-[url('/adinkra.svg')] bg-blend-overlay">

      <header className=" p-5 flex justify-between items-center">
        <Image className=" cursor-pointer" onClick={()=>router.push("/")} src="/logo2.svg" alt="logo" width={200} height={20} />
        <div className="flex gap-4">
          <div className="flex gap-4">
            <Image src="/box.svg" alt="Coding Area" width={20} height={20} />
            <Image src="/chat.svg" alt="Chat" width={20} height={20} />
          </div>
          <div className="flex gap-4 border-l-2 border-[#2D95B2] px-4">
            <Image
              src="/recommendation1.png"
              className="rounded-[50%]"
              alt="Profile"
              width={50}
              height={50}
            />
            <div className="flex flex-col">
              <h1 className="text-xl capitalize">{username}</h1>
              <p className="text-sm uppercase">{role}</p>
            </div>
          </div>
        </div>
      </header>
      {/* <ImageCarousel username={username}/> */}
      <div className="grid grid-cols-2">
        <Image width={632} height={632} src="/lessonsRobot.svg" alt="lessons robot"/>
        <div className="flex flex-col items-center">
          <Image width={270} height={270} src="/personalRobot.svg" alt="personal robot"/>
          <h1 className="text-5xl font-extrabold capitalize">Hello {username}</h1>
          <p className="text-3xl font-semibold">Welcome to Your Dashboard</p>
        </div>
      </div>
      </section>
      <section className="py-10">

      <div className=" px-16 py-6 mb-5 flex gap-16">
        {sections.map((section, index) => (
          <button
            onClick={() => setActiveSection(section)}
            key={index}
            className={`${
              section === activeSection ? " bg-[#E27902]  text-white  whitespace-nowrap":"bg-transparent text-black"
            }   capitalize rounded-3xl font-bold w-[165px] h-[52px] transition-all hover:scale-110 hover:text-white hover:bg-[#E27902]`}
          >
            {section}
          </button>
        ))}
      </div>
      <div className="grid gap-16">
      {modules && modules.length> 0 ?
        modules.map((item) => <LessonCard key={item._id} {...item} />): <h1 className="text-black text-[35px] font-bold text-center">No modules {activeSection}</h1>}
        </div>
      </section>
<pre className="text-black">{JSON.stringify(data,null,2)}</pre>
    </main>
    <ToastContainer
position="top-center"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
/>
    </>
  );
};

export default Lessons;
