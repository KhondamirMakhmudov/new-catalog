import Header from "@/components/header";
import Link from "next/link";
import RightIcon from "@/components/icons/right";
import { useState } from "react";
import useGetQuery from "@/hooks/api/useGetQuery";
import { KEYS } from "@/constants/key";
import { URLS } from "@/constants/url";
import { get } from "lodash";
import { useRouter } from "next/router";
import axios from "axios";
import { config } from "@/config";
import { motion } from "framer-motion";
import Pagination from "@/components/pagination";
import Image from "next/image";
import NavigationButtom from "@/components/bottom-navigation";

const Index = () => {
  const router = useRouter();
  const [showAllProjects, setShowAllProjects] = useState(true);
  const [tableData, setTableData] = useState(null);
  const [limit] = useState(24);
  const [offset, setOffset] = useState(0);
  const [selectedButton, setSelectedButton] = useState(null);

  const {
    data: worksCategory,
    isLoading,
    isFetching,
  } = useGetQuery({ key: KEYS.worksCategory, url: URLS.worksCategory });

  const handleButtonClick = async (button) => {
    setSelectedButton(button);
    const response = await axios.get(
      `${config.API_URL}${URLS.cmetaCategories}/${button.id}/?&limit=${limit}&offset=${offset}`
    );
    setTableData(response.data);
    console.log(response.data);
  };

  const totalItems = get(tableData, "count");
  const pageCount = Math.ceil(totalItems / limit);

  const handlePageClick = (event) => {
    const newOffset = event?.selected * limit;
    setOffset(newOffset);
  };

  return (
    <div>
      <Header />
      <NavigationButtom />
      <main className="container mb-[46px]">
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
            Qurilish ishlari
          </Link>
        </section>

        <section>
          <h1 className="font-bold text-[32px] my-[16px] font-anybody">
            Qurilish ishlari
          </h1>

          <div className="grid grid-cols-12 gap-[30px]">
            <div className="col-span-12 lg:col-span-3 font-gilroy bg-white p-[16px] border border-[#E0E2F0] rounded-[12px] self-start">
              <div className="flex justify-between items-center">
                <h4 className="font-extrabold">Mahsulot qidirish</h4>
                <button onClick={() => setShowAllProjects(!showAllProjects)}>
                  <RightIcon
                    classname={`${
                      !showAllProjects ? "rotate-90" : "-rotate-90"
                    } transition-all duration-200`}
                    color="#BCBFC2"
                  />
                </button>
              </div>

              <input
                type="text"
                className="py-[10px] px-[15px] border w-full my-[20px] rounded-[8px]"
                placeholder="Qidirish"
              />

              {showAllProjects && (
                <ul className="space-y-[6px]">
                  {get(worksCategory, "data.results", []).map((item) => (
                    <li key={get(item, "id")}>
                      <button
                        onClick={() => handleButtonClick(item)}
                        className={`uppercase border w-full py-[10px] rounded-[8px] flex items-center justify-between px-[11px] ${
                          selectedButton?.id === item.id
                            ? "bg-[#EBF1F9]"
                            : "bg-white"
                        } text-xs`}
                      >
                        <p>{get(item, "name")}</p>

                        <div className="bg-[#9AA8BC] inline-block rounded-full">
                          {selectedButton?.id === item.id ? (
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
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div className="col-span-12 lg:col-span-9 flex-grow font-gilroy bg-white  border border-[#E0E2F0] rounded-[12px] ">
              {get(worksCategory, "data.results", []).map((item) => (
                <div className=" " key={get(item, "id")}>
                  {selectedButton?.id === item.id && tableData && (
                    <div className="overflow-x-auto">
                      <motion.table
                        className="w-full border-collapse border-[#D7D9E7] min-w-[600px]"
                        initial={{ opacity: 0, translateY: "30px" }}
                        animate={{ opacity: 1, translateY: "0" }}
                        transition={{ duration: 0.4 }}
                      >
                        <thead className="text-black text-start rounded-[10px]">
                          <tr className="rounded-[10px]">
                            <th
                              className={
                                "px-4 py-2 text-[10px] rounded-tl-[10px] bg-white  text-gray-900  font-bold "
                              }
                            >
                              №
                            </th>
                            <th className=" text-[10px]  text-start  bg-white text-gray-900  font-bold ">
                              Mahsulot kodi
                            </th>
                            <th className=" text-start text-[10px]   bg-white text-gray-900  font-bold ">
                              Mahsulot nomi
                            </th>
                            <th className=" text-start text-[10px]   bg-white text-gray-900  font-bold ">
                              O&apos;lchov Birligi
                            </th>
                          </tr>
                        </thead>

                        <tbody>
                          {get(tableData, "results")?.map((item, index) => (
                            <tr
                              key={get(item, "id")}
                              className="text-sm odd:bg-[#EDF4FC] even:bg-white"
                            >
                              <td className=" font-medium text-xs py-[10px]  text-center">
                                {index + 1}
                              </td>
                              <td className=" font-medium text-xs py-[10px]">
                                {get(item, "name")}
                              </td>
                              <td className=" font-medium text-xs py-[10px]">
                                {get(item, "code")}
                              </td>
                              <td className=" font-medium text-xs py-[10px] text-center">
                                {get(item, "measure")}
                              </td>
                              <td className=" font-medium text-xs py-[10px]">
                                {get(item, "price")}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </motion.table>
                      <div className="w-full h-[1px] text-[#E2E2EA] "></div>
                      <div className="py-[20px] px-[24px] bg-white rounded-br-[12px] rounded-bl-[12px] flex flex-col lg:flex-row items-center justify-between">
                        <div>
                          <p className="text-sm text-[#9392A0]">
                            {" "}
                            {get(tableData, "count")} tadan 1-{limit} tasi
                            ko&apos;rsatilgan
                          </p>
                        </div>

                        <div>
                          <Pagination
                            pageCount={pageCount}
                            onPageChange={handlePageClick}
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Index;
