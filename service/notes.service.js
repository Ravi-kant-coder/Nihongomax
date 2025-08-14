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
    return result?.data?.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deleteNoteService = async (noteId) => {
  try {
    const result = await axiosInstance.delete(`/users/notes/${noteId}`);
    return result?.data?.message;
  } catch (error) {
    console.error("Service me Delete-note Error:", error.message);
    throw error;
  }
};

export const noteEditService = async (noteId, text) => {
  try {
    const result = await axiosInstance.patch(`/users/notes/${noteId}/text`, {
      text,
    });
    return result?.data?.data;
  } catch (error) {
    console.error("Service me note update Error:", error.message);
    throw error;
  }
};
