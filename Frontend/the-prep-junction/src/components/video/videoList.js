import React from 'react';
import VideoUploadForm from './VideoUploadForm';
import VideoPlayer from './VideoPlayer';

const App = () => {
  return (
    <div>
      <VideoUploadForm />
      <VideoPlayer videoUrl="http://example.com/video.mp4" />
    </div>
  );
};

export default App;