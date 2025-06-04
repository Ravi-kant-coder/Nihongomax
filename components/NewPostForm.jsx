import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import { AnimatePresence, motion } from "framer-motion";
import { ImageIcon, Laugh, Plus, VideoIcon, X } from "lucide-react";
// import dynamic from "next/dynamic";
import { useState } from "react";

// const Picker = dynamic(() => import("emoji-picker-react"), { ssr: false });

const NewPostForm = ({ isPostFormOpen, setIsPostFormOpen }) => {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [filePreview, setFilePreview] = useState(null);
  const [postContent, setPostContent] = useState("");

  const handleEmojiClick = (emoji) => {
    setPostContent((prev) => prev + emojiObject.emoji);
  };
  return (
    <Card className="dark:bg-[rgb(35,35,35)] mb-2 shadow-md shadow-gray-400 dark:shadow-[rgb(20,20,20)] w-full">
      <CardContent className="dark:bg-[rgb(65,65,65)] pt-6 pb-2 rounded-lg bg-accent">
        <div className="flex ">
          <Avatar className="h-9 w-9 cursor-pointer">
            <AvatarImage />
            <AvatarFallback className="bg-gray-300 dark:bg-gray-500 hover:bg-gray-300 dark:text-white">
              S
            </AvatarFallback>
          </Avatar>

          <Dialog open={isPostFormOpen} onOpenChange={setIsPostFormOpen}>
            <div className="w-full px-4 cursor-pointer ">
              <DialogTrigger className="w-full ">
                <Input
                  placeholder="Ask or Answer..."
                  readOnly
                  className="rounded-full border-1 border-gray-300 dark:border-gray-500 cursor-pointer h-10 dark:bg-[rgb(75,75,75)]"
                />

                <div className="flex justify-between">
                  <div className="px-4 p-2 cursor-pointer rounded-lg flex items-center mt-2 justify-center hover:bg-gray-300 dark:hover:bg-[rgb(36,37,38)] dark:text-white">
                    <ImageIcon className="h-5 w-5 text-green-500 mr-2" />
                    <span>Photo</span>
                  </div>
                  <div className="px-4 p-2 hover:bg-gray-300 cursor-pointer rounded-lg flex items-center mt-2 justify-center dark:hover:bg-[rgb(36,37,38)] dark:text-white">
                    <VideoIcon className="h-5 w-5 text-red-500 mr-2" />
                    <span>Video</span>
                  </div>
                  <div className="px-4 p-2 cursor-pointer rounded-lg flex items-center mt-2 justify-center hover:bg-gray-300 dark:hover:bg-[rgb(36,37,38)] dark:text-white">
                    <Laugh className="h-5 w-5 text-yellow-500 mr-2" />
                    <span>Emoji</span>
                  </div>
                </div>
              </DialogTrigger>
            </div>
            <DialogContent className="sm:max-w-[525px] max-h-[90vh] overflow-y-auto mt-1 dark:bg-[rgb(60,60,60)]">
              <DialogHeader>
                <DialogTitle className="text-center">Create Post</DialogTitle>
              </DialogHeader>
              <div className="flex items-center space-x-3 py-4">
                <Avatar>
                  <AvatarImage />
                  <AvatarFallback className="dark:bg-gray-800">
                    S
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold">Sangeeta</p>
                </div>
              </div>
              <Textarea
                placeholder={`What's on your mind Sangeeta?`}
                className="min-h-[80px] text-lg dark:bg-[rgb(90,90,90)]"
              />

              <div className="relative mt-4 border-2 border-dashed border-gray-500 rounded-lg p-8 flex flex-col items-center justify-center">
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute cursor-pointer top-2 right-2"
                >
                  <X className="h-4 w-4"></X>
                </Button>
                {filePreview ? (
                  fileType.startsWith("image") ? (
                    <img />
                  ) : (
                    <video />
                  )
                ) : (
                  <>
                    <Plus className="h-8 w-12 cursor-pointer text-gray-400 mb-2 " />
                    <p className="text-center text-gray-600 dark:text-gray-400">
                      Add Photos/Videos
                    </p>
                  </>
                )}
                <input
                  type="file"
                  accept="image/*, video/*"
                  className="hidden"
                />
              </div>

              <div className="bg-gray-300 p-4 rounded-lg mt-4 dark:bg-[rgb(40,40,40)]">
                <p className="font-semibold mb-2">Add to your Post</p>
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    className="flex items-center justify-center hover:bg-green-200 cursor-pointer dark:hover:bg-gray-600"
                  >
                    <ImageIcon className="h-5 w-5 text-green-500" />
                    <span>Photo</span>
                  </Button>
                  <Button
                    variant="outline"
                    className="flex items-center justify-center hover:bg-pink-200 cursor-pointer dark:hover:bg-gray-600"
                  >
                    <VideoIcon className="h-5 w-5 text-red-500" />
                    <span>Video</span>
                  </Button>
                  <Button
                    variant="outline"
                    className="flex items-center justify-center hover:bg-yellow-200 cursor-pointer dark:hover:bg-gray-600"
                    onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                  >
                    <Laugh className="h-5 w-5 text-yellow-500" />
                    <span>Emoji</span>
                  </Button>
                </div>
              </div>

              {showEmojiPicker && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  className="relative"
                >
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-2 right-2 z-10"
                    onClick={() => {
                      setShowEmojiPicker(false);
                    }}
                  >
                    <X className="h-4 w-4"></X>
                  </Button>
                  {/* <Picker onEmojiClick={handleEmojiClick} /> */}
                </motion.div>
              )}
              <div className="flex justify-end mt-4 ">
                <Button className="bg-gray-800 w-1/3 text-white dark:bg-black dark:hover:bg-gray-900 cursor-pointer hover:bg-black">
                  POST
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </CardContent>
    </Card>
  );
};

export default NewPostForm;
