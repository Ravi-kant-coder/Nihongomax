import { useRef } from "react";

export const useEmojiInsert = () => {
  const inputRef = useRef(null);

  const insertEmoji = ({
    emoji,
    value,
    setValue,
    fieldName,
    getValues,
    rhfSetValue,
  }) => {
    const input = inputRef.current;
    if (!input) return;

    const emojiChar = emoji.native || emoji;

    // decide source of value
    let currentValue = "";

    if (getValues && fieldName) {
      currentValue = getValues(fieldName) || "";
    } else {
      currentValue = value || "";
    }

    const start = input.selectionStart ?? currentValue.length;
    const end = input.selectionEnd ?? currentValue.length;

    const newText =
      currentValue.substring(0, start) +
      emojiChar +
      currentValue.substring(end);

    // RHF mode
    if (rhfSetValue && fieldName) {
      rhfSetValue(fieldName, newText, {
        shouldDirty: true,
        shouldTouch: true,
      });
    }

    // normal state mode
    if (setValue) {
      setValue(newText);
    }

    requestAnimationFrame(() => {
      input.focus();
      input.setSelectionRange(
        start + emojiChar.length,
        start + emojiChar.length,
      );
    });
  };

  return {
    inputRef,
    insertEmoji,
  };
};
