"use client";
import Image from "next/image";
import Link from "next/link";

import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import Button from "@/components/Button";
import Input from "@/components/Input";
import { loginInputs } from "@/components/inputs";
import { loginInfoSchema } from "../userInfo";
import axios from "axios";
import { baseUrl } from "@/constants";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loading from "../loading";

type Inputs = {
  username: string;
  password: string;
};

const Login = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isLoading },
  } = useForm<Inputs>({
    defaultValues: {
      username: "",
      password: "",
    },
    resolver: zodResolver(loginInfoSchema),
  });
  const router = useRouter();

  const submitData: SubmitHandler<Inputs> = async (userData) => {
    if(isSubmitting){
      toast.info('Submitting Form')
    }
    const url = baseUrl + "auth/login";
    try {
      const response = await axios.post(url, userData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = response.data;
      const token = data.token;
      if (!token) {
        console.error("No token available");
        return;
      }
      localStorage.clear();
      localStorage.setItem("user-token", token);
      localStorage.setItem("username", userData.username);
      toast.success('login successful')
      setTimeout(() => {
        router.push("/lessons");
      }, 2000);
    } catch (error: any) {
      toast.error(error.response.data.message);
      reset()
    }
  };

  return (<>
{/* <ToastContainer theme="dark" /> */}
    <main className=" flex justify-center items-center h-screen bg-purple bg-[url('/flower.svg')] bg-contain bg-left-top bg-no-repeat ">
      <div className="grid grid-cols-1 lg:grid-cols-2 h-full max-h-[1041px] w-full">

          <div className="flex items-end h-4/5 min-h-[700px] overflow-visible w-full">
            <Image className=" hidden lg:flex" src="/orangeRobot.svg" width={836} height={856} alt=""/>
            <Image className="hidden lg:flex -translate-x-1/2 w-1/2 self-end" src="/orangeSmallRobot.svg" width={836} height={856} alt=""/>

          </div>
      <section className=" py-14 px-20 flex flex-col items-center justify-center gap-4">
        <Image src="/logo1.svg" height={130} width={170} alt="logo" />
        <h1 className="text-2xl mb-7 text-white font-bold">
          Welcome to RoboLabs
        </h1>
        <form
          className="flex flex-col items-center gap-4"
          onSubmit={handleSubmit(submitData)}
        >
          {loginInputs.map((input, index) => {
            return (
              <Input key={index} {...input} error={errors[`${input.name}`]} {...register(input.name)} />
            );
          })}

          <Button disabled={isLoading}>Sign In</Button>
        </form>
        <Link href="/signup">
          <p className="text-white">
            Don&#39;t have an account ?{" "}
            <span className="text-blue-500 cursor-pointer">Sign Up</span>
          </p>
        </Link>
      </section>
      </div>
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

export default Login;
