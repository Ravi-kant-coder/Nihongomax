"use client";
import { useEffect } from "react";
import LeftSideBar from "@/app/LeftSideBar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Plus } from "lucide-react";

const createStoryArr = [
  {
    imageUrl: "/Girl.jpg",
    username: "Anjali",
  },
];
const schoolsData = [
  {
    _id: 1,
    imgURL: "/Circular.jpg",
    school: {
      schoolname: "First Study",
      schooldesc:
        "First Study is a nice School situated in Osaka near the Osakajo kouen.",
    },
  },
  {
    _id: 2,
    imgURL:
      "https://images.pexels.com/photos/29940495/pexels-photo-29940495/free-photo-of-elegant-fashion-editorial-portrait-in-london-studio.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    school: {
      schoolname: "Gori Study",
      schooldesc:
        "Fujiwara is a School for the students who want to experience real Japan .",
    },
  },
  {
    _id: 3,
    imgURL: "Horizontal1.jpg",
    school: {
      schoolname: "Second Study",
      schooldesc:
        "Fujiwara is a School for the students who want to experience real Japan .",
    },
  },
  {
    _id: 4,
    imgURL: "Horizontal2.jpg",
    school: {
      schoolname: "Third Study",
      schooldesc:
        "Fujiwara is a School for the students who want to experience real Japan .",
    },
  },
];

const SchoolsInJapan = () => {
  // useEffect(() => {
  //   fetchQuerys();
  // }, [querys]); // Add API logic from schools

  return (
    <div className="md:mt-20 mt-25 mb-20">
      <div className="p-2">
        <LeftSideBar />
      </div>

      <div className="md:ml-70 gap-6 px-4 mx-auto w-3/4">
        <h1 className="md:text-4xl text-xl font-bold dark:text-[rgb(150,150,150)] text-center mb-4">
          Schools in Japan
        </h1>
        <div className="md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:mx-auto ">
          {schoolsData.map((schoolData) => (
            <div
              key={schoolData._id}
              className="flex flex-col justify-center items-center"
            >
              <div className="w-full h-69 bg-amber-200">
                <img src={schoolData.imgURL} className="object-cover"></img>
              </div>
              <p className="text-white rounded max-w-[150px] text-xs inline-block font-semibold bg-black/50 px-2 py-1 truncate">
                {`${schoolData?.school.schoolname.split(" ")[0]}`}
              </p>
              <p>Click for more</p>
              <p>{schoolData.school.schoolname}</p>
              <div className="p-2">
                <p>{schoolData.school.schooldesc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default SchoolsInJapan;
