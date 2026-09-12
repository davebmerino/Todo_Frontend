import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Lock, User, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { paths } from "@/paths.js";
import { useNavigate, Link } from "react-router-dom";

import { useForm } from "react-hook-form";
import { toast } from "@/components/ui/toast";

import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema } from "@/schema/login.schema.js";
import useLogin from "@/features/auth/hooks/useLogin.hook.js";

export default function Login() {
  const navigate = useNavigate();

  const { mutate: loginUser, isPending } = useLogin();

  //define form
  const {
    register: login,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onTouched",
  });

  /** Function to handle what will happen when the form is submitted */
  function onSubmit(values) {
    loginUser(values, {
      //If Success
      onSuccess: (response) => {
        const accessToken = response.data?.accessToken ?? response.accessToken;

        if (accessToken) {
          localStorage.setItem("accessToken", accessToken);
        }

        reset();
        navigate(paths.dashboard);

        toast.add({
          type: "success",
          title: "Login successful",
          description: "Welcome back!",
        });
      },

      //Error
      onError: (error) => {
        toast.add({
          type: "error",
          title: "Unable to log in",

          description: error.message || "Please check your email and password.",
        });
      },
    });
  }

  return (
    <>
      <section className="min-h-screen items-center justify-center flex flex-row px-6   ">
        <div className="grain-overlay fixed inset-0 pointer-events-none"></div>
        <Card className="relative z-10 w-full max-w-md glass-primary ">
          <CardHeader className="text-center mb-8">
            <CardTitle className="font-playfair text-3xl font-semibold text-accent-foreground">
              Login to your account
            </CardTitle>
            <CardDescription className="font-manrope text-foreground text-sm">
              Enter your email below to login to your account
            </CardDescription>
            {/* <CardAction>
              <Button variant="link">Sign Up</Button>
            </CardAction> */}
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="flex flex-col gap-6">
                <div className="grid gap-2">
                  <Label
                    htmlFor="email"
                    className="block font-manrope text-foreground font-medium  text-lg">
                    Email
                  </Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-accent-foreground" />
                    <Input
                      className="w-full pl-10 pr-4 py-3 border-2 border-border rounded-lg  font-manrope "
                      id="email"
                      type="email"
                      autoComplete="email"
                      placeholder="m@example.com"
                      aria-invalid={Boolean(errors.email)}
                      aria-describedby={
                        errors.email ? "email-error" : undefined
                      }
                      {...login("email")}
                    />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label
                    htmlFor="Password"
                    className="block font-manrope text-foreground  font-medium text-lg">
                    Password
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-wedding-soft" />
                    <Input
                      className="w-full pl-10 pr-4 py-3 border-2 border-border rounded-lg  font-manrope "
                      id="password"
                      type="password"
                      autoComplete="current-password"
                      aria-invalid={Boolean(errors.password)}
                      aria-describedby={
                        errors.password ? "password-error" : undefined
                      }
                      {...login("password")}
                    />
                  </div>
                </div>
                <Button type="submit" className="w-full mb-2">
                  {isPending ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Signing in...
                    </>
                  ) : (
                    "Sign In"
                  )}
                </Button>
              </div>
              <div className="mt-6 pt-6 border-t border-border text-center">
                <Link to={paths.signup}>
                  <Button
                    variant="ghots"
                    className="w-full font-manrope text-sm text-accent-foreground cursor-pointer hover:text-wedding-primary transition-colors ">
                    ← Go to sign up
                  </Button>
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </section>
    </>
  );
}
