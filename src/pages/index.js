import Header from "@/components/header";
import Title from "@/components/title";
import CustomVideoPlayer from "@/components/video-player";
import Image from "next/image";
import Link from "next/link";
import { get } from "lodash";
import { useState } from "react";
import Footer from "@/components/footer";

const integrationData = [
  {
    id: 1,
    title: "Soliq qo'mitasi",
  },
  {
    id: 2,
    title: "Tovar-xom ashyo birjasi",
  },
  {
    id: 3,
    title: "Statistika agentligi",
  },
  {
    id: 4,
    title: "Bojxona qo'mitasi",
  },
  {
    id: 5,
    title: "Tartibga solish agentligi",
  },
  {
    id: 6,
    title: "Statistika agentligi",
  },
];

export default function Home() {
  const [openFAQ, setOpenFAQ] = useState(false);
  const toggleFAQ = () => {
    setOpenFAQ(!openFAQ);
  };

  return (
    <>
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
                Global strategiyani o&apos;zgartirish mahsulotning <br />{" "}
                sublimatsiya qilingan hayot aylanishini tejaydi. <br /> Amaliyot
                aniq ko&apos;rsatib turibdi
              </p>

              <Link href={"#"}>
                <p
                  className={
                    "bg-white text-[#21201F] py-[14px] px-[28px] font-semibold font-gilroy rounded-[12px] inline-block"
                  }
                >
                  Ko&apos;proq bilib oling
                </p>
              </Link>
            </div>
          </div>
          <div
            className={`absolute top-0 bottom-0 left-0 right-0 bg-image-gradient -z-10 `}
          ></div>
        </section>
        {/* Bo'limlar */}
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
                  Global strategiyani o&apos;zgartirish mahsulotning
                  sublimatsiya qilingan hayot aylanishini tejaydi. Amaliyot aniq
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
                    Global strategiyani o&apos;zgartirish <br /> sublimatsiyani
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
                    Global strategiyani o&apos;zgartirish tejaydi
                  </p>

                  <Link href="https://catalog.tmsiti.uz/technos">
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
                    Global strategiyani o&apos;zgartirish tejaydi
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
        {/* Klassifikator haqida */}
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
                Global strategiyani o&apos;zgartirish mahsulotning sublimatsiya
                qilingan hayot aylanishini tejaydi. Amaliyot aniq ko&apos;rsatib
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
        {/* /////// Ekologiya va atrof-muhitni muhofaza qilish boshqar //////// */}
        <section className="relative py-[60px]">
          <div className="absolute z-10 left-0 bottom-0">
            <Image
              src={"/images/bg-eco-2.png"}
              alt={"eco-logo"}
              width={270}
              height={430}
              className={""}
            />
          </div>

          <div className="absolute -z-10 right-0 bottom-0">
            <Image
              src={"/images/bg-eco-1.png"}
              alt={"eco-logo"}
              width={270}
              height={430}
              className={""}
            />
          </div>
          <div className="container">
            <div className="grid grid-cols-12 gap-x-[30px]  bg-[#F3F5F6CC] backdrop-blur-sm p-[30px] rounded-[20px]">
              <div className="col-span-6 w-[600px]">
                <Image
                  src={"/images/eco-logo.png"}
                  alt={"eco-logo"}
                  width={600}
                  height={436}
                  className={"w-full h-[436px] rounded-[20px]"}
                />
              </div>
              <div className="col-span-6 flex items-start justify-center flex-col">
                <h1 className={"font-bold text-[42px] text-[#21201F]"}>
                  Ekologiya va atrof-muhitni muhofaza qilish boshqar
                </h1>
                <p
                  className={
                    "font-medium text-[#21201FB2] text-[21px] mt-[16px] mb-[24px]"
                  }
                >
                  O‘zbekiston Respublikasi Vazirlar Mahkamasining 27.05.2019
                  yildagi «O‘zbekiston Respublikasida mahsulotlarni ixtiyoriy
                  ekologik markirovkalash tizimini joriy etish to‘g‘risida»gi
                  435-son qarori
                </p>

                <Link href="https://catalog.tmsiti.uz/">
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
        </section>
        {/* ////////// Namunaviy loyihalar /////////// */}
        <section
          style={{ backgroundImage: `url(/images/bg-namunaviy-loyihalar.png)` }}
          className="min-h-[879px] bg-no-repeat bg-cover relative z-10 "
        >
          <div
            className={`absolute top-0 bottom-0 left-0 right-0 bg-[#1764C0] bg-opacity-70 -z-10`}
          ></div>

          <div className="container">
            <div>
              <div className="z-40 text-white pt-[42px]">
                <h1 className="text-[#FFFFFF] text-[32px] font-bold ">
                  Namunaviy loyihalar
                </h1>
                <p>
                  Lorem Ipsum-bu Lorem Ipsum tomonidan ishlatiladigan shunchaki
                  qo&apos;g&apos;irchoq matn-bu shunchaki ishlatilgan
                  qo&apos;g&apos;irchoq matn
                </p>
              </div>
            </div>

            <div className={"grid grid-cols-12 gap-x-[20px] mt-[30px]"}>
              <div
                className={
                  "col-span-6 min-h-[580px] rounded-[30px] relative z-10 bg-center"
                }
                style={{ backgroundImage: `url(/images/kindergarden.png)` }}
              >
                <div
                  className={`absolute top-0 bottom-0 left-0 right-0 bg-black bg-opacity-20 rounded-[30px] -z-10`}
                ></div>
                <div className="absolute bottom-0 p-[32px] text-white ">
                  <h1 className={"text-[28px] font-bold "}>
                    Bolalar bog&apos;chasi
                  </h1>
                  <p className="text-sm font-normal mt-[10px] line-clamp-2">
                    Biz to&apos;y rejalashtiruvchisi bilan erta suhbatlashdik
                    biz to&apos;y rejalashtiruvchisi Rano Artykova bilan kelin
                    va kuyovlar o&apos;rtasidagi ziddiyatlar, keraksiz
                    urf-odatlar va keyingi sevgi haqida suhbatlashdik
                  </p>
                </div>
              </div>

              <div className={"col-span-6 space-y-[20px]"}>
                <div
                  className={
                    "bg-white flex flex-col p-[32px] min-h-[280px] rounded-[30px] relative"
                  }
                >
                  <div className="absolute bottom-0 right-0 p-[24px]">
                    <Image
                      src={"/images/school.png"}
                      alt={"school"}
                      width={150}
                      height={120}
                      className={"ml-[16px]"}
                    />
                  </div>
                  <h1 className="text-[28px] font-bold text-[#21201F]">
                    Maktab
                  </h1>
                  <p
                    className={
                      "text-sm font-normal text-[#9392A0] line-clamp-3 flex-1 mt-[10px]"
                    }
                  >
                    Biz to&apos;y rejalashtiruvchisi bilan erta suhbatlashdik
                    biz to&apos;y rejalashtiruvchisi Rano Artykova bilan kelin
                    va kuyovlar o&apos;rtasidagi ziddiyatlar, keraksiz
                    urf-odatlar va keyingi sevgi haqida suhbatlashdik
                  </p>
                  <Link href="https://catalog.tmsiti.uz/works">
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
                <div
                  className={
                    "bg-white flex flex-col p-[32px] min-h-[280px] rounded-[30px] relative"
                  }
                >
                  <div className="absolute bottom-0 right-0 p-[24px]">
                    <Image
                      src={"/images/medicine.png"}
                      alt={"medicine"}
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
                      "text-sm font-normal text-[#9392A0] line-clamp-3 flex-1 mt-[10px]"
                    }
                  >
                    Biz to&apos;y rejalashtiruvchisi bilan erta suhbatlashdik
                    biz to&apos;y rejalashtiruvchisi Rano Artykova bilan kelin
                    va kuyovlar o&apos;rtasidagi ziddiyatlar, keraksiz
                    urf-odatlar va keyingi sevgi haqida suhbatlashdik
                  </p>
                  <Link href="https://catalog.tmsiti.uz/works">
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
              </div>

              <div className="col-span-12 mt-[30px] backdrop-blur-lg">
                <div className="backdrop-blur bg-transparent">
                  <Link
                    href={"/"}
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
        </section>

        {/* Mintaqalar bo'yicha monitoring */}
        <section></section>

        {/* Integratsiya bo'yicha sheriklar */}
        <section className="bg-white">
          <div className="container py-[42px]">
            <h1 className="text-[32px] font-bold">
              Integratsiya bo&apos;yicha sheriklar
            </h1>

            <div className="grid grid-cols-12 gap-[24px] font-gilroy mt-[20px]">
              {integrationData.map((item) => (
                <div
                  className="col-span-4 flex gap-x-[24px] items-center border p-[24px] bg-[#F7F7F7] rounded-[20px]"
                  key={get(item, "id")}
                >
                  <div
                    className="bg-center bg-white border border-[#E6E5ED]  w-[110px] h-[110px] rounded-[16px]"
                    style={{
                      backgroundImage: `url(/images/integration-${get(
                        item,
                        "id"
                      )}.png)`,
                    }}
                  ></div>
                  <div>
                    <h2 className="text-[20px] font-bold">
                      {get(item, "title")}
                    </h2>

                    <Link
                      href={"#"}
                      className="inline-flex gap-x-[10px] bg-[#EBF1F9] rounded-[8px] py-[17px] px-[16px] mt-[10px]"
                    >
                      <p className="text-lg font-semibold text-[#0256BA]">
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
          </div>
        </section>

        {/* Tez-tez so'raladigan savollar */}
        <section className="bg-white">
          <div className="container py-[42px]">
            <h1 className="text-[32px] font-bold">
              Tez-tez so&apos;raladigan savollar
            </h1>

            <ul
              className={"grid grid-cols-12 gap-[12px] font-gilroy mt-[20px]"}
            >
              <li className="col-span-12 py-[28px] px-[32px] bg-[#F7F7F7] rounded-[20px]">
                <div className="flex justify-between">
                  <div className="flex-1">
                    <h4 className="text-[20px] text-[#020E03] font-bold">
                      Et harum quidem rerum facilis est et expedita distinctio.
                      Nam libero tempore
                    </h4>
                    {openFAQ && (
                      <p className="text-[17px] text-[#9392A0] mt-[10px]">
                        Sed ut perspiciatis, unde omnis iste natus error sit
                        voluptatem accusantium doloremque laudantium, totam rem
                        aperiam eaque ipsa, quae ab illo inventore veritatis et
                        quasi architecto beatae vitae dicta sunt, explicabo.
                        Nemo enim
                      </p>
                    )}
                  </div>
                  <button onClick={toggleFAQ}>
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
          </div>
        </section>

        {/* Address */}
        <section className="container">
          <div
            className=" min-h-[164px] w-full bg-center bg-no-repeat
            bg-cover rounded-[20px] flex items-center justify-center"
            style={{ backgroundImage: `url(/images/address.png)` }}
          >
            <Link
              href={"https://maps.app.goo.gl/nxPwsjmq6vi6hCPa7"}
              className="py-[14px] px-[28px] text-sm font-medium font-gilroy text-white bg-[#0256BA] rounded-[12px]"
            >
              Google Maps ni ochish
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
