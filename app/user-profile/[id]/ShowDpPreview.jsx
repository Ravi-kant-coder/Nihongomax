import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { motion } from "framer-motion";

const ShowDpPreview = ({ onClose, dp, name }) => {
  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: "spring", stiffness: 300 }}
      className="fixed inset-0 flex items-center justify-center z-50"
    >
      <div
        className="relative w-full max-w-md h-md flex flex-col bg-white
       dark:bg-gray-800 rounded-lg overflow-hidden "
      >
        <div className="p-4 text-lg">{name}</div>
        <Button
          className="absolute top-4 right-4 z-10 text-white hover:text-white cursor-pointer 
          hover:bg-black bg-black/70"
          variant="ghost"
          onClick={onClose}
        >
          <X className="h-6 w-6" />
        </Button>
        <div className="flex items-center justify-center bg-black/70">
          <img src={dp} alt="Dp not loading" className="object-cover" />
        </div>
      </div>
    </motion.div>
  );
};

export default ShowDpPreview;
