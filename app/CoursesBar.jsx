import Link from "next/link";
import Image from "next/image";

const CoursesBar = () => {
  return (
    <div
      className="md:flex flex-wrap gap-4 fixed md:top-20 hidden md:right-20 lg:right-10 md:w-1/3 overflow-y-auto
  scroll-smooth overscroll-contain flex-col justify-center items-center py-4"
    >
      <div className="inline-flex hover:scale-105 transition-all duration-300 bg-white rounded-2xl px-10">
        <Link
          href="https://www.nihongomax.com/n5class10.php"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            src="/abtjlptbtn.webp"
            alt="About JLPT course"
            width={300}
            height={80}
            className="rounded-md hover:scale-105 transition-transform duration-200"
          />
        </Link>
      </div>
      <div className="flex flex-wrap gap-6 justify-center items-center">
        <div className="inline-flex hover:scale-105 transition-all duration-300">
          <Link
            href="https://www.nihongomax.com/n5class10.php"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src="/JLPT-N5-button.jpg"
              alt="JLPT N5 course"
              width={100}
              height={80}
              className="rounded-md hover:scale-105 transition-transform duration-200"
            />
          </Link>
        </div>
        <div className="inline-flex hover:scale-105 transition-all duration-300">
          <Link
            href="https://www.nihongomax.com/n5class10.php"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src="/JLPT-N4-button.jpg"
              alt="JLPT N4 course"
              width={100}
              height={80}
              className="rounded-md hover:scale-105 transition-transform duration-200"
            />
          </Link>
        </div>
        <div className="inline-flex hover:scale-105 transition-all duration-300">
          <Link
            href="https://www.nihongomax.com/n5class10.php"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src="/JLPT-N3-button.jpg"
              alt="JLPT N3 course"
              width={100}
              height={80}
              className="rounded-md hover:scale-105 transition-transform duration-200"
            />
          </Link>
        </div>
        <div className="inline-flex hover:scale-105 transition-all duration-300">
          <Link
            href="https://www.nihongomax.com/n5class10.php"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src="/JLPT-N2-button.jpg"
              alt="JLPT N2 course"
              width={100}
              height={80}
              className="rounded-md hover:scale-105 transition-transform duration-200"
            />
          </Link>
        </div>
        <div className="inline-flex hover:scale-105 transition-all duration-300">
          <Link
            href="https://www.nihongomax.com/n5class10.php"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src="/JLPT-N1-button.jpg"
              alt="JLPT N1 course"
              width={100}
              height={80}
              className="rounded-md hover:scale-105 transition-transform duration-200"
            />
          </Link>
        </div>
      </div>
      <div className="h-px rounded-2xl w-full bg-gray-500 dark:bg-white my-1" />
      <div className="inline-flex hover:scale-105 transition-all duration-300 bg-white rounded-2xl px-5">
        <Link
          href="https://www.nihongomax.com/n5class10.php"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            src="/about-business-japanese.jpg"
            alt="Business Japanese course"
            width={400}
            height={80}
            className="rounded-md hover:scale-105 transition-transform duration-200"
          />
        </Link>
      </div>
      <div className="flex gap-4">
        <div className="flex flex-wrap gap-2 flex-col">
          <div className="inline-flex hover:scale-105 transition-all duration-300">
            <Link
              href="https://www.nihongomax.com/n5class10.php"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src="/fundamental-business-japanese.jpg"
                alt="Fundamental Business Japanese course"
                width={250}
                height={80}
                className="rounded-md hover:scale-105 transition-transform duration-200"
              />
            </Link>
          </div>
          <div className="inline-flex hover:scale-105 transition-all duration-300">
            <Link
              href="https://www.nihongomax.com/n5class10.php"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src="/basic-business-japanese.jpg"
                alt="Basic Business Japanese course"
                width={250}
                height={80}
                className="rounded-md hover:scale-105 transition-transform duration-200"
              />
            </Link>
          </div>
          <div className="inline-flex hover:scale-105 transition-all duration-300">
            <Link
              href="https://www.nihongomax.com/n5class10.php"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src="/basic-intermediate-japanese.jpg"
                alt="Basic Intermediate Japanese course"
                width={250}
                height={80}
                className="rounded-md hover:scale-105 transition-transform duration-200"
              />
            </Link>
          </div>
          <div className="inline-flex hover:scale-105 transition-all duration-300">
            <Link
              href="https://www.nihongomax.com/n5class10.php"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src="/intermediate-japanese.jpg"
                alt="Intermediate Japanese course"
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
              href="https://www.nihongomax.com/n5class10.php"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src="/intermediate-advance-japanese.jpg"
                alt="Intermediate Advance Japanese course"
                width={250}
                height={80}
                className="rounded-md hover:scale-105 transition-transform duration-200"
              />
            </Link>
          </div>
          <div className="inline-flex hover:scale-105 transition-all duration-300">
            <Link
              href="https://www.nihongomax.com/n5class10.php"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src="/advance-business-japanese.jpg"
                alt="Advance Business Japanese course"
                width={250}
                height={80}
                className="rounded-md hover:scale-105 transition-transform duration-200"
              />
            </Link>
          </div>
          <div className="inline-flex hover:scale-105 transition-all duration-300">
            <Link
              href="https://www.nihongomax.com/n5class10.php"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src="/advanced-business-japanese.jpg"
                alt="Advanced Business Japanese course"
                width={250}
                height={80}
                className="rounded-md hover:scale-105 transition-transform duration-200"
              />
            </Link>
          </div>
          <div className="inline-flex hover:scale-105 transition-all duration-300">
            <Link
              href="https://www.nihongomax.com/n5class10.php"
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
      <div className="h-px rounded-2xl w-full bg-gray-500 dark:bg-white my-1" />
      <div className="inline-flex hover:scale-105 transition-all duration-300 bg-white dark:bg-gray-400 rounded-2xl px-10">
        <Link
          href="https://www.nihongomax.com/n5class10.php"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            src="/about-business-english.jpg"
            alt="About Business English course"
            width={400}
            height={80}
            className="rounded-md hover:scale-105 transition-transform duration-200"
          />
        </Link>
      </div>
      <div className="flex flex-wrap gap-6 justify-center items-center">
        <div className="inline-flex hover:scale-105 transition-all duration-300 bg-white dark:bg-gray-400 rounded-2xl px-5">
          <Link
            href="https://www.nihongomax.com/n5class10.php"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src="/shokyu-eikaiwa.webp"
              alt="Shokyu Eikaiwa course"
              width={100}
              height={80}
              className="rounded-md hover:scale-105 transition-transform duration-200"
            />
          </Link>
        </div>
        <div className="inline-flex hover:scale-105 transition-all duration-300 bg-white dark:bg-gray-400 rounded-2xl px-5">
          <Link
            href="https://www.nihongomax.com/n5class10.php"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src="/chukyu-eikaiwa.webp"
              alt="Chukyu Eikaiwa course"
              width={100}
              height={80}
              className="rounded-md hover:scale-105 transition-transform duration-200"
            />
          </Link>
        </div>
        <div className="inline-flex hover:scale-105 transition-all duration-300 bg-white dark:bg-gray-400 rounded-2xl px-5">
          <Link
            href="https://www.nihongomax.com/n5class10.php"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src="/jokyu-eikaiwa.webp"
              alt="Jokyu Eikaiwa course"
              width={100}
              height={80}
              className="rounded-md hover:scale-105 transition-transform duration-200"
            />
          </Link>
        </div>
      </div>
      <div className="inline-flex hover:scale-105 transition-all duration-300 bg-white dark:bg-gray-400 rounded-2xl px-5">
        <Link
          href="https://www.nihongomax.com/n5class10.php"
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
