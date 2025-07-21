import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useState, useRef } from "react";
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
import userStore from "@/store/userStore";
import { usePostStore } from "@/store/usePostStore";
import dynamic from "next/dynamic";
const Picker = dynamic(() => import("emoji-picker-react"), { ssr: false });

const PostTrigger = ({ isPostTriggerOpen, setIsPostTriggerOpen }) => {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [filePreview, setFilePreview] = useState(null);
  const [filePreviews, setFilePreviews] = useState([]);
  const [postContent, setPostContent] = useState("");
  const { user } = userStore();
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileType, setFileType] = useState("");
  const [loading, setLoading] = useState(false);
  const [showImageUpload, setShowImageUpload] = useState(false);
  const fileInputRef = useRef(null);
  const handleEmojiClick = (emoji) => {
    setPostContent((prev) => prev + emojiObject.emoji);
  };

  const handleFileChnage = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file), setFileType(file.type);
    setFilePreview(URL.createObjectURL(file));
  };

  const handlePost = async () => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("content", postContent);
      if (selectedFile) {
        formData.append("media", selectedFile);
      }
      await usePostStore.getState().handleCreatePost(formData);
      setPostContent("");
      setSelectedFile(null);
      setFilePreview(null);
      setIsPostTriggerOpen(false);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="lg:mb-2 shadow-md shadow-gray-400 dark:shadow-[rgb(20,20,20)] w-full">
      <CardContent className="dark:bg-[rgb(45,45,45)] lg:py-6 py-4 lg:pb-2 md:pb-2 rounded-lg">
        <div className="flex ">
          <Avatar className="h-9 w-9">
            <AvatarImage className="object-cover" src={user?.profilePicture} />
            <AvatarFallback
              className="bg-gray-300 dark:bg-gray-500 hover:bg-gray-300
             dark:text-white"
            >
              {user?.username.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <Dialog open={isPostTriggerOpen} onOpenChange={setIsPostTriggerOpen}>
            <div className="w-full px-4 cursor-pointer ">
              <DialogTrigger className="w-full">
                <div className="flex items-center">
                  <Input
                    placeholder={`Ask or Answer ${
                      user?.username.split(" ")[0]
                    }`}
                    readOnly
                    className="rounded-full border-1 border-gray-300 dark:border-gray-500
                     cursor-pointer h-10 dark:bg-[rgb(75,75,75)]"
                  />
                  <ImageIcon className="h-5 w-5 text-green-500 ml-4 lg:hidden md:hidden " />
                </div>
                <div className="lg:flex md:flex md:justify-center hidden lg:justify-between">
                  <div
                    className="px-4 p-2 cursor-pointer rounded-lg flex items-center mt-2
                   justify-center hover:bg-gray-300 dark:hover:bg-black
                    dark:text-white"
                  >
                    <ImageIcon className="h-5 w-5 text-green-500 mr-2" />
                    <span className="md:hidden lg:flex">Photo</span>
                  </div>
                  <div
                    className="px-4 p-2 hover:bg-gray-300 cursor-pointer rounded-lg
                   flex items-center mt-2 justify-center dark:hover:bg-black
                    dark:text-white"
                  >
                    <VideoIcon className="h-5 w-5 text-red-500 mr-2" />
                    <span className="md:hidden lg:flex">Video</span>
                  </div>
                  <div
                    className="px-4 p-2 cursor-pointer rounded-lg flex items-center mt-2
                   justify-center hover:bg-gray-300 dark:hover:bg-black
                    dark:text-white"
                  >
                    <Laugh className="h-5 w-5 text-yellow-500 mr-2" />
                    <span className="md:hidden lg:flex">Emoji</span>
                  </div>
                </div>
              </DialogTrigger>
            </div>
            <DialogContent className="overflow-y-auto mt-1 dark:bg-[rgb(60,60,60)]">
              <DialogHeader>
                <DialogTitle className="text-center">Create Post</DialogTitle>
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
                  <p className="font-semibold">{user?.username}</p>
                </div>
              </div>
              <Textarea
                placeholder={`What's on your mind ${
                  user?.username.split(" ")[0]
                } ?`}
                className="min-h-[80px] text-lg dark:bg-[rgb(90,90,90)]"
                value={postContent}
                onChange={(e) => setPostContent(e.target.value)}
              />
              <AnimatePresence>
                {(showImageUpload || filePreviews.length > 0) && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="relative mt-4 cursor-pointer border border-dashed border-gray-400
                    rounded-lg flex items-center justify-center hover:bg-gray-300 group
                    dark:hover:bg-[rgb(36,37,38)] p-2"
                    onClick={() => fileInputRef.current.click()}
                  >
                    {filePreview ? (
                      fileType.startsWith("image") ? (
                        <img
                          src={filePreview}
                          alt="preview_img"
                          className="w-full h-auto max-h-[200px] object-cover"
                        />
                      ) : (
                        <video
                          controls
                          src={filePreview}
                          className="w-full h-auto max-h-[200px] object-cover"
                        />
                      )
                    ) : (
                      <div className="flex flex-col items-center">
                        <Plus
                          className="h-12 w-12 text-gray-400 mb-2 cursor-pointer 
                        group-hover:text-gray-600 dark:group-hover:text-white"
                        />
                        <p
                          className="text-center group-hover:text-black
                        dark:group-hover:text-white text-gray-500 "
                        >
                          Add Photos/Videos
                        </p>
                      </div>
                    )}

                    <input
                      type="file"
                      accept="image/*,video/*"
                      className="hidden"
                      multiple
                      onChange={handleFileChnage}
                      ref={fileInputRef}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
              <div className="bg-gray-300 p-4 rounded-lg mt-4 dark:bg-[rgb(40,40,40)]">
                <p className="font-semibold mb-2">Add to your Post</p>
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    className="flex items-center justify-center hover:bg-green-200 
                    cursor-pointer dark:hover:bg-gray-600"
                    onClick={() => setShowImageUpload(!showImageUpload)}
                  >
                    <ImageIcon className="h-5 w-5 text-green-500" />
                    <span>Photo</span>
                  </Button>
                  <Button
                    variant="outline"
                    className="flex items-center justify-center hover:bg-pink-200 
                    cursor-pointer dark:hover:bg-gray-600"
                    onClick={() => setShowImageUpload(!showImageUpload)}
                  >
                    <VideoIcon className="h-5 w-5 text-red-500" />
                    <span>Video</span>
                  </Button>
                  <Button
                    variant="outline"
                    className="flex items-center justify-center hover:bg-yellow-200
                    cursor-pointer dark:hover:bg-gray-600"
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
                    className="absolute top-2 right-2 z-10 hover:bg-amber-200 cursor-pointer"
                    onClick={() => {
                      setShowEmojiPicker(false);
                    }}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                  <Picker onEmojiClick={handleEmojiClick} />
                </motion.div>
              )}
              <div className="flex justify-end mt-4 ">
                <Button
                  className="bg-gray-800 w-1/3 text-white dark:bg-black
                 dark:hover:bg-gray-900 cursor-pointer hover:bg-black"
                  onClick={handlePost}
                >
                  {loading ? "Posting..." : "POST"}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </CardContent>
    </Card>
  );
};

export default PostTrigger;
