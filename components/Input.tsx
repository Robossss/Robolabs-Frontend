import Image from "next/image";
import React from "react";
export interface InputInterface
  // extends React.InputHTMLAttributes<HTMLInputElement> 
  {
  img: string;
  name: "firstname" | "lastname" | "username" | "password" |"confirmPassword";
  placeholder: string;
}

const Input = React.forwardRef<HTMLInputElement,InputInterface>((props, ref) => {
  
  return (
    <div className="bg-white px-2 h-14 w-96 gap-4 items-center rounded-lg flex ">
      <i>
        <Image height={20} width={20} src={props.img} alt="icon" />
      </i>
      <input  type={props.name==='password' || props.name==='confirmPassword' ? "password":undefined} {...props} ref={ref} className="text-black w-full focus:outline-none" />
    </div>
  );
});

Input.displayName = "Input"
export default Input
