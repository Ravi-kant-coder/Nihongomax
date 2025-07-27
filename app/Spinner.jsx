export default function Spinner() {
  return (
    <div className="text-2xl font-bold flex flex-col justify-between gap-8 items-center">
      <h1 className="animate-bounce text-black dark:text-white">Please Wait</h1>
      <div
        className="relative md:w-60 md:h-35 flex justify-center items-center bg-white
         dark:bg-gray-500 rounded shadow-2xl shadow-gray-700"
      >
        <div
          className="absolute flex justify-center items-center inset-0 border-4
           animate-border-snake rounded-md box-border"
        >
          <div className="w-20 h-20 bg-red-500 rounded-full "></div>
        </div>
      </div>
      <h1 className="animate-bounce text-black dark:text-white">
        少々お待ちください
      </h1>
    </div>
  );
}
