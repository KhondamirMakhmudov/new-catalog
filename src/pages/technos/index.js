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
import Image from "next/image";
import ContentLoader from "@/components/loader/content-loader";
import { NumericFormat } from "react-number-format";
import dayjs from "dayjs";

const Index = () => {
  const [volumed, setVolumed] = useState(null);
  const [categoryId, setCategoryId] = useState(null);
  const [showAllProjects, setShowAllProjects] = useState(!false);
  const [regionName, setRegionName] = useState("");
  const [selectedItems, setSelectedItems] = useState({});
  const [minValue, setMinValue] = useState(0);
  const [maxValue, setMaxValue] = useState(0);
  const [nameValue, setNameValue] = useState("");
  const [page, setPage] = useState(1);
  const {
    data: technos,
    isLoading: technosLoading,
    isFetching: isFetchingTechnosLoading,
  } = useGetQuery({
    key: KEYS.technoFast,
    url: URLS.technoFast,
    params: {
      region_name: regionName || undefined,
      min_price: minValue || undefined,
      max_price: maxValue || undefined,
      name_value: nameValue,
      page: page,
      page_size: 12,
    },
  });

  const {
    data: technoVolume,
    isLoading,
    isFetching,
  } = useGetQuery({
    key: KEYS.technoVolumeFast,
    url: URLS.technoVolumeFast,
  });

  const { data: technoCategory, isLoading: isLoadingCategory } = useGetQuery({
    key: [KEYS.technoCategoryFast, volumed],
    url: `${URLS.technoCategoryFast}${volumed}`,
  });

  const { data: technoGroup, isLoading: isLoadingGroup } = useGetQuery({
    key: [KEYS.technoGroupFast, categoryId],
    url: `${URLS.technoGroupFast}${categoryId}`,
  });

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
            Uskuna va qurilmalar
          </Link>
        </section>

        <section>
          <h1 className="font-bold text-[32px] my-[16px] font-anybody">
            Uskuna va qurilmalar
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

              {isLoading || isFetching ? (
                <ContentLoader />
              ) : (
                <div className="mt-[16px]">
                  <ul className="cursor-pointer">
                    {get(technoVolume, "data")?.map((volume) => (
                      <li
                        onClick={(e) => {
                          e.stopPropagation();
                          setCategoryId(null);
                          setVolumed(get(volume, "id"));
                        }}
                        key={get(volume, "id")}
                        className=""
                      >
                        <div className="flex gap-x-[4px] hover:bg-[#EDF4FC] bg-transparent transition-all duration-200">
                          <Image
                            src={"/icons/arrow_right.svg"}
                            alt="arrow_right"
                            width={16}
                            height={16}
                          />
                          <p className="text-xs font-medium text-[#475467]">
                            {get(volume, "volume_name")}
                          </p>
                        </div>
                        {volumed === get(volume, "id") && ( // Only show categories for selected volume
                          <>
                            {isLoadingCategory ? (
                              <div>
                                <ContentLoader />
                              </div>
                            ) : (
                              <motion.ul
                                className="ml-[10px]"
                                initial={{ opacity: 0, translateY: "20px" }}
                                animate={{ opacity: 1, translateY: "0px" }}
                                transition={{ duration: 0.1 }}
                              >
                                {get(technoCategory, "data")?.map(
                                  (category) => (
                                    <li
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        setCategoryId(get(category, "id"));
                                      }}
                                      key={get(category, "id")}
                                    >
                                      <div className="flex gap-x-[4px] hover:bg-[#EDF4FC] bg-transparent transition-all duration-200">
                                        <Image
                                          src={"/icons/arrow_right.svg"}
                                          alt="arrow_right"
                                          width={16}
                                          height={16}
                                        />
                                        <p className="text-xs font-medium text-[#475467]">
                                          {get(category, "category_name")}
                                        </p>
                                      </div>
                                      {categoryId === get(category, "id") && (
                                        <>
                                          {isLoadingGroup ? (
                                            <div>
                                              <ContentLoader />
                                            </div>
                                          ) : (
                                            <ul className="ml-[10px]">
                                              {get(technoGroup, "data")?.map(
                                                (group) => (
                                                  <li key={get(group, "id")}>
                                                    <div className="flex gap-x-[4px] items-center ">
                                                      <input
                                                        type="checkbox"
                                                        // onChange={() =>
                                                        //   handleCheckboxChange(
                                                        //     group
                                                        //   )
                                                        // }
                                                        className="form-checkbox  text-blue-600 border-gray-300 rounded"
                                                      />
                                                      <p className="text-xs font-medium text-[#475467] hover:bg-[#EDF4FC] bg-transparent transition-all duration-200">
                                                        {get(
                                                          group,
                                                          "group_name"
                                                        )}
                                                      </p>
                                                    </div>
                                                  </li>
                                                )
                                              )}
                                            </ul>
                                          )}
                                        </>
                                      )}
                                    </li>
                                  )
                                )}
                              </motion.ul>
                            )}
                          </>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <div className="col-span-9 space-y-[16px]">
              <div className="grid grid-cols-12 gap-[16px] p-[16px] font-gilroy bg-white  border border-[#E0E2F0] rounded-[12px] ">
                <div className="col-span-4">
                  <h3 className="font-semibold text-sm mb-[6px] ">Viloyat</h3>

                  <input
                    type="text"
                    placeholder="Kiriting"
                    value={regionName}
                    onChange={(e) => {
                      const value = e.target.value;
                      setRegionName(value);
                    }}
                    className="py-[10px] pl-[15px] border w-full rounded-[8px]"
                  />
                </div>

                <div className="col-span-4">
                  <h3 className="font-semibold text-sm mb-[6px] ">Narxlar</h3>

                  <div className="flex gap-x-[2px] items-center">
                    <input
                      type="number"
                      onChange={(e) => {
                        const value = e.target.value;
                        setMinValue(value);
                      }}
                      placeholder="Kiriting"
                      className="py-[10px] px-[15px] border w-full  rounded-[8px]"
                    />
                    <div className="h-[1px] w-full max-w-[8px] bg-[#BCBFC2]"></div>
                    <input
                      type="number"
                      onChange={(e) => {
                        const value = e.target.value;
                        setMaxValue(value);
                      }}
                      placeholder="Kiriting"
                      className="py-[10px] px-[15px] border w-full  rounded-[8px]"
                    />
                  </div>
                </div>

                <div className="col-span-4">
                  <h3 className="font-semibold text-sm mb-[6px] ">
                    Mahsulot nomi
                  </h3>

                  <input
                    type="text"
                    onChange={(e) => {
                      const value = e.target.value;
                      setNameValue(value);
                    }}
                    placeholder="Qidirish"
                    className="py-[10px] px-[15px] border w-full  rounded-[8px]"
                  />
                </div>
              </div>
              {technosLoading || isFetchingTechnosLoading ? (
                <ContentLoader />
              ) : (
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
                          Hudud
                        </th>
                        <th className=" text-start text-[10px]   bg-white text-gray-900  font-bold ">
                          Kompaniya
                        </th>
                        <th className=" text-start text-[10px]   bg-white text-gray-900  font-bold ">
                          Resurs kodi
                        </th>
                        <th className=" text-start text-[10px]   bg-white text-gray-900  font-bold ">
                          Resurs nomi
                        </th>
                        <th className=" text-start text-[10px]   bg-white text-gray-900  font-bold ">
                          O&apos;lchov birligi
                        </th>
                        <th className=" text-start text-[10px]   bg-white text-gray-900  font-bold ">
                          Narxi (so’m)
                        </th>

                        <th className=" text-start text-[10px]   bg-white text-gray-900  font-bold ">
                          Oxirgi o&apos;zgarish
                        </th>
                      </tr>
                    </thead>

                    <tbody>
                      {get(technos, "data.techno_ads", []).map(
                        (item, index) => (
                          <tr
                            key={index}
                            className="text-sm odd:bg-[#EDF4FC] even:bg-white"
                          >
                            <td className=" font-medium text-xs py-[10px]  text-center">
                              {index + 1}
                            </td>
                            <td className=" font-medium text-xs py-[10px]  text-start">
                              {get(item, "techno_region_name")}
                            </td>

                            <td className=" font-medium text-xs py-[10px]  text-start max-w-[200px]">
                              {get(item, "company_name")}
                            </td>

                            <td className=" font-medium text-xs py-[10px]">
                              <Link
                                href={`/technos/${get(item, "techno_name_id")}`}
                                className="underline-0 hover:underline transition-all duration-300"
                              >
                                {get(item, "techno_name_id")}
                              </Link>
                            </td>
                            <td className=" font-medium text-xs py-[10px] max-w-[200px]">
                              {get(item, "techno_name")}
                            </td>
                            <td className=" font-medium text-xs py-[10px] text-center">
                              <div className="flex space-x-[4px]">
                                <Image
                                  src={"/icons/measure-basket.svg"}
                                  alt="measure-basket"
                                  width={16}
                                  height={16}
                                />
                                <p>{get(item, "techno_measure")}</p>
                              </div>
                            </td>
                            <td className=" font-medium text-xs py-[10px] ">
                              <NumericFormat
                                displayType="text"
                                thousandSeparator={" "}
                                className="bg-transparent"
                                value={
                                  Number.isInteger(get(item, "techno_price"))
                                    ? get(item, "techno_price")
                                    : parseFloat(
                                        get(item, "techno_price")
                                      ).toFixed(2)
                                }
                              />
                            </td>
                            <td className=" font-medium text-xs py-[10px]">
                              <div className="flex space-x-[4px]">
                                <Image
                                  src={"/icons/clock.svg"}
                                  alt="clock"
                                  width={16}
                                  height={16}
                                />
                                <p>
                                  {" "}
                                  {dayjs(
                                    get(item, "techno_updated_date")
                                  ).format("DD.MM.YYYY")}
                                </p>
                                <p>
                                  {dayjs(
                                    get(item, "techno_updated_date")
                                  ).format("HH:mm")}
                                </p>
                              </div>
                            </td>
                            <td>
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
                        {get(technos, "data.count")} tadan 1-12 tasi
                        ko&apos;rsatilgan
                      </p>
                    </div>

                    <div>
                      <Pagination
                        pageCount={get(technos, "data.total_pages")}
                        page={page}
                        setPage={(prev) => setPage(prev)}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
