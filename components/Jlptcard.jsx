"use client";
import Link from "next/link";
import { Card, CardTitle, CardDescription, CardContent } from "./ui/card";
import { motion } from "framer-motion";

function JlptCard({ level, fees, months }) {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <Card className="shadow-lg m-4 p-2 border-gray-400 border-1 rounded-lg cursor-pointer font-[Poppins] bg-gray-200 hover:bg-gray-300 dark:hover:bg-black dark:bg-[rgb(36,37,38)] dark:text-white">
        <Link
          href={`https://www.learnjapanesedelhi.com/japanese-course-jlpt-${level.toLowerCase()}`}
          passHref
          target="_blank"
        >
          <CardContent>
            <CardTitle>
              <h1 className="text-xl">JLPT {level}</h1>
            </CardTitle>
            <CardDescription className="text-gray-900 dark:text-white">
              <p>Fee: {fees}/-</p>
              <p>Duration: {months} months</p>
              <p>All Materials Included</p>
              <p>Free Trial Class Available</p>
            </CardDescription>
          </CardContent>
        </Link>
      </Card>
    </motion.div>
  );
}
export default JlptCard;
