import axiosInstance from "./url.service";

export const createJobService = async (jobData) => {
  try {
    const result = await axiosInstance.post("/candidates/jobs", jobData);
    return result?.data?.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// export const updateJobService = async (jobId, content) => {
//   try {
//     const result = await axiosInstance.patch(
//       `/candidates/jobs/${jobId}/content`,
//       {
//         content,
//       }
//     );
//     return result?.data?.data;
//   } catch (error) {
//     console.error("job.service me update me Error:", error.message);
//     throw error;
//   }
// };

export const deleteJobService = async (jobId) => {
  try {
    const result = await axiosInstance.delete(`/candidates/jobs/${jobId}`);
    return result?.data?.message;
  } catch (error) {
    console.error("Delete Job Error in service:", error.message);
    throw error;
  }
};

export const fetchJobsService = async () => {
  try {
    const result = await axiosInstance.get("/candidates/jobs");
    return result?.data?.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
