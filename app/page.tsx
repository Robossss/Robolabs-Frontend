import Image from "next/image";
import Link from "next/link";

import Button from "@/components/Button";
import { profiles } from "./profiles";
import ProfileCard from "./ProfileCard";
import { recommendations } from "./recommendations";
import RecommendationCard from "./RecommendationCard";

export default function Home() {
  return (
    <main className="text-white m-auto">
      <section id="home" className=" max-h-[1440px] bg-purple bg-[url('/flower.svg')] bg-contain bg-right bg-no-repeat ">
        <header className="text-gray-300  h-[100px] pl-8 flex justify-between items-center">
          <Image src="/logo2.svg" alt="logo" width={200} height={20} />
          <nav className="w-72 max-w-[50%] mx-24">
            <ul className="flex justify-between items-center">
              <Link href="#home">
                <li className="hover:text-white cursor-pointer">Home</li>
              </Link>
              <Link href="#about">
                <li className="hover:text-white cursor-pointer">About</li>
              </Link>
              <Link href="#features">
                <li className="hover:text-white cursor-pointer">Features</li>
              </Link>
              <Link href="#">
                <li className="hover:text-white cursor-pointer">Pricing</li>
              </Link>
            </ul>
          </nav>
        </header>
        <div className=" grid grid-cols-2 p-4">

        <div  className="text-center flex flex-col items-center justify-center mb-16">
          <div className="flex -mt-16">
            <Image src="/heroImage1.svg" width={235} height={212} alt="hero image"/>
            <Image src="/heroImage2.svg" width={207} height={386} alt="hero image"/>
            <Image src="/heroImage3.svg" width={385} height={377} alt="hero image"/>
          </div>
          <h1 className=" text-5xl font-extrabold">
            Join the Robotics Revolution.
            <br />
            Learn, Create, Innovate with Us!
          </h1>
          <p className="my-6">
            Unlock Your Potential in Robotics with Personalized Tutoring
          </p>
          <Link href="/login">
            <Button>Get Started</Button>
          </Link>
          {/* <button className="rounded-md my-6 bg-[#2D95B2] py-4 px-10 text-2xl font-bold">Get Started</button> */}
        </div>
        <div className="">
          <Image width={4500} height={4500} src="/silverRobot.svg" alt="silver robot"/>
        </div>
        </div>
      </section>
      <section id="features" className="bg-lightPurple h-full py-36 px-12">
        <h1 className="text-3xl font-bold text-center">RoboLabs For All Individuals</h1>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 my-16 gap-8 2xl:gap-32">
          {profiles.map((profile, index) => (
            <ProfileCard key={index} {...profile} />
          ))}
        </div>
      </section>
      <section id="about" className="bg-purple bg-[url('/adinkra.svg')] bg-blend-overlay bg-cover [&>*>h1]:text-3xl [&>*>h1]:mb-10 py-28 px-10 [&>*]:mb-52">
        <div className="flex flex-col items-center text-center ">
          <h1>Who are we ?</h1>
          <p className="w-1/2 min-w-[500px]">
            RoboFlow is a leading online learning platform designed to empower
            individuals with the skills and knowledge needed to excel in the
            field of robotics programming. With a focus on hands-on learning,
            RoboFlow offers a comprehensive curriculum that covers a wide range
            of topics, including robot design, programming, and control.
          </p>
        </div>
        <div className="flex flex-col items-center text-center ">
          <h1>Mission Statement</h1>
          <p className="w-[80%] min-w-[500px]">
            At RoboFlow, our mission is to make robotics education accessible to
            everyone. Our user-friendly platform is designed to be easy to
            navigate, even for those with little or no programming experience
            Our courses are carefully crafted to be engaging, interactive, and
            fun, with a mix of video tutorials, practical exercises, and quizzes
            to reinforce learning.
          </p>
        </div>
        <div className="flex flex-col items-center">
          <h1>Testimonials</h1>
          <div className="grid grid-cols-3 mt-10">
            {recommendations.map((recommendation, index) => {
              return <RecommendationCard key={index} {...recommendation} />;
            })}
          </div>
        </div>
      </section>
    </main>
  );
}
