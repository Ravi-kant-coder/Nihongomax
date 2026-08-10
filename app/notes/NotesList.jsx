import Note from "./Note";

const NotesList = ({ userNotes, username }) => {
  const firstName = username?.split(" ")[0];

  return (
    <div className="mt-8 space-y-5">
      {userNotes?.length === 0 ? (
        <div className="text-center text-gray-500">
          <h2 className="text-xl sm:text-2xl">
            Hey <span className="capitalize">{firstName}</span>!
          </h2>

          <p className="mt-4 text-base sm:text-lg">
            Making Notes is a very{" "}
            <span className="font-semibold">Powerful</span> Habit.
          </p>

          <p className="mt-2">Start now!</p>

          <p className="mt-6 text-sm sm:text-base">
            ノート作成しながら頑張りましょう。応援しています！
          </p>
        </div>
      ) : (
        userNotes.map((note) => (
          <Note key={note?._id} initialNote={note.text} note={note} />
        ))
      )}
    </div>
  );
};

export default NotesList;
