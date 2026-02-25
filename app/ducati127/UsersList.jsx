import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useTransition, useState } from "react";
import Spinner from "../Spinner";

const UsersList = ({ user, status, handleSearchUserClick, idx }) => {
  const [isPending, startTransition] = useTransition();
  const [statusToggle, setStatusToggle] = useState(false);
  const testRed = "bg-red-800 dark:bg-red-900";
  const testGreen = "bg-green-600 dark:bg-green-700";

  const handleUserClick = () => {
    handleSearchUserClick(user?._id);
  };

  const handleStatusToggle = () => {
    setStatusToggle(!statusToggle);
  };

  return (
    <>
      <div className="p-2 border border-gray-600 flex items-center w-[80%] mb-2 dark:text-gray-400 rounded-md relative">
        <Avatar className="h-10 w-10 mr-3">
          <AvatarImage src={user?.profilePicture} className="object-cover" />
          <AvatarFallback className="bg-gray-400 dark:bg-black capitalize">
            {user?.username.split(" ")[0][0]}
          </AvatarFallback>
        </Avatar>
        <p className="mr-2">{idx}</p>
        <div className="md:w-100 truncate capitalize">
          <span
            className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 p-1 rounded-xl"
            onClick={() => handleUserClick()}
          >
            {user?.username}
          </span>
        </div>
        <div className="flex flex-col text-xs md:w-50">
          <div>Purchased on</div>
          <div className="text-sm">23-Oct-2025</div>
        </div>
        <div className="flex flex-col text-xs md:w-50">
          <div>Ending on</div>
          <div className="text-sm">23-Apr-2026</div>
        </div>
        <div
          className={`absolute right-0 w-15 h-full rounded-r-md cursor-pointer ${statusToggle ? testGreen : testRed} `}
          onClick={() => handleStatusToggle()}
        ></div>
      </div>
      {isPending && (
        <div className="fixed inset-0 flex items-center justify-center bg-white/30 dark:bg-black/60 backdrop-blur-xs z-9999">
          <Spinner />
        </div>
      )}
    </>
  );
};

export default UsersList;
