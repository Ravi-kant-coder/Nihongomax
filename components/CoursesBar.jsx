import JapanGate from "./JapanGate";
import Link from "next/link";
import Image from "next/image";
const CoursesBar = () => {
  return (
    <div className="flex justify-between items-center">
      <Link target="_blank" href={"/friends-list"}>
        <Image
          src={"/n5Btn.jpg"}
          alt="N5"
          width={100}
          height={80}
          className="w-20 h-20 rounded-md hover:scale-110 duration-200 transform"
        />
      </Link>
    </div>
  );
};

export default CoursesBar;
