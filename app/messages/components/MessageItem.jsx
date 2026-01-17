export default function MessageItem({ msg }) {
  const isMe = msg.sender === "me";

  return (
    <div className={`flex ${isMe ? "justify-end" : "justify-start"}`}>
      <div
        className={`px-3 py-2 rounded-lg max-w-xs ${
          isMe
            ? "bg-green-200 mr-10 text-black dark:bg-green-900 dark:text-white  text-sm"
            : "bg-white dark:bg-black ml-10 dark:text-white text-black shadow shadow-black/40 text-sm"
        }`}
      >
        {msg.text}
      </div>
    </div>
  );
}
