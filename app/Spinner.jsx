export default function Spinner() {
  return (
    <div className="text-2xl font-bold flex flex-col justify-between gap-8 items-center">
      <h1 className="animate-bounce text-black">Please Wait</h1>

      <div className="w-20 h-20 border-10 border-t-blue-500 border-b-green-500 border-l-yellow-500 border-r-pink-500 rounded-full animate-spin" />
      <h1 className="animate-bounce text-black">少々お待ちください</h1>
    </div>
  );
}
