"use client";
import ReCAPTCHA from "react-google-recaptcha";
import Logo from "@/app/assets/svgs/Logo";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { loginValidationSchema } from "./loginValidation";
import Link from "next/link";
import { loginUser, rechaptchValidation } from "@/services/AuthService";
import { toast } from "sonner";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";


const LoginForm = () => {
  const form = useForm({
    resolver: zodResolver(loginValidationSchema),
  });

  const [reCaptchaStatus,setReCaptchaStatus]= useState(false)


  const searchParams = useSearchParams()
  const redirect = searchParams.get("redirectPath")
  const router = useRouter()

const handleRecaptcha=async(value:string | null)=>{
  try{

    const res = await  rechaptchValidation(value!)
    if(res?.success){
setReCaptchaStatus(true)
    }
  }catch(err:any){
    console.error(err);
    
  }
  
}

  const handleSubmit: SubmitHandler<FieldValues> = async(data) => {
    try{
        const res = await loginUser(data)
        if(res?.success){
            toast.success(res?.message)
            if(redirect){
              router.push(redirect)
            }else{
              router.push("/profile")
            }
        }else{
            toast.error(res?.message)
        }
    }catch(err:any){
        return Error(err)
    }
  };

  const {
    formState: { isSubmitting },
  } = form;
  return (
    <div className="max-w-md text-center flex-grow p-4 rounded-2xl border border-gray-300 w-full">
      <div className="flex items-center space-x-4 space-y-3 mb-4">
        <Logo />
        <div>
          <h1 className="text-xl font-semibold">Login</h1>
          <p className="font-extralight text-sm text-gray-600">
            Join us today and start your journey!
          </p>
        </div>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel />
                <FormControl>
                  <Input
                    placeholder="email"
                    {...field}
                    value={field.value || ""}
                  />
                </FormControl>
                <FormDescription />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel />
                <FormControl>
                  <Input
                    placeholder="password"
                    type="password"
                    {...field}
                    value={field.value || ""}
                  />
                </FormControl>
                <FormDescription />
                <FormMessage />
              </FormItem>
            )}
          />
            <ReCAPTCHA 
            sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_CLIENT_KEY as string} 
    onChange={handleRecaptcha}
            />

          <Button
          disabled={reCaptchaStatus ? false : true}
          className="w-full my-3" type="submit">
            {isSubmitting ? "Logging..." : "Login"}
          </Button>
        </form>
      </Form>
      <p className="mt-3 text-gray-500">
        Already Have an account ?{" "}
        <Link className="underline text-orange-400" href={"/register"}>
          {" "}
          Register
        </Link>
      </p>
    </div>
  );
};

export default LoginForm;
