"use client";

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

      <main className="min-h-screen px-6 py-16">
        <div className="mx-auto max-w-6xl">
          {/* Header */}

          <div className="mx-auto max-w-2xl text-center">
            <div className="mb-4 inline-flex rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700">
              Learn Japanese with NihongoMax
            </div>

            <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
              Choose your learning plan
            </h1>

            <p className="mt-5 text-lg leading-8 text-slate-600">
              Get full access to our Japanese learning courses and learn at your
              own pace.
            </p>
          </div>

          {/* Pricing Cards */}

          <div className="mt-14 grid gap-8 md:grid-cols-3">
            {plans.map((plan) => (
              <div
                key={plan.id}
                className={`relative flex flex-col rounded-3xl border bg-white p-8 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-xl ${
                  plan.popular
                    ? "border-blue-500 ring-2 ring-blue-100"
                    : "border-slate-200"
                }`}
              >
                {/* Popular badge */}

                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-blue-600 px-5 py-2 text-sm font-bold text-white shadow-md">
                    MOST POPULAR
                  </div>
                )}

                <div>
                  <h2 className="text-xl font-bold text-slate-900">
                    {plan.title}
                  </h2>

                  <p className="mt-3 min-h-[48px] text-sm leading-6 text-slate-600">
                    {plan.description}
                  </p>
                </div>

                {/* Price */}

                <div className="mt-8">
                  <span className="text-4xl font-bold text-slate-900">
                    ₹{plan.price.toLocaleString("en-IN")}
                  </span>

                  <span className="ml-2 text-sm text-slate-500">
                    / {plan.duration}
                  </span>
                </div>

                {/* Features */}

                <div className="mt-8 flex-1">
                  <ul className="space-y-4 text-sm text-slate-700">
                    <li className="flex gap-3">
                      <span className="text-green-600">✓</span>
                      Full Japanese course access
                    </li>

                    <li className="flex gap-3">
                      <span className="text-green-600">✓</span>
                      JLPT-focused learning
                    </li>

                    <li className="flex gap-3">
                      <span className="text-green-600">✓</span>
                      Learn at your own pace
                    </li>

                    <li className="flex gap-3">
                      <span className="text-green-600">✓</span>
                      Secure online payment
                    </li>
                  </ul>
                </div>

                {/* Button */}

                <button
                  onClick={() => handlePayment(plan)}
                  disabled={loadingPlan !== null}
                  className={`mt-10 w-full rounded-xl px-5 py-4 text-base font-bold transition ${
                    plan.popular
                      ? "bg-blue-600 text-white hover:bg-blue-700"
                      : "bg-slate-900 text-white hover:bg-slate-800"
                  } disabled:cursor-not-allowed disabled:opacity-60`}
                >
                  {loadingPlan === plan.id
                    ? "Opening payment..."
                    : `Subscribe for ₹${plan.price.toLocaleString("en-IN")}`}
                </button>
              </div>
            ))}
          </div>

          {/* Security message */}

          <div className="mt-12 text-center">
            <p className="text-sm text-slate-500">
              🔒 Secure payments powered by Razorpay
            </p>

            <p className="mt-2 text-xs text-slate-400">
              Your payment information is securely processed by Razorpay.
              NihongoMax does not store your card details.
            </p>
          </div>
        </div>
      </main>
    </>
  );
}
