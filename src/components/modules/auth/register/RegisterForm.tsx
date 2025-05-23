

"use client";


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
import Link from "next/link";
import {  FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { registerValidationSchema } from "./registerValidation";
import { registerUser } from "@/services/AuthService";
import { toast } from "sonner";
import { useUser } from "@/context/UserContext";

const RegisterForm = () => {

const {setIsLoading}=useUser()

  const form = useForm({
    resolver:zodResolver(registerValidationSchema)
  });

  

  const handleSubmit:SubmitHandler<FieldValues> = async(data) => {
    try{
        const res = await registerUser(data)
        setIsLoading(true)
       if(res?.success){
        toast.success(res?.message)
       }else{
        toast.error(res?.message)
       }
        
    }catch(err:any){
        console.error(err);
        
    }
  };

  const {formState:{isSubmitting}}= form

const password = form.watch('password')
  const passwordConfirm = form.watch('passwordConfirm')

  return (
    <div className="max-w-md text-center flex-grow p-4 rounded-2xl border border-gray-300 w-full">
<div className="flex items-center space-x-4 space-y-3 mb-4">
<Logo/>
    <div>

          <h1 className="text-xl font-semibold">Register</h1>
          <p className="font-extralight text-sm text-gray-600">
            Join us today and start your journey!
          </p>
    </div>
        </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Input"
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
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Input"
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
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    placeholder="password" type="password"
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
            name="passwordConfirm"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Input"
                    {...field}
                    value={field.value || ""}
                  />
                </FormControl>
                {
                    passwordConfirm && password !== passwordConfirm? <FormMessage>Password not match</FormMessage>:<FormMessage/>
                }
              </FormItem>
            )}
          />
          <Button disabled={!!passwordConfirm && password !== passwordConfirm} className="w-full" type="submit">{isSubmitting ? "Registering...":"Register"}</Button>
        </form>
      </Form>
      <p className="mt-3 text-gray-500">Already Have an account ? <Link className="underline text-orange-400" href={'/login'}> Login</Link></p>
    </div>
  );
};

export default RegisterForm;
