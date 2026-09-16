"use client";
import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Upload, Eye, EyeOff, X } from "lucide-react";
import { registerUser } from "@/service/auth.service";
import userStore from "@/store/userStore";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import useAuthModalStore from "@/store/authModalStore";
import Link from "next/link";

const CreateAcc = () => {
  const { closeModal } = useAuthModalStore();
  const [memeEffect, setMemeEffect] = useState(false);
  const { setUser } = userStore();
  const [isLoading, setIsLoading] = useState(false);
  const profileImageInputRef = useRef();
  const [dpCreate, setDpCreate] = useState(null);
  const [dpPreview, setDpPreview] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const registerSchema = yup.object().shape({
    username: yup
      .string()
      .trim()
      .min(3, "Username must be at least 3 characters")
      .max(30, "Username too long")
      .required("Name is required"),

    email: yup
      .string()
      .trim()
      .lowercase()
      .email("Invalid email format")
      .required("Email is required"),

    password: yup
      .string()
      .min(6, "Password must be at least 6 characters")
      .matches(/[0-9]/, "Password must contain at least one number")
      .required("Password is required"),

    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password")], "Passwords must match")
      .required("Confirm Password is required"),
  });

  const {
    register: registerSignUp,
    control,
    handleSubmit: handleSubmitSignUp,
    reset: resetSignUpForm,
    setError,
    formState: { errors: errorsSignUp },
  } = useForm({
    resolver: yupResolver(registerSchema),
  });

  const onSubmitRegister = async (data) => {
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append("username", data.username.trim());
      formData.append("email", data.email.trim().toLowerCase());
      formData.append("password", data.password);
      if (dpCreate) {
        formData.append("profilePicture", dpCreate);
      }
      const result = await registerUser(formData);
      if (result?.status === "success") {
        setUser(result.data);
        resetSignUpForm();
        setDpCreate(null);
        setDpPreview(null);
        closeModal();
        setMemeEffect(true);
        window.location.reload();
      } else if (result?.message === "This email already exists") {
        setError("email", {
          type: "server",
          message: "This email already exists",
        });
      }
    } catch (error) {
      if (error.response?.data?.message === "This email already exists") {
        setError("email", {
          type: "server",
          message: "This email already exists",
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleDpCreate = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      alert("Only image files are allowed");
      return;
    }
    setDpCreate(file);
    setDpPreview(URL.createObjectURL(file));
  };

  useEffect(() => {
    resetSignUpForm();
  }, [resetSignUpForm]);

  useEffect(() => {
    if (memeEffect) {
      const timeout = setTimeout(() => setMemeEffect(false), 3000);
      return () => clearTimeout(timeout);
    }
  }, [memeEffect]);

  const handleGoogleLogin = () => {
    window.location.href = `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/google`;
  };

  return (
    <div className="flex items-center justify-center">
      <motion.form
        key="form"
        onSubmit={handleSubmitSignUp(onSubmitRegister)}
        className="space-y-2 p-4 rounded-lg bg-gray-400 dark:bg-gray-900 z-1000 relative"
      >
        <p className="text-center text-sm mb-2 dark:text-gray-300">
          New here? Create account
        </p>
        <div>
          <Label htmlFor="signupName" className="sr-only">
            Username
          </Label>
          <Input
            id="signupName"
            type="text"
            {...registerSignUp("username")}
            placeholder="Create username"
            className="col-span-3 bg-white"
          />
          {errorsSignUp.username && (
            <p className="text-red-700 dark:text-red-400 text-center text-sm">
              {errorsSignUp.username.message}
            </p>
          )}
        </div>
        <div>
          <Label htmlFor="signupEmail" className="sr-only">
            Email
          </Label>
          <Input
            id="signupEmail"
            type="email"
            {...registerSignUp("email")}
            placeholder="Email (For forgot password)"
            className="col-span-3 bg-white"
          />
          {errorsSignUp.email && (
            <p className="text-red-700 dark:text-red-400 text-center text-sm">
              {errorsSignUp.email.message}
            </p>
          )}
        </div>

        {/* Password fields with show/hide eye*/}
        <div className="relative">
          <Label htmlFor="signupPassword" className="sr-only">
            Create New Password
          </Label>
          <Input
            id="signupPassword"
            type={showPassword ? "text" : "password"}
            {...registerSignUp("password")}
            placeholder="Create New Password"
            className="col-span-3 bg-white pr-10"
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
        {errorsSignUp.password && (
          <p className="text-red-700 dark:text-red-400 text-center text-sm">
            {errorsSignUp.password.message}
          </p>
        )}
        {/* Confirm password field with show/hide eye*/}
        <div className="relative">
          <Label htmlFor="confirmPassword" className="sr-only">
            Confirm Password
          </Label>
          <Input
            id="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            {...registerSignUp("confirmPassword")}
            placeholder="Confirm Password"
            className="col-span-3 bg-white"
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-600
               hover:text-gray-800 cursor-pointer"
          >
            {showConfirmPassword ? <Eye size={18} /> : <EyeOff size={18} />}
          </button>
        </div>
        {errorsSignUp.confirmPassword && (
          <p className="text-red-700 dark:text-red-400 text-center text-sm">
            {errorsSignUp.confirmPassword.message}
          </p>
        )}
        <div className="flex flex-col items-center">
          <Controller
            control={control}
            name="profilePicture"
            render={({ field: { onChange } }) => (
              <>
                <Avatar
                  onClick={() => profileImageInputRef.current?.click()}
                  className="w-24 h-24 border-4 border-white cursor-pointer
                     dark:border-gray-700"
                >
                  <AvatarImage src={dpPreview} />
                  <AvatarFallback
                    className="dark:bg-black capitalize flex flex-col
                     items-center justify-center bg-gray-400"
                  >
                    <p className="font-semibold text-2xl">DP</p>
                    <p className="text-sm">(optional)</p>
                  </AvatarFallback>
                </Avatar>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  ref={profileImageInputRef}
                  onChange={handleDpCreate}
                />
              </>
            )}
          />
        </div>
        <div className="relative">
          <Button
            className="w-full cursor-pointer dark:bg-black text-white"
            type="submit"
            disabled={isLoading}
          >
            <Upload className="mr-2 w-4 h-4" />
            {isLoading ? "Creating..." : "Create Account"}
          </Button>
          <AnimatePresence>
            {memeEffect && (
              <motion.div
                className="absolute -top-4 left-2 text-sm dark:bg-green-900 text-black dark:text-white  bg-green-100 rounded-lg shadow-2xl p-2"
                initial={{ opacity: 0, y: 0, rotate: 10 }}
                animate={{ opacity: 1, y: -20, rotate: -10 }}
                exit={{ opacity: 0, y: -60 }}
                transition={{ duration: 1, ease: "easeInOut" }}
              >
                <div className="capitalize flex flex-col items-center">
                  <p>Welcome to Nihongomax!😎</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className=" px-2 ">Or continue with</span>
        </div>
        <div className="w-full gap-4">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              type="button"
              variant="outline"
              className="w-full dark:hover:bg-gray-800 text-black dark:text-white cursor-pointer"
              onClick={handleGoogleLogin}
            >
              <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
                <path d="M1 1h22v22H1z" fill="none" />
              </svg>
              Google
            </Button>
          </motion.div>
        </div>
        <div className="text-center text-xs text-gray-600 dark:text-gray-500">
          By creating an account, <br />
          you agree to our{" "}
          <Link
            href="/privacy"
            className="text-blue-800 hover:underline dark:text-gray-400 dark:hover:text-gray-300"
            target="_blank"
          >
            Privacy Policy
          </Link>
        </div>
      </motion.form>
    </div>
  );
};

export default CreateAcc;
