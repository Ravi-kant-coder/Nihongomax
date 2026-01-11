"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useParams, useRouter } from "next/navigation";
import { resetPassword } from "@/service/auth.service";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";

const schema = yup.object({
  password: yup.string().min(6).required(),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
});

const ResetPassword = () => {
  const { token } = useParams();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async (data) => {
    await resetPassword(token, data.password);
    router.push("/user-login");
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="border w-[350px] p-6 rounded bg-gray-200 dark:bg-gray-800 space-y-4"
      >
        <h2 className="text-lg font-semibold mb-4 dark:text-white">
          Create new Password
        </h2>
        <div className="relative">
          <Input
            type={showPassword ? "text" : "password"}
            {...register("password")}
            placeholder="New password"
            className="bg-white"
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
        <div className="relative">
          <Input
            type={showConfirmPassword ? "text" : "password"}
            {...register("confirmPassword")}
            placeholder="Confirm password"
            className="bg-white"
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
        {errors.confirmPassword && (
          <p className="text-red-600 text-sm">
            {errors.confirmPassword.message}
          </p>
        )}
        <Button
          type="submit"
          className="cursor-pointer w-full flex items-center justify-center"
        >
          Reset Password
        </Button>
      </form>
    </div>
  );
};

export default ResetPassword;
