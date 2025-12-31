"use client";
import { useEffect, useState } from "react";
import LeftSideBar from "@/app/LeftSideBar";
import ScrollupBtn from "../ScrollupBtn";
import { useSchoolStore } from "@/store/useSchoolStore";
import SchoolCard from "./SchoolCard";
import { useBanner } from "../hooks/useBanner";
import Banner from "../Banner";

const StudyInJapan = () => {
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
        <a
          href={"https://www.learnjapanesedelhi.com/study-in-japan"}
          target="_blank"
        >
          <div
            className="rounded-lg bg-[rgb(60,60,60)] text-xl font-semibold
            dark:bg-black  hover:bg-black md:p-2 p-1 text-white border
            border-gray-300 dark:hover:bg-[rgb(20,20,20)] w-[50vw] mx-auto mb-4 text-center"
          >
            <h1> Click to Learn all about Study in Japan</h1>
          </div>
        </a>
        <h1 className="md:text-4xl text-2xl text-center font-bold mb-4">
          Study in Japan
        </h1>
        {schools?.length > 0 ? (
          schools?.map((school, index) => (
            <SchoolCard
              school={school}
              key={school?._id || index}
              isOpen={isEditSchoolModel}
              onClose={() => setIsEditSchoolModel(false)}
              handleSchoolDelete={handleSchoolDelete}
            />
          ))
        ) : (
          <h2
            className="text-center text-2xl rounded-2xl text-gray-600 border
             border-gray-500 mx-auto p-10"
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
              And there are many schools offering admissions.
              <br /> Soon they will be added here. Please wait for a while.
            </p>
          </h2>
        )}
        <Banner banner={banner} />
        <ScrollupBtn />
      </div>
    </div>
  );
};

export default StudyInJapan;
