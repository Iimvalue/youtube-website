import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import VideoCard from "../components/VideoCard";
import axois from "axios";


const durationConvertor = (string) => {
  let hours, minutes, seconds;

  if (string.includes("H")) {
    hours = string.slice(2, string.indexOf("H"));
  } else {
    hours = false;
  }

  if (string.includes("S")) {
    // checks if number is one-digit and inserts 0 in front of it
    if (isNaN(parseInt(string.charAt(string.indexOf("S") - 2)))) {
      seconds = "0" + string.charAt(string.indexOf("S") - 1);
    } else {
      seconds = string.slice(-3, -1);
    }
  } else {
    seconds = "00";
  }

  // determines how minutes are displayed, based on existence of hours and minutes
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

  // distinction because livestreams (P0D) are not considered
  return string === "P0D"
    ? "Live"
    : `${hours ? hours + ":" : ""}${minutes}:${seconds}`;
};

const MOST_POPULAR_VIDEOS =
  "https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&chart=mostPopular&regionCode=SA&maxResults=20&key=AIzaSyB3SMEmRFKxj3tfNv51ClCW6ZjKXIs7pu4";
export default function Home() {
  const [sampleVideo, setSampleVideo] = useState([]);
  const [isCollapsed, setIsCollapsed] = useState(true);
  const handleMenuClick = () => {
    setIsCollapsed(!isCollapsed);
  };

  function getVideos() {
    axois.get(MOST_POPULAR_VIDEOS).then((res) => {
      setSampleVideo(res.data.items);
    });
  }

  // Will complete later
  // const fetchLogo = async (id) => {
  //   await axois
  //     .get(
  //       `https://www.googleapis.com/youtube/v3/channels?part=snippet&id=${id}&key=AIzaSyB3SMEmRFKxj3tfNv51ClCW6ZjKXIs7pu4`
  //     )
  //     .then((res) => {
  //       return res.data.items[0].snippet.thumbnails.high.url;
  //     });
  // };

  useEffect(() => {
    getVideos();
  }, []);

  return (
    <div className="h-screen bg-neutral-900 flex flex-col">
      <Navbar onMenuClick={handleMenuClick} />

      <div className="flex flex-1">
      <Sidebar isCollapsed={isCollapsed} />

        <div className="flex-1 bg-neutral-900 p-4">
          <div className="text-white text-center mt-20">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
              {sampleVideo.map((video, index) => {
                return (
                  <div key={index} className="group">
                    <VideoCard
                      videoId={video.id}
                      title={video.snippet.title}
                      thumbnail={video.snippet.thumbnails.high.url}
                      duration={durationConvertor(video.contentDetails.duration)}
                      views={video.statistics.viewCount}
                      channelName={video.snippet.channelTitle}
                      // channelAvatar={avatar}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
