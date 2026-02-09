import { useRef } from "react";

export const useEmojiInsert = (value, setValue) => {
  const inputRef = useRef(null);

  const handleEmojiInsert = (emoji) => {
    const input = inputRef.current;
    if (!input) return;

    const start = input.selectionStart;
    const end = input.selectionEnd;

    const newText = value.substring(0, start) + emoji + value.substring(end);

    setValue(newText);

    requestAnimationFrame(() => {
      input.focus();
      input.setSelectionRange(start + emoji.length, start + emoji.length);
    });
  };

  return { inputRef, handleEmojiInsert };
};
