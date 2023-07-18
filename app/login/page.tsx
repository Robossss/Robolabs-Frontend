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
      toast.success('login successful',{
        autoClose: 1500
      })
      setTimeout(() => {
        router.push("/lessons");
      }, 2000);
    } catch (error: any) {
      console.error(error.response.data.message);
      toast.error(error.response.data.message);
      reset()
    }
  };

  return (<>
  {
    isSubmitting ?<Loading/>
    :
    <main className=" flex items-center justify-center h-screen max-h-[982px] w-full bg-blend-overlay bg-black/80 bg-[url('/login.svg')] bg-cover">
      <section className="bg-[rgba(015,18,20,0.74)] py-14 px-20 flex flex-col items-center gap-4">
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

          <Button disabled={isLoading}>Sign In</Button>
        </form>
        <Link href="/signup">
          <p className="text-white">
            Don&#39;t have an account ?{" "}
            <span className="text-blue-500 cursor-pointer">Sign Up</span>
          </p>
        </Link>
      </section>
    </main>
  }
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
theme="dark"
/>
  </>
  );
};

export default Login;
