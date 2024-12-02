import ReactPlayer from 'react-player';

const VideoPlayer = ({videoUrl}) => {
  return (
    <ReactPlayer
      url={videoUrl}
      width="100"
      height="360"
      controls
    />
  );
}

export default VideoPlayer;