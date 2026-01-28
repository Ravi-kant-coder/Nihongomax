import { SmilePlus, X } from "lucide-react";
import { useState, useRef } from "react";
import EmojiPickerPortal from "./EmojiPickerPortal";

const EmojiPickerButton = ({ onSelect }) => {
  const [open, setOpen] = useState(false);
  const btnRef = useRef(null);

  return (
    <div className="relative ">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="cursor-pointer hover:scale-115 transition-transform text-gray-500 hover:text-gray-700 dark:text-gray-400
        dark:hover:text-gray-200"
        ref={btnRef}
      >
        <SmilePlus className="h-8 w-8" strokeWidth={1.4} shrink={0} />
      </button>

      {open && (
        <EmojiPickerPortal
          anchorRef={btnRef}
          setOpen={setOpen}
          onSelect={(emoji) => {
            onSelect(emoji);
            setOpen(false);
          }}
        />
      )}
    </div>
  );
};

export default EmojiPickerButton;
