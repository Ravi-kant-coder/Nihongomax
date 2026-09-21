import Link from "next/link";
import Image from "next/image";

const CoursesBar = () => {
  return (
    <div
      className="md:flex flex-wrap fixed md:top-20 hidden md:right-20 lg:right-10 md:w-1/3 
  scroll-smooth overscroll-contain flex-col justify-center items-center py-4 bg-white rounded-2xl dark:bg-gray-400"
    >
      <div className="inline-flex hover:scale-105 transition-all duration-300 bg-white rounded-2xl px-10">
        <Link href="/course/aboutjlpt">
          <Image
            src="/abtjlptBtn.png"
            alt="About JLPT lessons"
            width={300}
            height={80}
            className="rounded-md hover:scale-105 transition-transform duration-200"
          />
        </Link>
      </div>
      <div className="h-px bg-gray-300 dark:bg-gray-500 w-[70%] my-2" />
      <div className="flex flex-wrap gap-6 justify-center items-center">
        <div className="inline-flex hover:scale-105 transition-all duration-300">
          <Link href="/course/classN5">
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
          <Link href="/course/classN4">
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
          <Link href="/course/classN3">
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
          <Link href="/course/classN2">
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
          <Link href="/course/classN1">
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
      <div className="h-px bg-gray-300 dark:bg-gray-500 w-[70%] my-2" />
      <div className="inline-flex hover:scale-105 transition-all duration-300 bg-white rounded-2xl px-5">
        <Link href="/course/aboutbj">
          <Image
            src="/about-business-japanese.png"
            alt="Business Japanese"
            width={400}
            height={80}
            className="rounded-md hover:scale-105 transition-transform duration-200"
          />
        </Link>
      </div>
      <div className="h-px bg-gray-300 dark:bg-gray-500 w-[80%] my-2" />
      <div className="flex gap-4">
        <div className="flex flex-wrap gap-2 flex-col">
          <div className="inline-flex hover:scale-105 transition-all duration-300">
            <Link href="/course/bjfunda">
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
            <Link href="/course/bjBasic">
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
            <Link href="/course/bjBasicInt">
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
            <Link href="/course/bjInt">
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
            <Link href="/course/bjIntAdv">
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
            <Link href="/course/bjAdv">
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
            <Link href="/course/bjAdvsup">
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
            <Link href="/course/kaiwa-classes">
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
      <div className="h-px bg-gray-300 dark:bg-gray-500 w-[80%] my-2" />
      <div className="inline-flex hover:scale-105 transition-all duration-300">
        <Link href="/course/aboutbe">
          <Image
            src="/about-be.png"
            alt="Eigo lesson"
            width={400}
            height={80}
            className="rounded-md hover:scale-105 transition-transform duration-200"
          />
        </Link>
      </div>
      <div className="h-px bg-gray-300 dark:bg-gray-500 w-[80%]" />
      <div className="flex flex-wrap gap-6 justify-center items-center">
        <div className="inline-flex hover:scale-110 transition-all duration-300">
          <Link href="/course/business-english-basic-classes">
            <Image
              src="/shokyuu.png"
              alt="Shokyu Eigo course"
              width={100}
              height={80}
            />
          </Link>
        </div>
        <div className="inline-flex hover:scale-110 transition-all duration-300">
          <Link href="/course/business-english-inter-classes">
            <Image
              src="/chuukyuu.png"
              alt="Chukyu Eigo course"
              width={100}
              height={80}
            />
          </Link>
        </div>
        <div className="inline-flex hover:scale-110 transition-all duration-300">
          <Link href="/course/business-english-adv-classes">
            <Image
              src="/joukyuu.png"
              alt="Jokyu Eigo course"
              width={100}
              height={80}
            />
          </Link>
        </div>
      </div>
      <div className="inline-flex hover:scale-110 transition-all duration-300">
        <Link href="/course/eikaiwa-classes">
          <Image
            src="/eikaiwa.png"
            alt="Eikaiwa course"
            width={150}
            height={60}
          />
        </Link>
      </div>
    </div>
  );
};

export default CoursesBar;
