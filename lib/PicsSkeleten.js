import { UserX } from "lucide-react";

export const PicsSkeleton = ({ text }) => (
  <div className="flex flex-col items-center justify-center w-full text-center">
    <UserX size={64} className="text-gray-400" />
    <h3 className="font-semibold mb-2">{text}</h3>
  </div>
);
