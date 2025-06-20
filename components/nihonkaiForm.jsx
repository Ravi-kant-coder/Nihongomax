"use client";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Form = () => {
  // const router = useRouter();
  const [username, setUsername] = useState("");
  const [level, setLevel] = useState("");
  const [message, setMessage] = useState("");
  const [isloading, setIsloading] = useState(false);
  const [error, setError] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsloading(true);
    setError(null);
    const messageObj = {
      username,
      level,
      message,
      userDetails: "After Authentication",
    };
    const res = await fetch("http://localhost:3000/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(messageObj),
    });
    if (!res.ok) {
      setError("Oopss... Something went wrong. Plz try again");
      setIsloading(false);
      return;
    } else {
      setIsloading(false);
      setUsername("");
      setLevel("");
      setMessage("");
      // router.push("/");
    }
  };
  return (
    <div className="fixed dark:bg-[rgb(63,65,66)] w-full flex top-20">
      <form
        onSubmit={handleSubmit}
        className="flex justify-around items-center py-2 mx-auto w-3/5"
      >
        <div>
          <Avatar className="h-12 w-12 m-2 cursor-pointer">
            {false ? (
              <AvatarImage />
            ) : (
              <AvatarFallback className="bg-gray-400 dark:bg-gray-500 font-semibold hover:bg-gray-100">
                S
              </AvatarFallback>
            )}
          </Avatar>
        </div>
        <textarea
          className="border-1 border-gray-400 rounded w-[500px] py-2 px-3 leading-tight focus:outline-none focus:border-gray-600"
          required
          type="text"
          onChange={(e) => setMessage(e.target.value)}
          value={message}
          placeholder="Ask or Answer anything Sangeeta"
        ></textarea>

        <div>
          <button
            className="font-[Poppins] dark:text-white  hover:bg-gray-400 dark:hover:bg-black "
            style={{
              width: "200px",
              height: "50px",
              borderRadius: "50px",
              boxShadow:
                "-5px -5px 10px rgba(255, 255, 255, 1), 5px 5px 10px rgba(0, 0, 0, 0.3)",
              border: "1px solid white",
              cursor: "pointer",
              fontWeight: "600",
            }}
            type="button"
            disabled={isloading}
          >
            {isloading && <span>Adding Comment...</span>}
            {!isloading && <span>Send</span>}
          </button>
        </div>
        {error && <div className="text-red-700 mt-2">{error}</div>}
      </form>
    </div>
  );
};

export default Form;
