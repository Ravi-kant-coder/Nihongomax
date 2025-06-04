// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { Button } from "@/components/ui/button";
// import { AnimatePresence, motion } from "framer-motion";
// import { Camera, PenLine, Save, Upload, X } from "lucide-react";
// import { useRef, useState } from "react";
// import { Label } from "@/components/ui/label";
// import { Input } from "@/components/ui/input";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";

const Admin = () => {
  return (
    <>
      <div className="m-15">
        <div className="overflow-y-auto max-h-150">
          <table className="w-full border border-gray-300 text-left">
            <thead className="sticky top-0 bg-gray-500 z-10 ">
              <tr>
                <th className="border dark:border-white border-black px-4 py-2">
                  No.
                </th>
                <th className="border dark:border-white border-black px-4 py-2">
                  Name
                </th>
                <th className="border dark:border-white border-black px-4 py-2">
                  Email
                </th>
                <th className="border dark:border-white border-black px-4 py-2">
                  Role
                </th>
                <th className="border dark:border-white border-black px-4 py-2">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border dark:border-white border-black p-1">1</td>
                <td className="border dark:border-white border-black p-1">
                  Ravi
                </td>
                <td className="border dark:border-white border-black p-1">
                  ravi@example.com
                </td>
                <td className="border dark:border-white border-black p-1">
                  Admin
                </td>
                <td className="border dark:border-white border-black p-1">
                  Active
                </td>
              </tr>
              <tr>
                <td className="border dark:border-white border-black p-1">1</td>
                <td className="border dark:border-white border-black p-1">
                  Ravi
                </td>
                <td className="border dark:border-white border-black p-1">
                  ravi@example.com
                </td>
                <td className="border dark:border-white border-black p-1">
                  Admin
                </td>
                <td className="border dark:border-white border-black p-1">
                  Active
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Admin;
