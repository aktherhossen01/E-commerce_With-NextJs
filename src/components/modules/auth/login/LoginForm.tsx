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
import { useForm, SubmitHandler } from "react-hook-form";
import { loginValidationSchema, } from "./loginValidation";
import Link from "next/link";
import { loginUser, rechaptchValidation } from "@/services/AuthService";
import { toast } from "sonner";
import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useUser } from "@/context/UserContext";
import { LoginValidationType } from "./LoginValidationType";

const LoginForm = () => {
  const { setIsLoading } = useUser();
  const form = useForm<LoginValidationType>({
    resolver: zodResolver(loginValidationSchema),
  });

  const [reCaptchaStatus, setReCaptchaStatus] = useState(false);

  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirectPath");
  const router = useRouter();

  const handleRecaptcha = async (value: string | null) => {
    try {
      if (!value) return;
      const res = await rechaptchValidation(value);
      if (res?.success) {
        setReCaptchaStatus(true);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit: SubmitHandler<LoginValidationType> = async (data) => {
    try {
      setIsLoading(true);
      const res = await loginUser(data);
      if (res?.success) {
        toast.success(res?.message);
        router.push(redirect || "/");
      } else {
        toast.error(res?.message);
      }
    } catch (err) {
      console.error(err);
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
                  <Input placeholder="email" {...field} value={field.value || ""} />
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
          <Button disabled={!reCaptchaStatus} className="w-full my-3" type="submit">
            {isSubmitting ? "Logging..." : "Login"}
          </Button>
        </form>
      </Form>
      <p className="mt-3 text-gray-500">
        Already have an account?{" "}
        <Link className="underline text-orange-400" href="/register">
          Register
        </Link>
      </p>
    </div>
  );
};

// ✅ Wrap with Suspense to avoid `useSearchParams` prerendering error
const LoginFormWithSuspense = () => {
  return (
    <Suspense fallback={<div>Loading login form...</div>}>
      <LoginForm />
    </Suspense>
  );
};

export default LoginFormWithSuspense;
