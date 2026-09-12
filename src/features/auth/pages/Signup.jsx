import {
  Card,
  CardFooter,
  CardDescription,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
// import { Toaster } from "@/components/ui/toaster.jsx";
// import { useToast } from "@/hooks/use-toast.js";

import { Link, useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import useSignup from "@/features/auth/hooks/useSignup.hook.js";

import { SignupSchema } from "@/schema/signup.schema.js";
import { toast } from "@/components/ui/toast";

export default function Signup() {
  const { mutate: createUser, isLoading } = useSignup();
  const navigate = useNavigate();

  //Define form
  const form = useForm({
    resolver: zodResolver(SignupSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
  });

  function onSubmit(values) {
    createUser(values, {
      onSuccess: () => {
        form.reset();

        toast.add({
          type: "success",
          title: "User created successfully",
          description: "You can now log in and start creating tasks.",

          actionProps: {
            children: "Login here",
            onClick: () => navigate("/login"),
          },
        });
      },

      onError: (error) => {
        toast.add({
          type: "error",
          title: "Unable to create your account",
          description: error.message || "Please try again.",
        });
      },
    });
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  return (
    <>
      <section className="flex min-h-dvh w-full items-center justify-center px-4 py-8">
        <Card className="w-full max-w-sm lg:max-w-md glass-primary">
          <CardHeader className="text-center mb-8">
            <CardTitle className="font-playfair text-3xl font-semibold text-accent-foreground">
              Create your account
            </CardTitle>
            <CardDescription className="font-manrope text-foreground text-sm">
              Enter your active email account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-full space-y-6">
              <FieldGroup className="flex flex-col gap-6">
                <Field>
                  <FieldLabel
                    className="block font-manrope text-foreground font-medium  text-lg"
                    htmlFor="form-name">
                    First name
                  </FieldLabel>
                  <Input
                    className="w-full h-12"
                    id="firstName"
                    type="text"
                    autoComplete="given-name"
                    placeholder="John"
                    // aria-invalid={Boolean(errors.firstName)}
                    // aria-describedby={
                    //   errors.firstName ? "firstName-error" : undefined
                    // }
                    {...register("firstName")}
                  />
                </Field>
                <Field>
                  <FieldLabel
                    className="block font-manrope text-foreground font-medium  text-lg"
                    htmlFor="form-name">
                    Last name
                  </FieldLabel>
                  <Input
                    className="w-full h-12"
                    id="lastName"
                    type="text"
                    autoComplete="family-name"
                    placeholder="Doe"
                    // aria-invalid={Boolean(errors.firstName)}
                    // aria-describedby={
                    //   errors.firstName ? "firstName-error" : undefined
                    // }
                    {...register("lastName")}
                  />
                </Field>
                <Field>
                  <FieldLabel
                    className="block font-manrope text-foreground font-medium  text-lg"
                    htmlFor="form-email">
                    Email
                  </FieldLabel>
                  <Input
                    className="w-full h-12"
                    id="email"
                    type="text"
                    autoComplete="email"
                    placeholder="example@email.com"
                    // aria-invalid={Boolean(errors.firstName)}
                    // aria-describedby={
                    //   errors.firstName ? "firstName-error" : undefined
                    // }
                    {...register("email")}
                  />
                  <FieldDescription>
                    We&apos;ll never share your email with anyone.
                  </FieldDescription>
                </Field>

                <Field>
                  <FieldLabel
                    className="block font-manrope text-foreground font-medium  text-lg"
                    htmlFor="password">
                    Password
                  </FieldLabel>
                  <FieldDescription>
                    Must be 8 characters long and at least with a-z, A-Z, 1-9
                    and !@#$%.
                  </FieldDescription>
                  <Input
                    className="w-full h-12"
                    id="password"
                    type="password"
                    autoComplete="Password"
                    placeholder="password"
                    aria-invalid={Boolean(errors.firstName)}
                    // aria-describedby={
                    //   errors.firstName ? "firstName-error" : undefined
                    // }
                    {...register("password")}
                  />
                </Field>

                <Button type="submit" className="w-full h-12">
                  {isLoading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Creating...
                    </>
                  ) : (
                    "Create Account"
                  )}
                </Button>
              </FieldGroup>
            </form>
            <CardFooter className="flex justify-center mt-6 pt-6 border-t border-border ">
              <Link to="/">
                <Button
                  variant="ghots"
                  className="w-full font-manrope text-sm text-accent-foreground cursor-pointer hover:text-wedding-primary transition-colors ">
                  Log in →
                </Button>
              </Link>
            </CardFooter>
          </CardContent>
        </Card>
      </section>
    </>
  );
}
