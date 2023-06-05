"use client";
import Image from "next/image";
import Link from "next/link";

import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import Button from "@/components/Button";
import Input from "@/components/Input";
import { loginInputs } from "@/components/inputs";
import { type } from "os";
import { userInfoSchema } from "../userInfo";

type Inputs = {
  username: string;
  password: string;
};

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Inputs>({
    resolver:zodResolver(userInfoSchema)
  });

  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  return (
    <main className=" flex items-center justify-center h-screen max-h-[982px] w-full bg-blend-overlay bg-black/80 bg-[url('/login.svg')] bg-cover">
      <section className="bg-[rgba(015,18,20,0.74)] py-14 px-20 flex flex-col items-center gap-4">
        <Image src="/logo1.svg" height={130} width={170} alt="logo" />
        <h1 className="text-2xl mb-7 text-white font-bold">
          Welcome to RoboLabs
        </h1>
        <form
          action=""
          className="flex flex-col items-center gap-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          {loginInputs.map((input, index) => {
            return (
              <>
            <Input key={index} {...input} {...register(input.name)} />
            {errors[`${input.name}`]?.message && <div className="h-1 text-xs flex justify-center items-center">{errors[`${input.name}`]?.message}</div>}
              </>
            )
          })}
          <Button>Sign In</Button>
        </form>
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
