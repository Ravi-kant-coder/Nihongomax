import { useState, useRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { AnimatePresence, motion } from "framer-motion";
import { Send, Plus, X, Clapperboard, SmilePlus } from "lucide-react";
import { PhotoIcon } from "@heroicons/react/24/solid";
import userStore from "@/store/userStore";
import { usePostStore } from "@/store/usePostStore";
import PostMediaSlot from "./PostMediaSlot";
import EmojiPickerButton from "./components/EmojiPickerButton";
import { useEmojiInsert } from "./hooks/useEmojiInsert";

const PostTrigger = () => {
  const [isPostTriggerOpen, setIsPostTriggerOpen] = useState(false);
  const [postContent, setPostContent] = useState("");
  const { user } = userStore();
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);
  const activeIndexRef = useRef(null);
  const { handleCreatePost } = usePostStore();
  const { inputRef, insertEmoji } = useEmojiInsert();

  // ------------------Post Media slots state---------------------
  const maxSlots = 4;
  const [mediaSlots, setMediaSlots] = useState(
    Array.from({ length: maxSlots }, () => null),
  );

  const [visibleSlots, setVisibleSlots] = useState(1);

  const handleAddMoreSlot = () => {
    setVisibleSlots((prev) => Math.min(prev + 1, maxSlots));
  };

  const handleRemoveSlot = (index) => {
    setMediaSlots((prev) => {
      const updated = [...prev];

      for (let i = index; i < maxSlots - 1; i++) {
        updated[i] = updated[i + 1];
      }

      updated[maxSlots - 1] = null;
      return updated;
    });

    setVisibleSlots((prev) => Math.max(prev - 1, 1));
  };

  const canAddMore =
    visibleSlots < maxSlots && mediaSlots[visibleSlots - 1] !== null;

  const formatFileSize = (bytes) => {
    if (!bytes) return "";

    const kb = bytes / 1024;
    if (kb < 1024) {
      return `${kb.toFixed(1)} KB`;
    }
    const mb = kb / 1024;
    return `${mb.toFixed(1)} MB`;
  };

  const handleSlotClick = (index) => {
    activeIndexRef.current = index;
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const preview = URL.createObjectURL(file);

    setMediaSlots((prev) => {
      const updated = [...prev];
      updated[activeIndexRef.current] = {
        file,
        preview,
        type: file.type,
      };
      return updated;
    });
  };

  const hasTooLargeFile = mediaSlots.some((slot) => {
    if (!slot || !slot.file) return false;
    const sizeInMB = slot.file.size / (1024 * 1024);
    return sizeInMB > 4;
  });

  const cleanupPreviews = () => {
    mediaSlots.forEach((slot) => {
      if (slot?.preview) {
        URL.revokeObjectURL(slot.preview);
      }
    });
  };

  const submitPost = async () => {
    const hasMedia = mediaSlots.some((slot) => slot?.file);
    const hasContent = postContent.trim().length > 0;
    if (!hasContent && !hasMedia) {
      return;
    }
    try {
      setLoading(true);
      const postData = new FormData();
      postData.append("content", postContent);
      mediaSlots.forEach((slot) => {
        if (slot?.file) {
          postData.append("media", slot.file);
        }
      });
      await handleCreatePost(postData);
      cleanupPreviews();
      setMediaSlots(Array(4).fill(null));
      setVisibleSlots(1);
      setPostContent("");
      setSelectedFile(null);
      setIsPostTriggerOpen(false);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="lg:mb-2 shadow-md shadow-gray-400 dark:shadow-black w-full">
      <CardContent className="dark:bg-[rgb(45,45,45)] py-4">
        <Dialog open={isPostTriggerOpen} onOpenChange={setIsPostTriggerOpen}>
          <DialogTrigger className="w-full flex cursor-pointer justify-between items-center">
            <Avatar className="h-9 w-9 mr-1">
              <AvatarImage
                className="object-cover"
                src={user?.profilePicture}
              />
              <AvatarFallback
                className="bg-gray-300 dark:bg-gray-500 hover:bg-gray-300
             dark:text-white"
              >
                {user?.username.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="flex items-center w-full relative">
              <Input
                placeholder={`Ask or Answer ${user?.username.split(" ")[0]}`}
                readOnly
                className="rounded-xl border-1 border-gray-300 dark:border-gray-500 
                     cursor-pointer h-10 dark:bg-[rgb(75,75,75)]"
              />
              <SmilePlus className=" absolute right-0 h-6 w-6 text-yellow-500 mr-2" />
            </div>
            <div className="flex justify-center items-center">
              <div
                className="ml-1 p-2 cursor-pointer rounded-lg flex items-center
                   justify-center hover:bg-gray-200 dark:hover:bg-black
                    dark:text-white"
              >
                <PhotoIcon className="h-5 w-5 text-green-600 mr-1" />
                <span className="md:hidden lg:flex">Photos</span>
              </div>
              <div
                className=" p-2 hover:bg-gray-200 cursor-pointer rounded-lg
                   flex items-center justify-center dark:hover:bg-black
                    dark:text-white"
              >
                <Clapperboard className="h-5 w-5 text-red-600 mr-1" />
                <span className="md:hidden lg:flex">Videos</span>
              </div>
            </div>
          </DialogTrigger>
          <DialogContent className="overflow-y-auto mt-1 dark:bg-[rgb(60,60,60)] md:max-w-3xl w-full">
            <DialogHeader>
              <DialogTitle className="text-center">
                Create a Public Post
              </DialogTitle>
            </DialogHeader>
            <div className="flex items-center space-x-3 py-4">
              <Avatar>
                <AvatarImage
                  className="object-cover"
                  src={user?.profilePicture}
                />
                <AvatarFallback className="dark:bg-gray-800">
                  {user?.username.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div>
                <p>{user?.username}</p>
              </div>
            </div>

            {/* -----------------------Post Trigger Textarea with Emoji--------------------------*/}
            <div className="relative">
              <Textarea
                placeholder={`What's on your mind ${user?.username.split(" ")[0]} ?`}
                className="min-h-[80px] text-lg dark:bg-[rgb(90,90,90)] border-gray-300 pr-10"
                value={postContent}
                ref={inputRef}
                onChange={(e) => setPostContent(e.target.value)}
              />
              <div className="absolute bottom-0 right-2">
                <EmojiPickerButton
                  onSelect={(emoji) =>
                    insertEmoji({
                      emoji,
                      value: postContent,
                      setValue: setPostContent,
                    })
                  }
                  emojiSize={"h-8 w-8"}
                />
              </div>
            </div>

            {/* ------------------Image/video 4 media slots---------------------*/}
            <div
              className="flex flex-col md:flex-row md:items-start space-y-4 md:space-y-0 
                 md:space-x-4 mb-4 md:justify-start"
            >
              <AnimatePresence>
                {mediaSlots.slice(0, visibleSlots).map((slot, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.7 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                    className="relative"
                  >
                    {slot && (
                      <button
                        type="button"
                        onClick={() => handleRemoveSlot(index)}
                        className="absolute -top-2 right-0 z-10 w-6 h-6 rounded-full bg-black/70 text-white 
                          flex items-center justify-center text-sm hover:bg-black cursor-pointer"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    )}
                    <PostMediaSlot
                      key={index}
                      slot={slot}
                      filePreview={slot ? slot.preview : null}
                      fileName={slot?.file ? slot.file.name : null}
                      fileType={slot ? slot.type : null}
                      formatFileSize={formatFileSize}
                      fileSize={slot?.file ? slot.file.size : null}
                      handleFileChange={handleFileChange}
                      fileInputRef={fileInputRef}
                      onClick={() => handleSlotClick(index)}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
              {canAddMore && (
                <motion.button
                  type="button"
                  onClick={handleAddMoreSlot}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.8 }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.2 }}
                  className="w-[120px] flex flex-col items-center justify-center cursor-pointer dark:text-gray-400
                     border border-gray-500 rounded-lg text-gray-500 hover:border-gray-700 hover:text-gray-700
                   dark:hover:border-white dark:hover:text-white dark:border-gray-400"
                >
                  <span className="text-4xl">
                    <Plus className="h-6 w-6" />
                  </span>
                  <span className="text-sm ">Add</span>
                  <span className="text-sm ">More?</span>
                </motion.button>
              )}
              <input
                type="file"
                accept="image/*,video/*"
                className="hidden"
                onChange={handleFileChange}
                ref={fileInputRef}
              />
            </div>
            <div className="flex justify-end mt-4 ">
              <Button
                className="bg-gray-700 w-1/3 text-white dark:bg-black
                 dark:hover:bg-gray-900 cursor-pointer hover:bg-black"
                onClick={submitPost}
                disabled={hasTooLargeFile || loading}
              >
                {loading ? "Sending..." : "SEND"}
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};

export default PostTrigger;
