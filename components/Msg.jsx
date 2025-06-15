import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { SeparatorHorizontal, UserMinus, UserPlus } from "lucide-react";
import { Separator } from "./ui/separator";

const dummymsgs = [
  {
    imageUrl: "/Girl.jpg",
    key: "1",
    username: "Sahanubhuti Sharma",
  },
  {
    imageUrl: "/Gil.jpg",
    key: "2",
    username: "Anjali Devegoda",
  },
  {
    imageUrl: "/Horizontal1.jpg",
    key: "3",
    username: "Kumar shanu",
  },
];
const Msg = () => {
  return (
    <div className="bg-yellow-300">
      {dummymsgs.map((dummymsg) => (
        <div
          key={dummymsg?.key}
          className="flex items-center py-2 bg-white dark:bg-black"
        >
          <div className="">
            <Avatar className="cursor-pointer h-12 w-12 hover:ring-3 hover:ring-gray-600 hover:ring-offset-1 transition duration-100 mx-2">
              <AvatarImage src={dummymsg?.imageUrl} className="object-cover" />
              <AvatarFallback className="bg-gray-400 dark:bg-gray-500 text-black">
                {dummymsg?.username.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </div>

          <div className="w-3/4">
            <p className=" hover:underline cursor-pointer truncate">
              {dummymsg?.username}
            </p>
            <p className="text-xs text-gray-600 dark:text-gray-400 truncate">
              Sensei Chal chal baliye Sensei Chal chal baliyeSensei Chal chal
              baliyeSensei Chal chal baliye{" "}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Msg;
