import Header from "@/components/header";
import Title from "@/components/title";

import Image from "next/image";
import Link from "next/link";
import { get } from "lodash";
import { useState, useEffect, useRef } from "react";
import Footer from "@/components/footer";
import { motion } from "framer-motion";
import Reveal from "@/components/reveal";
import MapOfUz from "@/components/icons/uz-map";
import HorizontalBarChart from "@/components/bar";
import ArrowRightButton from "@/components/buttons/arrow-right";
import ScrollToTopButton from "@/components/scroll-to-top";
import AboutClassifier from "@/components/about-company";
import FondStock from "@/components/fondStock";
import BackgroundSlider from "@/components/background-slider";
import HorizonChart from "@/components/bar/rechart";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
const integrationData = [
  {
    id: 1,
    title: "Soliq qo'mitasi",
    image: "soliq.svg",
  },
  {
    id: 2,
    title: "Tovar-xom ashyo birjasi",
    image: "birja.svg",
  },
  {
    id: 3,
    title: "Iqtisod va moliya vazirligi",
    image: "ministry.svg",
  },
  {
    id: 4,
    title: "Bojxona qo'mitasi",
    image: "bojxona.svg",
  },
  {
    id: 5,
    title: "Tartibga solish agentligi",
    image: "ministry.svg",
  },

  {
    id: 6,
    title: "Statistika agentligi",
    image: "statistics.svg",
  },
];

