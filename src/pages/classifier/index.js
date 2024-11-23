import Header from "@/components/header";
import { useState } from "react";
import Link from "next/link";
import RightIcon from "@/components/icons/right";
import { URLS } from "@/constants/url";
import { KEYS } from "@/constants/key";
import useGetQuery from "@/hooks/api/useGetQuery";
import { NumericFormat } from "react-number-format";
import { get, debounce } from "lodash";
import clsx from "clsx";
import { motion } from "framer-motion";
import Image from "next/image";
import ContentLoader from "@/components/loader/content-loader";

const Index = () => {
  const [count, setCount] = useState(0);
  const [search, setSearch] = useState("");
  const [volumed, setVolumed] = useState(null);
  const [categoryId, setCategoryId] = useState(null);
  const [showAllProjects, setShowAllProjects] = useState(!false);
  const [minValue, setMinValue] = useState(0);
  const [maxValue, setMaxValue] = useState(0);
  const [regionName, setRegionName] = useState("");
  const [nameValue, setNameValue] = useState("");
  const [selectedItems, setSelectedItems] = useState({});
  const [page, setPage] = useState(1);

  const {
    data: materialVolume,
    isLoading,
    isFetching,
  } = useGetQuery({
    key: KEYS.materialVolumeFast,
    url: URLS.materialVolumeFast,
  });

  const { data: materialCategory, isLoading: isLoadingCategory } = useGetQuery({
    key: [KEYS.materialCategoryFast, volumed],
    url: `${URLS.materialCategoryFast}${volumed}`,
  });

  const { data: materialGroup, isLoading: isLoadingGroup } = useGetQuery({
    key: [KEYS.materialGroupFast, categoryId],
    url: `${URLS.materialGroupFast}${categoryId}`,
  });
  return (
    <div className="bg-[#F7F7F7]">
      <Header />
      <main className="container mb-[46px]">
        <section className="mt-[16px] flex items-center space-x-[12px] font-gilroy">
          <Link href={"/"} className="text-[#262D33] text-sm font-semibold">
            Bosh sahifa
          </Link>
          <RightIcon color="#BCBFC2" />
          <Link className="text-[#0256BA] text-sm font-semibold" href={"#"}>
            Klassifikator
          </Link>
        </section>

        <section>
          <h1 className="font-bold text-[32px] my-[16px] font-anybody">
            Qurilish resurslari Klassifikatori
          </h1>

          <div className="grid grid-cols-12 gap-x-[30px] font-gilroy">
            <div className={"col-span-12 "}>
              <div className={"mb-5"}>
                <div className={"mb-2.5"}>
                  <label className={""} htmlFor="#">
                    Qidiruv
                  </label>
                  <p className={"text-sm text-[#516164]"}>
                    *
                    <NumericFormat
                      value={count}
                      displayType={"text"}
                      thousandSeparator={" "}
                    />{" "}
                    natija topildi
                  </p>
                </div>
                <input
                  onChange={debounce(function (e) {
                    setSearch(e.target.value);
                  }, 500)}
                  placeholder={"Kerakli mahsulot nomini yozing"}
                  className={
                    "border border-transparent w-full px-5 py-2.5  bg-white placeholder:italic placeholder:text-[#516164] h-[46px] rounded-[5px] outline-none focus:border-[#28366D]"
                  }
                  type="text"
                />
                {search && search.length < 4 && (
                  <span className={"text-red-500 text-xs font-light"}>
                    Kamida 4 ta belgi kiriting
                  </span>
                )}
              </div>
            </div>
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

              <div className="mt-[16px]">
                <ul className="cursor-pointer">
                  {get(materialVolume, "data")?.map((volume) => (
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
                              {get(materialCategory, "data")?.map(
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
                                            {get(materialGroup, "data")?.map(
                                              (group) => (
                                                <li key={get(group, "id")}>
                                                  <div className="flex gap-x-[4px] items-center ">
                                                    <input
                                                      type="checkbox"
                                                      onChange={() =>
                                                        handleCheckboxChange(
                                                          group
                                                        )
                                                      }
                                                      className="form-checkbox  text-blue-600 border-gray-300 rounded"
                                                    />
                                                    <p className="text-xs font-medium text-[#475467] hover:bg-[#EDF4FC] bg-transparent transition-all duration-200">
                                                      {get(group, "group_name")}
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
            </div>
            <div className="col-span-9 tablet:mt-0 mt-[30px]">
              <div className="grid grid-cols-12 tablet:gap-x-8 gap-x-4 ">
                {/* <div className="col-span-12">
                  {volumeId ? (
                    <GridView
                      getCount={setCount}
                      url={URLS.classifierResources}
                      key={[KEYS.classifierResources, volumeId]}
                      params={
                        search && search?.length > 3
                          ? {
                              key: "name",
                              value: search,
                            }
                          : {
                              key: groupId
                                ? "group"
                                : chapterId
                                ? "chapter"
                                : partId
                                ? "part"
                                : "volume",
                              value: groupId
                                ? groupId
                                : chapterId
                                ? chapterId
                                : partId
                                ? partId
                                : volumeId,
                            }
                      }
                      columns={columns}
                    />
                  ) : (
                    <GridView
                      getCount={setCount}
                      url={URLS.classifier}
                      key={KEYS.classifier}
                      params={
                        search && search?.length > 3
                          ? {
                              key: "name",
                              parent: search,
                            }
                          : { key: "resources" }
                      }
                      columns={columns}
                    />
                  )}
                </div> */}
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Index;
