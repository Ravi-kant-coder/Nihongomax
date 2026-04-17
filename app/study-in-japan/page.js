"use client";
import { useEffect, useState } from "react";
import { useSchoolStore } from "@/store/useSchoolStore";
import SchoolCard from "./SchoolCard";
import Banner from "../../components/Banner";
import useBannerStore from "@/store/useBannerStore";
import ScrollupBtn from "../ScrollupBtn";
import userStore from "@/store/userStore";
import { useRouter } from "next/navigation";
import useT from "../hooks/useT";

const StudyInJapan = () => {
  const { schools, fetchSchoolsZust, deleteSchoolZust, loading } =
    useSchoolStore();
  const showBanner = useBannerStore((state) => state.showBanner);
  const [isEditSchoolModel, setIsEditSchoolModel] = useState(false);
  const t = useT();
  const { user } = userStore();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/");
    }
  }, [user]);

  useEffect(() => {
    fetchSchoolsZust();
  }, [fetchSchoolsZust]);

  const handleSchoolDelete = async (schoolId) => {
    try {
      const result = await deleteSchoolZust(schoolId);
      if (result?.success) {
        showBanner("広告削除されました。", "success");
      }
    } catch (error) {
      showBanner(
        error?.response?.data?.message || "削除に失敗しました。",
        "error",
      );
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
        {t("studyInJapan")}
      </h1>
      <h2 className="text-2xl text-center font-medium mt-4 mb-2">
        Universities, Schools, Institutions and Academies in Japan Nihongomax
        has tie-up with.
      </h2>
      <h3 className="text-xl text-center">
        NIHONGOMAXが提携している日本の大学・学校・アカデミ・教育機関など
      </h3>
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
        <h2 className="text-center text-2xl rounded-2xl text-gray-500 border border-gray-400 mx-auto p-10 mt-10">
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
      <Banner />
      <ScrollupBtn />
    </div>
  );
};

export default StudyInJapan;