export default function Home() {
  return (
    <>
      <Header />
      <FondStock />
      <main className="bg-white">
        <ScrollToTopButton />

        <BackgroundSlider />

        {/* Bo'limlar */}
        <motion.section
          initial={{ translateY: "50px" }}
          animate={{ translateY: 1 }}
          transition={{ duration: 0.3 }}
          className={"container py-[60px]"}
        >
          <Reveal>
            <Title>Bo&apos;limlar</Title>
          </Reveal>

          <Reveal>
            <div className={"grid grid-cols-12 gap-[20px] mt-[20px]"}>
              <div
                className={
                  "col-span-12 md:col-span-6 p-[32px] bg-[#F4F6FA] rounded-[16px] max-h-[200px] md:max-h-[300px] lg:max-h-[480px] h-full  overflow-hidden section z-10"
                }
              >
                {/* machine-mechano */}
                <div className={"z-30"}>
                  <h1 className={"font-bold text-[24px] text-[#21201F]"}>
                    Material va jihozlar
                  </h1>
                  <p
                    className={
                      "font-medium text-[#21201FB2] mt-[16px] mb-[24px] opacity-0 lg:block hidden"
                    }
                  >
                    Global strategiyani o&apos;zgartirish mahsulotning
                    sublimatsiya qilingan hayot aylanishini tejaydi. Amaliyot
                    aniq
                  </p>

                  <Link href="/materials">
                    <div
                      className={
                        " z-20 py-[13px] px-[24px] text-[#21201FCC] hover:text-white bg-transparent hover:bg-[#0256BA]  items-center border border-[#D7D9DC] inline-flex rounded-[8px] transition-all duration-300 mt-[20px] lg:mt-0"
                      }
                    >
                      <p className={""}>Batafsil</p>
                    </div>
                  </Link>
                </div>
                <div className={"absolute bg-section bottom-0 -z-10"}>
                  <Image
                    src={"/images/materials.png"}
                    alt={"materials"}
                    width={910}
                    height={485}
                    className={"ml-[16px] xl:blur-0 blur-sm"}
                  />
                </div>
              </div>

              <div className={"col-span-12 md:col-span-6"}>
                {/* machine-mechano */}
                <div
                  className={
                    "bg-[#FFE7DB] px-[32px] pt-[32px] pb-[34px] max-h-[200px] md:max-h-[230px] h-full rounded-[16px] section overflow-hidden cursor-pontiner z-10"
                  }
                >
                  <div className={"z-30"}>
                    <h1 className={"font-bold text-[24px] text-[#21201F]"}>
                      Mashina va mexanizmlar
                    </h1>
                    <p
                      className={
                        "font-medium text-[#21201FB2] mt-[16px] mb-[24px] opacity-0 lg:block hidden"
                      }
                    >
                      Global strategiyani o&apos;zgartirish <br />{" "}
                      sublimatsiyani tejaydi
                    </p>

                    <Link href="/machine-mechano">
                      <div
                        className={
                          "  py-[13px] px-[24px]  items-center border border-[#D7D9DC] inline-flex rounded-[8px] -z-30 text-[#21201FCC] hover:text-white bg-transparent hover:bg-[#0256BA] transition-all duration-300 mt-[20px] lg:mt-0"
                        }
                      >
                        <p>Batafsil</p>
                      </div>
                    </Link>
                  </div>

                  <div className={"absolute bg-section bottom-0 right-0 -z-10"}>
                    <Image
                      src={"/images/machine-mechano.png"}
                      alt={"machine-mechano"}
                      width={274}
                      height={297}
                      className={"ml-[16px] xl:blur-0 blur-sm"}
                    />
                  </div>
                </div>

                <div
                  className={"flex md:flex-row flex-col gap-[20px] mt-[20px]"}
                >
                  {/* uskunalar va qurilmalar */}
                  <div
                    className={
                      "border works flex-col border-[#D9DADB] md:w-1/2 w-full p-[24px] rounded-[16px] cursor-pointer transition-all duration-300"
                    }
                  >
                    <h1
                      className={"font-bold text-[24px] flex-1 text-[#21201F]"}
                    >
                      Uskuna va <br /> qurilmalar
                    </h1>
                    <p
                      className={
                        "font-medium text-[#21201FB2] mt-[16px] mb-[24px] opacity-0"
                      }
                    >
                      Global strategiyani o&apos;zgartirish tejaydi
                    </p>

                    <Link href="/technos">
                      <ArrowRightButton />
                    </Link>
                  </div>
                  {/* Qurilish ishlari */}
                  <div
                    className={
                      "border works border-[#D9DADB] md:w-1/2 w-fulls p-[24px] rounded-[16px] flex flex-col transition-all duration-300"
                    }
                  >
                    <h1
                      className={"font-bold text-[24px] text-[#21201F] flex-1"}
                    >
                      Qurilish ishlari
                    </h1>
                    <p
                      className={
                        "font-medium text-[#21201FB2] mt-[16px] mb-[24px] opacity-0"
                      }
                    >
                      Global strategiyani o&apos;zgartirish tejaydi
                    </p>

                    <Link href="/works">
                      <ArrowRightButton />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </motion.section>

        {/* ////////// Namunaviy loyihalar /////////// */}
        <section
          style={{ backgroundImage: `url(/images/bg-namunaviy-loyihalar.png)` }}
          className="min-h-[879px] bg-no-repeat bg-cover relative z-10 "
        >
          <div
            className={`absolute top-0 bottom-0 left-0 right-0 bg-[#1764C0] bg-opacity-70 -z-10`}
          ></div>

          <Reveal>
            <div className="container">
              <div>
                <div className="z-40 text-white pt-[42px]">
                  <h1 className="text-[#FFFFFF] text-[32px] font-bold">
                    Namunaviy loyihalar
                  </h1>
                  <p className="opacity-0">
                    Lorem Ipsum-bu Lorem Ipsum tomonidan ishlatiladigan
                    shunchaki qo&apos;g&apos;irchoq matn-bu shunchaki
                    ishlatilgan qo&apos;g&apos;irchoq matn
                  </p>
                </div>
              </div>

              <div className={"grid grid-cols-12 gap-[20px] mt-[30px]"}>
                <div
                  className={
                    "col-span-12 md:col-span-6 min-h-[580px] rounded-[30px] relative z-10 bg-center"
                  }
                  style={{ backgroundImage: `url(/images/school-bg.png)` }}
                >
                  <div
                    className={`absolute top-0 bottom-0 left-0 right-0 bg-black bg-opacity-20 rounded-[30px] -z-10`}
                  ></div>
                  <h1
                    className={
                      "text-[28px] absolute font-bold text-white left-8 top-8"
                    }
                  >
                    Maktab
                  </h1>
                  <div className="absolute bottom-0 p-[32px] text-white ">
                    <p className="text-sm font-normal mt-[10px] line-clamp-2 opacity-0">
                      Biz to&apos;y rejalashtiruvchisi bilan erta suhbatlashdik
                      biz to&apos;y rejalashtiruvchisi Rano Artykova bilan kelin
                      va kuyovlar o&apos;rtasidagi ziddiyatlar, keraksiz
                      urf-odatlar va keyingi sevgi haqida suhbatlashdik
                    </p>
                    <Link href="/loyihalar/1">
                      <div
                        className={
                          "  py-[14px] px-[24px]  hover:text-white text-[#21201FCC] hover:bg-[#0256BA] bg-white items-center border border-[#D7D9DC] inline-flex rounded-[8px] transition-all duration-300"
                        }
                      >
                        <p className={""}>Batafsil</p>
                      </div>
                    </Link>
                  </div>
                </div>

                <div className={"col-span-12 md:col-span-6 space-y-[20px]"}>
                  <div
                    className={
                      "bg-white flex flex-col p-[32px] min-h-[280px] rounded-[30px] relative"
                    }
                  >
                    <div className="absolute bottom-0 right-0 p-[24px]">
                      <Image
                        src={"/images/kindergarten.png"}
                        alt={"school"}
                        width={150}
                        height={120}
                        className={"ml-[16px]"}
                      />
                    </div>
                    <h1 className="text-[28px] font-bold text-[#21201F]">
                      Bolalar bog&apos;chasi
                    </h1>
                    <p
                      className={
                        "text-sm font-normal text-[#9392A0] line-clamp-3 flex-1 mt-[10px] opacity-0"
                      }
                    >
                      Biz to&apos;y rejalashtiruvchisi bilan erta suhbatlashdik
                      biz to&apos;y rejalashtiruvchisi Rano Artykova bilan kelin
                      va kuyovlar o&apos;rtasidagi ziddiyatlar, keraksiz
                      urf-odatlar va keyingi sevgi haqida suhbatlashdik
                    </p>
                    <Link href="/loyihalar/maktab">
                      <div
                        className={
                          "  py-[14px] px-[24px]  border border-[#D7D9DC]  text-[#21201FCC] hover:text-white bg-transparent hover:bg-[#0256BA] items-center inline-flex rounded-[8px] transition-all duration-300"
                        }
                      >
                        <p>Batafsil</p>
                      </div>
                    </Link>
                  </div>
                  <div
                    className={
                      "bg-white flex flex-col p-[32px] min-h-[280px] rounded-[30px] relative"
                    }
                  >
                    <div className="absolute bottom-0 right-0 p-[24px]">
                      <Image
                        src={"/images/medicine.png"}
                        alt={"medicine_img"}
                        width={150}
                        height={120}
                        className={"ml-[16px]"}
                      />
                    </div>
                    <h1 className="text-[28px] font-bold text-[#21201F]">
                      Poliklinika
                    </h1>
                    <p
                      className={
                        "text-sm font-normal text-[#9392A0] line-clamp-3 flex-1 mt-[10px] opacity-0"
                      }
                    >
                      Biz to&apos;y rejalashtiruvchisi bilan erta suhbatlashdik
                      biz to&apos;y rejalashtiruvchisi Rano Artykova bilan kelin
                      va kuyovlar o&apos;rtasidagi ziddiyatlar, keraksiz
                      urf-odatlar va keyingi sevgi haqida suhbatlashdik
                    </p>
                    <Link href="/loyihalar/poliklinika">
                      <div
                        className={
                          "  py-[14px] px-[24px] border border-[#D7D9DC]  text-[#21201FCC] hover:text-white bg-transparent hover:bg-[#0256BA] items-center inline-flex rounded-[8px] transition-all duration-300"
                        }
                      >
                        <p className={""}>Batafsil</p>
                      </div>
                    </Link>
                  </div>
                </div>

                <div className="col-span-12 my-[30px] backdrop-blur-lg">
                  <div className="backdrop-blur bg-transparent">
                    <Link
                      href={"/loyihalar"}
                      className="flex gap-x-[12px] text-white py-[19px] w-full  justify-center border border-[#699EDB] rounded-[16px] "
                    >
                      <p>Hammasini tomosha qiling (952)</p>
                      <Image
                        src={"/icons/right.svg"}
                        alt={"arrow-right"}
                        width={20}
                        height={20}
                      />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </section>

        {/* /////// Ekologiya va atrof-muhitni muhofaza qilish boshqar //////// */}
        <section className="relative py-[60px] z-10">
          <div className="absolute z-10 -left-10 md:left-0 md:bottom-0 hidden lg:block">
            <Image
              src={"/images/bg-eco-2.png"}
              alt={"eco-logo"}
              width={270}
              height={430}
              className={"w-ful h-[300px] md:h-[430px]"}
            />
          </div>

          <div className="absolute -z-10 -right-6 overflow-x-hidden md:right-0 bottom-0 hidden lg:block">
            <Image
              src={"/images/bg-eco-1.png"}
              alt={"eco-logo"}
              width={270}
              height={430}
              className={"w-ful h-[300px] md:h-[430px]"}
            />
          </div>

          <Reveal>
            <div className="container">
              <div className="grid grid-cols-12 gap-[30px] z-50  bg-[#F3F5F6CC] backdrop-blur-sm p-[30px] rounded-[20px]">
                <div className="col-span-12 md:col-span-6 md:max-w-[300px] lg:max-w-[600px] w-full">
                  <Image
                    src={"/images/eco-logo.png"}
                    alt={"eco-logo"}
                    width={600}
                    height={436}
                    className={
                      "lg:w-[600px] w-[200px]  md:h-[436px] rounded-[20px] object-cover"
                    }
                  />
                </div>
                <div className="col-span-12 md:col-span-6 flex items-start justify-center flex-col">
                  <h1
                    className={
                      "font-bold text-[20px] md:text-[42px] text-[#21201F]"
                    }
                  >
                    Ekologiya va atrof-muhitni muhofaza qilish boshqarmasi
                  </h1>
                  <p
                    className={
                      "font-medium text-[#21201FB2] text-base md:text-[21px] mt-[16px] mb-[24px]"
                    }
                  >
                    O‘zbekiston Respublikasi Vazirlar Mahkamasining 27.05.2019
                    yildagi «O‘zbekiston Respublikasida mahsulotlarni ixtiyoriy
                    ekologik markirovkalash tizimini joriy etish to‘g‘risida»gi
                    435-son qarori
                  </p>

                  <Link href="#">
                    <div
                      className={
                        "  py-[13px] px-[52px]  justify-center  items-center border border-[#D7D9DC] inline-flex rounded-[8px]"
                      }
                    >
                      <p className={"text-[#21201FCC]"}>Jadvalni ko’rish</p>
                      <Image
                        src={"/icons/arrow-right.svg"}
                        alt={"arrow-right"}
                        width={20}
                        height={20}
                        className={"ml-[16px]"}
                      />
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </Reveal>
        </section>

        {/* Klassifikator haqida */}
        <section className={"container pb-[60px]"} id="about-classifier">
          <Reveal>
            <Title>Klassifikator haqida</Title>
          </Reveal>

          <Reveal>
            <AboutClassifier />
          </Reveal>
        </section>

        {/* Mintaqalar bo'yicha monitoring */}
        <section className="bg-[#F7F7F7] ">
          <div className="container py-[60px]">
            <Reveal>
              <h1 className="text-[32px] font-bold">
                Mintaqalar bo&apos;yicha monitoring
              </h1>
            </Reveal>
            <Reveal>
              <Link href={"/monitoring"}>
                <div className="grid grid-cols-12 gap-x-[30px] bg-white p-[30px] rounded-[20px] mt-[20px]">
                  <div className="col-span-12 md:col-span-6">
                    <HorizonChart />
                  </div>
                  <div className="col-span-12 md:col-span-6">
                    <div>
                      <MapOfUz />
                    </div>
                  </div>
                </div>
              </Link>
            </Reveal>
          </div>
        </section>

        {/* Integratsiya bo'yicha sheriklar */}
        <section className="bg-white">
          <div className="container py-[42px]">
            <Reveal>
              <h1 className="text-[30px] lg:text-[32px] font-bold">
                Integratsiya bo&apos;yicha sheriklar
              </h1>
            </Reveal>

            {/* Mobil uchun Swiper */}
            <Reveal>
              <div className="md:hidden mt-[20px]">
                <Swiper
                  spaceBetween={24}
                  slidesPerView={1.2}
                  breakpoints={{
                    640: { slidesPerView: 1.5 },
                    768: { slidesPerView: 2 }, // Bu md: dan kattaroq ekranda yashiriladi
                  }}
                >
                  {integrationData.map((item) => (
                    <SwiperSlide key={get(item, "id")}>
                      <div className="flex gap-x-[24px] items-center border p-[24px] bg-[#F7F7F7] rounded-[20px]">
                        <div
                          className="bg-center bg-white border bg-no-repeat bg-[length:80px_80px] border-[#E6E5ED] w-[110px] h-[110px] rounded-[16px]"
                          style={{
                            backgroundImage: `url(/icons/${get(
                              item,
                              "image"
                            )})`,
                          }}
                        ></div>
                        <div>
                          <h2 className="text-[20px] font-bold">
                            {get(item, "title")}
                          </h2>
                          <Link
                            href={"/integrations"}
                            className="inline-flex gap-x-[10px] bg-[#EBF1F9] hover:bg-[#DEECFF] rounded-[8px] py-[17px] px-[16px] mt-[10px] transition-all duration-300"
                          >
                            <p className="text-sm lg:text-lg font-semibold text-[#0256BA]">
                              Tanishib chiqish
                            </p>
                            <Image
                              src={"/icons/integration-arrow-right.svg"}
                              alt={"school"}
                              width={20}
                              height={20}
                            />
                          </Link>
                        </div>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </Reveal>

            {/* Katta ekran uchun Grid */}
            <Reveal>
              <div className="hidden md:grid grid-cols-12 gap-[24px] font-gilroy mt-[20px]">
                {integrationData.map((item) => (
                  <div
                    className="col-span-12 md:col-span-6 lg:col-span-4 flex gap-x-[24px] items-center border p-[24px] bg-[#F7F7F7] rounded-[20px]"
                    key={get(item, "id")}
                  >
                    <div
                      className="bg-center bg-white border bg-no-repeat bg-[length:80px_80px] border-[#E6E5ED] w-[110px] h-[110px] rounded-[16px]"
                      style={{
                        backgroundImage: `url(/icons/${get(item, "image")})`,
                      }}
                    ></div>
                    <div>
                      <h2 className="text-[20px] font-bold">
                        {get(item, "title")}
                      </h2>
                      <Link
                        href={"/integrations"}
                        className="inline-flex gap-x-[10px] bg-[#EBF1F9] hover:bg-[#DEECFF] rounded-[8px] py-[17px] px-[16px] mt-[10px] transition-all duration-300"
                      >
                        <p className="text-sm lg:text-lg font-semibold text-[#0256BA]">
                          Tanishib chiqish
                        </p>
                        <Image
                          src={"/icons/integration-arrow-right.svg"}
                          alt={"school"}
                          width={20}
                          height={20}
                        />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* Tez-tez so'raladigan savollar */}
        {/* <section className="bg-white">
          <div className="container py-[42px]">
            <Reveal>
              <h1 className="text-[32px] font-bold">
                Tez-tez so&apos;raladigan savollar
              </h1>
            </Reveal>

            <Reveal>
              <ul
                className={"grid grid-cols-12 gap-[12px] font-gilroy mt-[20px]"}
              >
                <li
                  className="col-span-12 py-[28px] px-[32px] bg-[#F7F7F7] rounded-[20px] cursor-pointer"
                  onClick={toggleFAQ}
                >
                  <div className="flex justify-between">
                    <div className="flex-1">
                      <h4 className="text-[20px] text-[#020E03] font-bold">
                        Et harum quidem rerum facilis est et expedita
                        distinctio. Nam libero tempore
                      </h4>
                      {openFAQ && (
                        <motion.p
                          initial={{ opacity: 0, translateY: "30px" }}
                          animate={{ opacity: 1, translateY: "0px" }}
                          className="text-[17px] text-[#9392A0] mt-[10px]"
                        >
                          Sed ut perspiciatis, unde omnis iste natus error sit
                          voluptatem accusantium doloremque laudantium, totam
                          rem aperiam eaque ipsa, quae ab illo inventore
                          veritatis et quasi architecto beatae vitae dicta sunt,
                          explicabo. Nemo enim
                        </motion.p>
                      )}
                    </div>
                    <button>
                      <Image
                        src={
                          !openFAQ
                            ? "/icons/add-icon.svg"
                            : "/icons/minus-icon.svg"
                        }
                        alt={"school"}
                        width={24}
                        height={24}
                      />

                      <Image
                        src={"/icons/minus.svg"}
                        alt={"school"}
                        width={24}
                        height={24}
                        className="hidden"
                      />
                    </button>
                  </div>
                </li>
              </ul>
            </Reveal>
          </div>
        </section> */}

        {/* Address */}
        <section className="container">
          <Reveal>
            <div
              className="min-h-[164px] w-full bg-center bg-no-repeat
            bg-cover rounded-[20px] flex items-center justify-center"
              style={{ backgroundImage: `url(/images/address.png)` }}
            >
              <Link
                href={"https://maps.app.goo.gl/nxPwsjmq6vi6hCPa7"}
                className="py-[14px] px-[28px] text-sm font-medium font-gilroy text-white bg-[#0256BA] hover:bg-[#1C73DA] rounded-[12px]"
              >
                Google Maps ni ochish
              </Link>
            </div>
          </Reveal>
        </section>
      </main>

      <Footer />
    </>
  );
}
