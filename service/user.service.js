import axiosInstance from "./url.service";

export const getAllFriendsRequest = async () => {
  try {
    const response = await axiosInstance.get("/users/friend-request");
    return response?.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getAllFriendsSuggestion = async () => {
  try {
    const response = await axiosInstance.get("/users/user-to-request");
    return response?.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const followUser = async (userId) => {
  try {
    const response = await axiosInstance.post("/users/follow", {
      userIdToFollow: userId,
    });
    return response?.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const UnfollowUser = async (userId) => {
  try {
    const response = await axiosInstance.post("/users/unfollow", {
      userIdToUnFollow: userId,
    });
    return response?.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const deleteUserFromRequest = async (userId) => {
  try {
    const response = await axiosInstance.post("/users/friend-request/remove", {
      requestSenderId: userId,
    });
    return response?.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const fetchUserProfile = async (userId) => {
  try {
    const response = await axiosInstance.get(`/users/profile/${userId}`);
    console.log(response?.data?.data);
    return response?.data?.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getMutualFriends = async (userId) => {
  try {
    const response = await axiosInstance.get(`/users/mutual-friends/${userId}`);
    return response?.data?.data;
  } catch (error) {
    console.log("Service catch mutual frinds error", error);
    throw error;
  }
};

export const updateUserProfile = async (userId, updateData) => {
  try {
    const response = await axiosInstance.put(
      `/users/profile/${userId}`,
      updateData
    );
    return response?.data?.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const updateUserCoverPhoto = async (userId, updateData) => {
  try {
    const response = await axiosInstance.put(
      `/users/profile/cover-photo/${userId}`,
      updateData
    );
    return response?.data?.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const createOrUpdateUserBio = async (userId, bioData) => {
  try {
    const response = await axiosInstance.put(`/users/bio/${userId}`, bioData);
    return response?.data?.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getAllUsers = async () => {
  try {
    const response = await axiosInstance.get("/users");
    return response?.data?.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const deleteUserDp = async (userId) => {
  console.log(userId);
  try {
    const result = await axiosInstance.delete(
      `/users/${userId}/profilePicture`
    );

    return result?.data?.message;
  } catch (error) {
    console.error(
      "Delete Dp Error in Service:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const deleteUserCover = async (userId) => {
  console.log(userId);
  try {
    const result = await axiosInstance.delete(`/users/${userId}/coverPhoto`);
    return result?.data?.message;
  } catch (error) {
    console.error(
      "Delete Cover Error in Service:",
      error.response?.data || error.message
    );
    throw error;
  }
};
