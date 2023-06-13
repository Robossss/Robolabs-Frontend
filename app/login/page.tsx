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

type Inputs = {
  username: string,
  password: string,
};

const Login = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<Inputs>({
    defaultValues: {
      username: "",
      password: "",
    },
    resolver: zodResolver(loginInfoSchema),
  });

  const submitData: SubmitHandler<Inputs> = (data) => {
    console.log(data);
    // alert("success")
    const baseUrl = "https://robolabs-final-project.onrender.com/api/v1/"
    const url = baseUrl +"auth/login/"
    axios.post(url,data).then(response=> {console.log(response)}).catch(error=>{console.log(error)})
  };

  return (
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
          <Button>Sign In</Button>
        </form>
        {/* <pre>{JSON.stringify(watch(),null,2)}</pre> */}
        <Link href="/signup">
          <p className="text-white">
            Don&#39;t have an account ?{" "}
            <span className="text-blue-500 cursor-pointer">Sign Up</span>
          </p>
        </Link>
      </section>
    </main>
  );
};

export default Login;
