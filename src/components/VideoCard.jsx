import { MoreVertical, CheckCircle } from "lucide-react";
import { Link } from "react-router";
export default function VideoCard({
  thumbnail,
  duration,
  title,
  channelName,
  isVerified = false,
  views,
  uploadTime,
  videoId,
}) {
  return (
    <Link
      to={"/video/" + videoId}
      className={`bg-neutral-900 rounded-lg overflow-hidden hover:bg-neutral-800 transition-colors cursor-pointer`}
    >
      <div className="relative">
        <img
          src={thumbnail}
          alt={title}
          className="w-full aspect-video object-cover rounded-lg"
        />

        <div className="absolute bottom-2 right-2 bg-black bg-opacity-80 text-white text-xs px-1.5 py-0.5 rounded font-medium">
          {duration}
        </div>
      </div>

      <div className="p-3 flex gap-3">

        <div className="flex-1 min-w-0">
          <h3 className="text-white text-sm font-medium line-clamp-2 mb-1 leading-5">
            {title}
          </h3>

          <div className="flex items-center gap-1 mb-1">
            <span className="text-neutral-400 text-xs hover:text-white cursor-pointer">
              {channelName}
            </span>
            {isVerified && (
              <CheckCircle size={12} className="text-neutral-400" />
            )}
          </div>

          <div className="flex items-center gap-1 text-neutral-400 text-xs">
            <span>{views} views</span>
            <span>•</span>
            <span>{uploadTime}</span>
          </div>
        </div>

        <div className="flex-shrink-0">
          <button className="p-1 hover:bg-neutral-700 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
            <MoreVertical size={16} className="text-neutral-400" />
          </button>
        </div>
      </div>
    </Link>
  );
}
