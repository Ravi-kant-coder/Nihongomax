<div className="flex-1 overflow-y-auto p-3 space-y-2 bg-amber-200">
  {loading && <div className="text-sm text-gray-500">Loading…</div>}
  {messages.map((m) => {
    const mine = String(m.sender) === String(myId);
    return (
      <div
        key={m._id}
        className={`flex ${mine ? "justify-end" : "justify-start"}`}
      >
        <div
          className={`max-w-[75%] rounded-2xl px-3 py-2 break-words ${
            mine ? "bg-blue-500 text-white" : "bg-gray-200 dark:bg-gray-700"
          }`}
        >
          <div>{m.text || " "}</div>
          <div className="mt-1 text-[10px] opacity-70">
            {new Date(m.createdAt).toLocaleTimeString()}{" "}
            {m.editedAt ? "(edited)" : ""}
          </div>
          {mine && (
            <div className="mt-1 flex gap-2 text-[11px] opacity-90">
              <button
                onClick={() => handleEdit(m._id, m.text)}
                className="underline"
              >
                Edit
              </button>
              <button
                onClick={() => handleDeleteMsg(m._id)}
                className="underline"
              >
                Delete
              </button>
            </div>
          )}
        </div>
      </div>
    );
  })}
  <div ref={endRef} />
</div>;
