import Image from "next/image";
import React, { useState } from "react";
import { FieldError } from "react-hook-form";
import {AiFillEye,AiFillEyeInvisible} from "react-icons/ai"
export interface InputInterface {
  img: string;
  name: "firstName" | "lastName" | "username" | "password" |"confirmPassword";
  placeholder: string;
  error?:FieldError
}

const Input = React.forwardRef<HTMLInputElement,InputInterface>((props, ref) => {
  const [show,setShow]= useState(false)
  return (
    <div className="">

    <div className=" bg-white px-4 h-14 w-96 gap-4 items-center rounded-3xl flex ">
      <i>
        <Image height={20} width={20} src={props.img} alt="icon" />
      </i>
      <input  type={show?'text':props.name==='password' || props.name==='confirmPassword' ? "password":show?'text':undefined} {...props} ref={ref} className="text-black w-full focus:outline-none" />
      {
        (props.name==='password' || props.name==='confirmPassword') &&
      <i className="text-black cursor-pointer" onClick={()=>setShow(!show)}>{show?<AiFillEyeInvisible/>:<AiFillEye/>}</i>
      }
    </div>
    {props.error?.message && (
                      <div className="h-fit p-0 m-0 text-white text-xs flex justify-center text-center flex-wrap w-96 items-start">
                        {props.error?.message}
                      </div>
                    )}
    </div>
  );
});

Input.displayName = "Input"
export default Input
