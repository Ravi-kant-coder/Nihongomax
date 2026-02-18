"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { LogIn, Eye, EyeOff } from "lucide-react";
import { loginUser, registerUser } from "@/service/auth.service";
import userStore from "@/store/userStore";
import Spinner from "../Spinner";
import ForgotPassword from "./ForgotPassword";
import { usePostStore } from "@/store/usePostStore";

const Login = () => {
  const router = useRouter();
  const { setUser } = userStore();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState("");

  const registerSchema = yup.object().shape({
    username: yup.string().required("Name is required"),
    email: yup
      .string()
      .email("Invalid email format")
      .required("Email is required"),
    password: yup
      .string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  const loginSchema = yup.object().shape({
    email: yup
      .string()
      .email("Invalid email format")
      .required("Email is required"),
    password: yup
      .string()
      .min(6, "At least 6 characters")
      .required("Password is required"),
  });

  const {
    register: registerLogin,
    handleSubmit: handleSubmitLogin,
    reset: resetLoginForm,
    formState: { errors: errorsLogin },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const {
    register: registerSignUp,
    handleSubmit: handleSubmitSignUp,
    reset: resetSignUpForm,
    formState: { errors: errorsSignUp },
  } = useForm({
    resolver: yupResolver(registerSchema),
  });

  const onSubmitRegister = async (data) => {
    setIsLoading(true);
    try {
      const result = await registerUser(data);
      if (result?.status === "success") {
        router.push("/");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    resetLoginForm();
    resetSignUpForm();
  }, [resetLoginForm, resetSignUpForm]);

  const onSubmitLogin = async (data) => {
    setIsLoading(true);
    setLoginError("");

    try {
      const result = await loginUser(data);

      if (result?.status === "success") {
        usePostStore.getState().resetAll();
        setUser(result.user);
        router.push("/");
        usePostStore.getState().fetchPost();
      } else {
        setLoginError(result?.message || "Invalid email or password");
      }
    } catch (error) {
      setLoginError(
        error?.response?.data?.message || "Something went wrong. Try again.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div
        className="space-y-4 p-4 rounded-lg bg-gray-400 fixed top-5 right-5
      dark:bg-gray-800 z-100 w-[200px] md:w-[250px]"
      >
        <motion.form
          onSubmit={handleSubmitLogin(onSubmitLogin)}
          className="space-y-2"
        >
          <div>
            <p className="text-center text-sm dark:text-white">
              Already have account
            </p>
            <p className="text-xs text-center mb-2 dark:text-white">
              with Nihongomax?
            </p>
            <Label htmlFor="loginEmail" className="sr-only">
              Email
            </Label>
            <Input
              id="loginEmail"
              name="email"
              type="email"
              {...registerLogin("email")}
              placeholder="Your Email with us"
              className="col-span-3 bg-white"
            />
            {errorsLogin.email && (
              <p className="text-red-700 dark:text-red-400 text-center text-sm">
                {errorsLogin.email.message}
              </p>
            )}
          </div>
          <div className="relative">
            <Label htmlFor="loginPassword" className="sr-only">
              Password
            </Label>
            <Input
              id="loginPassword"
              type={showPassword ? "text" : "password"}
              name="password"
              {...registerLogin("password")}
              placeholder="Password"
              className="col-span-3 bg-white"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-600
               hover:text-gray-800 cursor-pointer"
            >
              {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
            </button>
          </div>
          {errorsLogin.password && (
            <p className="text-red-700 dark:text-red-400 text-center text-sm">
              {errorsLogin.password.message}
            </p>
          )}
          {loginError && (
            <p className="text-center text-sm text-red-700 dark:text-red-400">
              {loginError}
            </p>
          )}
          <Button
            className="w-full cursor-pointer dark:bg-black text-white"
            type="submit"
          >
            <LogIn className="mr-2 w-4 h-4" /> Log in
          </Button>
        </motion.form>
        <ForgotPassword />
      </div>
      <div>
        {isLoading && (
          <div
            className="fixed inset-0 flex items-center justify-center bg-white/30
              dark:bg-black/60 backdrop-blur-xs z-[9999]"
          >
            <Spinner />
          </div>
        )}
      </div>
    </>
  );
};

export default Login;
