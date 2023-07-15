"use client";
import Image from "next/image";
import LessonCard from "./LessonCard";
import ImageCarousel from "./ImageCarousel";
import { GetServerSideProps } from "next";
import axios from "axios";
import { baseUrl } from "@/constants";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Module } from "module";

export type Module = {
  _id: number;
  name: string;
  __v: number;
};

const Lessons = () => {
  const [data, setData] = useState<{ progress: []; modules: Module[] }>();
  const sections = ["featured", "in progress", "completed"];
  const [activeSection, setActiveSection] = useState(sections[0]);

  const getModules = async (url: string, config: any) => {
    try {
      const response = await axios.get(url, config);
      // console.log(response.data[0])
      setData(response.data[0]);
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  };
  useEffect(() => {
    const url = baseUrl + "module";

    const token = localStorage.getItem("user-token");
    getModules(url, { headers: { Authorization: `Bearer ${token}` } });
   setUsername(localStorage.getItem("username") || "no user")
    setRole(localStorage.getItem("role") || "role")
  }, []);
  // console.log(data)

  const [username, setUsername] = useState("player 1");
  const [role, setRole] = useState("killer");

  let modules;
  if (activeSection === "featured") {
    modules = data?.modules;
  } else if (activeSection === "in progress") {
    modules = data?.progress;
    console.log(data?.progress, modules, "hi");
  }
  // console.log(modules,"modules")

  return (
    <main className="">
      <header className="bg-[#1E1E1E] p-5 flex justify-between items-center">
        <Image src="/logo2.svg" alt="logo" width={200} height={20} />
        <div
          className="flex items-center  border-2
         border-[#2D95B2] rounded-xl px-3 py-1"
        >
          <i>
            <Image src="/searchicon.svg" height={20} width={20} alt="search" />
          </i>
          <input
            type="search"
            className="outline-none bg-transparent text-center"
            placeholder="Search Courses"
          />
        </div>
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
              <p className="text-sm">{role}</p>
            </div>
          </div>
        </div>
      </header>
      <ImageCarousel />
      <div className=" px-16 py-6 flex gap-16">
        {sections.map((section, index) => (
          <button
            onClick={() => setActiveSection(section)}
            key={index}
            className={`${
              section === activeSection && "bg-gray-800"
            } bg-transparent hover:bg-gray-800 px-4 py-2 rounded-sm capitalize`}
          >
            {section}
          </button>
        ))}
      </div>
      {modules &&
        modules.map((item: Module) => <LessonCard key={item._id} {...item} />)}
    </main>
  );
};

export default Lessons;
