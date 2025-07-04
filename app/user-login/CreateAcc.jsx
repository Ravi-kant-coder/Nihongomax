"use client";
import React from "react";

const SignUpPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-5xl bg-white rounded-xl shadow-lg overflow-hidden flex flex-col md:flex-row">
        {/* Left Panel */}
        <div className="md:w-1/2 bg-black text-white flex flex-col justify-center items-center p-10">
          <h2 className="text-3xl font-bold mb-4">WELCOME BACK!</h2>
          <p className="text-sm text-gray-300 text-center max-w-xs">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti
            iure?
          </p>
        </div>

        {/* Right Panel */}
        <div className="md:w-1/2 bg-white p-10 flex flex-col justify-center">
          <h2 className="text-2xl font-semibold text-gray-700 mb-6">Sign Up</h2>

          <form className="space-y-5">
            <input
              type="text"
              placeholder="Username"
              className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
            />
            <input
              type="email"
              placeholder="Email"
              className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
            />

            <button
              type="submit"
              className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition"
            >
              Sign Up
            </button>
          </form>

          <p className="text-sm text-center text-gray-500 mt-4">
            Already have an account?{" "}
            <a href="#" className="text-black font-medium hover:underline">
              Login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
