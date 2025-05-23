import Header from "@/components/header";
import Link from "next/link";
import RightIcon from "@/components/icons/right";
import Pagination from "@/components/pagination";
import useGetQuery from "@/hooks/api/useGetQuery";
import { KEYS } from "@/constants/key";
import { URLS } from "@/constants/url";
import { motion } from "framer-motion";
import { get } from "lodash";
import { useState } from "react";
import Footer from "@/components/footer";

const Index = () => {
  const [showAllProjects, setShowAllProjects] = useState(!false);
  const [region, setRegionName] = useState("");
  const [limit] = useState(24);
  const [offset, setOffset] = useState(0);
  const {
    data: enteredAds,
    isLoading: adsLoading,
    isError: adsError,
    isFetching: isFetchingMaterials,
  } = useGetQuery({
    key: KEYS.ads,
    url: URLS.ads,
    params: { region_name: region, min_price: 0, max_price: 1000 },
  });

  console.log(enteredAds);

  const totalItems = get(enteredAds, "data.count");
  const pageCount = Math.ceil(totalItems / limit);

  const handlePageClick = (event) => {
    const newOffset = event?.selected * limit;
    setOffset(newOffset);
  };
  return (
    <div className="bg-[#F7F7F7] ">
      <Header />

      <main className="container mb-[46px]">
        <section className="mt-[16px] flex items-center space-x-[12px] font-gilroy">
          <Link href={"/"} className="text-[#262D33] text-sm font-semibold">
            Bosh sahifa
          </Link>
          <RightIcon color="#BCBFC2" />
          <Link className="text-[#0256BA] text-sm font-semibold" href={"#"}>
            E&apos;lonlar
          </Link>
        </section>

        <section>
          <h1 className="font-bold text-[32px] my-[16px] font-anybody">
            E&apos;lonlar
          </h1>

          <div className="grid grid-cols-12 gap-x-[30px]">
            <div className="col-span-3 self-start font-gilroy bg-white p-[16px] border border-[#E0E2F0] rounded-[12px] ">
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
                className="py-[10px] px-[15px] border w-full mt-[20px] rounded-[8px]"
                placeholder="Qidirish"
              />
            </div>

            <div className="col-span-9 space-y-[16px]">
              <div className="grid grid-cols-12 gap-[16px] p-[16px] font-gilroy bg-white  border border-[#E0E2F0] rounded-[12px] ">
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

                <div className="col-span-4">
                  <h3 className="font-semibold text-sm mb-[6px] ">
                    Sanani tanlash
                  </h3>

                  <input
                    type="text"
                    placeholder="Tanlash"
                    className="py-[10px] px-[15px] border w-full  rounded-[8px]"
                  />
                </div>
              </div>
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
                          "px-4 py-2 text-[10px] rounded-tl-[10px] bg-white  text-gray-900  font-bold "
                        }
                      >
                        №
                      </th>
                      <th className=" text-[10px]  text-start  bg-white text-gray-900  font-bold ">
                        Material kodi
                      </th>
                      <th className=" text-start text-[10px]   bg-white text-gray-900  font-bold ">
                        Mahsulot Kodi
                      </th>
                      <th className=" text-start text-[10px]   bg-white text-gray-900  font-bold ">
                        O&apos;lchov Birligi
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {get(enteredAds, "data.results", []).map((item, index) => (
                      <tr
                        key={index}
                        className="text-sm odd:bg-[#EDF4FC] even:bg-white"
                      >
                        <td className=" font-medium text-xs py-[10px]  text-center">
                          {index + 1}
                        </td>
                        <td className=" font-medium text-xs py-[10px]">
                          <Link
                            href={`/materials/${get(
                              item,
                              "material_csr_code"
                            )}`}
                            className="underline-0 hover:underline transition-all duration-300"
                          >
                            {get(item, "material_csr_code")}
                          </Link>
                        </td>
                        <td className=" font-medium text-xs py-[10px]">
                          {get(item, "material_name")}
                        </td>
                        <td className=" font-medium text-xs py-[10px] text-center">
                          {get(item, "material_measure")}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </motion.table>
                <div className="w-full h-[1px] text-[#E2E2EA] "></div>
                <div className="py-[20px] px-[24px] bg-white rounded-br-[12px] rounded-bl-[12px] flex items-center justify-between">
                  <div>
                    <p className="text-sm text-[#9392A0]">
                      {" "}
                      {get(enteredAds, "data.count")} tadan 1-{limit} tasi
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
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
