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
    formState: { errors, isSubmitting },
  } = useForm<Inputs>({
    defaultValues: {
      firstName: "",
      lastName: "",
      username: "",
      password: "",
      confirmPassword: "",
      role: "",
    },
    resolver: zodResolver(userInfoSchema),
  });
  const router = useRouter()

  const submitData: SubmitHandler<Inputs> = async (data) => {
    const url = baseUrl + "auth/register";
    const { confirmPassword, ...newData } = data;
    console.log(newData);
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
      toast.success("login successful", {
        autoClose: 1500,
      });
      setTimeout(() => {
        router.push("/lessons");
      }, 2000);
      console.log(response);
    } catch (error:any) {
      console.error(error);
      toast.error(error.response.data.message);
      reset()

    }
  };

  return (
    <>
      {isSubmitting ? (
        <Loading />
      ) : (
        <main className=" flex items-center justify-center h-[1041px] w-full bg-blend-overlay bg-black/80 bg-[url('/signup.svg')] bg-cover">
          <section className="bg-[rgba(015,18,20,0.74)] py-14 px-20 flex flex-col items-center">
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
                  <div key={index}>
                    <Input {...input} {...register(input.name)} />
                    {errors[`${input.name}`]?.message && (
                      <div className="h-2 text-red-600 text-xs flex justify-center items-start">
                        {errors[`${input.name}`]?.message}
                      </div>
                    )}
                  </div>
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
              <Button>Join Robolabs</Button>
            </form>

            <Link href="/login">
              <p className="text-white">
                Already have an account ?{" "}
                <span className="text-blue-500 cursor-pointer">Sign In</span>
              </p>
            </Link>
          </section>
        </main>
      )}
    </>
  );
};

export default SignUp;
