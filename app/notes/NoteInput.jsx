import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { useEffect } from "react";
import EmojiPickerButton from "@/app/components/EmojiPickerButton";
import { useEmojiInsert } from "../hooks/useEmojiInsert";

const NoteInput = ({ initialNote, setInitialNote, isPending, onSubmit, t }) => {
  const { inputRef, insertEmoji } = useEmojiInsert();

  return (
    <>
      {" "}
      <div
        className="bg-white dark:bg-[rgb(10,10,10)] rounded-2xl shadow-md border border-gray-200 dark:border-gray-800
        p-4 sm:p-6 mt-10 md:mt-0"
      >
        <h1 className="text-xl sm:text-2xl font-semibold text-center">
          {t("makeNotes")}
        </h1>
        <p className="text-center text-gray-500 text-sm sm:text-base mt-2 mb-6">
          {t("onlyYouCanSee")}
        </p>
        {/* Textarea */}

        <Textarea
          id="note"
          type="text"
          className="bg-white dark:bg-[rgb(10,10,10)] text-base resize-y"
          placeholder={t("typeEnt")}
          disabled={isPending}
          autoFocus
          onChange={(e) => setInitialNote(e.target.value)}
          ref={inputRef}
          value={initialNote}
          autoComplete="off"
        />

        {/* Bottom controls */}

        <div className="flex items-center justify-between mt-4 gap-4">
          {/* Emoji */}

          <EmojiPickerButton
            onSelect={(emoji) =>
              insertEmoji({
                emoji,
                value: initialNote,
                setValue: setInitialNote,
              })
            }
            emojiSize="h-8 w-8"
          />

          {/* Submit */}

          <Button
            onClick={onSubmit}
            disabled={isPending || !initialNote.trim()}
            className="
            px-5 sm:px-6
            min-w-[90px]
          "
          >
            <Plus className="mr-2 h-4 w-4" />
            {t("enter")}
          </Button>
        </div>
      </div>
    </>
  );
};

export default NoteInput;
