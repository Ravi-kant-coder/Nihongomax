"use client";

import dynamic from "next/dynamic";
import { createPortal } from "react-dom";
import { useEffect, useState } from "react";
import { X } from "lucide-react";

const Picker = dynamic(() => import("emoji-picker-react"), { ssr: false });

const EmojiPickerPortal = ({ anchorRef, onSelect, setOpen }) => {
  const [style, setStyle] = useState(null);

  useEffect(() => {
    let mounted = true;

    const rect = anchorRef.current?.getBoundingClientRect();
    if (!rect) return;

    const pickerHeight = 350;
    const spaceBelow = window.innerHeight - rect.bottom;

    const top =
      spaceBelow > pickerHeight ? rect.bottom + 8 : rect.top - pickerHeight - 8;

    if (mounted) {
      setStyle({
        position: "fixed",
        top,
        left: rect.left,
        zIndex: 9999,
      });
    }

    return () => {
      mounted = false;
    };
  }, [anchorRef]);

  if (!style) return null;

  return createPortal(
    <div
      style={style}
      className="pointer-events-auto"
      onClick={(e) => e.stopPropagation()}
    >
      <button
        type="button"
        className="absolute -top-2 right-2 bg-amber-200 rounded-full shadow p-1 cursor-pointer hover:bg-amber-300 z-10"
        onClick={(e) => {
          e.stopPropagation();
          setOpen(false);
        }}
      >
        <X className="h-5 w-5" />
      </button>
      <Picker
        onEmojiClick={(e) => onSelect(e.emoji)}
        searchDisabled
        previewConfig={{ showPreview: false }}
        skinTonesDisabled
      />
    </div>,
    document.body,
  );
};
export default EmojiPickerPortal;
