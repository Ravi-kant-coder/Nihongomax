"use client";
import { useEffect, useState } from "react";
import LeftSideBar from "@/app/LeftSideBar";
import ScrollupBtn from "../ScrollupBtn";
import { useJobStore } from "@/store/useJobStore";
import JobCard from "./JobCard";
import { useBanner } from "../hooks/useBanner";
import Banner from "../Banner";

const Jobs = () => {
  const { jobs, fetchJobsZust } = useJobStore();
  const { banner, showBanner } = useBanner();
  const { deleteJobZust } = useJobStore();
  const [isEditJobModel, setIsEditJobModel] = useState(false);

  useEffect(() => {
    fetchJobsZust();
  }, [fetchJobsZust]);

  const handleJobDelete = async (jobId) => {
    try {
      const result = await deleteJobZust(jobId);
      showBanner("Job-Post deleted successfully", "success");
    } catch (error) {
      showBanner("Failed to delete job-post", "error");
    }
  };

  return (
    <div className="flex my-20">
      <LeftSideBar />
      <div className="md:ml-60 w-full">
        <h1 className="text-4xl text-center font-bold">Apply for Jobs</h1>
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
        <Banner banner={banner} />
        <ScrollupBtn />
      </div>
    </div>
  );
};

export default Jobs;
