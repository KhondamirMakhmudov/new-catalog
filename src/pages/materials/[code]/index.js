import Header from "@/components/header";
import RightIcon from "@/components/icons/right";
import Link from "next/link";
import Image from "next/image";
import useGetQuery from "@/hooks/api/useGetQuery";
import { KEYS } from "@/constants/key";
import { URLS } from "@/constants/url";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import { get } from "lodash";
import { useState } from "react";
import BasketIcon from "@/components/icons/basket";
import Selected from "@/components/buttons/selected";
import dayjs from "dayjs";
import Basket from "@/components/buttons/basket";
const Index = () => {
  const [limit] = useState(9);
  const router = useRouter();
  const { code } = router.query;

  const {
    data: material,
    isLoading,
    isError,
  } = useGetQuery({
    key: [KEYS.materials, code],
    url: `${URLS.materials}${code}/`,
    enabled: !!code,
  });

  const { data: materialAds, isLoading: isLoadingMaterialAds } = useGetQuery({
    key: [KEYS.materialAds, code],
    url: `${URLS.materialAds}${code}/`,
    enabled: !!code,
  });

  return (
    <div className="bg-[#F7F7F7] min-h-screen">
      <Header />

      <main className="container">
        <section className="mt-[16px] flex items-center space-x-[12px] font-gilroy">
          <Link href={"/"} className=" text-sm font-semibold">
            Bosh sahifa
          </Link>
          <RightIcon color="#BCBFC2" />
          <Link className="text-[#262D33]text-sm font-semibold" href={"#"}>
            Materiallar va jihozlar
          </Link>
          <RightIcon color="#BCBFC2" />
          <Link className="text-[#0256BA] text-sm font-semibold" href={"#"}>
            Mahsulotlar
          </Link>
        </section>

        <section className="mt-[16px] ">
          <div>
            <div className="grid grid-cols-12 bg-white p-[20px] border border-[#E4E7F5] rounded-[12px] gap-y-[30px] font-gilroy">
              <div className="col-span-5 ">
                <div className="flex gap-x-[20px] mb-[12px]">
                  <div className="flex gap-x-[6px]">
                    <Image
                      src={"/icons/clock.svg"}
                      alt="clock"
                      width={16}
                      height={16}
                    />

                    <p className="text-xs font-medium ">21.10.24 9:00</p>
                  </div>

                  <div className="flex gap-x-[6px]">
                    <Image
                      src={"/icons/material-code.svg"}
                      alt="clock"
                      width={16}
                      height={16}
                    />

                    <p className="text-xs font-medium ">
                      #{get(material, "data.material_csr_code")}
                    </p>
                  </div>
                </div>

                <h2 className="text-lg font-semibold">
                  {get(material, "data.material_name")}
                </h2>
              </div>

              <div className="col-span-7 ">
                <div className="flex float-right space-x-[12px]">
                  <button
                    className={
                      "p-[12px] bg-[#EBF2FA] rounded-[8px] active:scale-110 scale-100 transition-all duration-200"
                    }
                  >
                    <Image
                      src={"/icons/heart.svg"}
                      alt={"heart"}
                      width={24}
                      height={24}
                    />
                  </button>
                  <button className="bg-[#0256BA] flex gap-x-[10px] items-center py-[12px] px-[20px] rounded-[12px]">
                    <BasketIcon color="white" />
                    <p className="font-semibold text-white">Sotib oling</p>
                  </button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-12">
              <div className="col-span-12 mt-[30px] mb-[16px]">
                <h1 className="text-[32px] font-bold !font-anybody">
                  Boshqa e’lonlar
                </h1>
              </div>
              <div className="col-span-12">
                <div className="grid grid-cols-12 gap-[16px] p-[16px] font-gilroy bg-white  border border-[#E0E2F0] rounded-[12px] ">
                  <div className="col-span-4">
                    <h3 className="font-semibold text-sm mb-[6px] ">
                      Sana tanlash
                    </h3>

                    <div className="relative flex border rounded-[8px] px-[12px]">
                      <Image
                        src={"/icons/calendar.svg"}
                        alt={"heart"}
                        width={24}
                        height={24}
                        className=""
                      />
                      <input
                        type="text"
                        placeholder="Tanlash"
                        className="  w-full p-[10px]  "
                      />
                    </div>
                  </div>

                  <div className="col-span-4">
                    <h3 className="font-semibold text-sm mb-[6px] ">Viloyat</h3>

                    <input
                      type="text"
                      placeholder="Tanlash"
                      className="py-[10px] px-[15px] border w-full  rounded-[8px]"
                    />
                  </div>

                  <div className="col-span-4">
                    <h3 className="font-semibold text-sm mb-[6px] ">Narxlar</h3>

                    <input
                      type="text"
                      placeholder="Tanlash"
                      className="py-[10px] px-[15px] border w-full  rounded-[8px]"
                    />
                  </div>
                </div>
              </div>

              <div className="col-span-12 mt-[16px]">
                <div className="font-gilroy bg-white  border border-[#E0E2F0] rounded-[12px]">
                  <motion.table
                    className="w-full border-collapse border-[#D7D9E7]"
                    initial={{ opacity: 0, translateY: "30px" }}
                    animate={{ opacity: 1, translateY: "0" }}
                    transition={{ duration: 0.4 }}
                  >
                    <thead className="text-black text-start rounded-[10px]">
                      <tr className="rounded-[10px]">
                        <th
                          className={
                            "px-2 py-2 text-[10px] rounded-tl-[10px] bg-white  text-gray-900  font-bold "
                          }
                        >
                          №
                        </th>
                        <th className=" text-[10px]  text-start  bg-white text-gray-900  font-bold ">
                          Hudud
                        </th>
                        <th className=" text-start text-[10px]   bg-white text-gray-900  font-bold ">
                          Kompaniya nomi
                        </th>
                        <th className=" text-start text-[10px]   bg-white text-gray-900  font-bold ">
                          Resurs kodi
                        </th>
                        <th className=" text-start text-[10px]   bg-white text-gray-900  font-bold ">
                          Resurs nomi
                        </th>
                        <th className=" text-start text-[10px]   bg-white text-gray-900  font-bold ">
                          O&apos;lchov Birligi
                        </th>

                        <th className=" text-start text-[10px]   bg-white text-gray-900  font-bold ">
                          Oxirgi o&apos;zgarish
                        </th>
                        <th className=" text-start text-[10px]   bg-white text-gray-900  font-bold ">
                          Narxi
                        </th>
                        <th className=" text-start text-[10px]   bg-white text-gray-900  font-bold "></th>
                      </tr>
                    </thead>

                    <tbody>
                      {get(materialAds, "data.results", []).map(
                        (item, index) => (
                          <tr
                            key={get(item, "id")}
                            className="text-sm odd:bg-[#EDF4FC] even:bg-white"
                          >
                            <td className=" font-medium text-xs py-[10px]  text-center">
                              {index + 1}
                            </td>
                            <td className=" font-medium text-xs py-[10px]">
                              <p className="underline-0 hover:underline transition-all duration-300">
                                {get(item, "material_region")}
                              </p>
                            </td>
                            <td className=" font-medium text-xs py-[10px] ">
                              {get(item, "company_name")}
                            </td>
                            <td className=" font-medium text-xs py-[10px]">
                              <Link
                                href={`/materials/${get(
                                  item,
                                  "material_code"
                                )}`}
                                className="underline-0 hover:underline transition-all duration-300"
                              >
                                {get(item, "material_code")}
                              </Link>
                            </td>
                            <td className=" font-medium text-xs py-[10px]  max-w-[170px]">
                              {get(item, "material_name")}
                            </td>
                            <td className=" font-medium text-xs py-[10px] ">
                              {get(item, "material_measure")}
                            </td>
                            <td className=" font-medium text-xs py-[10px] ">
                              {dayjs(get(item, "material_updated_date")).format(
                                "DD.MM.YYYY"
                              )}{" "}
                              {dayjs(get(item, "material_updated_date")).format(
                                "HH:mm"
                              )}
                            </td>
                            <td className=" font-medium text-xs py-[10px] ">
                              {get(item, "material_price")}
                            </td>
                            <td className=" font-medium text-xs py-[10px] ">
                              <div className="flex items-center gap-x-[4px]">
                                <button
                                  className={
                                    "p-[5px] bg-[#DAE8F7] rounded-[8px] active:scale-110 scale-100 transition-all duration-200"
                                  }
                                >
                                  <Image
                                    src={"/icons/heart.svg"}
                                    alt={"heart"}
                                    width={18}
                                    height={18}
                                  />
                                </button>

                                <button
                                  className={
                                    "p-[5px] bg-[#DAE8F7] rounded-[8px] active:scale-110 scale-100 transition-all duration-200"
                                  }
                                >
                                  <Image
                                    src={"/icons/basket.svg"}
                                    alt={"heart"}
                                    width={18}
                                    height={18}
                                  />
                                </button>
                              </div>
                            </td>
                          </tr>
                        )
                      )}
                    </tbody>
                  </motion.table>
                  <div className="w-full h-[1px] text-[#E2E2EA] "></div>
                  <div className="py-[20px] px-[24px] bg-white rounded-br-[12px] rounded-bl-[12px] flex items-center justify-between">
                    <div>
                      <p className="text-sm text-[#9392A0]">
                        {" "}
                        {get(materialAds, "data.count")} tadan 1-{limit} tasi
                        ko&apos;rsatilgan
                      </p>
                    </div>

                    {/* <div>
                    <Pagination
                      pageCount={pageCount}
                      onPageChange={handlePageClick}
                    />
                  </div> */}
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
