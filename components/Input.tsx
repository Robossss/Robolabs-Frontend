import Image from "next/image";
import React, { useState } from "react";
import {AiFillEye,AiFillEyeInvisible} from "react-icons/ai"
export interface InputInterface {
  img: string;
  name: "firstName" | "lastName" | "username" | "password" |"confirmPassword";
  placeholder: string;
}

const Input = React.forwardRef<HTMLInputElement,InputInterface>((props, ref) => {
  const [show,setShow]= useState(false)
  return (
    <div className="bg-white px-2 h-14 w-96 gap-4 items-center rounded-lg flex ">
      <i>
        <Image height={20} width={20} src={props.img} alt="icon" />
      </i>
      <input  type={show?'text':props.name==='password' || props.name==='confirmPassword' ? "password":show?'text':undefined} {...props} ref={ref} className="text-black w-full focus:outline-none" />
      {
        (props.name==='password' || props.name==='confirmPassword') &&
      <i className="text-black" onClick={()=>setShow(!show)}>{show?<AiFillEyeInvisible/>:<AiFillEye/>}</i>
      }
    </div>
  );
});

Input.displayName = "Input"
export default Input
