import {z} from 'zod'

export const role = [
    'admin',
    'student'
]

export const userInfoSchema = z.object({
    email:z.string().email({message: 'Email is required'}),
    firstname:z.string().min(2, {message:'First name is required'}).max(24, {message: 'First name is too long'}),
    lastname:z.string().min(2, {message:'Last name is required'}).max(24, {message: 'Last name is too long'}),
    username:z.string().min(5, {message:'Username is too short'}).max(24, {message: 'Username is too long'}),
    password:z.string().min(8).max(25,{message:'password is too long'}),
    confirmPassword:z.string()
}).superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: "custom",
        message: "The passwords did not match"
      });
    }
});

type userInfoSchema = z.infer<typeof userInfoSchema>