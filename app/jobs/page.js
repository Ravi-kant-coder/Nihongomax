"use client";
import { useEffect, useState } from "react";
import { useJobStore } from "@/store/useJobStore";
import JobCard from "./JobCard";
import Banner from "@/components/Banner";
import useBannerStore from "@/store/useBannerStore";
import ScrollupBtn from "../ScrollupBtn";
import useT from "../hooks/useT";
import userStore from "@/store/userStore";
import { useRouter } from "next/navigation";

const Jobs = () => {
  const showBanner = useBannerStore((state) => state.showBanner);
  const { jobs, fetchJobsZust } = useJobStore();
  const { deleteJobZust } = useJobStore();
  const [isEditJobModel, setIsEditJobModel] = useState(false);
  const { user } = userStore();
  const router = useRouter();
  const t = useT();

  useEffect(() => {
    if (!user) {
      router.push("/");
    }
  }, [user]);

  useEffect(() => {
    fetchJobsZust();
  }, [fetchJobsZust]);

  const handleJobDelete = async (jobId) => {
    try {
      const result = await deleteJobZust(jobId);
      if (result?.success) {
        showBanner("Job-Post deleted successfully", "success");
      }
    } catch (error) {
      showBanner(
        error?.response?.data?.message || "Failed to delete job-post",
        "error",
      );
    }
  };

  return (
    <div className="w-full">
      <h1 className="text-4xl text-center font-bold">{t("jobApply")}</h1>
      {jobs?.length > 0 ? (
        jobs?.map((job, index) => (
          <JobCard
            job={job}
            key={job?._id || index}
            isOpen={isEditJobModel}
            onClose={() => setIsEditJobModel(false)}
            handleJobDelete={handleJobDelete}
          />
        ))
      ) : (
        <h2 className="text-center text-2xl mt-8 dark:text-gray-400 text-gray-700">
          No Jobs Available right now.
          <br />
          Plz check back later.
          <p className="mt-4"> 頑張ってね。応援しています！</p>
          <p className="text-lg"> (All the best. We are with you)</p>
        </h2>
      )}
      <Banner />
      <ScrollupBtn />
    </div>
  );
};

export default Jobs;
