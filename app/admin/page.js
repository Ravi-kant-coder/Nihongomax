"use client";
import VideoUploadForm from "@/app/admin/VideoUploadForm";
import userStore from "@/store/userStore";
import UsersData from "./UsersData";

const Admin = () => {
  const { user } = userStore();

  return (
    <>
      <div className="md:mt-20 mt-25">
        <VideoUploadForm />
      </div>
      {/* -----------------------------------User Purchase Data---------------------------------- */}
      <div className="mt-4 text-sm flex items-center justify-center">
        <table className=" border border-gray-300 text-left">
          <thead className="sticky top-0 bg-gray-500 z-10 ">
            <tr>
              <th className="border dark:border-white text-center border-black py-1">
                User-ID
              </th>
              <th className="border dark:border-white text-center border-black py-1">
                Username
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
            <UsersData user={user} />
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Admin;
