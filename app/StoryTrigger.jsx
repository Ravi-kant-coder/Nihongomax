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
import { Textarea } from "@/components/ui/textarea";
import { AnimatePresence, motion } from "framer-motion";
import { Send, Plus, X } from "lucide-react";
import userStore from "@/store/userStore";
import { useStoryStore } from "@/store/useStoryStore";
import StoryMediaSlot from "./StoryMediaSlot";
import EmojiPickerButton from "./components/EmojiPickerButton";

const StoryTrigger = () => {
  const [isStoryTriggerOpen, setIsStoryTriggerOpen] = useState(false);
  const [caption, setCaption] = useState("");
  const [storyContent, setStoryContent] = useState("");
  const { user } = userStore();
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);
  const activeIndexRef = useRef(null);
  const { handleCreateStory } = useStoryStore();

  // ------------------Story Media slots state---------------------
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
        caption: "",
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

  const submitStory = async () => {
    const hasMedia = mediaSlots.some((slot) => slot?.file);
    const hasContent = storyContent.trim().length > 0;
    if (!hasContent && !hasMedia) {
      return;
    }

    try {
      setLoading(true);
      const storyData = new FormData();

      storyData.append("content", storyContent);

      const captions = [];

      mediaSlots.forEach((slot) => {
        if (slot?.file) {
          storyData.append("media", slot.file);
          captions.push(slot.caption || "");
        }
      });

      storyData.append("mediaCaptions", JSON.stringify(captions));

      await handleCreateStory(storyData);

      cleanupPreviews();
      setMediaSlots(Array(4).fill(null));
      setVisibleSlots(1);
      setStoryContent("");
      setSelectedFile(null);
      setIsStoryTriggerOpen(false);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleCaptionChange = (index, value) => {
    setMediaSlots((prev) => {
      const updated = [...prev];
      if (!updated[index]) return prev;

      updated[index] = {
        ...updated[index],
        caption: value,
      };
      return updated;
    });
  };

  const updateCaption = (index, value) => {
    setMediaSlots((prev) => {
      const updated = [...prev];
      if (updated[index]) {
        updated[index] = {
          ...updated[index],
          caption: value,
        };
      }
      return updated;
    });
  };

  return (
    <div
      className="shadow-md shadow-gray-400 dark:shadow-[rgb(20,20,20)] md:w-[120px] h-[200px] w-[80px] 
    dark:bg-[rgb(45,45,45)] rounded-lg"
    >
      <Dialog open={isStoryTriggerOpen} onOpenChange={setIsStoryTriggerOpen}>
        {/* -----------------------------------Story Trigger------------------------------------*/}
        <DialogTrigger className="w-full" asChild>
          <div
            className="relative w-full h-full cursor-pointer rounded-lg overflow-hidden bg-white dark:bg-[rgb(36,37,38)] 
              shadow-sm hover:shadow-md hover:scale-[1.02] transition-transform
"
          >
            <div className="relative h-[140px] w-full overflow-hidden">
              <img
                src={user?.profilePicture}
                alt={user?.username}
                className="w-full h-full object-cover"
              />
            </div>
            <div
              className="absolute left-1/2 top-[115px] -translate-x-1/2 w-10 h-10 bg-gray-500 rounded-full 
                flex items-center justify-center border-4 border-white dark:border-[rgb(36,37,38)]"
            >
              <Plus className="text-white w-5 h-5" />
            </div>
            <div className="py-4 text-center border-t border-gray-200 dark:border-[rgb(58,59,60)]">
              <p className="text-sm font-semibold text-black dark:text-white">
                Create Story
              </p>
              <p className="text-sm font-semibold text-black dark:text-white">
                {user?.username.split(" ")[0]}
              </p>
            </div>
          </div>
        </DialogTrigger>

        {/* -----------------------Story Trigger Opens Upload--------------------------*/}
        <DialogContent className="overflow-y-auto mt-1 dark:bg-[rgb(60,60,60)] md:max-w-3xl w-full">
          <DialogHeader>
            <DialogTitle className="text-center">Create a Story</DialogTitle>
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

          {/* -----------------------Textarea with Emoji--------------------------*/}
          <div className="relative">
            <Textarea
              placeholder={`Say something ${user?.username.split(" ")[0]}`}
              className="min-h-[80px] text-lg pr-12 dark:bg-[rgb(90,90,90)] border-gray-300"
              value={storyContent}
              onChange={(e) => setStoryContent(e.target.value)}
            />
            <div className="absolute bottom-0 right-2">
              <EmojiPickerButton
                onSelect={(emoji) => setStoryContent((prev) => prev + emoji)}
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
                      className="absolute top-2 right-0 z-10 w-6 h-6 rounded-full bg-black/70 text-white 
                      flex items-center justify-center text-sm hover:bg-black cursor-pointer"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  )}
                  <StoryMediaSlot
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
                    onChange={(e) => handleCaptionChange(index, e.target.value)}
                    onCaptionEmoji={(emoji) =>
                      updateCaption(index, (slot.caption || "") + emoji)
                    }
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
                     border border-gray-500 rounded-lg text-gray-600 hover:border-gray-700 hover:text-gray-700
                   dark:hover:border-white dark:hover:text-white dark:border-gray-400 mt-4"
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
              onClick={submitStory}
              disabled={hasTooLargeFile || loading}
            >
              {loading ? "Sending..." : "SEND"}
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default StoryTrigger;
