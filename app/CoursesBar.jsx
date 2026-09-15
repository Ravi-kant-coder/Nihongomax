import Link from "next/link";
import Image from "next/image";

const CoursesBar = () => {
  return (
    <div
      className="md:flex flex-wrap gap-4 fixed md:top-18 hidden md:right-20 lg:right-10 md:w-1/3 overflow-y-auto
  scroll-smooth overscroll-contain flex-col justify-center items-center py-4 bg-white rounded-2xl dark:bg-gray-400"
    >
      <div className="inline-flex hover:scale-105 transition-all duration-300 bg-white rounded-2xl px-10">
        <Link href="course/aboutjlpt" target="_blank" rel="noopener noreferrer">
          <Image
            src="/abtjlptbtn.png"
            alt="About JLPT lessons"
            width={300}
            height={80}
            className="rounded-md hover:scale-105 transition-transform duration-200"
          />
        </Link>
      </div>
      <div className="h-px bg-gray-300 dark:bg-gray-500 w-[70%]" />
      <div className="flex flex-wrap gap-6 justify-center items-center">
        <div className="inline-flex hover:scale-105 transition-all duration-300">
          <Link href="course/classN5" target="_blank" rel="noopener noreferrer">
            <Image
              src="/JLPT-N5-button.png"
              alt="JLPT N5 classes"
              width={100}
              height={80}
              className="rounded-md hover:scale-105 transition-transform duration-200"
            />
          </Link>
        </div>
        <div className="inline-flex hover:scale-105 transition-all duration-300">
          <Link href="course/classN4" target="_blank" rel="noopener noreferrer">
            <Image
              src="/JLPT-N4-button.png"
              alt="JLPT N4 classes"
              width={100}
              height={80}
              className="rounded-md hover:scale-105 transition-transform duration-200"
            />
          </Link>
        </div>
        <div className="inline-flex hover:scale-105 transition-all duration-300">
          <Link href="course/classN3" target="_blank" rel="noopener noreferrer">
            <Image
              src="/JLPT-N3-button.png"
              alt="JLPT N3 classes"
              width={100}
              height={80}
              className="rounded-md hover:scale-105 transition-transform duration-200"
            />
          </Link>
        </div>
        <div className="inline-flex hover:scale-105 transition-all duration-300">
          <Link href="course/classN2" target="_blank" rel="noopener noreferrer">
            <Image
              src="/JLPT-N2-button.png"
              alt="JLPT N2 classes"
              width={100}
              height={80}
              className="rounded-md hover:scale-105 transition-transform duration-200"
            />
          </Link>
        </div>
        <div className="inline-flex hover:scale-105 transition-all duration-300">
          <Link href="course/classN1" target="_blank" rel="noopener noreferrer">
            <Image
              src="/JLPT-N1-button.png"
              alt="JLPT N1 classes"
              width={100}
              height={80}
              className="rounded-md hover:scale-105 transition-transform duration-200"
            />
          </Link>
        </div>
      </div>
      <div className="h-px bg-gray-300 dark:bg-gray-500 w-[70%]" />
      <div className="inline-flex hover:scale-105 transition-all duration-300 bg-white rounded-2xl px-5">
        <Link href="course/aboutbj" target="_blank" rel="noopener noreferrer">
          <Image
            src="/about-business-japanese.png"
            alt="Business Japanese"
            width={400}
            height={80}
            className="rounded-md hover:scale-105 transition-transform duration-200"
          />
        </Link>
      </div>
      <div className="h-px bg-gray-300 dark:bg-gray-500 w-[70%]" />

      <div className="flex gap-4">
        <div className="flex flex-wrap gap-2 flex-col">
          <div className="inline-flex hover:scale-105 transition-all duration-300">
            <Link
              href="course/bjfunda"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src="/fundamental-business-japanese.png"
                alt="Fundamental Business Japanese"
                width={250}
                height={80}
                className="rounded-md hover:scale-105 transition-transform duration-200"
              />
            </Link>
          </div>
          <div className="inline-flex hover:scale-105 transition-all duration-300">
            <Link
              href="course/bjBasic"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src="/basic-business-japanese.png"
                alt="Basic Business Japanese"
                width={250}
                height={80}
                className="rounded-md hover:scale-105 transition-transform duration-200"
              />
            </Link>
          </div>
          <div className="inline-flex hover:scale-105 transition-all duration-300">
            <Link
              href="course/bjBasicInt"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src="/basic-intermediate-japanese.png"
                alt="Basic Intermediate Japanese"
                width={250}
                height={80}
                className="rounded-md hover:scale-105 transition-transform duration-200"
              />
            </Link>
          </div>
          <div className="inline-flex hover:scale-105 transition-all duration-300">
            <Link href="course/bjInt" target="_blank" rel="noopener noreferrer">
              <Image
                src="/intermediate-japanese.png"
                alt="Intermediate Japanese"
                width={250}
                height={80}
                className="rounded-md hover:scale-105 transition-transform duration-200"
              />
            </Link>
          </div>
        </div>
        <div className="flex flex-wrap gap-2 justify-center items-center flex-col">
          <div className="inline-flex hover:scale-105 transition-all duration-300">
            <Link
              href="course/bjIntAdv"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src="/intermediate-advance-japanese.png"
                alt="Intermediate Advance Japanese"
                width={250}
                height={80}
                className="rounded-md hover:scale-105 transition-transform duration-200"
              />
            </Link>
          </div>
          <div className="inline-flex hover:scale-105 transition-all duration-300">
            <Link href="course/bjAdv" target="_blank" rel="noopener noreferrer">
              <Image
                src="/advance-business-japanese.png"
                alt="Advance Business Japanese"
                width={250}
                height={80}
                className="rounded-md hover:scale-105 transition-transform duration-200"
              />
            </Link>
          </div>
          <div className="inline-flex hover:scale-105 transition-all duration-300">
            <Link
              href="course/bjAdvsup"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src="/advanced-business-japanese.png"
                alt="Advanced Japanese"
                width={250}
                height={80}
                className="rounded-md hover:scale-105 transition-transform duration-200"
              />
            </Link>
          </div>
          <div className="inline-flex hover:scale-105 transition-all duration-300">
            <Link
              href="course/kaiwa-classes"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src="/kaiwa.jpg"
                alt="Kaiwa course"
                width={250}
                height={80}
                className="rounded-md hover:scale-105 transition-transform duration-200"
              />
            </Link>
          </div>
        </div>
      </div>
      <div className="h-px bg-gray-300 dark:bg-gray-500 w-[80%]" />

      <div className="inline-flex hover:scale-105 transition-all duration-300 bg-white dark:bg-gray-400 rounded-2xl px-10">
        <Link href="course/aboutbe" target="_blank" rel="noopener noreferrer">
          <Image
            src="/about-business-english.png"
            alt="Eigo lesson"
            width={400}
            height={80}
            className="rounded-md hover:scale-105 transition-transform duration-200"
          />
        </Link>
      </div>
      <div className="h-px bg-gray-300 dark:bg-gray-500 w-[80%]" />
      <div className="flex flex-wrap gap-6 justify-center items-center">
        <div className="inline-flex hover:scale-105 transition-all duration-300 bg-white dark:bg-gray-400 rounded-2xl px-5">
          <Link
            href="course/business-english-basic-classes"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src="/shokyu-eikaiwa.webp"
              alt="Shokyu Eigo course"
              width={100}
              height={80}
              className="rounded-md hover:scale-105 transition-transform duration-200"
            />
          </Link>
        </div>
        <div className="inline-flex hover:scale-105 transition-all duration-300 bg-white dark:bg-gray-400 rounded-2xl px-5">
          <Link
            href="course/business-english-inter-classes"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src="/chukyu-eikaiwa.webp"
              alt="Chukyu Eigo course"
              width={100}
              height={80}
              className="rounded-md hover:scale-105 transition-transform duration-200"
            />
          </Link>
        </div>
        <div className="inline-flex hover:scale-105 transition-all duration-300 bg-white dark:bg-gray-400 rounded-2xl px-5">
          <Link
            href="course/business-english-adv-classes"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src="/jokyu-eikaiwa.webp"
              alt="Jokyu Eigo course"
              width={100}
              height={80}
              className="rounded-md hover:scale-105 transition-transform duration-200"
            />
          </Link>
        </div>
      </div>
      <div className="inline-flex hover:scale-105 transition-all duration-300 bg-white dark:bg-gray-400 rounded-2xl px-5">
        <Link
          href="course/eikaiwa-classes"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            src="/eikaiwa.webp"
            alt="Eikaiwa course"
            width={250}
            height={80}
            className="rounded-md hover:scale-105 transition-transform duration-200"
          />
        </Link>
      </div>
    </div>
  );
};

export default CoursesBar;
