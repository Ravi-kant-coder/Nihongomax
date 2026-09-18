"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { JLPT_LEVELS } from "@/data/jlptQuiz";

export default function QuizHome() {
  const router = useRouter();

  return (
    <main className="min-h-screen px-4 py-12">
      <div className="mx-auto max-w-5xl">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              JLPT Quiz
            </h1>

            <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600 dark:text-gray-300">
              Test your Japanese knowledge from JLPT N5 to N1.
            </p>
          </motion.div>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {JLPT_LEVELS.map((level, index) => (
            <motion.button
              key={level.id}
              type="button"
              onClick={() => router.push(`/jlpt-quiz/${level.id}`)}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.4,
                delay: index * 0.08,
              }}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="
                group
                rounded-3xl
                border
                border-gray-200
                bg-white
                p-7
                text-center
                shadow-md
                transition
                hover:shadow-xl
                dark:border-gray-700
                dark:bg-[#cfcfcf]
                cursor-pointer
              "
            >
              <div
                className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-black text-3xl font-bold
                text-white shadow-lg transition-all duration-200 group-hover:text-4xl group-hover:animate-[spin_0.2s_ease-in-out]
  "
              >
                {level.id.toUpperCase()}
              </div>

              <h2 className="mt-5 text-xl font-bold text-gray-900">
                {level.title}
              </h2>

              <p className="mt-2 text-sm text-gray-600">{level.description}</p>

              <div
                className="mt-5 text-sm font-semibold text-black transition group-hover:translate-x-1 
              group-hover:bg-gray-300 py-1 rounded dark:group-hover:bg-gray-400"
              >
                Start Quiz →
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </main>
  );
}
