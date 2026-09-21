"use client";

import { X } from "lucide-react";
import useStudyStore from "@/store/useStudyStore";
import Link from "next/link";
import Image from "next/image";

const StudyBox = () => {
  const { isStudyBoxOpen, closeStudyBox } = useStudyStore();

  if (!isStudyBoxOpen) return null;

  return (
    <>
      {isStudyBoxOpen && (
        <div
          className={`fixed top-10 z-900
            bg-white dark:bg-gray-400
            rounded
            flex flex-col
            justify-start items-center
            dark:text-white
            bottom-20 left-2 right-2
            md:top-18 md:w-1/3
            overflow-y-auto
            overflow-x-hidden
            scroll-smooth
            overscroll-contain
            max-h-[calc(100dvh-7rem)]
            pb-6
            box-border
            ${isStudyBoxOpen ? "visible" : "invisible"}`}
        >
          {/* ABOUT JLPT */}
          <div className="inline-flex max-w-full hover:scale-105 transition-all duration-300 bg-white rounded-2xl px-4 sm:px-10">
            <Link href="/course/aboutjlpt" onClick={closeStudyBox}>
              <Image
                src="/abtjlptBtn.png"
                alt="About JLPT lessons"
                width={250}
                height={80}
                className="rounded-md hover:scale-105 transition-transform duration-200 max-w-full h-auto"
              />
            </Link>
          </div>

          <div className="h-px bg-gray-300 dark:bg-gray-500 w-[70%] my-2 shrink-0" />

          {/* JLPT LEVELS */}
          <div className="flex flex-wrap justify-center items-center gap-1 max-w-full">
            <div className="inline-flex hover:scale-105 transition-all duration-300">
              <Link href="/course/classN5" onClick={closeStudyBox}>
                <Image
                  src="/JLPT-N5-button.png"
                  alt="JLPT N5 classes"
                  width={80}
                  height={60}
                  className="rounded-md hover:scale-105 transition-transform duration-200 max-w-full h-auto"
                />
              </Link>
            </div>

            <div className="inline-flex hover:scale-105 transition-all duration-300">
              <Link href="/course/classN4" onClick={closeStudyBox}>
                <Image
                  src="/JLPT-N4-button.png"
                  alt="JLPT N4 classes"
                  width={80}
                  height={60}
                  className="rounded-md hover:scale-105 transition-transform duration-200 max-w-full h-auto"
                />
              </Link>
            </div>

            <div className="inline-flex hover:scale-105 transition-all duration-300">
              <Link href="/course/classN3" onClick={closeStudyBox}>
                <Image
                  src="/JLPT-N3-button.png"
                  alt="JLPT N3 classes"
                  width={80}
                  height={60}
                  className="rounded-md hover:scale-105 transition-transform duration-200 max-w-full h-auto"
                />
              </Link>
            </div>

            <div className="inline-flex hover:scale-105 transition-all duration-300">
              <Link href="/course/classN2" onClick={closeStudyBox}>
                <Image
                  src="/JLPT-N2-button.png"
                  alt="JLPT N2 classes"
                  width={80}
                  height={60}
                  className="rounded-md hover:scale-105 transition-transform duration-200 max-w-full h-auto"
                />
              </Link>
            </div>

            <div className="inline-flex hover:scale-105 transition-all duration-300">
              <Link href="/course/classN1" onClick={closeStudyBox}>
                <Image
                  src="/JLPT-N1-button.png"
                  alt="JLPT N1 classes"
                  width={80}
                  height={60}
                  className="rounded-md hover:scale-105 transition-transform duration-200 max-w-full h-auto"
                />
              </Link>
            </div>
          </div>

          <div className="h-px bg-gray-300 dark:bg-gray-500 w-[70%] my-2 shrink-0" />

          {/* BUSINESS JAPANESE */}
          <div className="inline-flex max-w-full hover:scale-105 transition-all duration-300 bg-white rounded-2xl px-3 sm:px-5">
            <Link href="/course/aboutbj" onClick={closeStudyBox}>
              <Image
                src="/about-business-japanese.png"
                alt="Business Japanese"
                width={400}
                height={80}
                className="rounded-md hover:scale-105 transition-transform duration-200 max-w-full h-auto"
              />
            </Link>
          </div>

          <div className="h-px bg-gray-300 dark:bg-gray-500 w-[80%] my-2 shrink-0" />

          {/* BUSINESS JAPANESE LEVELS */}
          <div className="flex flex-col md:flex-row gap-3 justify-center items-center max-w-full">
            {/* LEFT COLUMN */}
            <div className="flex flex-wrap gap-2 flex-col items-center">
              <div className="inline-flex hover:scale-105 transition-all duration-300 max-w-full">
                <Link href="/course/bjfunda" onClick={closeStudyBox}>
                  <Image
                    src="/fundamental-business-japanese.png"
                    alt="Fundamental Business Japanese"
                    width={250}
                    height={80}
                    className="rounded-md hover:scale-105 transition-transform duration-200 max-w-full h-auto"
                  />
                </Link>
              </div>

              <div className="inline-flex hover:scale-105 transition-all duration-300 max-w-full">
                <Link href="/course/bjBasic" onClick={closeStudyBox}>
                  <Image
                    src="/basic-business-japanese.png"
                    alt="Basic Business Japanese"
                    width={250}
                    height={80}
                    className="rounded-md hover:scale-105 transition-transform duration-200 max-w-full h-auto"
                  />
                </Link>
              </div>

              <div className="inline-flex hover:scale-105 transition-all duration-300 max-w-full">
                <Link href="/course/bjBasicInt" onClick={closeStudyBox}>
                  <Image
                    src="/basic-intermediate-japanese.png"
                    alt="Basic Intermediate Japanese"
                    width={250}
                    height={80}
                    className="rounded-md hover:scale-105 transition-transform duration-200 max-w-full h-auto"
                  />
                </Link>
              </div>

              <div className="inline-flex hover:scale-105 transition-all duration-300 max-w-full">
                <Link href="/course/bjInt" onClick={closeStudyBox}>
                  <Image
                    src="/intermediate-japanese.png"
                    alt="Intermediate Japanese"
                    width={250}
                    height={80}
                    className="rounded-md hover:scale-105 transition-transform duration-200 max-w-full h-auto"
                  />
                </Link>
              </div>
            </div>

            {/* RIGHT COLUMN */}
            <div className="flex flex-wrap gap-2 justify-center items-center flex-col">
              <div className="inline-flex hover:scale-105 transition-all duration-300 max-w-full">
                <Link href="/course/bjIntAdv" onClick={closeStudyBox}>
                  <Image
                    src="/intermediate-advance-japanese.png"
                    alt="Intermediate Advance Japanese"
                    width={250}
                    height={80}
                    className="rounded-md hover:scale-105 transition-transform duration-200 max-w-full h-auto"
                  />
                </Link>
              </div>

              <div className="inline-flex hover:scale-105 transition-all duration-300 max-w-full">
                <Link href="/course/bjAdv" onClick={closeStudyBox}>
                  <Image
                    src="/advance-business-japanese.png"
                    alt="Advance Business Japanese"
                    width={250}
                    height={80}
                    className="rounded-md hover:scale-105 transition-transform duration-200 max-w-full h-auto"
                  />
                </Link>
              </div>

              <div className="inline-flex hover:scale-105 transition-all duration-300 max-w-full">
                <Link href="/course/bjAdvsup" onClick={closeStudyBox}>
                  <Image
                    src="/advanced-business-japanese.png"
                    alt="Advanced Japanese"
                    width={250}
                    height={80}
                    className="rounded-md hover:scale-105 transition-transform duration-200 max-w-full h-auto"
                  />
                </Link>
              </div>

              <div className="inline-flex hover:scale-105 transition-all duration-300 max-w-full">
                <Link href="/course/kaiwa-classes" onClick={closeStudyBox}>
                  <Image
                    src="/kaiwa.jpg"
                    alt="Kaiwa course"
                    width={250}
                    height={80}
                    className="rounded-md hover:scale-105 transition-transform duration-200 max-w-full h-auto"
                  />
                </Link>
              </div>
            </div>
          </div>

          <div className="h-px bg-gray-300 dark:bg-gray-500 w-[80%] my-2 shrink-0" />

          {/* BUSINESS ENGLISH */}
          <div className="inline-flex max-w-full hover:scale-105 transition-all duration-300">
            <Link href="/course/aboutbe" onClick={closeStudyBox}>
              <Image
                src="/about-be.png"
                alt="Eigo lesson"
                width={400}
                height={80}
                className="rounded-md hover:scale-105 transition-transform duration-200 max-w-full h-auto"
              />
            </Link>
          </div>

          <div className="h-px bg-gray-300 dark:bg-gray-500 w-[80%] shrink-0" />

          {/* ENGLISH LEVELS */}
          <div className="flex flex-wrap gap-3 sm:gap-6 justify-center items-center max-w-full">
            <div className="inline-flex hover:scale-110 transition-all duration-300">
              <Link
                href="/course/business-english-basic-classes"
                onClick={closeStudyBox}
              >
                <Image
                  src="/shokyuu.png"
                  alt="Shokyu Eigo course"
                  width={100}
                  height={80}
                  className="max-w-full h-auto"
                />
              </Link>
            </div>

            <div className="inline-flex hover:scale-110 transition-all duration-300">
              <Link
                href="/course/business-english-inter-classes"
                onClick={closeStudyBox}
              >
                <Image
                  src="/chuukyuu.png"
                  alt="Chukyu Eigo course"
                  width={100}
                  height={80}
                  className="max-w-full h-auto"
                />
              </Link>
            </div>

            <div className="inline-flex hover:scale-110 transition-all duration-300">
              <Link
                href="/course/business-english-adv-classes"
                onClick={closeStudyBox}
              >
                <Image
                  src="/joukyuu.png"
                  alt="Jokyu Eigo course"
                  width={100}
                  height={80}
                  className="max-w-full h-auto"
                />
              </Link>
            </div>
          </div>

          {/* EIKAIWA */}
          <div className="inline-flex hover:scale-110 transition-all duration-300 max-w-full mt-2">
            <Link href="/course/eikaiwa-classes" onClick={closeStudyBox}>
              <Image
                src="/eikaiwa.png"
                alt="Eikaiwa course"
                width={150}
                height={60}
                className="max-w-full h-auto"
              />
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default StudyBox;
