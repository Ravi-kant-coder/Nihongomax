import { Plus } from "lucide-react";

const MediaSlot = ({
  slot,
  onClick,
  fileType,
  fileInputRef,
  filePreview,
  fileName,
  fileSize,
  formatFileSize,
}) => {
  const getFileSizeStatus = (file) => {
    if (!file) return "empty";

    const sizeInMB = fileSize / (1024 * 1024);

    if (sizeInMB > 2) return "large";
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
    <div className="flex flex-col items-center justify-start mx-2">
      <div
        className={`relative cursor-pointer border-2 border-dashed overflow-hidden
        ${borderColor} rounded-lg flex items-center justify-center hover:bg-gray-300 group
        dark:hover:bg-[rgb(36,37,38)] dark:border-gray-400 md:w-40 md:h-35 w-32 h-28`}
        onClick={onClick}
      >
        {filePreview ? (
          fileType.startsWith("image") ? (
            <img
              src={filePreview}
              alt="Image Preview"
              className="w-full h-auto max-h-[200px] object-cover rounded"
            />
          ) : fileType === "video/avi" ? (
            <p className="text-sm text-center">AVIフォーマット不可</p>
          ) : (
            <video
              controls
              src={filePreview}
              className="w-full h-auto max-h-[200px] object-cover"
            />
          )
        ) : (
          <div className="flex flex-col items-center">
            <Plus className="h-12 w-12 dark:text-gray-400 text-gray-700 mb-2" />
            <p className="text-center dark:text-gray-400">貴校写真/ビデオ</p>
          </div>
        )}
      </div>
      {fileName && (
        <p
          className={`text-xs text-center font-semibold ${borderColor} truncate max-w-[100px] 
          mt-2`}
        >
          {fileName}
          <br />
          {slot?.file?.size && <span>{formatFileSize(slot.file.size)}</span>}
        </p>
      )}
      {filePreview && sizeStatus === "large" && (
        <p className={`text-xs ${borderColor} text-center max-w-[100px]`}>
          ファイルサイズ2MB以上不可
        </p>
      )}
    </div>
  );
};

export default MediaSlot;
