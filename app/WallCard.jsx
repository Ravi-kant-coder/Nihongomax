"use client";
import { useState, useTransition } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import userStore from "@/store/userStore";
import WallCardButtons from "./WallCardButtons";
import { wrapEmojis } from "@/lib/utils";
import { useParams } from "next/navigation";
import Spinner from "./Spinner";
import { useRouter } from "next/navigation";
import { Trash2, X } from "lucide-react";
import { motion } from "framer-motion";
import { usePostStore } from "@/store/usePostStore";
import PostContentEdit from "./PostContentEdit";
import MediaGrid from "./MediaGrid";
import useT from "./hooks/useT";
import useFormatRelativeTime from "./hooks/useFormatRelativeTime";
import DeleteConfModal from "./components/DeleteConfModel";

const WallCard = ({ post }) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const { deleteUserPost, handleSavePost } = usePostStore();
  const [isPending, startTransition] = useTransition();
  const [readyTodel, setReadyTodel] = useState(false);
  const { user } = userStore();
  const params = useParams();
  const id = params.id;
  const router = useRouter();
  const t = useT();
  const formatTime = useFormatRelativeTime();

  const handleDpClick = () => {
    startTransition(() => {
      if (post?.user?._id) {
        router.push(`/user-profile/${post?.user?._id}`);
      }
    });
  };

  const handlePostDelete = async () => {
    setShowDeleteModal(false);
    startTransition(async () => {
      if (post?._id) {
        try {
          await deleteUserPost(post._id);
        } catch (err) {
          console.error("Delete failed", err);
        }
      }
    });
  };

  return (
    <>
      <motion.div
        key={post._id}
        initial={{ opacity: 0, height: 0, rotate: -5 }}
        animate={{ opacity: 1, height: "auto", rotate: readyTodel ? -5 : 0 }}
        exit={{ opacity: 0, height: 0 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className={`rounded-lg ${readyTodel ? "bg-[rgb(255,200,200)] dark:bg-[rgb(70,0,0)]" : "bg-white dark:bg-[rgb(55,55,55)]"}  dark:shadow-black
    shadow-gray-400 dark:text-gray-300 shadow-lg dark:border-gray-500 overflow-hidden mb-6`}
      >
        {/* --------------------------Post Header (User information)-------------------------- */}
        <div className="flex items-center justify-between p-2 ">
          <div className="flex items-center ">
            <div
              className="relative mx-auto my-auto overflow-hidden rounded p-1"
              onClick={handleDpClick}
            >
              <Avatar className="cursor-pointer h-10 w-10 mr-3 hover:ring-1 ring-gray-500">
                <AvatarImage
                  src={post?.user?.profilePicture}
                  className="object-cover"
                />
                <AvatarFallback className="bg-gray-300 dark:bg-black capitalize">
                  {post?.user?.username[0]}
                </AvatarFallback>
              </Avatar>
            </div>
            <div>
              <div
                className="lg:w-70 md:w-50 truncate w-40 cursor-pointer overflow-hidden hover:underline capitalize font-[450]"
                onClick={handleDpClick}
              >
                {t("by")}{" "}
                {user?._id === post?.user?._id ? (
                  <span>{t("you")}</span>
                ) : (
                  post?.user?.username
                )}
              </div>
              <div className="text-xs text-gray-600 dark:text-gray-400">
                <span>{formatTime(post.createdAt)}</span>
              </div>
            </div>
          </div>
          <div className="flex">
            {post?.isSaved && (
              <button
                onClick={() => {
                  handleSavePost(post?._id, user);
                }}
                className="dark:bg-black/20 cursor-pointer md:px-2 group rounded border border-gray-400 flex flex-col items-center justify-center
                dark:hover:border-white mr-2 dark:border-gray-500 hover:border-black dark:hover:bg-black hover:bg-gray-200"
              >
                {" "}
                <span className="text-[10px] capitalize truncate w-10 group-hover:dark:text-white group-hover:text-black">
                  {user?.username.split(" ")[0]}
                </span>
                <X className="h-5 w-6 group-hover:text-black text-gray-500 dark:text-gray-300 group-hover:dark:text-white" />
                <span className="text-[10px] group-hover:text-black group-hover:dark:text-white">
                  {t("unsave")}?
                </span>
              </button>
            )}
            {user?._id === post?.user?._id && (
              <button
                onClick={() => {
                  setShowDeleteModal(true);
                  setReadyTodel(true);
                }}
                className="dark:bg-black/20 cursor-pointer md:px-2 group rounded border border-gray-400 bg-pink-100 
              flex flex-col items-center justify-center hover:border-red-600"
              >
                {" "}
                <span className="text-[10px] capitalize truncate w-10 group-hover:dark:text-red-500 group-hover:text-red-700">
                  {post?.user?.username.split(" ")[0]}
                </span>
                <Trash2 className="h-5 w-6 group-hover:text-red-700 text-gray-600 dark:text-gray-300 group-hover:dark:text-red-500" />
                <span className="text-[10px] group-hover:text-red-700 group-hover:dark:text-red-500">
                  {t("delete")}?
                </span>
              </button>
            )}
          </div>
        </div>

        {/* --------------------------Actual post content----------------------- */}
        <div className="bg-gray-200 dark:bg-[rgb(40,40,40)] p-2">
          {user?._id !== post?.user?._id ? (
            <p className="font-[450] p-4">{wrapEmojis(post?.content)}</p>
          ) : (
            <div className="p-2">
              <PostContentEdit
                post={post}
                postId={post._id}
                initialContent={post?.content}
                handlePostDelete={handlePostDelete}
              />
            </div>
          )}
          {post.contentUpdatedAt && (
            <span className="text-xs text-gray-700 dark:text-gray-300 ml-4">
              {t("edited")}
            </span>
          )}
        </div>
        {post?.uploadedMedia?.length > 0 && (
          <MediaGrid media={post?.uploadedMedia} />
        )}
        <WallCardButtons post={post} handleDpClick={handleDpClick} />
      </motion.div>
      <div>
        {/* --------------------Delete Confirmation Modal------------------- */}
        {showDeleteModal && (
          <DeleteConfModal
            user={user}
            item={t("post")}
            handleDelete={() => {
              setShowDeleteModal(false);
              handlePostDelete();
            }}
            handleCancel={() => {
              setShowDeleteModal(false);
              setReadyTodel(false);
            }}
          />
        )}
        {/* ------------------------Spinner-------------------------- */}
        {isPending && (
          <div className="fixed inset-0 flex items-center justify-center bg-white/60 dark:bg-black/60 backdrop-blur-sm transition-opacity duration-300 opacity-100 z-9999">
            <Spinner />
          </div>
        )}
      </div>
    </>
  );
};

export default WallCard;
