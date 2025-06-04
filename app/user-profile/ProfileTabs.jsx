"use client";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React, { useState } from "react";
import ProfileDetails from "./ProfileDetails";

const ProfileTabs = ({
  id,
  profileData,
  isOwner,
  setProfileData,
  fetchProfile,
}) => {
  const [activeTab, setActiveTab] = useState("posts");
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
      <Tabs
        defaultValue="posts"
        className="w-full"
        onValueChange={setActiveTab}
      >
        <TabsList className="grid w-full grid-cols-4 dark:bg-black cursor-pointer">
          <TabsTrigger value="posts" className=" cursor-pointer">
            Posts
          </TabsTrigger>
          <TabsTrigger value="about" className=" cursor-pointer">
            About
          </TabsTrigger>
          <TabsTrigger value="friends" className=" cursor-pointer">
            Friends
          </TabsTrigger>
          <TabsTrigger value="photos" className=" cursor-pointer">
            Photos
          </TabsTrigger>
        </TabsList>
        <div className="mt-6">
          <ProfileDetails activeTab={activeTab} />
        </div>
      </Tabs>
    </div>
  );
};

export default ProfileTabs;
