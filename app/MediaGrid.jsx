import MediaItem from "./MediaItem";

const MediaGrid = ({ media }) => {
  const count = media.length;

  if (count === 1) {
    return (
      <div className="w-full mb-4">
        <MediaItem media={media[0]} />
      </div>
    );
  }

  if (count === 2) {
    return (
      <div className="grid grid-cols-2 gap-1 mb-4 h-[500px]">
        {media.map((m, i) => (
          <div key={i} className="overflow-hidden">
            <MediaItem media={m} />
          </div>
        ))}
      </div>
    );
  }

  if (count === 3) {
    return (
      <div className="grid grid-cols-2 grid-rows-2 gap-1 mb-4 h-[500px]">
        <div className="row-span-2 overflow-hidden flex items-center justify-center">
          <MediaItem media={media[0]} />
        </div>

        <div className="col-start-2 row-start-1 overflow-hidden">
          <MediaItem media={media[1]} />
        </div>

        <div className="col-start-2 row-start-2 overflow-hidden">
          <MediaItem media={media[2]} />
        </div>
      </div>
    );
  }

  // 4 media
  return (
    <div className="grid grid-cols-2 gap-1 mb-4 h-[500px]">
      {media.slice(0, 4).map((m, i) => (
        <div key={i} className="overflow-hidden">
          <MediaItem media={m} />
        </div>
      ))}
    </div>
  );
};
export default MediaGrid;
