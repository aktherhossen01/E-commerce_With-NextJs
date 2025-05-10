import { z } from "zod";

export const loginValidationSchema = z.object({
  
    email:z.string({
        required_error:"Email is required"
    }).email("Invalid email address")
    ,
    password:z.string({
        required_error:"Password Confirmation is required"
    }).min(8,"password must be at least 8 characters"),
   
})