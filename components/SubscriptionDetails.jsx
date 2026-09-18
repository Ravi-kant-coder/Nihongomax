"use client";

import { useEffect, useState } from "react";
import { getSubscriptionStatus } from "@/service/subscription.service";

export default function SubscriptionDetails({ profileData }) {
  const [subscription, setSubscription] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSubscription = async () => {
      try {
        const result = await getSubscriptionStatus();

        setSubscription(result?.data || null);
      } catch (error) {
        console.error("Failed to load subscription:", error);
        setSubscription(null);
      } finally {
        setLoading(false);
      }
    };

    loadSubscription();
  }, []);

  if (loading) {
    return <p>Checking subscription...</p>;
  }

  // Convert plan IDs into user-friendly names.
  const planNames = {
    "3_months": "3 Months",
    "6_months": "6 Months",
    "12_months": "12 Months",
  };

  const planName =
    planNames[subscription?.plan] || subscription?.plan || "Unknown Plan";

  // Format date as: 3-Dec-2026
  const formatDate = (date) => {
    if (!date) return "N/A";

    return new Date(date)
      .toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
      .replace(/ /g, "-");
  };

  return (
    <>
      {subscription?.isSubscribed && (
        <div className="p-4 bg-green-100 dark:bg-green-950 rounded-md space-y-2 mt-4 shadow-lg dark:shadow-black">
          <p className="font-semibold text-lg">Your Course Plan</p>
          <p>{planName}</p>
          <p>By {profileData?.email}</p>
          <p>Valid until {formatDate(subscription.expiryDate)}</p>
        </div>
      )}
    </>
  );
}
