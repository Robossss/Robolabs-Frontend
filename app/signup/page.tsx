"use client"
import Image from "next/image"
import Link from "next/link"

import {useForm, SubmitHandler} from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod";


import Button from "@/components/Button"
import Input from "@/components/Input"
import { signUpInputs } from "@/components/inputs"
import { userInfoSchema } from "../userInfo";


type Inputs = {
  firstname:string,
  lastname:string,
  username:string,
  password:string,
  role:string,
}

const SignUp = () => {
  const {register,handleSubmit,formState: {errors,isSubmitting}} = useForm<Inputs>({
    resolver:zodResolver(userInfoSchema)
  })

  const onSubmit:SubmitHandler<Inputs> = (data)=>console.log(data)

  return (
    <main className=" flex items-center justify-center h-[1041px] w-full bg-blend-overlay bg-black/80 bg-[url('/signup.svg')] bg-cover">
        <section className="bg-[rgba(015,18,20,0.74)] py-14 px-20 flex flex-col items-center">
        <Image src="/logo1.svg" height={130} width={170} alt="logo" />
            <h1 className="text-2xl mb-7 text-white font-bold my-2">Welcome to RoboLabs</h1>
            <form action="" className="flex flex-col items-center gap-4" onSubmit={handleSubmit(onSubmit)}>

            {
              signUpInputs.map((input,index)=>{
              return (<>
                <Input  key={index} {...input} {...register(input.name)} />
                {errors[`${input.name}`]?.message && <div className="h-1 text-xs flex justify-center items-center">{errors[`${input.name}`]?.message}</div>}
              </>
                )
              })
            }
            <div className="bg-white px-2 h-14 w-96 rounded-lg flex items-center text-black">
            <select {...register("role")} name="role" id='role' placeholder="Select your Role" className="w-full focus:outline-none" >
            <option selected={true} disabled={true}>Select Role</option>
            <option value="admin">Admin</option>
            <option value="student">Student</option>
            </select>
            </div>
            <Button>Join Robolabs</Button>

            </form>
            <Link href="/login">
            <p className="text-white">Already have an account ? <span className="text-blue-500 cursor-pointer">Sign In</span></p>
            </Link>
        </section>

    </main>
  )
}

export default SignUp