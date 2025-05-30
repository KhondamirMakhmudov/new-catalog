import ReactPlayer from "react-player";
import Image from "next/image";
import { useState, useEffect } from "react";

const CustomVideoPlayer = ({ url }) => {
  const [hasMounted, setHasMounted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return null;
  }

  return (
    <div className="relative rounded-[12px]">
      <ReactPlayer
        url={"/videos/catalog-video.mp4"}
        controls
        width="100%"
        height="100%"
        playing={isPlaying} // Prevent autoplay
        className="rounded-[12px]"
        playIcon={
          <Image
            src={"/icons/play-button.svg"}
            alt="Play"
            width={50}
            height={50}
          />
        }
        onClickPreview={() => setIsPlaying(true)} // Start playing when clicked
      />
    </div>
  );
};

export default CustomVideoPlayer;
