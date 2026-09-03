import { useState, useTransition } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import Spinner from "../../components/Spinner";
import { giveUserAccess, removeUserAccess } from "@/service/user.service";

const UsersList = ({ user, handleSearchUserClick, onAccessChanged, idx }) => {
  const [isPending, startTransition] = useTransition();
  const [showAccessOptions, setShowAccessOptions] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState("3_months");
  const [showRemoveConfirmation, setShowRemoveConfirmation] = useState(false);

  const subscription = user?.subscription;

  const isPurchased =
    subscription?.status === "active" &&
    subscription?.expiryDate &&
    new Date(subscription.expiryDate) > new Date();

  const formatDate = (date) => {
    if (!date) return "-";

    return new Date(date).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const handleUserClick = () => {
    handleSearchUserClick(user?._id);
  };

  const handleGiveAccess = async () => {
    try {
      startTransition(async () => {
        const result = await giveUserAccess(user?._id, selectedPlan);
        setShowAccessOptions(false);
        onAccessChanged(user?._id, result.data);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleRemoveAccess = async () => {
    try {
      startTransition(async () => {
        await removeUserAccess(user?._id);
        setShowRemoveConfirmation(false);
        onAccessChanged(user?._id, {
          ...user?.subscription,
          status: "cancelled",
        });
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="bg-gray-100 dark:bg-black p-2 border flex items-center w-[80%] mb-4 dark:text-gray-400 rounded-md relative">
        <Avatar className="h-10 w-10 mr-3">
          <AvatarImage src={user?.profilePicture} className="object-cover" />

          <AvatarFallback className="bg-gray-400 dark:bg-black capitalize">
            {user?.username?.split(" ")[0]?.[0]}
          </AvatarFallback>
        </Avatar>

        <p className="mr-2">{idx}</p>

        <div className="md:w-100 truncate">
          <span
            className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 p-1 rounded-xl  capitalize"
            onClick={handleUserClick}
          >
            {user?.username}
          </span>

          <div className="text-xs text-gray-500 dark:text-gray-500 truncate">
            {user?.email}
          </div>
        </div>

        <div className="flex flex-col text-xs md:w-50 ml-4">
          <div
            className={`text-sm ${
              isPurchased ? "text-green-700" : "text-red-600"
            }`}
          >
            {isPurchased ? "Purchased" : "Not Purchased"}
          </div>
        </div>

        <div className="flex flex-col text-xs md:w-50">
          <div>Starting on</div>

          <div className="text-sm">{formatDate(subscription?.startDate)}</div>
        </div>

        <div className="flex flex-col text-xs md:w-50">
          <div>Ending on</div>

          <div className="text-sm">{formatDate(subscription?.expiryDate)}</div>
        </div>

        <div
          className={`absolute right-0 w-15 h-full rounded-r-md cursor-pointer ${
            isPurchased
              ? "bg-green-600 dark:bg-green-700"
              : "bg-red-800 dark:bg-red-900"
          }`}
          onClick={() => {
            if (isPurchased) {
              setShowRemoveConfirmation(true);
            } else {
              setShowAccessOptions(true);
            }
          }}
        ></div>
      </div>
      {showAccessOptions && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
          <div className="bg-white dark:bg-gray-900 rounded-lg p-6 w-[320px] shadow-lg">
            <h3 className="text-lg font-semibold mb-4">Give Course Access</h3>

            <div className="flex flex-col gap-3">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name={`plan-${user?._id}`}
                  value="3_months"
                  checked={selectedPlan === "3_months"}
                  onChange={(e) => setSelectedPlan(e.target.value)}
                />
                3 Months
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name={`plan-${user?._id}`}
                  value="6_months"
                  checked={selectedPlan === "6_months"}
                  onChange={(e) => setSelectedPlan(e.target.value)}
                />
                6 Months
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name={`plan-${user?._id}`}
                  value="12_months"
                  checked={selectedPlan === "12_months"}
                  onChange={(e) => setSelectedPlan(e.target.value)}
                />
                12 Months
              </label>
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                className="px-4 py-2 rounded-md bg-gray-200 dark:bg-gray-700"
                onClick={() => setShowAccessOptions(false)}
              >
                Cancel
              </button>

              <button
                className="px-4 py-2 rounded-md bg-green-600 text-white"
                onClick={handleGiveAccess}
              >
                Give Access
              </button>
            </div>
          </div>
        </div>
      )}
      {showRemoveConfirmation && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
          <div className="bg-white dark:bg-gray-900 rounded-lg p-6 w-[320px] shadow-lg">
            <h3 className="text-lg font-semibold mb-3">End Course Access?</h3>

            <p className="text-sm text-gray-600 dark:text-gray-400">
              {user?.username} will immediately lose access to the paid course
              content.
            </p>

            <div className="flex justify-end gap-3 mt-6">
              <button
                className="px-4 py-2 rounded-md bg-gray-200 dark:bg-gray-700"
                onClick={() => setShowRemoveConfirmation(false)}
              >
                Cancel
              </button>

              <button
                className="px-4 py-2 rounded-md bg-red-700 text-white"
                onClick={handleRemoveAccess}
              >
                Remove Access
              </button>
            </div>
          </div>
        </div>
      )}
      {isPending && (
        <div className="fixed inset-0 flex items-center justify-center bg-white/30 dark:bg-black/60 backdrop-blur-xs z-9999">
          <Spinner />
        </div>
      )}
    </>
  );
};

export default UsersList;
