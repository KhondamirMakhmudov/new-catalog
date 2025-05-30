import Header from "@/components/header";
import Link from "next/link";
import RightIcon from "@/components/icons/right";
import { motion } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import { get } from "lodash";
import useGetQuery from "@/hooks/api/useGetQuery";
import { URLS } from "@/constants/url";
import { KEYS } from "@/constants/key";
import { NumericFormat } from "react-number-format";
import Footer from "@/components/footer";
import Pagination from "@/components/pagination";
import TSAComponent from "@/components/integrations/tsa";
import MinistryComponent from "@/components/integrations/iqtisod";
import BirjaComponent from "@/components/integrations/birja";
import BojxonaComponent from "@/components/integrations/bojxona";
import SoliqComponent from "@/components/integrations/soliq";
import { useRouter } from "next/router";
import NavigationButtom from "@/components/bottom-navigation";

const Index = () => {
  const router = useRouter();
  const [tab, setTab] = useState("birja");
  const [showAllProjects, setShowAllProjects] = useState(!false);
  const selectProject = (tab) => {
    setTab(tab);
  };

  return (
    <div className="bg-[#F7F7F7]">
      <Header />
      <NavigationButtom />
      <main className="container mb-[30px]">
        <section className="mt-[16px] flex items-center space-x-[12px] font-gilroy">
          <button
            onClick={() => router.back()}
            className="text-[#262D33] text-sm font-semibold"
          >
            <div className="bg-[#9AA8BC] rounded-full p-[5px] rotate-180">
              <RightIcon color="white" />
            </div>
          </button>
          <Link href={"/"} className="text-[#262D33] text-sm font-semibold">
            Bosh sahifa
          </Link>
          <RightIcon color="#BCBFC2" />
          <Link className="text-[#0256BA] text-sm font-semibold" href={"#"}>
            Integratsiyalar
          </Link>
        </section>

        <section>
          <h1 className="font-bold text-[32px] my-[16px]">Integratsiyalar</h1>
          <motion.ul
            className="  grid grid-cols-12 font-gilroy gap-[10px] mb-[16px]"
            initial={{ opacity: 0, translateY: "30px" }}
            animate={{ opacity: 1, translateY: "0" }}
            transition={{ duration: 0.3 }}
          >
            <li
              onClick={() => selectProject("birja")}
              className="col-span-12 lg:col-span-2"
            >
              <div
                className={`${
                  tab === "birja" ? "bg-[#E7EDF5]" : "bg-white"
                } p-[10px] flex items-center gap-x-[8px] rounded-[12px] cursor-pointer`}
              >
                <div className="bg-cover border-[#E6E5ED] rounded-[10px]  bg-white border">
                  <div
                    className={`relative  w-[44px] h-[44px] bg-no-repeat bg-center  `}
                    style={{ backgroundImage: "url(/icons/birja.svg)" }}
                  ></div>
                </div>

                <p
                  className={`flex-1 text-sm ${
                    tab === "birja" ? "text-[#0256BA]" : "text-black"
                  } font-bold`}
                >
                  Tovar xom-ashyo birjasi
                </p>

                <div className="bg-[#9AA8BC] inline-block rounded-full">
                  {tab === "birja" ? (
                    <Image
                      src={"/icons/checked.svg"}
                      alt="checked"
                      width={20}
                      height={20}
                    />
                  ) : (
                    <RightIcon color="white" />
                  )}
                </div>
              </div>
            </li>

            <li
              onClick={() => selectProject("iqtisod")}
              className="col-span-12 lg:col-span-2"
            >
              <div
                className={`${
                  tab === "iqtisod" ? "bg-[#E7EDF5]" : "bg-white"
                } p-[10px] flex items-center gap-x-[8px] rounded-[12px] cursor-pointer`}
              >
                <div
                  className={`relative px-[1px] py-[6px] bg-white border w-[44px] h-[44px] bg- bg-contain border-[#E6E5ED] rounded-[10px] inline-block`}
                  style={{ backgroundImage: "url(/icons/ministry.svg)" }}
                ></div>

                <p
                  className={`flex-1 text-sm ${
                    tab === "iqtisod" ? "text-[#0256BA]" : "text-black"
                  } font-bold`}
                >
                  Iqtisod va moliya vazirligi
                </p>

                <div className="bg-[#9AA8BC] inline-block rounded-full">
                  {tab === "iqtisod" ? (
                    <Image
                      src={"/icons/checked.svg"}
                      alt="checked"
                      width={20}
                      height={20}
                    />
                  ) : (
                    <RightIcon color="white" />
                  )}
                </div>
              </div>
            </li>

            <li
              onClick={() => selectProject("bojxona")}
              className="col-span-12 lg:col-span-2"
            >
              <div
                className={`${
                  tab === "bojxona" ? "bg-[#E7EDF5]" : "bg-white"
                } p-[10px] flex items-center gap-x-[8px] rounded-[12px] cursor-pointer`}
              >
                <div
                  className={`relative px-[1px] py-[6px] bg-white border w-[44px] h-[44px] bg- bg-contain border-[#E6E5ED] rounded-[10px] inline-block`}
                  style={{ backgroundImage: "url(/icons/bojxona.svg)" }}
                ></div>

                <p
                  className={`flex-1 text-sm ${
                    tab === "bojxona" ? "text-[#0256BA]" : "text-black"
                  } font-bold`}
                >
                  Bojxona qo&apos;mitasi
                </p>

                <div className="bg-[#9AA8BC] inline-block rounded-full">
                  {tab === "bojxona" ? (
                    <Image
                      src={"/icons/checked.svg"}
                      alt="checked"
                      width={20}
                      height={20}
                    />
                  ) : (
                    <RightIcon color="white" />
                  )}
                </div>
              </div>
            </li>

            <li
              onClick={() => selectProject("tsa")}
              className="col-span-12 lg:col-span-2"
            >
              <div
                className={`${
                  tab === "tsa" ? "bg-[#E7EDF5]" : "bg-white"
                } p-[10px] flex items-center gap-x-[8px] rounded-[12px] cursor-pointer`}
              >
                <div
                  className={`relative px-[1px] py-[6px] bg-white border w-[44px] h-[44px] bg- bg-contain border-[#E6E5ED] rounded-[10px] inline-block`}
                  style={{ backgroundImage: "url(/icons/ministry.svg)" }}
                ></div>

                <p
                  className={`flex-1 text-sm ${
                    tab === "tsa" ? "text-[#0256BA]" : "text-black"
                  } font-bold`}
                >
                  Tartibga solish agentligi
                </p>

                <div className="bg-[#9AA8BC] inline-block rounded-full">
                  {tab === "tsa" ? (
                    <Image
                      src={"/icons/checked.svg"}
                      alt="checked"
                      width={20}
                      height={20}
                    />
                  ) : (
                    <RightIcon color="white" />
                  )}
                </div>
              </div>
            </li>
            <li
              onClick={() => selectProject("soliq")}
              className="col-span-12 lg:col-span-2"
            >
              <div
                className={`${
                  tab === "soliq" ? "bg-[#E7EDF5]" : "bg-white"
                } p-[10px] flex items-center gap-x-[8px] rounded-[12px] cursor-pointer`}
              >
                <div
                  className={`relative px-[1px] py-[6px] bg-white border w-[44px] h-[44px] bg-center bg-cover border-[#E6E5ED] rounded-[10px] inline-block`}
                  style={{ backgroundImage: "url(/icons/soliq.svg)" }}
                ></div>

                <p
                  className={`flex-1 text-sm ${
                    tab === "soliq" ? "text-[#0256BA]" : "text-black"
                  } font-bold`}
                >
                  Soliq qo&apos;mitasi
                </p>

                <div className="bg-[#9AA8BC] inline-block rounded-full">
                  {tab === "soliq" ? (
                    <Image
                      src={"/icons/checked.svg"}
                      alt="checked"
                      width={20}
                      height={20}
                    />
                  ) : (
                    <RightIcon color="white" />
                  )}
                </div>
              </div>
            </li>

            <li
              onClick={() => selectProject("statistika")}
              className="col-span-12 lg:col-span-2"
            >
              <div
                className={`${
                  tab === "statistika" ? "bg-[#E7EDF5]" : "bg-white"
                } p-[10px] flex items-center gap-x-[8px] rounded-[12px] cursor-pointer`}
              >
                <div
                  className={`relative px-[1px] py-[6px] bg-white border w-[44px] h-[44px] bg- bg-contain border-[#E6E5ED] rounded-[10px] inline-block`}
                  style={{ backgroundImage: "url(/icons/statistics.svg)" }}
                ></div>

                <p
                  className={`flex-1 text-sm ${
                    tab === "statistika" ? "text-[#0256BA]" : "text-black"
                  } font-bold`}
                >
                  Statistika agentligi
                </p>

                <div className="bg-[#9AA8BC] inline-block rounded-full">
                  {tab === "statistika" ? (
                    <Image
                      src={"/icons/checked.svg"}
                      alt="checked"
                      width={20}
                      height={20}
                    />
                  ) : (
                    <RightIcon color="white" />
                  )}
                </div>
              </div>
            </li>
          </motion.ul>

          <div className="grid grid-cols-12 gap-x-[30px] font-gilroy">
            <div className="col-span-12">
              {tab === "tsa" && <TSAComponent />}
              {tab === "iqtisod" && <MinistryComponent />}
              {tab == "birja" && <BirjaComponent />}
              {tab == "bojxona" && <BojxonaComponent />}
              {tab == "soliq" && <SoliqComponent />}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
