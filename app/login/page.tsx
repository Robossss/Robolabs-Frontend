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
import Header from "@/components/Header";

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
    toast.loading('Signing you in')
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
      toast.dismiss()
      toast.success('login successful')
      setTimeout(() => {
        router.push("/lessons");
      }, 2000);
    } catch (error: any) {
      toast.error(error.response?.data.message  || error.response || "Network Error");
      setTimeout(() => toast.dismiss(), 5000);
      // setTimeout(() => submitData(userData), 5000);
    }
  };

  return (<>
{/* <ToastContainer theme="dark" /> */}
    <main className=" h-screen  bg-purple bg-[url('/loginFlower.svg')] flex flex-col items-center justify-between overflow-clip  bg-contain bg-left-top bg-no-repeat ">
<Header/>
<section className="flex justify-center items-center">

      <div className="grid grid-cols-1 lg:grid-cols-2 items-center justify-center gap-10 h-full  w-full">
        <div className="flex items-center justify-center">
        <Image className="self-center" src="/loginImage.svg" width={836} height={856} alt=""/>
        </div>
      <section className=" px-20 flex flex-col items-center justify-center gap-4">
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
</section>
    </main>
  </>
  );
};

export default Login;
