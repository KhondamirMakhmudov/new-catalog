import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";

const videos = [
  { url: "/videos/catalog-video.mp4", title: "Klassifikator haqida" },
  { url: "/videos/catalog-video-2.mp4", title: "Klassifikator haqida" },
  { url: "/videos/catalog-video-3.mp4", title: "Qo'llanma" },
  { url: "/videos/catalog-video-4.mp4", title: "Klassifikator haqida" },
];

const AboutClassifier = () => {
  const videoRef = useRef(null);
  const [currentVideo, setCurrentVideo] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isMounted, setIsMounted] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);

  const handlePrevious = () => {
    setCurrentVideo((prev) => (prev === 0 ? videos.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentVideo((prev) => (prev === videos.length - 1 ? 0 : prev + 1));
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const progressPercentage =
        (videoRef.current.currentTime / videoRef.current.duration) * 100;
      setProgress(progressPercentage);
    }
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  const openModal = (videoUrl) => {
    setSelectedVideo(videoUrl);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedVideo(null);
    if (videoRef.current) {
      videoRef.current.pause();
    }
  };

  return (
    <div className="grid grid-cols-12  p-[24px] bg-[#F4F6FA] rounded-[30px] mt-[12px]">
      <div className="col-span-12 md:col-span-12 pl-[12px] flex flex-col">
        <p className="text-[17px] text-[#21201FB2] font-medium flex-1 opacity-0">
          Global strategiyani o&apos;zgartirish mahsulotning sublimatsiya
          qilingan hayot aylanishini tejaydi.
        </p>
        {/* <div className="flex items-center gap-x-[16px]">
          <div className="h-1 bg-gray-200 rounded-full w-full">
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
                src="/icons/swipe.svg"
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
                src="/icons/swipe.svg"
                alt="swipe"
                width={22}
                height={22}
                className="rotate-180"
              />
            </button>
          </div>
        </div> */}
      </div>
      <div className="col-span-12 md:col-span-12">
        {/* <div className="rounded-[15px]">
          <div className="relative max-w-[400px] md:max-w-[600px] rounded-[15px] overflow-x-hidden">
            <video
              ref={videoRef}
              key={videos[currentVideo].url}
              src={videos[currentVideo].url}
              controls
              width="100%"
              height="420px"
              onTimeUpdate={handleTimeUpdate}
            />
          </div>
        </div> */}

        <div className="w-full  mx-auto">
          {/* Swiper Video Slider */}
          <Swiper
            spaceBetween={20}
            slidesPerView={3}
            navigation
            modules={[Navigation]}
            breakpoints={{
              640: { slidesPerView: 1.5 },
              768: { slidesPerView: 2 }, // Bu md: dan kattaroq ekranda yashiriladi
            }}
            className="mySwiper"
          >
            {videos.map((video, index) => (
              <SwiperSlide key={index} className="relative cursor-pointer">
                <div
                  className="w-full h-[200px] bg-gray-200 rounded-lg overflow-hidden flex items-center justify-center"
                  onClick={() => openModal(video.url)}
                >
                  <video
                    src={video.url}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0  bg-opacity-50 flex items-center justify-center">
                    <Image
                      src="/icons/play-button.svg"
                      alt="Play"
                      width={50}
                      height={50}
                      className="opacity-80"
                    />
                  </div>
                </div>
                <p className="text-center mt-2 text-gray-700 font-medium">
                  {video.title}
                </p>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Modal */}
          {isModalOpen && selectedVideo && (
            <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
              <div className="relative w-[80%] max-w-2xl bg-white p-8 rounded-lg">
                <button
                  className="absolute top-0 right-0  text-black px-3 py-1 z-50 rounded-full"
                  onClick={closeModal}
                >
                  ✕
                </button>
                <video
                  ref={videoRef}
                  src={selectedVideo}
                  controls
                  autoPlay
                  className="w-full rounded-lg"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AboutClassifier;
