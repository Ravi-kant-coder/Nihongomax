import WallCard from "../WallCard";

const SavedPosts = ({ savedPosts, username, t }) => {
  const firstName = username?.split(" ")[0];

  return (
    <div className="mt-14">
      {/* Heading */}

      <h1
        className="
          text-center
          text-2xl sm:text-3xl
          font-semibold
          text-gray-700 dark:text-gray-400
        "
      >
        {t("savedPosts")}
      </h1>

      {/* No saved posts */}

      {savedPosts?.length === 0 ? (
        <div
          className="
            text-center
            text-gray-500
            border
            rounded-2xl
            p-6 sm:p-10
            mt-8
          "
        >
          <h2 className="text-xl sm:text-2xl">
            Your saved posts will appear here{" "}
            <span className="capitalize">{firstName}</span>
          </h2>

          <p className="mt-6 text-base">
            保存されたポストがここで表示されます。
          </p>
        </div>
      ) : (
        <>
          {/* Information */}

          <p
            className="
              text-center
              text-gray-600 dark:text-gray-500
              mt-4
              mb-6
              text-sm sm:text-base
            "
          >
            {t("untillCreatorDeletes")}
          </p>

          {/* Saved Posts */}

          <div className="space-y-6">
            {savedPosts.map((savedPost) => (
              <WallCard key={savedPost?._id} post={savedPost} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default SavedPosts;
