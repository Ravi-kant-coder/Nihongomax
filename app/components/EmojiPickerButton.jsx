import { SmilePlus } from "lucide-react";
import { useState, useRef } from "react";
import EmojiPickerPortal from "./EmojiPickerPortal";

const EmojiPickerButton = ({ onSelect, emojiSize }) => {
  const [open, setOpen] = useState(false);
  const btnRef = useRef(null);

  return (
    <div className="relative ">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="cursor-pointer hover:scale-115 transition-transform text-amber-600 dark:text-gray-400
        dark:hover:text-gray-200"
        ref={btnRef}
      >
        <SmilePlus className={emojiSize} strokeWidth={1.5} shrink={0} />
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
