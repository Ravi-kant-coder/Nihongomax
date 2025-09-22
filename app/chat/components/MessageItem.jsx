export default function MessageItem({ msg }) {
  const isMe = msg.sender === "me";

  return (
    <div className={`flex ${isMe ? "justify-end" : "justify-start"}`}>
      <div
        className={`px-3 py-2 rounded-lg max-w-xs ${
          isMe
            ? "bg-green-300 text-black dark:bg-green-900 dark:text-white"
            : "bg-white dark:bg-black dark:text-white text-black shadow shadow-black/20"
        }`}
      >
        {msg.text}
      </div>
    </div>
  );
}
