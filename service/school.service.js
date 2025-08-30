import axiosInstance from "./url.service";

export const createSchoolService = async (schoolData) => {
  try {
    const result = await axiosInstance.post("/students/schools", schoolData);
    return result?.data?.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const updateSchoolService = async (schoolId, content) => {
  try {
    const result = await axiosInstance.patch(
      `/students/schools/${schoolId}/content`,
      {
        content,
      }
    );
    return result?.data?.data;
  } catch (error) {
    console.error("job.service update Error:", error.message);
    throw error;
  }
};

export const deleteSchoolService = async (schoolId) => {
  try {
    const result = await axiosInstance.delete(`/students/schools/${schoolId}`);
    return result?.data?.message;
  } catch (error) {
    console.error("Delete School Error in service:", error.message);
    throw error;
  }
};

export const fetchSchoolsService = async () => {
  try {
    const result = await axiosInstance.get("/students/schools");
    return result?.data?.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
