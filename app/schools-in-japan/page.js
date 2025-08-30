"use client";
import { useEffect, useState } from "react";
import LeftSideBar from "@/app/LeftSideBar";
import ScrollupBtn from "../ScrollupBtn";
import { useSchoolStore } from "@/store/useSchoolStore";
import SchoolCard from "./SchoolCard";
import { useBanner } from "../hooks/useBanner";
import Banner from "../Banner";

const Schools = () => {
  const { schools, fetchSchoolsZust } = useSchoolStore();
  const { banner, showBanner } = useBanner();
  const { deleteSchoolZust } = useSchoolStore();
  const [isEditSchoolModel, setIsEditSchoolModel] = useState(false);

  useEffect(() => {
    fetchSchoolsZust();
  }, [fetchSchoolsZust]);

  const handleSchoolDelete = async (schoolId) => {
    try {
      const result = await deleteSchoolZust(schoolId);
      showBanner("✅ School-Post deleted successfully", "success");
    } catch (error) {
      showBanner("❌ Failed to delete School-post", "error");
    }
  };

  return (
    <div className="flex my-20">
      <LeftSideBar />
      <div className="md:ml-60 w-full md:mt-2 mt-10 flex flex-col">
        <h1 className="md:text-4xl text-2xl text-center font-bold">
          Schools in Japan Nihongomax has tie up with
        </h1>
        <button
          className="text-2xl my-8 rounded-2xl p-4 bg-pink-200 dark:bg-pink-950 
          dark:hover:bg-pink-900 border border-gray-500 cursor-pointer
           hover:bg-pink-300 dark:text-gray-300  text-gray-700 mx-auto"
        >
          日本語学院を追加
          <p className="dark:text-gray-300 text-sm text-gray-700">
            For Japanese Schools
          </p>
        </button>
        {schools?.length > 0 ? (
          schools?.map((school) => (
            <SchoolCard
              school={school}
              key={school?._id}
              isOpen={isEditSchoolModel}
              onClose={() => setIsEditSchoolModel(false)}
              handleSchoolDelete={handleSchoolDelete}
            />
          ))
        ) : (
          <h2
            className="text-center text-2xl rounded-2xl text-gray-500 border
             border-gray-400 mx-auto p-10"
          >
            No Schools Available right now.
            <br />
            Plz check back later.
            <p className="mt-4">
              {" "}
              少しお待ちくださいね。インドから学生募集が増えていますよ！
            </p>
            <p className="text-lg">
              {" "}
              The number of applicants from India is increasing rapidly. <br />
              And there are many schools offering admissions. Please wait for a
              while.
            </p>
          </h2>
        )}
        <Banner banner={banner} />
        <ScrollupBtn />
      </div>
    </div>
  );
};

export default Schools;
