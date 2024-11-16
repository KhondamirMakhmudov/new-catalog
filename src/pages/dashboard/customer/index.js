import Header from "@/components/header";
import RightIcon from "@/components/icons/right";
import Link from "next/link";
import { useState } from "react";
import DeliverIcon from "@/components/icons/deliver";
import ArrowRightButton from "@/components/buttons/deparment";
import Image from "next/image";

const Index = () => {
  const [selectBar, setSelectBar] = useState("");

  const handleSelectBar = (nav) => {
    setSelectBar(nav);
  };
  return (
    <div className="bg-[#F7F7F7]">
      <Header />

      <main className="container">
        <section className="my-[16px] flex items-center space-x-[12px] font-gilroy">
          <Link href={"/"} className="text-[#262D33] text-sm font-semibold">
            Bosh sahifa
          </Link>
          <RightIcon color="#BCBFC2" />
          <Link
            className="text-[#262D33] text-sm font-semibold"
            href={"/select-position"}
          >
            Kirish
          </Link>
          <RightIcon color="#BCBFC2" />
          <Link
            className="text-[#262D33] text-sm font-semibold"
            href={"/auth/e-imzo"}
          >
            E-imzo
          </Link>
          <RightIcon color="#BCBFC2" />
          <Link className="text-[#0256BA] text-sm font-semibold" href={"#"}>
            Yetkazib beruvchi
          </Link>
        </section>

        <section>
          <div className="grid grid-cols-12 ">
            <div className="col-span-3 border border-r border-t border-l-0 border-b-0 h-screen py-[20px] font-gilroy">
              <ul>
                <li
                  onClick={() => handleSelectBar("menu")}
                  className="cursor-pointer"
                >
                  <div
                    className={`${
                      selectBar === "menu"
                        ? "bg-white border-l-[2px] border-[#0256BA]"
                        : "bg-transparent"
                    } w-full flex items-center gap-x-[14px] py-[14px] px-[12px] transition-all duration-100`}
                  >
                    <div
                      className={`p-[14px] ${
                        selectBar === "menu" ? " bg-[#0256BA]" : "bg-white"
                      } inline-block rounded-full`}
                    >
                      <DeliverIcon
                        color={selectBar === "menu" ? "white" : "#0256BA"}
                      />
                    </div>

                    <div>
                      <h1 className="font-extrabold text-sm">Asosiy</h1>
                      <p className="text-xs text-[#718096]">
                        Manage notifications
                      </p>
                    </div>
                  </div>
                </li>

                <li
                  onClick={() => handleSelectBar("orders")}
                  className="cursor-pointer"
                >
                  <div
                    className={`${
                      selectBar === "orders"
                        ? "bg-white border-l-[2px] border-[#0256BA]"
                        : "bg-transparent"
                    } w-full flex items-center gap-x-[14px] py-[14px] px-[12px] transition-all duration-100`}
                  >
                    <div
                      className={`p-[14px] ${
                        selectBar === "orders" ? " bg-[#0256BA]" : "bg-white"
                      } inline-block rounded-full`}
                    >
                      <DeliverIcon
                        color={selectBar === "orders" ? "white" : "#0256BA"}
                      />
                    </div>

                    <div>
                      <h1 className="font-extrabold text-sm">Buyurtmalar</h1>
                      <p className="text-xs text-[#718096]">
                        Manage notifications
                      </p>
                    </div>
                  </div>
                </li>

                <li
                  onClick={() => handleSelectBar("profile")}
                  className="cursor-pointer"
                >
                  <div
                    className={`${
                      selectBar === "profile"
                        ? "bg-white border-l-[2px] border-[#0256BA]"
                        : "bg-transparent"
                    } w-full flex items-center gap-x-[14px] py-[14px] px-[12px] transition-all duration-100`}
                  >
                    <div
                      className={`p-[14px] ${
                        selectBar === "profile" ? " bg-[#0256BA]" : "bg-white"
                      } inline-block rounded-full`}
                    >
                      <DeliverIcon
                        color={selectBar === "profile" ? "white" : "#0256BA"}
                      />
                    </div>

                    <div>
                      <h1 className="font-extrabold text-sm">Profile</h1>
                      <p className="text-xs text-[#718096]">
                        Manage notifications
                      </p>
                    </div>
                  </div>
                </li>
              </ul>
            </div>

            <div className="col-span-9 p-[20px] border border-t border-l-0 border-b-0 border-r-0">
              <div className="grid grid-cols-12 gap-x-[16px]">
                <div
                  className={
                    "col-span-6 p-[32px] bg-[#EAF1FF] rounded-[16px] min-h-[480px] h-full  overflow-hidden section z-10"
                  }
                >
                  {/* Material va jihozlar */}
                  <div className={"z-30"}>
                    <h1 className={"font-bold text-[24px] text-[#21201F]"}>
                      Material va jihozlar
                    </h1>
                    <p
                      className={
                        "font-medium text-[#21201FB2] mt-[16px] mb-[24px]"
                      }
                    >
                      Global strategiyani o&apos;zgartirish mahsulotning
                      sublimatsiya qilingan hayot aylanishini tejaydi. Amaliyot
                      aniq
                    </p>

                    <Link href="/materials">
                      <div
                        className={
                          " z-20 py-[13px] px-[24px]  items-center border border-[#D7D9DC] inline-flex rounded-[8px]"
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
                  <div className={"absolute bg-section bottom-0 left-0 -z-30"}>
                    <Image
                      src={"/images/materials.png"}
                      alt={"materials"}
                      width={910}
                      height={485}
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
                        Global strategiyani o&apos;zgartirish <br />{" "}
                        sublimatsiyani tejaydi
                      </p>

                      <Link href="/machine-mechano">
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
                        height={217}
                        className={"ml-[16px]"}
                      />
                    </div>
                  </div>

                  <div className={"flex gap-x-[20px] mt-[20px]"}>
                    {/* uskunalar va qurilmalar */}
                    <div
                      className={
                        "border works flex-col border-[#D9DADB] w-1/2 p-[24px] rounded-[16px] cursor-pointer transition-all duration-300"
                      }
                    >
                      <h1
                        className={
                          "font-bold text-[20px] flex-1 text-[#21201F]"
                        }
                      >
                        Uskuna va <br /> qurilmalar
                      </h1>
                      <p
                        className={
                          "font-medium text-[#21201FB2] mt-[16px] mb-[24px]"
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
                        "border works border-[#D9DADB] w-1/2 p-[24px] rounded-[16px] flex flex-col transition-all duration-300"
                      }
                    >
                      <h1
                        className={
                          "font-bold text-[20px] text-[#21201F] flex-1"
                        }
                      >
                        Qurilish ishlari
                      </h1>
                      <p
                        className={
                          "font-medium text-[#21201FB2] mt-[16px] mb-[24px]"
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
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Index;
