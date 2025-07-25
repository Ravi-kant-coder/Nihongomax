"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { AnimatePresence } from "framer-motion";
import { Camera, PenLine, Save, Upload, X, Dot } from "lucide-react";
import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
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
} from "@/service/user.service";
import userStore from "@/store/userStore";
import { useForm } from "react-hook-form";

const ProfileHeader = ({
  id,
  profileData,
  isOwner,
  setProfileData,
  fetchProfile,
  user,
}) => {
  const [isEditProfileModel, setIsEditProfileModel] = useState(false);
  const [isEditCoverModel, setIsEditCoverModel] = useState(false);
  const [coverPhotoPreview, setCoverPhotoPreview] = useState(null);
  const [profilePicturePreview, setProfilePicturePreview] = useState(null);
  const [profilePictureFile, setProfilePictureFile] = useState(null);
  const [coverPhotoFile, setCoverPhotoFile] = useState(null);
  const [loading, setLaoding] = useState(false);
  const { setUser } = userStore();

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

  return (
    <div className="relative">
      {/* --------------------- Cover Photo & Edit Button---------------------------- */}

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

      {/*---------------------- Profile section-------------------------- */}

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-10">
        <div className="flex flex-col md:flex-row items-center md:items-end md:space-x-5">
          <Avatar
            className={`w-32 h-32 border-4 border-white dark:border-gray-700 
             ${isOwner && "cursor-pointer"}`}
            onClick={() => {
              isOwner && setIsEditProfileModel(true);
            }}
          >
            <AvatarImage
              className="object-cover"
              src={profileData?.profilePicture}
            />
            <AvatarFallback className="bg-gray-300 dark:bg-gray-900 text-4xl uppercase">
              {profileData?.username
                ?.split(" ")
                .map((name) => name[0])
                .join("")}
            </AvatarFallback>
          </Avatar>

          <div className="mt-4 md:mt-0  text-center md:text-left flex-grow">
            <h1 className="text-3xl font-semibold capitalize">
              {profileData?.username}
              {isOwner ? "(You)" : ""}
            </h1>
            <p className="text-gray-800 flex dark:text-gray-300 font-semibold">
              {profileData?.followerCount}{" "}
              {profileData?.followerCount === 1 ? "follower" : "followers"}
              <Dot />
              {profileData?.followingCount} following
            </p>
          </div>
          {isOwner && (
            <Button
              className="mt-4 md:mt-0 cursor-pointer bg-black text-white 
              dark:hover:bg-black/60 hover:bg-black/80"
              onClick={() => setIsEditProfileModel(true)}
            >
              <PenLine className="w-4 h-4 mr-2" />
              Add Profile
            </Button>
          )}
        </div>
      </div>

      {/*------------------------------Edit profile model-----------------------------*/}
      <AnimatePresence>
        {isEditProfileModel && (
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
                  Add Profile
                </h2>
                <Button
                  className="cursor-pointer bg-accent hover:bg-gray-200 
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
                    className="cursor-pointer hover:bg-gray-200"
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    Put/Change DP
                  </Button>
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
                  className="w-full bg-gray-800 hover:bg-black cursor-pointer text-white"
                >
                  <Save className="w-4 h-4 mr-2" />{" "}
                  {loading ? "Saving..." : "Save changes"}
                </Button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

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
                    className="w-full hover:dark:bg-black bg-gray-200 dark:text-white
                    hover:border-gray-400 border-gray-300 cursor-pointer hover:bg-gray-300"
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => coverImageInputRef.current?.click()}
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    Select New Cover Photo
                  </Button>
                </div>

                <Button
                  className="w-full bg-gray-800 dark:bg-black hover:bg-black
                   text-white cursor-pointer dark:hover:bg-gray-900"
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
    </div>
  );
};

export default ProfileHeader;
