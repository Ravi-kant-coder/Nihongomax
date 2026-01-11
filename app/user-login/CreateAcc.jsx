"use client";
import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Upload, Eye, EyeOff, X } from "lucide-react";
import { registerUser } from "@/service/auth.service";
import userStore from "@/store/userStore";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const CreateAcc = () => {
  const [showMeme, setShowMeme] = useState(true);
  const router = useRouter();
  const { setUser } = userStore();
  const [isLoading, setIsLoading] = useState(false);
  const profileImageInputRef = useRef();
  const [dpCreate, setDpCreate] = useState(null);
  const [dpPreview, setDpPreview] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
  });

  const {
    register: registerSignUp,
    control,
    handleSubmit: handleSubmitSignUp,
    reset: resetSignUpForm,
    formState: { errors: errorsSignUp },
  } = useForm({
    resolver: yupResolver(registerSchema),
  });

  const onSubmitRegister = async (data) => {
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append("username", data.username);
      formData.append("email", data.email);
      formData.append("password", data.password);
      if (dpCreate) {
        formData.append("profilePicture", dpCreate);
      }

      console.log("Handler me:", [...formData.entries()]);
      const result = await registerUser(formData);
      console.log("Handler me result:", result);

      if (result?.status === "success") {
        router.push("/");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDpCreate = (e) => {
    const file = e.target.files[0];
    setDpCreate(file);
    setDpPreview(URL.createObjectURL(file));
  };

  useEffect(() => {
    resetSignUpForm();
  }, [resetSignUpForm]);

  useEffect(() => {
    const timer = setTimeout(() => setShowMeme(false), 5000); // 5 seconds
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex items-center justify-center">
      {!isExpanded ? (
        <motion.div
          key="button"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <Button
            className="w-60 h-10 cursor-pointer dark:bg-black text-white flex 
              items-center justify-center"
            onClick={() => setIsExpanded(true)}
          >
            <p className="text-sm dark:text-gray-300">New here?</p>
            <p className="text-sm flex">
              <Upload className="mr-2 w-4 h-4" /> Create Account
            </p>
          </Button>
        </motion.div>
      ) : (
        <motion.form
          key="form"
          onSubmit={handleSubmitSignUp(onSubmitRegister)}
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="space-y-2 p-4 rounded-lg bg-gray-400 dark:bg-gray-900 z-1000 relative"
        >
          <p className="text-center text-sm mb-2 dark:text-gray-300">
            New here? Create account
          </p>
          <X
            onClick={() => setIsExpanded(false)}
            className="absolute top-2 right-2 cursor-pointer dark:text-white 
            dark:hover:bg-gray-500 hover:text-gray-700 hover:bg-gray-100
            rounded p-1 dark:hover:text-black"
          />
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
          <Button
            className="w-full cursor-pointer dark:bg-black text-white"
            type="submit"
          >
            <Upload className="mr-2 w-4 h-4" /> Create Account
          </Button>
        </motion.form>
      )}
      {isLoading && (
        <AnimatePresence>
          {showMeme && (
            <motion.div
              key="meme-popup"
              initial={{ opacity: 1, y: 0, scale: 1 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{
                opacity: 0,
                y: -60,
                scale: 0.7,
                transition: { duration: 2, ease: "easeInOut" },
              }}
              transition={{
                exit: { duration: 1.8, ease: "easeInOut" },
              }}
              className="fixed inset-0 flex items-center justify-center bg-white/30
          dark:bg-black/60 backdrop-blur-xs z-[9999]"
            >
              <div className="rounded-xl">
                <img
                  src="/svgs/create_acc_meme.jpeg"
                  alt="Welcome to Nihongomax"
                  className="w-80 h-80 object-cover rounded-xl"
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </div>
  );
};

export default CreateAcc;
