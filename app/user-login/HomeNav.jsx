import Image from "next/image";

const HomeNav = () => {
  return (
    <div className="flex justify-center items-center">
      <Image
        src={"/nihonkai-Transp.png"}
        alt="Nihongomax"
        width={200}
        height={200}
        className="rounded-md hover:scale-110 duration-200 transform"
      />
      <Image
        src={"/nihongomax-transp.png"}
        alt="Nihongomax"
        width={300}
        height={200}
        className="rounded-md hover:scale-110 duration-200 transform"
      />
    </div>
  );
};

export default HomeNav;
