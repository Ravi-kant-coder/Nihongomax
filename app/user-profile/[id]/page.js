"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { fetchUserProfile } from "@/service/user.service";
import userStore from "@/store/userStore";
import ScrollupBtn from "@/app/ScrollupBtn";
import ProfileHeader from "../components/ProfileHeader";
import ProfileDetails from "../components/ProfileDetails";

const Page = () => {
  const { user } = userStore();
  const params = useParams();
  const id = params.id;
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isOwner, setIsOwner] = useState(false);

  const fetchProfile = async () => {
    setLoading(true);
    try {
      const result = await fetchUserProfile(id);
      setProfileData(result.profile);
      setIsOwner(result.isOwner);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchProfile();
    }
  }, [id]);

  if (!profileData) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div>
        <ProfileHeader
          user={user}
          profileData={profileData}
          setProfileData={setProfileData}
          isOwner={isOwner}
          id={id}
          fetchProfile={fetchProfile}
        />{" "}
        <ProfileDetails
          user={user}
          profileData={profileData}
          setProfileData={setProfileData}
          isOwner={isOwner}
          id={id}
          fetchProfile={fetchProfile}
        />
      </div>
      <ScrollupBtn />
    </>
  );
};

export default Page;
