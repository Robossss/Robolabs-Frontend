import Image from "next/image"
import Link from "next/link"

import Button from "@/components/Button"
import Input from "@/components/Input"
import { signUpInputs } from "@/components/inputs"

const SignUp = () => {
  return (
    <main className=" flex items-center justify-center h-[1041px] w-full bg-blend-overlay bg-black/80 bg-[url('/signup.svg')] bg-cover">
        <section className="bg-[rgba(015,18,20,0.74)] py-14 px-20 flex flex-col items-center gap-4">
        <Image src="/logo1.svg" height={130} width={170} alt="logo" />
            <h1 className="text-2xl mb-7 text-white font-bold">Welcome to RoboLabs</h1>
            {
          signUpInputs.map((input,index)=>{
              return (
                <Input key={index} {...input}/>
                )
              })
            }
            <div className="bg-white px-2 h-14 w-96 rounded-lg flex items-center text-black">
            <select placeholder="Select your Role" className="w-full focus:outline-none" >
            <option value="Teacher">Teacher</option>
            <option value="Student">Student</option>
            </select>
            </div>
            <Button text="Join Robolabs"/>

            <Link href="/login">
            <p className="text-white">Already have an account ? <span className="text-blue-500 cursor-pointer">Sign In</span></p>
            </Link>
        </section>

    </main>
  )
}

export default SignUp