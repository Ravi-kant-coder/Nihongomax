"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import {
  Camera,
  PenLine,
  Save,
  Upload,
  X,
  Dot,
  Bell,
  User2,
  Users,
} from "lucide-react";
import { useRef, useState, useTransition } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  updateUserCoverPhoto,
  updateUserProfile,
  deleteUserDp,
  deleteUserCover,
} from "@/service/user.service";
import userStore from "@/store/userStore";
import { userFriendStore } from "@/store/userFriendsStore";
import { useForm } from "react-hook-form";
import ShowDpPreview from "./[id]/ShowDpPreview";
import Spinner from "../Spinner";

const ProfileHeader = ({
  id,
  profileData,
  isOwner,
  setProfileData,
  fetchProfile,
  user,
  onAction,
}) => {
  const [isEditProfileModel, setIsEditProfileModel] = useState(false);
  const [isEditCoverModel, setIsEditCoverModel] = useState(false);
  const [coverPhotoPreview, setCoverPhotoPreview] = useState(null);
  const [profilePicturePreview, setProfilePicturePreview] = useState(null);
  const [profilePictureFile, setProfilePictureFile] = useState(null);
  const [coverPhotoFile, setCoverPhotoFile] = useState(null);
  const [loading, setLaoding] = useState(false);
  const [showDpPreview, setShowDpPreview] = useState(false);
  const [filePreview, setFilePreview] = useState(null);
  const { setUser } = userStore();
  const [isPending, startTransition] = useTransition();
  const [showDeleteDpModal, setShowDeleteDpModal] = useState(false);
  const [showDeleteCoverModal, setShowDeleteCoverModal] = useState(false);
  const {
    followUser,
    UnfollowUser,
    fetchFriendRequest,
    fetchFriendSuggestion,
    deleteUserFromRequest,
    fetchMutualFriends,
    friendRequest,
    friendSuggestion,
    mutualFriends,
  } = userFriendStore();

  const { register, handleSubmit, setValue } = useForm({
    defaultValues: {
      username: profileData?.username,
      dateOfBirth: profileData?.dateOfBirth?.split("T")[0],
      gender: profileData?.gender,
    },
  });

  const profileImageInputRef = useRef();
  const coverImageInputRef = useRef();

  const onSubmitProfile = async (data) => {
    try {
      setLaoding(true);
      const formData = new FormData();
      formData.append("username", data.username);
      formData.append("dateOfBirth", data.dateOfBirth);
      formData.append("gender", data.gender);
      if (profilePictureFile) {
        formData.append("profilePicture", profilePictureFile);
      }
      const updateProfile = await updateUserProfile(id, formData);
      setProfileData({ ...profileData, ...updateProfile });
      setIsEditProfileModel(false);
      setProfilePicturePreview(null);
      setUser(updateProfile);
      await fetchProfile();
    } catch (error) {
      console.error("error updating user profile", error);
    } finally {
      setLaoding(false);
    }
  };

  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePictureFile(file);
      const previewUrl = URL.createObjectURL(file);
      setProfilePicturePreview(previewUrl);
    }
  };

  const handleCoverPhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCoverPhotoFile(file);
      const previewUrl = URL.createObjectURL(file);
      setCoverPhotoPreview(previewUrl);
    }
  };

  const handleAction = async (action, userId) => {
    if (action === "confirm") {
      await followUser(userId);
      fetchFriendRequest();
      fetchFriendSuggestion();
    } else if (action === "delete") {
      await deleteUserFromRequest(userId);
      fetchFriendRequest();
      fetchFriendSuggestion();
    }
  };

  const onSubmitCoverPhoto = async (e) => {
    e.preventDefault();
    try {
      setLaoding(true);
      const formData = new FormData();
      if (coverPhotoFile) {
        formData.append("coverPhoto", coverPhotoFile);
      }
      const updateProfile = await updateUserCoverPhoto(id, formData);
      setProfileData({ ...profileData, coverPhoto: updateProfile.coverPhoto });
      setIsEditCoverModel(false);
      setCoverPhotoFile(null);
    } catch (error) {
      console.error("error updating Cover photo", error);
    } finally {
      setLaoding(false);
    }
  };

  const handleDpClick = () => {
    if (isOwner) {
      setIsEditProfileModel(true);
    } else if (!profileData?.profilePicture) {
      setShowDpPreview(false);
    } else {
      setShowDpPreview(true);
    }
  };

  const handleDpDelete = async () => {
    setShowDeleteDpModal(false);
    startTransition(async () => {
      try {
        await deleteUserDp(user._id);
        setUser({ ...user, profilePicture: null });
      } catch (err) {
        console.error("Failed to delete DP", err);
      }
    });
  };

  const handleCoverDelete = async () => {
    setShowDeleteCoverModal(false);
    startTransition(async () => {
      try {
        await deleteUserCover(user._id);
        setUser({ ...user, coverPhoto: null });
      } catch (err) {
        console.error("Failed to delete Cover", err);
      }
    });
  };

  return (
    <div className="relative">
      {/* --------------------- Cover Photo & Cover Button---------------------------- */}

      <div
        className="relative lg:h-80 lg:w-[90vw] mx-auto md:rounded-lg mt-20 h-50
       bg-gray-400  dark:bg-gray-900 overflow-hidden"
      >
        {!profileData?.coverPhoto ? (
          <div
            className="lg:text-6xl md:text-4xl text-2xl mt-20 text-gray-500
           font-bold text-center capitalize"
          >
            {isOwner
              ? `Put Cover Photo
          ${profileData?.username.split(" ")[0]}`
              : `No Cover Photo of
          ${profileData?.username.split(" ")[0]}`}
          </div>
        ) : (
          profileData?.coverPhoto && (
            <img
              src={profileData?.coverPhoto}
              alt="Put Cover pic"
              className="object-cover w-full h-full"
            />
          )
        )}
        {isOwner && (
          <Button
            className="absolute z-11 bottom-4 cursor-pointer right-4 flex items-center
             dark:hover:bg-black bg-black text-white hover:bg-gray-800"
            variant="secondary"
            size="sm"
            onClick={() => setIsEditCoverModel(!isEditCoverModel)}
          >
            <Camera className=" mr-0 md:mr-2 h-4 w-4" />
            <span>Cover Photo</span>
          </Button>
        )}
      </div>

      {/*------------------------- DP, Friends and Followers number----------------------- */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-10">
        <div
          className="flex flex-col md:flex-row items-center md:items-end md:space-x-5"
          onClick={handleDpClick}
        >
          <Avatar
            className={`w-32 h-32 border-4 border-white dark:border-gray-700
             ${
               !isOwner && !profileData.profilePicture
                 ? "cursor-normal"
                 : "cursor-pointer"
             }`}
          >
            <AvatarImage
              className="object-cover"
              src={profileData?.profilePicture}
            />
            <AvatarFallback className="bg-gray-300 dark:bg-gray-900 text-4xl uppercase">
              {profileData?.username?.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>

          <div
            className="mt-4 md:mt-0 flex flex-col items-center md:items-start text-center
            md:text-left flex-grow"
          >
            <h1 className="text-3xl font-semibold capitalize truncate max-w-200">
              {profileData?.username}
              {isOwner ? "(You)" : ""}
            </h1>
            <p className="text-gray-800 flex dark:text-gray-300 ">
              {mutualFriends.length}{" "}
              {mutualFriends.length === 1 ? "friend" : "friends"}
              <Dot />
              {profileData?.followingCount} following
            </p>
          </div>
          {!isOwner && (
            <div className="flex flex-col justify-center items-center mt-4 md:mt-0">
              {true ? (
                <p className="text-sm truncate">
                  {profileData?.username.split(" ")[0]} is not your friend{" "}
                  {user?.username.split(" ")[0]}
                </p>
              ) : (
                <p className="text-sm truncate">
                  {profileData?.username.split(" ")[0]} is already your friend{" "}
                  {user?.username.split(" ")[0]}
                </p>
              )}
              <Button
                className="cursor-pointer bg-black text-white 
              dark:hover:bg-black/60 hover:bg-black/80"
                // onClick={() => handleAction("confirm", friend?._id)}
              >
                <Users className="w-4 h-4 mr-2" />
                Send Friend Request
              </Button>
            </div>
          )}
          {isOwner ? (
            <Button
              variant="secondary"
              size="sm"
              className="mt-4 md:mt-0 cursor-pointer bg-black text-white 
              dark:hover:bg-black/60 hover:bg-black/80"
              onClick={() => setIsEditProfileModel(true)}
            >
              <PenLine className="w-4 h-4 mr-2" />
              Change DP
            </Button>
          ) : (
            <Button
              className="z-11 cursor-pointer flex items-center mt-2
             dark:hover:bg-black bg-black text-white hover:bg-gray-800"

              // onClick={() => setIsEditCoverModel(!isEditCoverModel)}
            >
              <Bell className=" mr-0 md:mr-1 h-4 w-4" />
              <span>Message {profileData?.username.split(" ")[0]}</span>
            </Button>
          )}
        </div>
      </div>

      {/*------------------------------Edit/Delete DP model-----------------------------*/}
      <AnimatePresence>
        {isEditProfileModel && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center
             justify-center z-50"
          >
            <div className=" bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 w-full max-w-md">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                  Put/Change/Delete DP
                </h2>
                <Button
                  className="cursor-pointer bg-accent hover:bg-gray-200 dark:bg-gray-900
                  dark:hover:bg-black"
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsEditProfileModel(false)}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
              <form
                className="space-y-4"
                onSubmit={handleSubmit(onSubmitProfile)}
              >
                <div className="flex flex-col items-center mb-4">
                  <Avatar
                    className="w-24 h-24 border-4 border-white
                   dark:border-gray-700 mb-2"
                  >
                    <AvatarImage
                      src={profilePicturePreview || profileData?.profilePicture}
                      alt={profileData?.username}
                    />
                    <AvatarFallback className="dark:bg-black text-4xl capitalize">
                      {profileData?.username
                        ?.split(" ")
                        .map((name) => name[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    ref={profileImageInputRef}
                    onChange={handleProfilePictureChange}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => profileImageInputRef.current?.click()}
                    className="cursor-pointer hover:bg-gray-200 mb-2 border-gray-400"
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    Put/Change DP
                  </Button>
                  {user?.profilePicture && (
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => setShowDeleteDpModal(true)}
                      className="cursor-pointer hover:bg-gray-200 border-gray-400 w-40"
                    >
                      <X className="h-4 w-4 mr-1" />
                      Remove DP
                    </Button>
                  )}
                </div>
                <div>
                  <Label htmlFor="username">Username</Label>
                  <Input id="username" {...register("username")} />
                </div>
                <div>
                  <Label htmlFor="dateOfBirth">Date of Birth</Label>
                  <Input
                    id="dateOfBirth"
                    type="date"
                    {...register("dateOfBirth")}
                  />
                </div>

                <div>
                  <Label htmlFor="gender">Gender</Label>
                  <Select
                    onValueChange={(value) => setValue("gender", value)}
                    defaultValue={profileData?.gender}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button
                  type="submit"
                  className="w-full bg-gray-800 hover:bg-black dark:bg-gray-900 
                  cursor-pointer text-white dark:hover:bg-black"
                >
                  <Save className="w-4 h-4 mr-2" />{" "}
                  {loading ? "Saving..." : "Save changes"}
                </Button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {showDpPreview && (
        <ShowDpPreview
          dp={profileData?.profilePicture}
          name={profileData?.username}
          onClose={() => setShowDpPreview(false)}
        />
      )}
      {/* -------------------Edit cover photo Model------------------------ */}
      <AnimatePresence>
        {isEditCoverModel && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center
             justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className=" bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 w-full max-w-md"
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                  Edit Cover Photo
                </h2>
                <Button
                  variant="ghost"
                  size="icon"
                  className="bg-gray-200 hover:bg-gray-300 cursor-pointer 
                  dark:bg-gray-900 hover:dark:bg-black"
                  onClick={() => setIsEditCoverModel(false)}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
              <form className="space-y-4">
                <div className="flex flex-col items-center mb-4">
                  {coverPhotoPreview && (
                    <img
                      src={coverPhotoPreview}
                      alt="cover-photo"
                      className="w-full h-40 object-cover rounded-lg mb-4"
                    />
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    ref={coverImageInputRef}
                    onChange={handleCoverPhotoChange}
                  />
                  <Button
                    className="w-full hover:dark:bg-black bg-gray-200 dark:text-white mb-2
                    hover:border-gray-400 border-gray-300 cursor-pointer hover:bg-gray-300"
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => coverImageInputRef.current?.click()}
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    Select New Cover Photo
                  </Button>
                  {profileData?.coverPhoto && (
                    <Button
                      className="w-full hover:dark:bg-black bg-gray-200 dark:text-white
                    hover:border-gray-400 border-gray-300 cursor-pointer hover:bg-gray-300"
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => setShowDeleteCoverModal(true)}
                    >
                      <X className="h-4 w-4 mr-2" />
                      Delete Cover Photo
                    </Button>
                  )}
                </div>

                <Button
                  className="w-full bg-gray-800 dark:bg-gray-900 hover:bg-black
                   text-white cursor-pointer dark:hover:bg-black"
                  onClick={onSubmitCoverPhoto}
                  disabled={!coverPhotoFile}
                  type="button"
                >
                  <Save className="w-4 h-4 mr-2" />{" "}
                  {loading ? "Saving..." : "Save Cover Photo"}
                </Button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* --------------------Delete DP Confirmation Modal------------------- */}
      {showDeleteDpModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center"
        >
          <div className="bg-white dark:bg-[rgb(50,50,50)] p-6 rounded-2xl shadow-2xl w-80">
            <h2 className="text-center text-red-600 dark:text-white font-semibold text-xl capitalize">
              Remove DP {user?.username.split(" ")[0]}?
            </h2>
            <p className="text-sm dark:text-gray-300 text-center my-2">
              You can put it again later
            </p>

            <div className="flex justify-center gap-4 mt-6">
              <button
                onClick={() => {
                  setShowDeleteDpModal(false);
                }}
                className="px-4 py-2 rounded-lg bg-gray-300 cursor-pointer 
                          dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-600 text-sm"
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600
                    cursor-pointer text-white text-sm"
                onClick={handleDpDelete}
              >
                Yes, Remove
              </button>
            </div>
          </div>
        </motion.div>
      )}
      {/* --------------------Delete Cover Confirmation Modal------------------- */}
      {showDeleteCoverModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center"
        >
          <div className="bg-white dark:bg-[rgb(50,50,50)] p-6 rounded-2xl shadow-2xl w-80">
            <h2 className="text-center text-red-600 dark:text-white font-semibold text-xl">
              Delete Cover Photo {user?.username.split(" ")[0]}?
            </h2>
            <p className="text-sm dark:text-gray-300 text-center my-2">
              This cannot be recovered.
            </p>

            <div className="flex justify-center gap-4 mt-6">
              <button
                onClick={() => {
                  setShowDeleteCoverModal(false);
                }}
                className="px-4 py-2 rounded-lg bg-gray-300 cursor-pointer 
                          dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-600 text-sm"
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600
                    cursor-pointer text-white text-sm"
                onClick={handleCoverDelete}
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </motion.div>
      )}
      {/* ------------------------Spinner-------------------------- */}
      {isPending && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-white/60
                       dark:bg-black/60 backdrop-blur-sm z-[9999] transition-opacity
                        duration-300 opacity-100"
        >
          <Spinner />
        </div>
      )}
    </div>
  );
};

export default ProfileHeader;
