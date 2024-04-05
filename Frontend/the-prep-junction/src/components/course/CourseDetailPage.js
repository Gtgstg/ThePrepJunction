import React, { useState,createRef } from "react";
import { styled } from '@mui/system';
import {
  Playlist,
  goToNextVideo,
  goToPreviousVideo
} from "reactjs-video-playlist-player";
const VideoContainer = styled('div')({
  width: '60%',
  margin: '0 auto',
});

const PlaylistQueue = styled('div')({
  boxShadow: '0px 0px 1px white',
  display: 'flex',
  alignItems: 'center',
  overflowX: 'auto',
  backgroundColor: '#212836',
});

const PlaylistQueueItem = styled('div')({
  margin: '5px',
  cursor: 'pointer',
  minWidth: '60px',
  maxWidth: '60px',
  minHeight: '60px',
  maxHeight: '60px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  border: '4px solid transparent',
});

const CurrentPlayingVideo = styled('div')({
  boxShadow: '0px 0px 2px white',
  transition: '0.2s',
});

const Thumbnail = styled('img')({
  width: '100%',
  height: '100%',
});

function CourseDetailPage() {
  const [videoList, setVideoList] = useState([
    {
      thumbnail: "https://picsum.photos/200",
      url:
        "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
      imgAlt: "Image 1 not found"
    },
    {
      thumbnail: "https://picsum.photos/200",
      url:
        "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
      imgAlt: "Image 2 not found"
    },
    {
      thumbnail: "https://picsum.photos/200",
      url:
        "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
      imgAlt: "Image 3 not found"
    },
    {
      thumbnail: "https://picsum.photos/200",
      url:
        "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
      imgAlt: "Image 4 not found"
    },
    {
      thumbnail: "https://picsum.photos/200",
      url:
        "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
      imgAlt: "Image 5 not found"
    }
  ]);

  const [currentVideo, setCurrentVideo] = useState(0);
  const vidRef = createRef(null);

  const params = {
    videos: videoList,
    autoPlay: true,
    showQueue: true,
    playForward: true,
    currentVideo: currentVideo,
    setCurrentVideo: setCurrentVideo,
    vidRef: vidRef
  };
  const styles = `
    .video-container-styles {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      height: calc(100vh - 80px); /* Subtract header height */
    }

    .playlist-queue-styles {
      box-shadow: 0px 0px 1px white;
      display: flex;
      align-items: center;
      overflow-x: auto;
      background-color: #212836;
    }

    .playlist-queue-item-styles {
      margin: 5px;
      cursor: pointer;
      min-width: 60px;
      max-width: 60px;
      min-height: 60px;
      max-height: 60px;
      display: flex;
      justify-content: center;
      align-items: center;
      border: 4px solid transparent;
    }

    .current-playing-video-styles {
      box-shadow: 0px 0px 2px white;
      transition: 0.2s;
    }

    .thumbnail-styles {
      width: 100%;
      height: 100%;
    }

    .video-styles {
      width: 100%;
      height: 500px;
      object-fit: cover;
    }

    @media screen and (max-width: 549px) {
      .video-container-styles {
        width: 100%;
      }
    }
  `;

  return (
    <div>
      <style>{styles}</style>
      <div>
      <Playlist playlistParams={params} />
      </div>
    </div>
  );
}

export default CourseDetailPage;