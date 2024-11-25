import ReactPlayer from "react-player";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";

const videos = [
  { url: "/videos/catalog-video.mp4", title: "Video 1" },
  { url: "/videos/catalog-video-2.mp4", title: "Video 2" },
];
const AboutClassifier = () => {
  const playerRef = useRef(null);
  const [currentVideo, setCurrentVideo] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isMounted, setIsMounted] = useState(false);
  const handlePrevious = () => {
    setCurrentVideo((prev) => (prev === 0 ? videos.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentVideo((prev) => (prev === videos.length - 1 ? 0 : prev + 1));
  };
  const handleProgress = (state) => {
    const progressPercentage = state.played * 100;
    setProgress(progressPercentage);
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;
  return (
    <div
      className={
        "grid grid-cols-12 gap-[39px] p-[24px] bg-[#F4F6FA] rounded-[30px] mt-[12px]"
      }
    >
      <div className={"col-span-5 pl-[12px] flex flex-col mt-[76px]"}>
        <h1 className={"text-[#21201F] text-[32px] font-bold"}>
          Byudjetni qayta <br /> taqsimlash
        </h1>
        <p className={"text-[17px] text-[#21201FB2] font-medium flex-1"}>
          Global strategiyani o&apos;zgartirish mahsulotning sublimatsiya
          qilingan hayot aylanishini tejaydi. Amaliyot aniq ko&apos;rsatib
          turibdi
        </p>

        <div className="flex items-center gap-x-[16px]">
          <div className="h-1 bg-gray-200 rounded-full w-full ">
            <div
              className="h-full bg-blue-500 rounded-full transition-all"
              style={{ width: `${progress}%` }}
            ></div>
          </div>

          <div className="flex space-x-[12px]">
            <button
              className="border border-[#0000001F] p-[10px] rounded-[8px] scale-100 active:scale-105 transition-all duration-200"
              onClick={handlePrevious}
            >
              <Image
                src={"/icons/swipe.svg"}
                alt="swipe"
                width={22}
                height={22}
              />
            </button>
            <button
              className="border border-[#0000001F] p-[10px] rounded-[8px] scale-100 active:scale-105 transition-all duration-200"
              onClick={handleNext}
            >
              <Image
                src={"/icons/swipe.svg"}
                alt="swipe"
                width={22}
                height={22}
                className="rotate-180 bg-transparent"
              />
            </button>
          </div>
        </div>
      </div>
      <div className={"col-span-7 "}>
        <div className="">
          <div className="flex-1 relative rounded-[15px] overflow-hidden">
            <ReactPlayer
              ref={playerRef}
              url={videos[currentVideo].url}
              controls
              width="100%"
              height="420px"
              onProgress={handleProgress}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutClassifier;
