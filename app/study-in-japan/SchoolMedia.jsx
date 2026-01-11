import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import ShowSchoolPreview from "./ShowSchoolPreview";
import { useState } from "react";

const SchoolMedia = ({ media, school }) => {
  const [showSchoolPreview, setShowSchoolPreview] = useState(false);
  const handleSchoolPreview = () => {
    setShowSchoolPreview(true);
  };
  return (
    <>
      <div
        className="relative mx-auto my-auto overflow-hidden rounded p-1"
        onClick={() => handleSchoolPreview()}
      >
        <Avatar className="rounded mr-2 w-55 h-50 cursor-pointer">
          {media?.url &&
            (media?.type === "video" ? (
              <video
                src={media?.url}
                className="object-cover rounded"
                autoPlay
                loop
                muted
                playsInline
                preload="metadata"
              />
            ) : (
              <AvatarImage src={media?.url} className="object-cover" />
            ))}
          <AvatarFallback
            className="bg-gray-400 dark:bg-gray-500 lg:text-4xl font-semibold rounded 
            mr-2 text-2xl"
          >
            {school?.schoolName?.charAt(0)?.toUpperCase()}
          </AvatarFallback>
        </Avatar>
      </div>
      {showSchoolPreview && (
        <ShowSchoolPreview
          onClose={() => setShowSchoolPreview(false)}
          picUrl={media.url}
          mediaType={media.type}
        />
      )}
    </>
  );
};

export default SchoolMedia;
