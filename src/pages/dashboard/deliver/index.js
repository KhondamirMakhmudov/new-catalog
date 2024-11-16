import Header from "@/components/header";

import RightIcon from "@/components/icons/right";
import Link from "next/link";
import { useState } from "react";
import DeliverIcon from "@/components/icons/deliver";
import ArrowRightButton from "@/components/buttons/deparment";
import Image from "next/image";
import { motion } from "framer-motion";

const Index = () => {
  const [selectBar, setSelectBar] = useState("main");
  const [selectDepartment, setSelectDepartment] = useState("all");

  const handleSelectBar = (nav) => {
    setSelectBar(nav);
  };

  const handleSelectDepartment = (nav) => {
    setSelectDepartment(nav);
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
                  onClick={() => handleSelectBar("main")}
                  className="cursor-pointer"
                >
                  <div
                    className={`${
                      selectBar === "main"
                        ? "bg-white border-l-[2px] border-[#0256BA]"
                        : "bg-transparent"
                    } w-full flex items-center gap-x-[14px] py-[14px] px-[12px] transition-all duration-100`}
                  >
                    <div
                      className={`p-[14px] ${
                        selectBar === "main" ? " bg-[#0256BA]" : "bg-white"
                      } inline-block rounded-full`}
                    >
                      <DeliverIcon
                        color={selectBar === "main" ? "white" : "#0256BA"}
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

            <div className="col-span-9 p-[20px] border border-t border-l-0 border-b-0 border-r-0 font-gilroy">
              {selectBar === "main" && (
                <motion.div className="grid grid-cols-12 gap-x-[24px]">
                  <div className="col-span-3 bg-white p-[24px] rounded-[16px] ">
                    <Link
                      href={"/dashboard/deliver/material/add-ads"}
                      className="flex items-center justify-center flex-col"
                    >
                      <button className="p-[18px] rounded-full bg-[#EBF1F9] mb-[24px]">
                        <Image
                          src={"/icons/add-circle.svg"}
                          alt={"arrow-right"}
                          width={28}
                          height={28}
                          className={""}
                        />
                      </button>

                      <p className="font-semibold">Material va jixozlar</p>
                    </Link>
                  </div>
                  <div className="col-span-3 bg-white p-[24px] rounded-[16px] ">
                    <Link
                      href={"/dashboard/deliver/material/add-ads"}
                      className="flex items-center justify-center flex-col"
                    >
                      <button className="p-[18px] rounded-full bg-[#EBF1F9] mb-[24px]">
                        <Image
                          src={"/icons/add-circle.svg"}
                          alt={"arrow-right"}
                          width={28}
                          height={28}
                          className={""}
                        />
                      </button>

                      <p className="font-semibold text-center">
                        Mashina va mexanizmlar
                      </p>
                    </Link>
                  </div>

                  <div className="col-span-3 bg-white p-[24px] rounded-[16px] ">
                    <Link
                      href={"/dashboard/deliver/material/add-ads"}
                      className="flex items-center justify-center flex-col"
                    >
                      <button className="p-[18px] rounded-full bg-[#EBF1F9] mb-[24px]">
                        <Image
                          src={"/icons/add-circle.svg"}
                          alt={"arrow-right"}
                          width={28}
                          height={28}
                          className={""}
                        />
                      </button>

                      <p className="font-semibold text-center">
                        Uskuna va qurilmalar
                      </p>
                    </Link>
                  </div>

                  <div className="col-span-3 bg-white p-[24px] rounded-[16px] ">
                    <Link
                      href={"/dashboard/deliver/material/add-ads"}
                      className="flex items-center justify-center flex-col"
                    >
                      <button className="p-[18px] rounded-full bg-[#EBF1F9] mb-[24px]">
                        <Image
                          src={"/icons/add-circle.svg"}
                          alt={"arrow-right"}
                          width={28}
                          height={28}
                          className={""}
                        />
                      </button>

                      <p className="font-semibold text-center">
                        Qurilish ishlari
                      </p>
                    </Link>
                  </div>

                  <div className="col-span-12 mt-[23px]">
                    <ul className="flex items-center gap-x-[12px]">
                      <li>
                        <Link
                          href={"#"}
                          onClick={() => {
                            handleSelectDepartment("all");
                          }}
                          className={`py-[10px] px-[20px] ${
                            selectDepartment === "all"
                              ? "bg-[#0256BA] text-white border-none"
                              : "bg-white text-[#718096] border border-[#E6E6E6]"
                          }  rounded-[8px] text-sm `}
                        >
                          Barcha e&apos;lonlar
                        </Link>
                      </li>

                      <li
                        onClick={() => {
                          handleSelectDepartment("materials");
                        }}
                      >
                        <Link
                          href={"#"}
                          className={`py-[10px] px-[20px] ${
                            selectDepartment === "materials"
                              ? "bg-[#0256BA] text-white border-none"
                              : "bg-white text-[#718096] border border-[#E6E6E6]"
                          }  rounded-[8px] text-sm `}
                        >
                          Material va jixozlar
                        </Link>
                      </li>

                      <li
                        onClick={() => {
                          handleSelectDepartment("mmechano");
                        }}
                      >
                        <Link
                          href={"#"}
                          className={`py-[10px] px-[20px] ${
                            selectDepartment === "mmechano"
                              ? "bg-[#0256BA] text-white border-none"
                              : "bg-white text-[#718096] border border-[#E6E6E6]"
                          }  rounded-[8px] text-sm `}
                        >
                          Mashina va mexanizmlar
                        </Link>
                      </li>

                      <li
                        onClick={() => {
                          handleSelectDepartment("technos");
                        }}
                      >
                        <Link
                          href={"#"}
                          className={`py-[10px] px-[20px] ${
                            selectDepartment === "technos"
                              ? "bg-[#0256BA] text-white border-none"
                              : "bg-white text-[#718096] border border-[#E6E6E6]"
                          }  rounded-[8px] text-sm `}
                        >
                          Uskuna va qurilmalar
                        </Link>
                      </li>

                      <li
                        onClick={() => {
                          handleSelectDepartment("works");
                        }}
                      >
                        <Link
                          href={"#"}
                          className={`py-[10px] px-[20px] ${
                            selectDepartment === "works"
                              ? "bg-[#0256BA] text-white border-none"
                              : "bg-white text-[#718096] border border-[#E6E6E6]"
                          }  rounded-[8px] text-sm `}
                        >
                          Qurilish ishlari
                        </Link>
                      </li>
                    </ul>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Index;
