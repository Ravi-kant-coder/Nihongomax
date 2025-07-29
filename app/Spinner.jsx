export default function Spinner() {
  return (
    <div className="text-2xl font-bold flex flex-col justify-between gap-8 items-center">
      <h1 className="animate-bounce text-black dark:text-white">Please Wait</h1>
      <div
        className="w-20 h-20 rounded-full border-8 border-t-white border-b-black
      border-r-black border-l-white animate-spin"
      ></div>
      <h1 className="animate-bounce text-black dark:text-white">
        少々お待ちください
      </h1>
    </div>
  );
}
