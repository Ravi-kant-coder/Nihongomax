"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { AnimatePresence } from "framer-motion";
import { Camera, PenLine, Save, Upload, X } from "lucide-react";
import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
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

  const handleCoverPhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCoverPhotoFile(file);

      const previewUrl = URL.createObjectURL(file);
      setCoverPhotoPreview(previewUrl);
    }
  };

  return (
    <div className="relative">
      {/* --------------------- Cover Photo & Edit Button---------------------------- */}

      <div
        className="relative lg:h-80 lg:w-[90vw] mx-auto rounded-lg lg:mt-20 mt-10 h-50
       bg-gray-400  dark:bg-gray-900 overflow-hidden "
      >
        <img
          src={"./Horizontal2.jpg"}
          alt="cover"
          className="w-full h-full object-cover"
        />
        {
          <Button
            className="absolute z-11 bottom-4 cursor-pointer right-4 flex items-center"
            variant="secondary"
            size="sm"
            onClick={() => setIsEditCoverModel(!isEditCoverModel)}
          >
            <Camera className=" mr-0 md:mr-2 h-4 w-4" />
            <span className="hidden md:block cursor-pointer">
              Edit Cover Photo
            </span>
          </Button>
        }
      </div>

      {/*---------------------- Profile section-------------------------- */}

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-10">
        <div className="flex flex-col md:flex-row items-center md:items-end md:space-x-5 ">
          <Avatar className="w-32 h-32 border-4 border-white dark:border-gray-700">
            <AvatarImage
              className="object-cover"
              src={user?.profilePicture}
              alt={user?.username}
            />
            <AvatarFallback className="bg-gray-400 dark:bg-gray-900 text-4xl">
              {user?.username.charAt(0)}
            </AvatarFallback>
          </Avatar>

          <div className="mt-4 mdLmt-0  text-center md:text-left flex-grow">
            <h1 className="text-3xl  font-bold">{user?.username}</h1>
            <p className="text-gray-800 dark:text-gray-300 font-semibold">
              {user?.followerCount}{" "}
              {user?.followerCount === 1 ? "friend" : "friends"}
            </p>
          </div>
          {
            <Button
              className="mt-4 md:mt-0 cursor-pointer"
              onClick={() => setIsEditProfileModel(true)}
            >
              <PenLine className="w-4 h-4 mr-2" />
              Edit Profile
            </Button>
          }
        </div>
      </div>

      {/*------------------------------Edit profile model-----------------------------*/}
      <AnimatePresence>
        {isEditProfileModel && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className=" bg-white dark:bg-gray-700 rounded-lg shadow-xl p-6 w-full max-w-md"
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                  Edit Profile
                </h2>
                <Button
                  className="hover:bg-background"
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
                  <Avatar className="w-24 h-24 border-4 border-white mb-2">
                    <AvatarImage />
                    <AvatarFallback className="dark:bg-gray-400 text-3xl">
                      G
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
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    Change Profile Picture
                  </Button>
                </div>
                <div>
                  <Label className="mb-2" htmlFor="username">
                    Username
                  </Label>
                  <Input id="username" />
                  <Input id="username" {...register("username")} />
                </div>
                <div>
                  <Label className="mb-2" htmlFor="dateOfBirth">
                    Date of Birth
                  </Label>
                  <Input
                    id="dateOfBirth"
                    type="date"
                    {...register("dateOfBirth")}
                  />
                </div>
                <RadioGroup defaultValue="Male">
                  <div className="flex items-center gap-3">
                    <RadioGroupItem value="Male" id="r1" />
                    <Label htmlFor="r1">Male</Label>
                  </div>
                  <div className="flex items-center gap-3">
                    <RadioGroupItem value="Female" id="r2" />
                    <Label htmlFor="r2">Female</Label>
                  </div>
                  <div className="flex items-center gap-3">
                    <RadioGroupItem value="Other" id="r3" />
                    <Label htmlFor="r3">Other</Label>
                  </div>
                </RadioGroup>

                <Label htmlFor="gender">Gender</Label>
                <Select
                  onValueChange={(value) => setValue("gender", value)}
                  defaultValue={profileData?.gender}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Gender" />
                  </SelectTrigger>
                  <SelectContent className="cursor-pointer">
                    <SelectItem
                      className="cursor-pointer hover:bg-background"
                      value="male"
                    >
                      Male
                    </SelectItem>
                    <SelectItem className="cursor-pointer" value="female">
                      Female
                    </SelectItem>
                    <SelectItem className="cursor-pointer" value="other">
                      Other
                    </SelectItem>
                  </SelectContent>
                </Select>

                <Button
                  type="submit"
                  className="w-full dark:bg-black dark:hover:bg-gray-900 hover:bg-gray-600
                   text-white"
                >
                  <Save className="w-4 h-4 mr-2" />{" "}
                  {loading ? "Saving..." : "Save changes"}
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
