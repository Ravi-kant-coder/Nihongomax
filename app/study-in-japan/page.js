"use client";
import { useEffect, useState } from "react";
import ScrollupBtn from "../ScrollupBtn";
import { useSchoolStore } from "@/store/useSchoolStore";
import SchoolCard from "./SchoolCard";
import { useBanner } from "../hooks/useBanner";
import Banner from "../Banner";

const StudyInJapan = () => {
  const { schools, fetchSchoolsZust, loading } = useSchoolStore();
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
    <div className="w-full flex flex-col">
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
      <h1 className="md:text-4xl text-2xl text-center font-bold">
        Study in Japan
      </h1>
      <h2 className="text-2xl text-center my-4 font-medium">
        Universities, Schools, Institutions and Academies in Japan Nihongomax
        has tie-up with.
      </h2>
      {schools?.length > 0 ? (
        schools?.map((school, index) => (
          <SchoolCard
            school={school}
            key={school?._id || index}
            isOpen={isEditSchoolModel}
            onClose={() => setIsEditSchoolModel(false)}
            handleSchoolDelete={handleSchoolDelete}
            loading={loading}
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
  );
};

export default StudyInJapan;
