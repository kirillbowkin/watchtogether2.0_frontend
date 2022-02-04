import { BigPlayButton, Player as ReactPlayer } from 'video-react';

function Player() {
  return (
    <ReactPlayer
      fluid={false}
      height={1100}
      src="http://media.w3.org/2010/05/sintel/trailer.mp4"
    >
      <BigPlayButton position="center" />
    </ReactPlayer>
  );
}

export default Player;
