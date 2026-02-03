import { Plus } from "lucide-react";
import EmojiPickerButton from "./components/EmojiPickerButton";
import { Input } from "@/components/ui/input";

const StoryMediaSlot = ({
  slot,
  onClick,
  fileType,
  fileInputRef,
  filePreview,
  fileName,
  fileSize,
  formatFileSize,
  onChange,
  onCaptionEmoji,
}) => {
  const getFileSizeStatus = (file) => {
    if (!file) return "empty";

    const sizeInMB = fileSize / (1024 * 1024);

    if (sizeInMB > 4) return "large";
    return "ok";
  };

  const sizeStatus = getFileSizeStatus(slot?.file);

  const borderColor = {
    ok: "border-green-700 dark:border-green-500 text-green-800 dark:text-green-500",
    large: "border-red-600 dark:border-red-500 text-red-600 dark:text-red-500",
    empty:
      "border-gray-700 dark:border-gray-400 text-gray-700 dark:text-gray-400",
  }[sizeStatus];

  return (
    <div className="flex flex-col items-center justify-center">
      {fileName && (
        <p
          className={`text-xs text-center font-semibold ${borderColor} truncate max-w-[100px] 
          mt-2`}
        >
          {slot?.file?.size && <span>{formatFileSize(slot.file.size)}</span>}
        </p>
      )}
      {filePreview && sizeStatus === "large" && (
        <p
          className={`text-xs text-red-600 dark:text-red-500 text-center max-w-[100px]`}
        >
          File size exceeds 4MB
        </p>
      )}
      <div
        className={`relative cursor-pointer border-dashed overflow-hidden border-1
        ${borderColor} rounded-lg flex items-center justify-center hover:bg-gray-300 group
        dark:hover:bg-[rgb(36,37,38)] dark:border-gray-400 md:w-40 md:h-40 w-32 h-28`}
        onClick={onClick}
      >
        {filePreview ? (
          fileType.startsWith("image") ? (
            <img
              src={filePreview}
              alt="Image Preview"
              className="w-full h-full object-cover rounded"
            />
          ) : fileType === "video/avi" ? (
            <p className="text-sm text-center text-red-800">
              AVI Format is not allowed
            </p>
          ) : (
            <video
              controls
              src={filePreview}
              className="w-full h-full object-cover rounded"
            />
          )
        ) : (
          <div className="flex flex-col items-center">
            <Plus className="md:h-10 md:w-10 dark:text-gray-400 text-gray-500 mb-2" />
            <p className="text-center dark:text-gray-400">
              Add
              <br /> Photos/Videos
            </p>
          </div>
        )}
      </div>
      {fileName && (
        <div className="flex-1 mr-2 relative">
          <Input
            className="dark:border-gray-100 border-gray-400 w-full pr-8 md:w-[150px]"
            placeholder={`Add Caption`}
            value={slot?.caption || ""}
            maxLength={300}
            onChange={onChange}
          />
          <div className="absolute -bottom-1 right-1">
            <EmojiPickerButton
              onSelect={onCaptionEmoji}
              emojiSize={"h-7 w-7"}
            />
          </div>
        </div>
      )}
      {filePreview && sizeStatus === "large" && (
        <p
          className={`text-xs text-red-600 dark:text-red-500 text-center max-w-[100px]`}
        >
          File size exceeds 4MB
        </p>
      )}
    </div>
  );
};

export default StoryMediaSlot;
