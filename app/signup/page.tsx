"use client";
import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import Button from "@/components/Button";
import Input from "@/components/Input";
import { signUpInputs } from "@/components/inputs";
import { userInfoSchema } from "../userInfo";
import axios from "axios";
import { baseUrl } from "@/constants";
import Loading from "../loading";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";

type Inputs = {
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  confirmPassword: string;
  role: string;
};

const SignUp = () => {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting,isLoading },
  } = useForm<Inputs>({
    resolver: zodResolver(userInfoSchema),
  });
  const router = useRouter()

  const submitData: SubmitHandler<Inputs> = async (data) => {
    if(isSubmitting){
      toast.info('Submitting Form')
    }
    const url = baseUrl + "auth/register";
    const { confirmPassword, ...newData } = data;
    try {
      const response = await axios.post(url, newData, {
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
      localStorage.setItem("username", newData.username);
      localStorage.setItem("user-role", newData.role);
      toast.success("Account created successfully");
      setTimeout(() => {
        router.push("/lessons");
      }, 2000);

    } catch (error:any) {
      toast.error(error.response.data.message);
    }
    
  };


  return (
    <>
          {/* <ToastContainer theme="dark" /> */}
        <main className=" flex justify-center items-center h-screen bg-purple bg-[url('/flower.svg')] bg-contain bg-left-top bg-no-repeat ">
          <div className="grid grid-cols-1 lg:grid-cols-2 h-full max-h-[1041px] w-full">

          <div className="flex items-end  min-h-[700px] overflow-visible w-full">
            <Image className=" hidden lg:flex" src="/deepOrangeRobot.svg" width={836} height={856} alt=""/>
            <Image className="hidden lg:flex -translate-x-1/2 w-1/2 self-end" src="/deepOrangeSmallRobot.svg" width={836} height={856} alt=""/>

          </div>
          <section className=" py-14 px-20 flex flex-col items-center">
            <Image src="/logo1.svg" height={130} width={170} alt="logo" />
            <h1 className="text-2xl mb-7 text-white font-bold my-2">
              Welcome to RoboLabs
            </h1>
            <form
              className="flex flex-col items-center gap-4"
              onSubmit={handleSubmit(submitData)}
            >
              {signUpInputs.map((input, index) => {
                return (
                    <Input key={index} {...input} error={errors[`${input.name}`]} {...register(input.name)} />
                );
              })}
              <div className="bg-white px-2 h-14 w-96 rounded-lg flex items-center text-black">
                <select
                  {...register("role")}
                  name="role"
                  id="role"
                  className="w-full text-black focus:outline-none"
                >
                  <option value="">Select Role</option>
                  <option value="admin">Admin</option>
                  <option value="student">Student</option>
                </select>
              </div>
              {errors.role?.message && (
                <div className="h-1 text-red-600 text-xs flex justify-center items-center">
                  {errors.role?.message}
                </div>
              )}
              <Button disabled={isLoading}>Join Robolabs</Button>
            </form>

            <Link href="/login">
              <p className="text-white">
                Already have an account ?{" "}
                <span className="text-blue-500 cursor-pointer">Sign In</span>
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

export default SignUp;
