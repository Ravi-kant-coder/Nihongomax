"use client";
import Comparison from "./Comparison";
import Script from "next/script";
import { useState } from "react";

import {
  createRazorpayOrder,
  verifyRazorpayPayment,
} from "@/service/subscription.service";

const plans = [
  {
    id: "3_months",
    title: "3 Months",
    price: 2699,
    duration: "3 months",
    description: "A great way to get started with Japanese.",
    popular: false,
  },
  {
    id: "6_months",
    title: "6 Months",
    price: 4699,
    duration: "6 months",
    description: "Our balanced plan for steady progress.",
    popular: true,
  },
  {
    id: "12_months",
    title: "12 Months",
    price: 7699,
    duration: "12 months",
    description: "Best for serious long-term Japanese learning.",
    popular: false,
  },
];

export default function PaymentPage() {
  const [loadingPlan, setLoadingPlan] = useState(null);

  const handlePayment = async (plan) => {
    try {
      setLoadingPlan(plan.id);

      const result = await createRazorpayOrder(plan.id);

      const order = result.data.order;

      if (!window.Razorpay) {
        alert("Payment system is still loading. Please try again.");
        return;
      }

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,

        amount: order.amount,
        currency: order.currency,

        name: "NihongoMax",
        description: `NihongoMax - ${plan.title}`,

        order_id: order.id,

        handler: async function (response) {
          try {
            const verificationResult = await verifyRazorpayPayment(response);

            console.log("PAYMENT VERIFICATION RESULT:", verificationResult);

            alert(
              "Payment successful! Your NihongoMax subscription is now active.",
            );
          } catch (error) {
            console.error("Payment verification error:", error);

            alert("We could not verify the payment. Please contact support.");
          }
        },

        modal: {
          ondismiss: function () {
            console.log("Razorpay checkout closed.");
          },
        },

        theme: {
          color: "#2563eb",
        },
      };

      const razorpay = new window.Razorpay(options);

      razorpay.on("payment.failed", function (response) {
        console.error("Razorpay payment failed:", response.error);

        alert("Payment failed. No subscription has been activated.");
      });

      razorpay.open();
    } catch (error) {
      console.error("Payment error:", error);

      alert(
        error.response?.data?.message ||
          "Unable to start payment. Please try again.",
      );
    } finally {
      setLoadingPlan(null);
    }
  };

  return (
    <>
      <Script
        src="https://checkout.razorpay.com/v1/checkout.js"
        strategy="afterInteractive"
      />

      <main className="min-h-screen">
        <div className="mx-auto max-w-6xl">
          <p className="mt-8 text-center text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold">
            Unlock the full{" "}
            <span className="text-red-700 dark:text-red-400">Nihongomax</span>{" "}
            experience <br />
            and start mastering{" "}
            <span className="text-red-700 dark:text-red-400">Japanese </span>
            today!
          </p>
          <div className="mt-14 grid gap-8 md:grid-cols-3">
            {plans.map((plan) => (
              <div
                key={plan.id}
                className={`relative flex flex-col rounded-2xl border bg-white p-8 shadow-sm transition duration-200 
                  hover:-translate-y-1 hover:shadow-xl dark:bg-black ${
                    plan.popular
                      ? "border-teal-500 ring ring-teal-500"
                      : "border-slate-200"
                  }`}
              >
                {/* Popular badge */}

                {plan.popular && (
                  <div
                    className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-teal-800 px-5 py-2 text-sm
                   font-bold text-white shadow-md"
                  >
                    MOST POPULAR
                  </div>
                )}

                <div>
                  <h2 className="text-xl font-semibold ">{plan.title}</h2>

                  <p className="mt-3 min-h-[48px] text-sm leading-6 dark:text-gray-300">
                    {plan.description}
                  </p>
                </div>

                {/* Price */}

                <div className="mt-4">
                  <span className="text-4xl font-semibold ">
                    ₹{plan.price.toLocaleString("en-IN")}
                  </span>

                  <span className="ml-2 text-lg ">/ {plan.duration}</span>
                </div>

                {/* Features */}

                <div className="mt-8 flex-1">
                  <ul className="space-y-4 text-sm">
                    <li className="flex gap-3">
                      <span className="text-[#008b18] dark:text-[#00ff00] font-extrabold">
                        ✓
                      </span>
                      Full Japanese courses access
                    </li>

                    <li className="flex gap-3">
                      <span className="text-[#008b18] dark:text-[#00ff00] font-extrabold">
                        ✓
                      </span>
                      Learn at your own pace
                    </li>

                    <li className="flex gap-3">
                      <span className="text-[#008b18] dark:text-[#00ff00] font-extrabold">
                        ✓
                      </span>
                      Secure online payment
                    </li>
                  </ul>
                </div>

                {/* Button */}

                <button
                  onClick={() => handlePayment(plan)}
                  disabled={loadingPlan !== null}
                  className={`mt-10 w-full rounded-xl px-5 py-4 text-base font-bold transition cursor-pointer ${
                    plan.popular
                      ? "bg-teal-800 text-white hover:bg-teal-700"
                      : "bg-slate-700 text-white hover:bg-slate-800"
                  } disabled:cursor-not-allowed disabled:opacity-60`}
                >
                  {loadingPlan === plan.id
                    ? "Opening payment..."
                    : `Buy for ₹${plan.price.toLocaleString("en-IN")}`}
                </button>
              </div>
            ))}
          </div>
          {/* Security message */}
          <div className="mt-2 text-center">
            <p className="text-sm">
              Your payment information is securely processed by Razorpay.
              Nihongomax does not store your card or UPI details.
            </p>
          </div>
        </div>
        <Comparison />
      </main>
    </>
  );
}
