export default function Spinner() {
  return (
    <div className="text-2xl font-bold flex flex-col gap-8 fixed inset-0 items-center justify-center bg-white/20 dark:bg-black/60 backdrop-blur-xs z-9999">
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
