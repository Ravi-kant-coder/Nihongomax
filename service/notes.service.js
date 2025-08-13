import axiosInstance from "./url.service";

export const createNote = async (noteData) => {
  try {
    const result = await axiosInstance.post("/users/notes", noteData);
    return result?.data?.data;
  } catch (error) {
    console.error("Service me Note CreateError:", error);
    throw error;
  }
};

export const getAllUserNotes = async () => {
  try {
    const result = await axiosInstance.get(`/users/notes`);
    console.log("Got user Notes:", result?.data?.data);
    return result?.data?.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deleteNote = async (noteId) => {
  try {
    // const result = await axiosInstance.delete(`/users/notes/${noteId}`);
    // return result?.data?.message;
  } catch (error) {
    console.error(
      "Service Delete note Error:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const updateNoteService = async (noteId, content) => {
  try {
    // const result = await axiosInstance.patch(`/users/notes/${noteId}/content`, {
    //   content,
    // });
    // return result?.data?.data;
  } catch (error) {
    console.error(
      "notes.service me note update Error:",
      error.response?.data || error.message
    );
    throw error;
  }
};
