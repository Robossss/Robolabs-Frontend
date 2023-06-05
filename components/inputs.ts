import { InputInterface } from "./Input"
interface LoginInterface extends InputInterface {
name:"username" | "password"
}

export const loginInputs:LoginInterface[]= [
    {
        img:"/user.svg",
        name:"username",
        placeholder:"Enter your Username"
    },
    {
        img:"/padlock.svg",
        name:"password",
        placeholder:"Enter your Password"
    },
]

export const signUpInputs:InputInterface[] = [
    {
        img:"/user.svg",
        name:"firstname",
        placeholder:"Enter your First Name"
    },
    {
        img:"/user.svg",
        name:"lastname",
        placeholder:"Enter your Last Name"
    },
    {
        img:"/user.svg",
        name:"username",
        placeholder:"Enter your Username"
    },
    {
        img:"/padlock.svg",
        name:"password",
        placeholder:"Enter your Password"
    },
    {
        img:"/padlock.svg",
        name:"password",
        placeholder:"Confirm Password"
    },
]