"use client";
import WallCard from "./WallCard";
import StorySection from "./StorySection";
import PostTrigger from "./PostTrigger";

const storyPostsData = [
  {
    _id: 1,
    mediaURL: "/Horizontal1.jpg",
    mediaType: "image",
    user: {
      username: "Sangeeta Verma",
    },
  },
  {
    _id: 2,
    mediaURL: "/Girl.jpg",
    mediaType: "image",
    user: {
      username: "Ruby Bhatia",
    },
  },
  {
    _id: 3,
    mediaURL: "Horizontal2.jpg",
    mediaType: "image",
    user: {
      username: "Pramod Solanki",
    },
  },
  {
    _id: 4,
    mediaURL:
      "https://images.pexels.com/photos/29940495/pexels-photo-29940495/free-photo-of-elegant-fashion-editorial-portrait-in-london-studio.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    mediaType: "image",
    user: {
      username: "Mansi Yadav",
    },
  },
  {
    _id: 5,
    mediaURL:
      "https://images.pexels.com/photos/30375728/pexels-photo-30375728/free-photo-of-elegant-black-and-white-wedding-portrait.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    mediaType: "image",
    user: {
      username: "Anchal Gupta",
    },
  },
  {
    _id: 6,
    mediaURL:
      "https://images.pexels.com/photos/31890680/pexels-photo-31890680/free-photo-of-woman-in-white-dress-surrounded-by-monstera-leaves.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
    mediaType: "image",
    user: {
      username: "Bhavna Sharma",
    },
  },
  {
    _id: 7,
    mediaURL:
      "https://images.pexels.com/photos/31649556/pexels-photo-31649556/free-photo-of-elegant-model-in-fashionable-black-attire.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
    mediaType: "image",
    user: {
      username: "Meenakshi Malhotra",
    },
  },

  {
    _id: 8,
    mediaURL:
      "https://images.pexels.com/photos/2218786/pexels-photo-2218786.jpeg?auto=compress&cs=tinysrgb&w=600",
    mediaType: "image",
    user: {
      username: "Krishna Gupta",
    },
  },
];

const Wall = () => {
  return (
    <div className="md:px-10 md:p-1 mb-20">
      <PostTrigger />
      <StorySection storyPostsData={storyPostsData} />
      {storyPostsData?.map((userDataObj) => (
        <WallCard key={userDataObj._id} userDataObj={userDataObj} />
      ))}
    </div>
  );
};

export default Wall;
