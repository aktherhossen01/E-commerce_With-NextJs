import { z } from "zod";

export const registerValidationSchema = z.object({
    name:z.string({
        required_error:"First Name is Required"
    }).max(40, "First name must be between 2 and 40 characters")
    .min(2,"First name must be between 2 and 40 charters")
    ,
    email:z.string({
        required_error:"Email is required"
    }).email("Invalid email address")
    ,
    password:z.string({
        required_error:"Password Confirmation is required"
    }).min(8,"password must be at least 8 characters"),
    passwordConfirm:z.string({required_error:"Password is required"}).min(1)
})