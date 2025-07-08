"use client";
import { Heart, MessageCircle, CornerUpRight } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import userStore from "@/store/userStore";

const comments = 2;
const likes = 45;
const shares = 12;
const WallCardButtons = ({
  isLiked,
  onLike,
  isShareDialogOpen,
  setIsShareDialogOpen,
  onShare,
  userDataObj,
  setShowComments,
  showComments,
  handleCommentClick,
  commentInputRef,
}) => {
  const { user } = userStore();

  return (
    <div className="flex flex-col justify-center lg:p-4 p-2 gap-1 items-center dark:bg-[rgb(25,25,25)]">
      <div className="md:mb-5 mb-2 w-[90%] flex justify-between items-center text-sm dark:text-gray-400 text-gray-700">
        <span className="text-sm border-gray-400 ">
          {likes} {likes > 1 ? "likes" : "like"}
        </span>
        <div className="flex md:gap-8 gap-2">
          <span
            className="text-sm border-gray-400 cursor-pointer "
            onClick={() => setShowComments(!showComments)}
          >
            {comments} {comments > 1 ? "comments" : "comment"}
          </span>
          <span className="text-sm border-gray-400">
            {shares} {shares > 1 ? "shares" : "share"}
          </span>
        </div>
      </div>
      <div className="flex justify-between w-full md:w-[90%] items-center text-gray-600">
        <Button
          variant="ghost"
          className={`hover:bg-gray-300 cursor-pointer border flex dark:hover:bg-background items-center  ${
            isLiked ? "text-red-600" : ""
          }`}
          onClick={onLike}
        >
          <span>Like</span>
          <Heart className="md:ml-1 h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          onClick={handleCommentClick}
          className=" hover:bg-gray-300 cursor-pointer border flex items-center dark:hover:bg-background"
        >
          <span>Comment</span>
          <MessageCircle className="md:ml-1 h-4 w-4" />
        </Button>
        <Dialog open={isShareDialogOpen} onOpenChange={setIsShareDialogOpen}>
          <DialogTrigger asChild>
            <Button
              variant="ghost"
              className="hover:bg-gray-300 cursor-pointer border flex items-center dark:hover:bg-background"
              onClick={onShare}
            >
              <span>Share</span>
              <CornerUpRight className="md:ml-1 h-4 w-4" />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Share This Post</DialogTitle>
              <DialogDescription className="text-gray-900 dark:text-gray-300">
                Choose how you want to Share this Post {user?.username}
              </DialogDescription>
            </DialogHeader>
            <div className="flex flex-col space-y-4">
              <Button
                className="cursor-pointer"
                onClick={() => handleShare("facebook")}
              >
                Share on Facebook
              </Button>
              <Button
                className="cursor-pointer"
                onClick={() => handleShare("twitter")}
              >
                Share on Twitter
              </Button>
              <Button
                className="cursor-pointer"
                onClick={() => handleShare("linkedin")}
              >
                Share on Linkedin
              </Button>
              <Button
                className="cursor-pointer"
                onClick={() => handleShare("copy")}
              >
                Copy Link
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default WallCardButtons;
