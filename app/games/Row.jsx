import { CornerDownLeft } from "lucide-react";

const Row = ({
  row,
  rowIndex,
  solution,
  currentRow,
  currentCol,
  isSubmitted,
  isPlaying,
  onEnter,
  WORD_LENGTH,
  MAX_ATTEMPTS,
}) => {
  const solutionLetters = solution.split("");
  const letterCount = {};

  solutionLetters.forEach((l) => {
    letterCount[l] = (letterCount[l] || 0) + 1;
  });

  const colors = row.map((letter, i) => {
    if (!isSubmitted || !letter) return "";

    if (letter === solutionLetters[i]) {
      letterCount[letter]--;
      return "bg-black text-white";
    }
    return "";
  });

  row.forEach((letter, i) => {
    if (colors[i] || !letter) return;
    if (letterCount[letter] > 0) {
      colors[i] = "bg-gray-500 text-white";
      letterCount[letter]--;
    }
  });

  const isActiveRow = rowIndex === currentRow;
  const enterEnabled = isActiveRow && currentCol === WORD_LENGTH && isPlaying;

  return (
    <div className="flex items-center justify-center gap-4 ">
      <div className="flex gap-1">
        {row.map((letter, i) => {
          const showCursor =
            isActiveRow && i === currentCol && !isSubmitted && isPlaying;

          return (
            <div
              key={i}
              className={`w-10 h-10 border flex items-center justify-center font-bold
                 border-black dark:border-gray-500 text-xl ${isSubmitted ? colors[i] : ""}`}
            >
              {letter}
              {showCursor && <div className="cursor" />}
            </div>
          );
        })}
      </div>

      <button
        onClick={onEnter}
        disabled={!enterEnabled}
        className={`px-3 py-2 border rounded transition border-gray-400
          ${
            enterEnabled
              ? "bg-green-700 text-white cursor-pointer border-green-900 hover:bg-green-800 hover:text-white"
              : "bg-gray-300 dark:bg-gray-700  text-gray-500 cursor-not-allowed"
          }`}
      >
        <span className="flex items-center justify-center">
          Enter
          <CornerDownLeft className="h-4 w-4 ml-1" />
        </span>
      </button>
    </div>
  );
};
export default Row;
