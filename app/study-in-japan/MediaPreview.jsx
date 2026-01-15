import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { motion } from "framer-motion";

const MediaPreview = ({ onClose, url, type }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70"
      onClick={onClose} // 👈 click outside closes
    >
      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 300 }}
        className="relative max-w-[90vw] max-h-[90vh] flex items-center justify-center"
        onClick={(e) => e.stopPropagation()} // 👈 prevent close when clicking media
      >
        <Button
          className="absolute top-3 right-3 z-10 bg-black/70 text-white cursor-pointer hover:bg-black"
          variant="ghost"
          onClick={onClose}
        >
          <X className="h-6 w-6" />
        </Button>

        {type === "video" ? (
          <video
            src={url}
            controls
            className="max-w-[90vw] max-h-[90vh] object-contain rounded-lg"
          />
        ) : (
          <img
            src={url}
            alt="preview"
            className="max-w-[90vw] max-h-[90vh] object-contain rounded-lg"
          />
        )}
      </motion.div>
    </motion.div>
  );
};

export default MediaPreview;
