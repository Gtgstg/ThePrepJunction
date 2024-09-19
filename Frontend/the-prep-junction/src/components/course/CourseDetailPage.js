import React, { useState,createRef, useEffect } from "react";
import { styled } from '@mui/system';
import {
  Playlist,
  goToNextVideo,
  goToPreviousVideo
} from "reactjs-video-playlist-player";
import axios from 'axios';
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
  const [videoList, setVideoList] = useState([]);
  const [currentVideo, setCurrentVideo] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const vidRef = createRef(null);

  useEffect(() => {
    // Fetch courses from API
    axios.get('http://13.126.195.239:3600/api/courses')
      .then((response) => {
        setVideoList(response.data);
        setLoading(false); // Update loading state
      })
      .catch((error) => {
        setError(error);
        setLoading(false); // Update loading state
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }
  
  if (error) {
    return <div>Error: {error.message}</div>;
  }

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
    justify-content: flex-start;
    align-items: stretch;
    height: calc(100vh - 80px); /* Subtract header height */
  }

  .video-styles {
    width: 80%; /* Video width takes 80% */
    max-height: 100%;
    object-fit: cover;
  }

  .playlist-queue-styles {
    width: 20%; /* Playlist queue width takes 20% */
    box-shadow: 0px 0px 1px white;
    overflow-y: auto; /* Making playlist queue scrollable */
    background-color: #212836;
  }

  .playlist-queue-item-styles {
    margin: 5px;
    cursor: pointer;
    min-width: 100px; /* Adjust dimensions as needed */
    max-width: 100px;
    min-height: 100px;
    max-height: 100px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border: 4px solid transparent;
    text-align: center;
    color: white; /* Adjust text color as needed */
  }

  .thumbnail-styles {
    width: 80%; /* Adjust dimensions as needed */
    height: 80%;
    object-fit: cover;
  }

  .title {
    margin-top: 5px; /* Adjust spacing as needed */
    font-size: 14px; /* Adjust font size as needed */
  }

  .current-playing-video-styles {
    box-shadow: 0px 0px 2px white;
    transition: 0.2s;
  }

  @media screen and (max-width: 549px) {
    .video-container-styles {
      flex-direction: column;
      align-items: center;
    }
    .video-styles {
      width: 100%;
      height: auto;
    }
    .playlist-queue-styles {
      width: 100%;
      margin-top: 10px; /* Adjust margin as needed */
    }
  }
`;




  return (
    <div>
      <style>{styles}</style>
      <h3 className="title">{videoList[currentVideo].title}</h3>
      <div>
      <Playlist playlistParams={params} />
      </div>
    </div>
  );
}

export default CourseDetailPage;