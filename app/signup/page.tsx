"use client";
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
import {  toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";

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
    toast.loading('Signing you up',{
      autoClose: false
    })
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
      toast.dismiss
      toast.success("Account created successfully");
      setTimeout(() => {
        router.push("/lessons");
      }, 2000);

    } catch (error:any) {
      toast.error(error.response?.data.message  || error.response || "Network Error");
      setTimeout(() => toast.dismiss, 2000);
      // setTimeout(() => submitData(data), 3000);
    }
    
  };


  return (
    <>
          {/* <ToastContainer theme="dark" /> */}
        <main className=" min-h-screen h-full bg-purple bg-[url('/flower.svg')] bg-contain bg-left-top bg-no-repeat ">
          <Header/>
          <section className="flex justify-center items-center h-full">

          <div className="grid grid-cols-1 lg:grid-cols-2 items-center h-full w-full">

            <Image className="" src="/signupImage.svg" width={836} height={856} alt=""/>
          <section className=" px-20 flex flex-col items-center">
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
              <div className="bg-white px-2 h-14 w-96 rounded-3xl flex items-center text-black">
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
                <div className="h-1 text-white text-xs flex justify-center items-center">
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
          </section>
        </main>
    </>
  );
};

export default SignUp;
