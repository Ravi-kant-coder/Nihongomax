"use client";
import React, { useState } from "react";
import ProfileDetails from "./ProfileDetails";

const ProfileTabs = ({
  id,
  profileData,
  isOwner,
  setProfileData,
  fetchProfile,
  user,
}) => {
  const [activeTab, setActiveTab] = useState("posts");
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
      <ProfileDetails
        activeTab={activeTab}
        profileData={profileData}
        id={id}
        user={user}
        isOwner={isOwner}
        setProfileData={setProfileData}
        fetchProfile={fetchProfile}
      />
    </div>
  );
};

export default ProfileTabs;
