"use client";
import { Heart, MessageCircle, Share2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
const comments = 1;
const likes = 4;
const shares = 2;

const CommentsBtnPanel = ({
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
  return (
    <div className="flex flex-col justify-center lg:p-4 p-2 gap-1 items-center dark:bg-[rgb(25,25,25)]">
      <div className="flex justify-around w-full items-center">
        <Button
          variant="ghost"
          className={`hover:bg-gray-300 cursor-pointer border-1 border-gray-400 flex dark:hover:bg-background items-center  ${
            isLiked ? "text-red-600" : ""
          }`}
          onClick={onLike}
        >
          <Heart className="mr-1 h-4 w-4" />
          <span>Like</span>
        </Button>
        <Button
          variant="ghost"
          onClick={handleCommentClick}
          className="hover:bg-gray-300 cursor-pointer border-1 border-gray-400 flex items-center dark:hover:bg-background "
        >
          <MessageCircle className="mr-1 h-4 w-4" />
          <span>Comment</span>
        </Button>
        <Dialog open={isShareDialogOpen} onOpenChange={setIsShareDialogOpen}>
          <DialogTrigger asChild>
            <Button
              variant="ghost"
              className="hover:bg-gray-300 cursor-pointer border-1 border-gray-400 flex items-center dark:hover:bg-background"
              onClick={onShare}
            >
              <Share2 className="mr-1 h-4 w-4" />
              <span>Share</span>
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Share This Post</DialogTitle>
              <DialogDescription className="text-gray-900 dark:text-gray-300">
                Choose how you want to Share this Post{" "}
                {userDataObj?.user.username}
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
      <div className="flex justify-around w-full items-center text-sm text-gray-900 dark:text-gray-400">
        <Button variant="ghost" size="sm">
          {likes} {likes > 1 ? "likes" : "like"}
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="hover:bg-gray-400 dark:bg-[rgb(10,10,10)] dark:hover:bg-black bg-gray-300 cursor-pointer"
          onClick={() => setShowComments(!showComments)}
        >
          {comments} {comments > 1 ? "comments" : "comment"}
        </Button>
        <Button variant="ghost" size="sm">
          {shares} {shares > 1 ? "shares" : "share"}
        </Button>
      </div>
    </div>
  );
};

export default CommentsBtnPanel;
