import { BigPlayButton, Player as ReactPlayer } from 'video-react';

function Player() {
  return (
    <ReactPlayer
      fluid={false}
      height={1000}
      width={1800}
      // src="https://nnyagdev.org/wp-content/uploads/2021/01/sample-mp4-file.mp4?_=1"
      src="http://media.w3.org/2010/05/sintel/trailer.mp4"
    >
      <BigPlayButton position="center" />
    </ReactPlayer>
  );
}

export default Player;
