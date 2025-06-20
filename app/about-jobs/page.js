"use client";
import LeftSideBar from "@/app/LeftSideBar";
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
    <div className="md:mt-20 mt-25 mb-20">
      <div className=" p-2 w-1/5 overflow-y-auto scroll-smooth overscroll-contain">
        <LeftSideBar />
      </div>
      <div className="flex flex-col md:ml-70 mb-20">
        <h1 className="md:text-4xl text-xl font-bold dark:text-[rgb(150,150,150)] text-center ">
          About Jobs in Japan
        </h1>
        <div className="border-2 bg-amber-200 border-black flex items-center justify-center h-[80vh] rounded-3xl">
          <div className="flex space-x-0.5">
            {" "}
            <div className="border-1 border-black w-10 h-10 flex items-center justify-center font-bold text-2xl">
              {guesses.map((guess) => (
                <Line key={guess} guess={guess} />
              ))}
            </div>
            <div className="border-1 border-black w-10 h-10 flex items-center justify-center font-bold text-2xl"></div>
            <div className="border-1 border-black w-10 h-10 flex items-center justify-center font-bold text-2xl"></div>
            <div className="border-1 border-black w-10 h-10 flex items-center justify-center font-bold text-2xl"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Wordle;
function Line({ guess }) {
  const tile = [];
  tile.push(guess);
}
