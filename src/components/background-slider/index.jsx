import { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";

const backgrounds = ["/images/background1.jpg", "/images/background4.png"];

const BackgroundSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(1);
  const [progress, setProgress] = useState(0);

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? backgrounds.length - 1 : prev - 1));
    setProgress(0);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === backgrounds.length - 1 ? 0 : prev + 1));
    setProgress(0);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setCurrentIndex((prevIndex) =>
            prevIndex === backgrounds.length - 1 ? 0 : prevIndex + 1
          );
          return 0;
        }
        return prev + 1;
      });
    }, 100); // Progress bar updates every 30ms (3 seconds total)

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <section
        style={{ backgroundImage: `url(${backgrounds[currentIndex]})` }}
        className={
          "w-full relative min-h-[400px] md:min-h-[666px] h-full object-cover bg-cover bg-no-repeat font-anybody z-10 flex items-center justify-center"
        }
      >
        <div className={"container  text-[#ffffff] relative "}>
          <motion.h1
            initial={{ scale: 0.11 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3 }}
            className={"text-[26px] md:text-[42px] font-bold uppercase z-40"}
          >
            Qurilish resurslari <br /> milliy klassifikatori
          </motion.h1>

          {/* <motion.p
            className={"max-w-[458px] opacity-0"}
            initial={{ scale: 0.11 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            Global strategiyani o&apos;zgartirish mahsulotning <br />{" "}
            sublimatsiya qilingan hayot aylanishini tejaydi. <br /> Amaliyot
            aniq ko&apos;rsatib turibdi
          </motion.p>

          <Link href={"#"}>
            <motion.p
              initial={{ scale: 0.11 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3 }}
              className={
                "bg-white text-[#21201F] py-[14px] px-[28px] font-semibold font-gilroy rounded-[12px] inline-block opacity-0"
              }
            >
              Ko&apos;proq bilib oling
            </motion.p>
          </Link> */}
        </div>
        <div className="flex items-center gap-x-[16px] absolute w-full container left-0 right-0 bottom-[36px]">
          <div className="h-1 bg-[#636966] rounded-full w-full ">
            <div
              className="h-full bg-white rounded-full transition-all"
              style={{ width: `${progress}%` }}
            ></div>
          </div>

          <div className="flex items-center space-x-[12px]">
            <button
              className="bg-white p-[10px] rounded-[8px] scale-100 active:scale-105 transition-all duration-200"
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
              className="bg-white p-[10px] rounded-[8px] scale-100 active:scale-105 transition-all duration-200"
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
        <div
          className={`absolute top-0 bottom-0 left-0 right-0 bg-image-gradient -z-10 `}
        ></div>
      </section>
    </>
  );
};

export default BackgroundSlider;
