"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

import { JLPT_QUESTIONS } from "@/data/jlptQuiz";

function shuffleArray(array) {
  const shuffled = [...array];

  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));

    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  return shuffled;
}

/*
  Choose a random number of questions.

  If there are 70 or more questions:
  → randomly choose between 50 and 70.

  If there are between 50 and 69 questions:
  → randomly choose between 50 and the available number.

  If there are fewer than 50 questions:
  → use all available questions.

  This last case is useful while we are still building
  the question banks.
*/
function getRandomQuestionCount(totalQuestions) {
  if (totalQuestions <= 0) {
    return 0;
  }

  if (totalQuestions < 50) {
    return totalQuestions;
  }

  const min = 50;
  const max = Math.min(70, totalQuestions);

  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/*
  Create a fresh quiz attempt.

  1. Decide how many questions this attempt will have.
  2. Shuffle the complete question bank.
  3. Take only the required number of questions.
*/
function createQuizQuestions(questionBank) {
  if (!Array.isArray(questionBank)) {
    return [];
  }

  const questionCount = getRandomQuestionCount(questionBank.length);

  return shuffleArray(questionBank).slice(0, questionCount);
}

export default function QuizPage({ level }) {
  const router = useRouter();

  const normalizedLevel = String(level || "").toLowerCase();

  const originalQuestions = JLPT_QUESTIONS[normalizedLevel];

  const [questions, setQuestions] = useState(() =>
    createQuizQuestions(originalQuestions || []),
  );

  const [answers, setAnswers] = useState({});
  const [scoreChecked, setScoreChecked] = useState(false);
  const [score, setScore] = useState(null);

  const attemptedCount = Object.keys(answers).length;

  const levelTitle = normalizedLevel.toUpperCase();

  if (!originalQuestions) {
    return (
      <main className="flex min-h-screen items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Quiz not found</h1>

          <button
            type="button"
            onClick={() => router.push("/jlpt-quiz")}
            className="mt-6 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white"
          >
            Back to JLPT Quiz
          </button>
        </div>
      </main>
    );
  }

  const handleAnswer = (questionId, answerIndex) => {
    if (scoreChecked) {
      return;
    }

    setAnswers((previous) => ({
      ...previous,
      [questionId]: answerIndex,
    }));
  };

  const handleCheckScore = () => {
    let correct = 0;

    questions.forEach((question) => {
      if (answers[question.id] === question.answer) {
        correct++;
      }
    });

    setScore(correct);
    setScoreChecked(true);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleTryAgain = () => {
    setQuestions(createQuizQuestions(originalQuestions));

    setAnswers({});
    setScoreChecked(false);
    setScore(null);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <main className="min-h-screen px-4 py-8 pb-24">
      {/* =========================
          FIXED SCORE PANEL
      ========================== */}

      <div
        className="
          fixed
          right-3
          top-24
          z-40
          w-[145px]
          rounded-2xl
          border
          border-gray-200
          bg-white/95
          p-3
          shadow-xl
          backdrop-blur
          dark:border-gray-700
          dark:bg-[#cfcfcf]/95
          sm:right-5
          sm:w-[175px]
          sm:p-4
        "
      >
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-wide text-gray-600 dark:text-black">
            Ques attempted
          </p>

          <p className="mt-1 text-2xl font-bold text-gray-900">
            {attemptedCount}
            <span className="text-sm font-medium text-gray-600 dark:text-black">
              {" "}
              / {questions.length}
            </span>
          </p>
        </div>

        {scoreChecked && (
          <div className="mt-3 border-t border-gray-200 pt-3 text-center">
            <p className="text-xs font-semibold uppercase tracking-wide text-gray-600 dark:text-black">
              Total Correct
            </p>

            <motion.p
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="mt-1 text-3xl font-bold text-green-600"
            >
              {score}
              <span className="text-sm font-medium text-gray-600 dark:text-black">
                {" "}
                / {questions.length}
              </span>
            </motion.p>
          </div>
        )}

        {attemptedCount > 0 && !scoreChecked && (
          <button
            type="button"
            onClick={handleCheckScore}
            className="
              mt-3
              w-full
              rounded-lg
              bg-black
              px-2
              py-2
              text-xs
              font-bold
              text-white
              transition
              hover:bg-gray-700
              cursor-pointer
            "
          >
            Check Score
          </button>
        )}

        {scoreChecked && (
          <button
            type="button"
            onClick={handleTryAgain}
            className="
              mt-3
              w-full
              rounded-xl
              bg-gray-900
              px-2
              py-2
              text-xs
              font-bold
              text-white
              transition
              hover:bg-gray-800
            "
          >
            Try Again
          </button>
        )}
      </div>

      {/* =========================
          HEADER
      ========================== */}

      <div className="mx-auto max-w-4xl pr-2 sm:pr-0">
        <button
          type="button"
          onClick={() => router.push("/jlpt-quiz")}
          className="mb-4 text-lg font-semibold hover:bg-white p-2 rounded-lg transition cursor-pointer border border-white
          hover:shadow-md dark:hover:bg-gray-700"
        >
          ← All JLPT Levels
        </button>
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-bold text-gray-700 dark:text-gray-200">
            JLPT {levelTitle} Quiz
          </h1>

          <p className="mt-3 text-gray-600 dark:text-gray-400">
            Choose the best answer for each question.
          </p>
        </div>

        {/* =========================
            QUESTIONS
        ========================== */}

        <div className="space-y-8">
          {questions.map((question, questionIndex) => {
            const selectedAnswer = answers[question.id];

            return (
              <motion.div
                key={question.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.3,
                  delay: Math.min(questionIndex * 0.02, 0.5),
                }}
                className="
                  rounded-3xl
                  border
                  border-gray-200
                  bg-white
                  p-5
                  shadow-sm
                  dark:border-gray-700
                  dark:bg-gray-400
                  sm:p-7
                "
              >
                {/* Question header */}

                <div className="flex items-start gap-3">
                  <div
                    className="
                      flex
                      h-9
                      min-w-9
                      items-center
                      justify-center
                      rounded-full
                      bg-black
                      px-2
                      text-sm
                      font-bold
                      text-white
                    "
                  >
                    {questionIndex + 1}
                  </div>

                  <div className="flex-1">
                    <div className="mb-3">
                      <span
                        className="
                          rounded-full
                          bg-gray-100
                          px-3
                          py-1
                          text-xs
                          font-semibold
                          uppercase
                          tracking-wide
                          text-gray-500
                        "
                      >
                        {question.type}
                      </span>
                    </div>

                    <p className="text-lg font-semibold leading-8 text-gray-800 dark:text-black">
                      {question.question}
                    </p>
                  </div>
                </div>

                {/* Answers */}

                <div className="mt-6 space-y-3">
                  {question.choices.map((choice, choiceIndex) => {
                    const isSelected = selectedAnswer === choiceIndex;
                    const isCorrect = question.answer === choiceIndex;
                    let optionClass = `
                      border-gray-200
                      bg-white
                      hover:border-gray-400
                      hover:bg-gray-100
                      dark:border-white
                      dark:bg-gray-200
                      dark:hover:border-gray-500
                      dark:hover:bg-gray-300
                    `;

                    if (!scoreChecked && isSelected) {
                      optionClass = `
                        border-gray-500
                        bg-gray-100
                      dark:border-black
                      dark:bg-gray-200
                      `;
                    }

                    if (scoreChecked && isCorrect) {
                      optionClass = `
                        border-green-500
                        bg-green-50
                        ring-2
                        ring-green-200
                      `;
                    }

                    if (scoreChecked && isSelected && !isCorrect) {
                      optionClass = `
                        border-red-500
                        bg-red-50
                        ring-2
                        ring-red-200
                      `;
                    }

                    return (
                      <label
                        key={choiceIndex}
                        className={`
                          flex
                          cursor-pointer
                          items-center
                          gap-3
                          rounded-2xl
                          border
                          p-4
                          transition
                          ${optionClass}
                          ${scoreChecked ? "cursor-default" : ""}
                        `}
                      >
                        <input
                          type="radio"
                          name={question.id}
                          value={choiceIndex}
                          checked={isSelected}
                          disabled={scoreChecked}
                          onChange={() =>
                            handleAnswer(question.id, choiceIndex)
                          }
                          className="
                            h-5
                            w-5
                            accent-gray-600
                          "
                        />

                        <span className="flex-1 text-base font-medium text-gray-800">
                          {choice}
                        </span>

                        {scoreChecked && isCorrect && (
                          <span className="font-bold text-green-600">✓</span>
                        )}

                        {scoreChecked && isSelected && !isCorrect && (
                          <span className="font-bold text-red-600">✕</span>
                        )}
                      </label>
                    );
                  })}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* =========================
            BOTTOM ACTION
        ========================== */}

        {attemptedCount > 0 && !scoreChecked && (
          <div className="mt-12 text-center">
            <button
              type="button"
              onClick={handleCheckScore}
              className="
                rounded-2xl
                bg-black
                px-10
                py-4
                text-lg
                font-bold
                text-white
                shadow-lg
                transition
                hover:-translate-y-1
                hover:bg-gray-800
                hover:shadow-xl
                cursor-pointer
              "
            >
              Check Score
            </button>
          </div>
        )}

        {scoreChecked && (
          <div className="mt-12 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="
                mx-auto
                max-w-xl
                rounded-3xl
                border
                border-green-200
                bg-green-50
                p-8
              "
            >
              <p className="text-sm font-semibold uppercase tracking-wide text-green-700">
                Your Result
              </p>

              <p className="mt-2 text-5xl font-black text-green-700">
                {score} / {questions.length}
              </p>

              <p className="mt-3 text-gray-600">
                You attempted {attemptedCount}{" "}
                {attemptedCount === 1 ? "question" : "questions"}.
              </p>

              <button
                type="button"
                onClick={handleTryAgain}
                className="
                  mt-6
                  rounded-xl
                  bg-gray-900
                  px-8
                  py-3
                  font-bold
                  text-white
                  transition
                  hover:bg-gray-800
                "
              >
                Try Again
              </button>
            </motion.div>
          </div>
        )}
      </div>
    </main>
  );
}
