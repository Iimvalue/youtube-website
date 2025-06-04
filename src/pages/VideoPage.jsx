import React, { useEffect, useState } from "react";
import {
  ThumbsUp,
  ThumbsDown,
  Share,
  Download,
  Flag,
  Bell,
  MoreHorizontal,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { useParams } from "react-router";
import axios from "axios";
import Navbar from "../components/Navbar";

function timeSince(publishedAtISO) {
  const now = new Date();
  const publishedDate = new Date(publishedAtISO);

  if (isNaN(publishedDate.getTime())) {
    return "Invalid date";
  }

  let deltaSeconds = Math.floor(
    (now.getTime() - publishedDate.getTime()) / 1000
  );

  if (deltaSeconds < 0) {
    return "In the future";
  }

  const intervals = [
    { label: "year", seconds: 60 * 60 * 24 * 365 },
    { label: "month", seconds: 60 * 60 * 24 * 30 },
    { label: "day", seconds: 60 * 60 * 24 },
    { label: "hour", seconds: 60 * 60 },
    { label: "minute", seconds: 60 },
    { label: "second", seconds: 1 },
  ];

  for (let i = 0; i < intervals.length; i++) {
    const interval = intervals[i];
    const count = Math.floor(deltaSeconds / interval.seconds);

    if (count >= 1) {
      const plural = count > 1 ? "s" : "";
      return `${count} ${interval.label}${plural} ago`;
    }
  }
  return "Just now";
}

const durationConvertor = (string) => {
  let hours, minutes, seconds;

  if (string.includes("H")) {
    hours = string.slice(2, string.indexOf("H"));
  } else {
    hours = false;
  }

  if (string.includes("S")) {
    if (isNaN(parseInt(string.charAt(string.indexOf("S") - 2)))) {
      seconds = "0" + string.charAt(string.indexOf("S") - 1);
    } else {
      seconds = string.slice(-3, -1);
    }
  } else {
    seconds = "00";
  }

  if (hours) {
    if (string.includes("M")) {
      if (string.indexOf("M") - string.indexOf("H") === 3) {
        minutes = string.slice(string.indexOf("H") + 1, string.indexOf("M"));
      } else {
        minutes = "0" + string.charAt(string.indexOf("M") - 1);
      }
    } else {
      minutes = "00";
    }
  } else {
    if (string.includes("M")) {
      minutes = string.slice(2, string.indexOf("M"));
    } else {
      minutes = "0";
    }
  }

  return string === "P0D"
    ? "Live"
    : `${hours ? hours + ":" : ""}${minutes}:${seconds}`;
};

export default function VideoPage() {
  const [videoDetails, setVideoDetails] = useState({});
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [showDescription, setShowDescription] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState([]);
  const [sampleVideo, setSampleVideo] = useState([]);

  let { id } = useParams();
  const isLoggedIn = localStorage.getItem("username") ? true : false;

  useEffect(() => {
    getVideos()
    axios
      .get(
        `https://www.googleapis.com/youtube/v3/videos?id=${id}&key=AIzaSyB3SMEmRFKxj3tfNv51ClCW6ZjKXIs7pu4&part=snippet,contentDetails,statistics`
      )
      .then((res) => {
        if (res.data.items && res.data.items.length > 0) {
          setVideoDetails(res.data.items[0]);
        }
      })
      .catch((err) => {
        console.error("YouTube API error:", err);
      });

    axios
      .get("https://6823b82b65ba05803397b364.mockapi.io/users/")
      .then((res) => {
        const getComments = res.data.map((item) => {
          item.comments.map((commentItem) => {
            console.log(commentItem);
          });
        });

        console.log(getComments);
      });
  }, []);

  function addComment() {
    axios
      .get("https://6823b82b65ba05803397b364.mockapi.io/users/1")
      .then((res) => {
        console.log(res.data);
        
        // axios.post("https://6823b82b65ba05803397b364.mockapi.io/users/1", {
        //   ...res.data,
        //   comments: [...res.data.comments, newComment],
        // });
      });
  }

  function getVideos() {
    axios.get("https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&chart=mostPopular&regionCode=SA&maxResults=20&key=AIzaSyB3SMEmRFKxj3tfNv51ClCW6ZjKXIs7pu4").then((res) => {
      setSampleVideo(res.data.items);
    });
  }


  

  const handleLike = () => {
    setLiked(!liked);
    if (disliked) setDisliked(false);
  };

  const handleDislike = () => {
    setDisliked(!disliked);
    if (liked) setLiked(false);
  };

  return (
    <>
      <main className="text-white bg-black min-h-screen">
      <Navbar />
        <section className="m-8">
          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_360px] gap-6">
            <div className="space-y-6">
              <div className="w-full aspect-video bg-gray-200 rounded-2xl">
                <iframe
                  className="w-full h-full rounded-2xl"
                  src={"https://www.youtube.com/embed/" + id}
                  title={videoDetails.snippet?.title || ""}
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                ></iframe>
              </div>

              <h1 className="text-2xl font-semibold">
                {videoDetails.snippet?.title || "Loading title…"}
              </h1>

              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-4">
                  <img
                    src="https://yt3.ggpht.com/ytc/AIdro_meYRP4fmYDxbWGXmM7ztfOhY4WNovFYFRu_2wOKUUj3FTC=s176-c-k-c0x00ffffff-no-rj"
                    alt={videoDetails.snippet?.channelTitle}
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <p className="text-lg font-medium">
                      {videoDetails.snippet?.channelTitle}
                    </p>
                  </div>
                  <button
                    onClick={() => setIsSubscribed(!isSubscribed)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-full font-medium transition-all ${
                      isSubscribed
                        ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                        : "bg-white text-black hover:bg-gray-200"
                    }`}
                  >
                    <Bell size={16} />
                    <span>{isSubscribed ? "Subscribed" : "Subscribe"}</span>
                  </button>
                </div>

                <div className="flex items-center space-x-2">
                  <div className="flex bg-[#34302e] rounded-full">
                    <button
                      onClick={handleLike}
                      disabled={!isLoggedIn}
                      className={`flex ${
                        !isLoggedIn ? "cursor-not-allowed" : "cursor-pointer"
                      } items-center space-x-2 px-4 py-2 rounded-l-full transition-all ${
                        isLoggedIn && liked
                          ? "text-blue-400"
                          : "hover:bg-gray-600"
                      }`}
                    >
                      <ThumbsUp size={20} />
                      <span>{videoDetails.statistics?.likeCount}</span>
                    </button>
                    <div className="w-px bg-gray-600"></div>
                    <button
                      onClick={handleDislike}
                      disabled={!isLoggedIn}
                      className={`flex ${
                        !isLoggedIn ? "cursor-not-allowed" : "cursor-pointer"
                      } items-center px-3 py-2 rounded-r-full transition-all ${
                        isLoggedIn && disliked
                          ? "text-red-400"
                          : "hover:bg-gray-600"
                      }`}
                    >
                      <ThumbsDown size={20} />
                    </button>
                  </div>

                  <button className="flex items-center space-x-2 px-4 py-2 bg-[#34302e] rounded-full hover:bg-gray-600 transition-all">
                    <Share size={20} />
                    <span>Share</span>
                  </button>

                  <button className="flex items-center space-x-2 px-4 py-2 bg-[#34302e] rounded-full hover:bg-gray-600 transition-all">
                    <Download size={20} />
                    <span>Download</span>
                  </button>

                  <button className="p-2 bg-[#34302e] rounded-full hover:bg-gray-600 transition-all">
                    <MoreHorizontal size={20} />
                  </button>
                </div>
              </div>

              <div className="bg-gray-900 p-4 rounded-lg">
                <p className="text-sm text-gray-400">
                  {videoDetails.statistics?.viewCount} views •{" "}
                  {timeSince(videoDetails.snippet?.publishedAt)}
                </p>
                <div
                  className="flex items-center justify-between cursor-pointer"
                  onClick={() => setShowDescription(!showDescription)}
                >
                  <h4 className="font-semibold">Description</h4>
                  {showDescription ? (
                    <ChevronUp size={20} />
                  ) : (
                    <ChevronDown size={20} />
                  )}
                </div>
                {showDescription && (
                  <div className="mt-3 space-y-2">
                    <p className="text-gray-300">
                      {videoDetails.snippet?.description}
                    </p>
                  </div>
                )}
              </div>

              <div className="space-y-6">
                <h3 className="text-xl font-bold">
                  {comments.length} Comments
                </h3>

                <div className="flex items-start space-x-4">
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/1144/1144709.png"
                    alt="Avatar"
                    className="w-10 h-10 rounded-full"
                  />
                  <div className="flex-1">
                    <textarea
                      value={newComment.text}
                      disabled={!isLoggedIn}
                      onChange={(e) =>
                        setNewComment({
                          user: localStorage.getItem("username"),
                          text: e.target.value,
                        })
                      }
                      placeholder="Add a comment..."
                      className={`w-full ${
                        !isLoggedIn ? "cursor-not-allowed" : "cursor-selector"
                      } bg-transparent border-b border-gray-600 pb-2 resize-none focus:outline-none focus:border-gray-400 text-white`}
                      rows="2"
                    />
                    <div className="flex items-center justify-end space-x-2 mt-2">
                      
                      <button
                        onClick={addComment}
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                      >
                        Comment
                      </button>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  {comments.map((comment) => (
                    <div
                      key={comment.id}
                      className="flex items-start space-x-4"
                    >
                      <img
                        alt={comment.user}
                        className="w-10 h-10 rounded-full"
                      />
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="font-medium">{comment.user}</span>
                          <span className="text-gray-400 text-sm">
                            {comment.time}
                          </span>
                        </div>
                        <p className="text-gray-300 mb-2">{comment.text}</p>
                        <div className="flex items-center space-x-4 text-sm text-gray-400">
                          <button className="flex items-center space-x-1 hover:text-white transition-colors">
                            <ThumbsUp size={16} />
                            <span>{comment.likes}</span>
                          </button>
                          <button className="flex items-center space-x-1 hover:text-white transition-colors">
                            <ThumbsDown size={16} />
                          </button>
                          <button className="hover:text-white transition-colors">
                            Reply
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Up next</h3>
              <div className="space-y-3">
                {sampleVideo.map((video) => (
                  <div
                    key={video.id}
                    className="flex space-x-3 cursor-pointer hover:bg-gray-800 p-2 rounded-lg transition-colors"
                  >
                    <div className="relative">
                      <div className="w-40 h-24 bg-gray-700 rounded-lg flex items-center justify-center">
                      <img src={video.snippet.thumbnails.high.url} alt="" />
                      </div>
                      <span className="absolute bottom-1 right-1 bg-black bg-opacity-80 text-xs px-1 rounded text-white">
                        {durationConvertor(video.contentDetails?.duration)}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-sm leading-tight mb-1 line-clamp-2">
                        {video.snippet.title}
                      </h4>
                      <p className="text-gray-400 text-xs">{video.channel}</p>
                      <div className="flex items-center space-x-1 text-gray-400 text-xs">
                        <span>{video.statistics.viewCount} views</span>
                        <span>•</span>
                        <span>{timeSince(videoDetails.snippet?.publishedAt)}</span>
                      </div>
                    </div>
                    <button className="p-1 hover:bg-gray-700 rounded">
                      <MoreHorizontal size={16} className="text-gray-400" />
                    </button>
                  </div>
                )
                
                  
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}


