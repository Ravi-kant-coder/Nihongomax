import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { motion } from "framer-motion";

const ShowSchoolPreview = ({ onClose, picUrl, mediaType }) => {
  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: "spring", stiffness: 300 }}
      className="fixed inset-0 z-50 flex items-center justify-center"
    >
      <div className="relative max-w-[90vw] max-h-[90vh] flex items-center justify-center">
        <Button
          className="absolute top-3 right-3 z-10 bg-black/70 text-white cursor-pointer"
          variant="ghost"
          onClick={onClose}
        >
          <X className="h-6 w-6" />
        </Button>
        {mediaType === "video" ? (
          <video
            src={picUrl}
            controls
            className="max-w-[90vw] max-h-[90vh] object-contain rounded-lg"
          />
        ) : (
          <img
            src={picUrl}
            alt="preview"
            className="max-w-[90vw] max-h-[90vh] object-contain rounded-lg"
          />
        )}
      </div>
    </motion.div>
  );
};

export default ShowSchoolPreview;
