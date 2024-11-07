import Header from "@/components/header";
import Title from "@/components/title";
import CustomVideoPlayer from "@/components/video-player";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <Header />

      <main>
        <section
          style={{ backgroundImage: `url(/images/bg-image.png)` }}
          className={
            "w-full relative min-h-[666px] h-full object-cover bg-cover bg-no-repeat font-anybody z-10"
          }
        >
          <div className={"translate-y-1/2"}>
            <div
              className={"container  text-[#ffffff] flex flex-col gap-y-[20px]"}
            >
              <h1 className={"text-[42px] font-bold uppercase z-40"}>
                Byudjetni qayta <br /> taqsimlash
              </h1>

              <p className={"max-w-[458px]"}>
                Global strategiyani o'zgartirish mahsulotning <br />{" "}
                sublimatsiya qilingan hayot aylanishini tejaydi. <br /> Amaliyot
                aniq ko'rsatib turibdi
              </p>

              <Link href={"#"}>
                <p
                  className={
                    "bg-white text-[#21201F] py-[14px] px-[28px] font-semibold font-gilroy rounded-[12px] inline-block"
                  }
                >
                  Ko'proq bilib oling
                </p>
              </Link>
            </div>
          </div>
          <div
            className={`absolute top-0 bottom-0 left-0 right-0 bg-image-gradient -z-10 `}
          ></div>
        </section>

        <section className={"container py-[60px]"}>
          <Title>Bo&apos;limlar</Title>

          <div className={"grid grid-cols-12 gap-[20px] mt-[20px]"}>
            <div
              className={
                "col-span-6 p-[32px] bg-[#F4F6FA] rounded-[16px] min-h-[480px] h-full  overflow-hidden section -z-20"
              }
            >
              {/* machine-mechano */}
              <div className={"z-30"}>
                <h1 className={"font-bold text-[24px] text-[#21201F]"}>
                  Material va jihozlar
                </h1>
                <p
                  className={"font-medium text-[#21201FB2] mt-[16px] mb-[24px]"}
                >
                  Global strategiyani o'zgartirish mahsulotning sublimatsiya
                  qilingan hayot aylanishini tejaydi. Amaliyot aniq
                </p>

                <Link href="https://catalog.tmsiti.uz/">
                  <div
                    className={
                      "  py-[13px] px-[24px]  items-center border border-[#D7D9DC] inline-flex rounded-[8px]"
                    }
                  >
                    <p className={"text-[#21201FCC]"}>Qarang</p>
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
              <div className={"absolute bg-section bottom-0 -z-10"}>
                <Image
                  src={"/images/materials.png"}
                  alt={"materials"}
                  width={910}
                  height={485}
                  className={"ml-[16px]"}
                />
              </div>
            </div>

            <div className={"col-span-6"}>
              {/* machine-mechano */}
              <div
                className={
                  "bg-[#FFE7DB] px-[32px] pt-[32px] pb-[34px] max-h-[230px] h-full rounded-[16px] section overflow-hidden cursor-pontiner"
                }
              >
                <div className={"z-30"}>
                  <h1 className={"font-bold text-[24px] text-[#21201F]"}>
                    Mashina va mexanizmlar
                  </h1>
                  <p
                    className={
                      "font-medium text-[#21201FB2] mt-[16px] mb-[24px]"
                    }
                  >
                    Global strategiyani o'zgartirish <br /> sublimatsiyani
                    tejaydi
                  </p>

                  <Link href="https://catalog.tmsiti.uz/machine-mechano">
                    <div
                      className={
                        "  py-[13px] px-[24px]  items-center border border-[#D7D9DC] inline-flex rounded-[8px] -z-30"
                      }
                    >
                      <p className={"text-[#21201FCC]"}>Qarang</p>
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

                <div className={"absolute bg-section bottom-0 right-0"}>
                  <Image
                    src={"/images/machine-mechano.png"}
                    alt={"machine-mechano"}
                    width={274}
                    height={297}
                    className={"ml-[16px]"}
                  />
                </div>
              </div>

              <div className={"flex gap-x-[20px] mt-[20px]"}>
                {/* uskunalar va qurilmalar */}
                <div
                  className={
                    "border border-[#D9DADB] w-1/2 p-[24px] rounded-[16px] cursor-pointer"
                  }
                >
                  <h1 className={"font-bold text-[24px] text-[#21201F]"}>
                    Uskuna va <br /> qurilmalar
                  </h1>
                  <p
                    className={
                      "font-medium text-[#21201FB2] mt-[16px] mb-[24px]"
                    }
                  >
                    Global strategiyani o'zgartirish tejaydi
                  </p>

                  <Link href="https://catalog.tmsiti.uz/">
                    <div
                      className={
                        "  py-[13px] w-full justify-center  items-center border border-[#D7D9DC] inline-flex rounded-[8px]"
                      }
                    >
                      <p className={"text-[#21201FCC]"}>Qarang</p>
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
                {/* Qurilish ishlari */}
                <div
                  className={
                    "border border-[#D9DADB] w-1/2 p-[24px] rounded-[16px] flex flex-col"
                  }
                >
                  <h1 className={"font-bold text-[24px] text-[#21201F] flex-1"}>
                    Qurilish ishlari
                  </h1>
                  <p
                    className={
                      "font-medium text-[#21201FB2] mt-[16px] mb-[24px]"
                    }
                  >
                    Global strategiyani o'zgartirish tejaydi
                  </p>

                  <Link href="https://catalog.tmsiti.uz/works">
                    <div
                      className={
                        "  py-[13px] w-full justify-center  items-center border border-[#D7D9DC] inline-flex rounded-[8px]"
                      }
                    >
                      <p className={"text-[#21201FCC]"}>Qarang</p>
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
          </div>
        </section>

        <section className={"container pb-[60px]"}>
          <Title>Klassifikator haqida</Title>

          <div
            className={
              "grid grid-cols-12 gap-[39px] p-[24px] bg-[#F4F6FA] rounded-[30px] mt-[12px]"
            }
          >
            <div className={"col-span-5 pl-[12px] flex flex-col "}>
              <h1 className={"text-[#21201F] text-[32px] font-bold"}>
                Byudjetni qayta <br /> taqsimlash
              </h1>
              <p className={"text-[17px] text-[#21201FB2] font-medium flex-1"}>
                Global strategiyani o'zgartirish mahsulotning sublimatsiya
                qilingan hayot aylanishini tejaydi. Amaliyot aniq ko'rsatib
                turibdi
              </p>
            </div>
            <div className={"col-span-7 "}>
              <div className="rounded-[12px]">
                <CustomVideoPlayer />
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
