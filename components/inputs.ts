import { InputInterface } from "./Input";
interface LoginInterface {
  img: string;
  name: "username" | "password";
  placeholder: string;
}

export const loginInputs: LoginInterface[] = [
  {
    img: "/user.svg",
    name: "username",
    placeholder: "Enter your Username",
  },
  {
    img: "/padlock.svg",
    name: "password",
    placeholder: "Enter your Password",
  },
];

export const signUpInputs: InputInterface[] = [
  {
    img: "/user.svg",
    name: "firstName",
    placeholder: "Enter your First Name",
  },
  {
    img: "/user.svg",
    name: "lastName",
    placeholder: "Enter your Last Name",
  },
  {
    img: "/user.svg",
    name: "username",
    placeholder: "Enter your Username",
  },
  {
    img: "/padlock.svg",
    name: "password",
    placeholder: "Enter your Password",
  },
  {
    img: "/padlock.svg",
    name: "confirmPassword",
    placeholder: "Confirm Password",
  },
];
