"use client";
import { useState, useEffect } from "react";
const words = [
  "さくらま",
  "ひこうき",
  "くるまぐ",
  "てんぷら",
  "せんせい",
  "ともだち",
  "ひとさま",
  "はなみず",
  "おんがく",
  "ほんだな",
];

const Wordle = () => {
  const [solution, setSolution] = useState("");
  const [guesses, setGuesses] = useState(Array(6).fill(null));

  useEffect(() => {
    setSolution(words[Math.floor(Math.random() * words.length)]);
  }, []);

  return (
    <div className="border-2 bg-amber-200 border-black m-20 flex items-center justify-center h-[80vh] rounded-3xl">
      <div className="flex space-x-0.5">
        {" "}
        <div className="border-1 border-black w-10 h-10 flex items-center justify-center font-bold text-2xl">
          {guesses.map((guess) => (
            <Line guess={guess} />
          ))}
        </div>
        <div className="border-1 border-black w-10 h-10 flex items-center justify-center font-bold text-2xl"></div>
        <div className="border-1 border-black w-10 h-10 flex items-center justify-center font-bold text-2xl"></div>
        <div className="border-1 border-black w-10 h-10 flex items-center justify-center font-bold text-2xl"></div>
      </div>
    </div>
  );
};

export default Wordle;
function Line({ guess }) {
  const tile = [];
  tile.push(guess);
}
