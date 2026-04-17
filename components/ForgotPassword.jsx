"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { sendResetLink } from "@/service/auth.service";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

const schema = yup.object({
  email: yup.string().email().required("Email is required"),
});

const ForgotPassword = () => {
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async (data) => {
    setLoading(true);
    setError("");
    setMessage("");

    try {
      const res = await sendResetLink(data.email);
      setMessage(res.message || "Reset link sent to your email");
      setSubmitted(true);
    } catch (err) {
      setError(err?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center relative">
      {!isExpanded ? (
        <button
          className="w-full text-sm dark:text-white cursor-pointer rounded-sm
          p-1 hover:bg-gray-300 dark:hover:bg-gray-700"
          onClick={() => setIsExpanded(true)}
        >
          Forgot Password?
        </button>
      ) : (
        <motion.form
          key="form"
          onSubmit={handleSubmit(onSubmit)}
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="p-6 rounded bg-gray-300 dark:bg-gray-800"
        >
          <X
            onClick={() => setIsExpanded(false)}
            className="absolute top-2 right-2 cursor-pointer dark:text-white 
                      dark:hover:bg-gray-500 hover:text-gray-700 hover:bg-gray-100
                      rounded p-1 dark:hover:text-black"
          />
          {!submitted && (
            <div>
              <p className="text-center mb-2 font-semibold">Forgot Password?</p>
              <p className="mb-2 text-sm dark:text-white">
                Enter mail address you are registered with Nihongomax.
              </p>
            </div>
          )}
          <Input
            {...register("email")}
            placeholder="Enter your registered Email"
            className="bg-white"
            disabled={submitted || loading}
          />

          {errors.email && (
            <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>
          )}

          {error && <p className="text-red-600 text-sm mt-2">{error}</p>}

          {message && <p className="text-sm mt-2">{message}</p>}
          {!submitted && (
            <Button
              className="w-full mt-4 cursor-pointer"
              type="submit"
              disabled={submitted || loading}
            >
              {loading ? "Sending..." : "Send Reset Link"}
            </Button>
          )}
        </motion.form>
      )}
    </div>
  );
};
export default ForgotPassword;
