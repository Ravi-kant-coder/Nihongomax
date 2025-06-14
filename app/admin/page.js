"use client";
import VideoUploader from "@/components/VideoUploader";
import { Lock, LockOpen } from "lucide-react";
import { useState } from "react";

const Admin = () => {
  const [isPaid, setIsPaid] = useState(true);
  return (
    <>
      {/* -----------------------------------Video Uploader Form------------------------------------ */}
      <div className="md:mt-20 mt-25">
        <VideoUploader />
      </div>

      {/* -----------------------------------User Purchase Data---------------------------------- */}

      <div className="mt-4 text-sm flex items-center justify-center">
        <table className=" border border-gray-300 text-left">
          <thead className="sticky top-0 bg-gray-500 z-10 ">
            <tr>
              <th className="border dark:border-white text-center border-black py-1">
                ID
              </th>
              <th className="border dark:border-white text-center border-black py-1">
                Username
              </th>
              <th className="border dark:border-white text-center border-black py-1">
                Registered Email
              </th>
              <th className="border dark:border-white text-center border-black  py-1">
                Role
              </th>
              <th className="border dark:border-white text-center border-black  py-1">
                CreatedOn
              </th>
              <th className="border dark:border-white text-center border-black  py-1">
                PurchasedOn
              </th>
              <th className="border dark:border-white text-center border-black  py-1">
                ExpiresOn
              </th>
              <th className="border dark:border-white text-center border-black  py-1">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border dark:border-white border-black p-1">345</td>
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
                03-Jun-2025
              </td>
              <td className="border dark:border-white border-black p-1">
                04-Jun-2025
              </td>
              <td className="border dark:border-white border-black p-1">
                03-Sep-2025
              </td>
              <td className="border dark:border-white border-black p-1 flex justify-center">
                {isPaid ? (
                  <LockOpen color="#006c0f" strokeWidth={2.25} />
                ) : (
                  <Lock color="#ff0000" strokeWidth={2.25} />
                )}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Admin;
