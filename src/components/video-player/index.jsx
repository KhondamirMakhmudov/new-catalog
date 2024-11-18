import ReactPlayer from "react-player";
import Image from "next/image";
import { useState, useEffect } from "react";

const CustomVideoPlayer = ({ url }) => {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return null;
  }
  return (
    <div className={"relative w-full rounded-[12px] "}>
      <ReactPlayer
        url={"/videos/catalog-video.mp4"}
        style={{ borderRadius: "12px" }}
        controls
        width="100%"
        height="100%"
        playIcon={
          <Image
            src={"/icons/play-button.svg"}
            alt="Play"
            width={50}
            height={50}
          />
        }
      />
    </div>
  );
};

export default CustomVideoPlayer;
