"use client";
import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { LogIn, Upload } from "lucide-react";
import { loginUser, registerUser } from "@/service/auth.service";
import userStore from "@/store/userStore";
import Spinner from "../Spinner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const CreateAcc = () => {
  const router = useRouter();
  const { setUser } = userStore();
  const [isLoading, setIsLoading] = useState(false);
  const profileImageInputRef = useRef();
  const [profilePictureFile, setProfilePictureFile] = useState(null);
  const [profilePicturePreview, setProfilePicturePreview] = useState(null);

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
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  const {
    register: registerLogin,
    handleSubmit: handleSubmitLogin,
    control,
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

  return (
    <>
      <div className="flex items-center justify-center">
        <form
          onSubmit={handleSubmitSignUp(onSubmitRegister)}
          className="space-y-2 p-4 rounded-lg bg-gray-400 dark:bg-gray-900"
        >
          <div>
            <p className="text-center text-sm mb-2">New here? Create account</p>

            <Label htmlFor="signupName" className="sr-only">
              Username
            </Label>
            <Input
              id="signupName"
              name="username"
              type="text"
              {...registerSignUp("username")}
              placeholder="Create username"
              className="col-span-3 bg-white border-gray-500"
            />
            {errorsSignUp.username && (
              <p className="text-red-500">{errorsSignUp.username.message}</p>
            )}
          </div>
          <div>
            <Label htmlFor="signupEmail" className="sr-only">
              Email
            </Label>
            <Input
              id="signupEmail"
              name="email"
              type="email"
              {...registerSignUp("email")}
              placeholder="Email (for forgot pswd)"
              className="col-span-3 bg-white"
            />
            {errorsSignUp.email && (
              <p className="text-red-500">{errorsSignUp.email.message}</p>
            )}
          </div>
          <div>
            <Label htmlFor="signupPassword" className="sr-only">
              Create New Password
            </Label>
            <Input
              id="signPassword"
              name="password"
              type="password"
              {...registerSignUp("password")}
              placeholder="Create New Password"
              className="col-span-3 bg-white"
            />
            {errorsSignUp.password && (
              <p className="text-red-500">{errorsSignUp.password.message}</p>
            )}
          </div>
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
                    <AvatarImage src={profilePicturePreview} />
                    <AvatarFallback
                      className="dark:bg-black capitalize flex flex-col items-center 
              justify-center bg-gray-400"
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
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (file) {
                        onChange(file);
                        setProfilePicturePreview(URL.createObjectURL(file));
                      }
                    }}
                  />
                </>
              )}
            />
          </div>
          <Button
            className="w-full cursor-pointer dark:bg-black text-white"
            type="submit"
          >
            <LogIn className="mr-2 w-4 h-4" /> Create Account
          </Button>
        </form>
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

export default CreateAcc;
