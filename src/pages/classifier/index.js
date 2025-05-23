import Header from "@/components/header";
import { useState, useEffect } from "react";
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
import Pagination from "@/components/pagination";
import usePostQuery from "@/hooks/api/usePostQuery";
import toast from "react-hot-toast";
import Footer from "@/components/footer";
import { useRouter } from "next/router";
import NavigationButtom from "@/components/bottom-navigation";

const Index = () => {
  const router = useRouter();
  const [count, setCount] = useState(0);
  const [search, setSearch] = useState("");
  const [volumed, setVolumed] = useState(null);
  const [categoryId, setCategoryId] = useState(null);
  const [groupId, setGroupId] = useState(null);
  const [showAllProjects, setShowAllProjects] = useState(!false);
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const [posted, setPosted] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  const { data: defaultClassifier } = useGetQuery({
    key: KEYS.defaultClassifier,
    url: URLS.defaultClassifier,
  });

  useEffect(() => {
    if (get(defaultClassifier, "data.materials", [])) {
      const searchResults = get(defaultClassifier, "data.materials", []).filter(
        (item) =>
          get(item, "material_name")
            .toLowerCase()
            .includes(searchQuery.toLowerCase())
      );
      setFilteredData(searchResults);
    }
  }, [searchQuery, defaultClassifier]);

  const { mutate: showTable } = usePostQuery({
    listKeyId: KEYS.showTable,
    hideSuccessToast: true,
    hideErrorToast: true,
  });

  const onSubmit = (attrs) => {
    showTable(
      {
        url: URLS.classifierFast,
        attributes: {
          ...attrs,
        },
      },
      {
        onSuccess: (response) => {
          setData(response);
          setPosted(true);
          toast.success("Mavjud", { position: "top-right" });
        },
      }
    );
  };
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
  console.log("volumed", volumed);
  return (
    <div className="bg-[#F7F7F7] min-h-screen">
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
            Klassifikator
          </Link>
        </section>

        <section>
          <h1 className="font-bold text-[32px] my-[16px] font-anybody">
            Qurilish resurslari Klassifikatori
          </h1>

          <div className="grid grid-cols-12 gap-[30px] font-gilroy">
            {/* <div className={"col-span-12 "}>
              <div className={"mb-5"}>
                <div className={"mb-2.5"}>
                  <label className={""} htmlFor="#">
                    Qidiruv
                  </label>
                </div>
                <input
                  onChange={debounce(function (e) {
                    setSearchQuery(e.target.value);
                  }, 500)}
                  placeholder={"Kerakli mahsulot nomini yozing"}
                  className={
                    "border border-transparent w-full px-5 py-2.5  bg-white placeholder:italic placeholder:text-[#516164] h-[46px] rounded-[5px] outline-none focus:border-[#28366D]"
                  }
                  type="text"
                />
                {searchQuery && searchQuery.length < 4 && (
                  <span className={"text-red-500 text-xs font-light"}>
                    Kamida 4 ta belgi kiriting
                  </span>
                )}
              </div>
            </div> */}
            <div className="col-span-12 lg:col-span-3 self-start font-gilroy bg-white p-[16px] border border-[#E0E2F0] rounded-[12px] ">
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

              {showAllProjects && (
                <motion.div
                  initial={{ opacity: 0, translateY: "30px" }}
                  animate={{ opacity: 1, translateY: "0" }}
                  transition={{ duration: 0.4 }}
                  className="mt-[16px]"
                >
                  <ul className="cursor-pointer">
                    {get(materialVolume, "data")?.map((volume) => (
                      <li
                        onClick={(e) => {
                          e.stopPropagation();
                          setCategoryId(null);
                          setGroupId(null);
                          const clickedVolume = get(volume, "id");
                          setVolumed((prev) =>
                            prev === clickedVolume ? null : clickedVolume
                          );
                          onSubmit({
                            volume_ids: [get(volume, "id")],
                            category_ids: categoryId ? [categoryId] : undefined,
                            group_ids: groupId ? [groupId] : undefined,
                          });
                        }}
                        key={get(volume, "id")}
                        className=""
                      >
                        <div className="flex gap-x-[4px] items-center hover:bg-[#8bbffa] bg-transparent transition-all duration-200">
                          <Image
                            src={
                              volumed !== get(volume, "id")
                                ? "/icons/add-circle.svg"
                                : "/icons/minus-circle.svg"
                            }
                            alt="arrow_right"
                            width={20}
                            height={20}
                          />
                          <p className="text-sm font-semibold text-[#24539b]">
                            {get(volume, "volume_name")}
                          </p>
                        </div>
                        {volumed === get(volume, "id") && (
                          <>
                            {isLoadingCategory ? (
                              <div>
                                <ContentLoader />
                              </div>
                            ) : (
                              <motion.ul
                                className="ml-[19px]"
                                initial={{ opacity: 0, translateY: "20px" }}
                                animate={{ opacity: 1, translateY: "0px" }}
                                transition={{ duration: 0.1 }}
                              >
                                {get(materialCategory, "data")?.map(
                                  (category) => (
                                    <li
                                      onClick={(e) => {
                                        e.stopPropagation();

                                        const clickedCategoryId = get(
                                          category,
                                          "id"
                                        );
                                        setCategoryId((prevCategoryId) =>
                                          prevCategoryId === clickedCategoryId
                                            ? null
                                            : clickedCategoryId
                                        );
                                        onSubmit({
                                          category_ids: [get(category, "id")],
                                          group_ids: groupId
                                            ? [groupId]
                                            : undefined,
                                        });
                                      }}
                                      key={get(category, "id")}
                                    >
                                      <div className="flex gap-x-[4px] hover:bg-[#EDF4FC] bg-transparent transition-all duration-200">
                                        <Image
                                          src={
                                            categoryId !== get(category, "id")
                                              ? "/icons/add-circle.svg"
                                              : "/icons/minus-circle.svg"
                                          }
                                          alt="arrow_right"
                                          width={18}
                                          height={18}
                                        />
                                        <p className="text-[13px] font-semibold text-[#4a89e7]">
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
                                            <ul className="ml-[19px]">
                                              {get(materialGroup, "data")?.map(
                                                (group) => (
                                                  <li
                                                    key={get(group, "id")}
                                                    onClick={(e) => {
                                                      e.stopPropagation();

                                                      setGroupId(
                                                        get(group, "id")
                                                      );
                                                      onSubmit({
                                                        group_ids: [
                                                          get(group, "id"),
                                                        ],
                                                      });
                                                    }}
                                                  >
                                                    <div className="flex gap-x-[4px] items-center ">
                                                      <Image
                                                        src={
                                                          "/icons/checked.svg"
                                                        }
                                                        alt="arrow_right"
                                                        width={16}
                                                        height={16}
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
                </motion.div>
              )}
            </div>
            <div className="col-span-12 lg:col-span-9 tablet:mt-0 ">
              {!posted ? (
                <div className="font-gilroy bg-white  border border-[#E0E2F0] rounded-[12px]">
                  <div className="overflow-x-auto">
                    <motion.table
                      className="w-full border-collapse border-[#D7D9E7] min-w-[700px]"
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

                          <th className=" text-start text-[10px]   bg-white text-gray-900  font-bold ">
                            Resurs kodi
                          </th>
                          <th className=" text-start text-[10px]   bg-white text-gray-900  font-bold ">
                            Resurs nomi
                          </th>
                          <th className=" text-start text-[10px]   bg-white text-gray-900  font-bold ">
                            GOST
                          </th>

                          <th className=" text-start text-[10px] rounded-tr-[10px]   bg-white text-gray-900  font-bold ">
                            O&apos;lchov birligi
                          </th>
                        </tr>
                      </thead>

                      <tbody>
                        {filteredData?.map((item, index) => (
                          <tr
                            key={index}
                            className="text-sm odd:bg-[#EDF4FC] even:bg-white"
                          >
                            <td className=" font-medium text-xs py-[10px]  text-center">
                              {index + 1}
                            </td>
                            <td className=" font-medium text-xs py-[10px] text-[#0256BA]  text-start">
                              <Link
                                href={`materials/${get(
                                  item,
                                  "material_csr_code"
                                )}`}
                              >
                                {get(item, "material_csr_code")}
                              </Link>
                            </td>

                            <td className=" font-medium text-xs py-[10px] max-w-[200px]">
                              {get(item, "material_name")}
                            </td>
                            <td className=" font-medium text-xs py-[10px] max-w-[200px]">
                              {get(item, "materil_gost")}
                            </td>
                            <td className=" font-medium text-xs py-[10px] text-center">
                              <div className="flex space-x-[4px]">
                                <Image
                                  src={"/icons/measure-basket.svg"}
                                  alt="measure-basket"
                                  width={16}
                                  height={16}
                                />
                                <p>{get(item, "material_measure")}</p>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </motion.table>{" "}
                  </div>
                  <div className="w-full h-[1px] text-[#E2E2EA] "></div>
                  <div className="py-[20px] px-[24px] bg-white rounded-br-[12px] rounded-bl-[12px] flex flex-col lg:flex-row items-center justify-between">
                    <div>
                      <p className="text-sm text-[#9392A0]">
                        {" "}
                        {get(data, "data.count")} tadan 1-12 tasi
                        ko&apos;rsatilgan
                      </p>
                    </div>

                    <div>
                      <Pagination
                        pageCount={get(data, "data.total_pages")}
                        page={page}
                        setPage={(prev) => setPage(prev)}
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="font-gilroy bg-white  border border-[#E0E2F0] rounded-[12px] overflow-x-auto">
                  <motion.table
                    className="w-full border-collapse border-[#D7D9E7] min-w-[700px]"
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

                        <th className=" text-start text-[10px]   bg-white text-gray-900  font-bold ">
                          Resurs kodi
                        </th>
                        <th className=" text-start text-[10px]   bg-white text-gray-900  font-bold ">
                          Resurs nomi
                        </th>
                        <th className=" text-start text-[10px]   bg-white text-gray-900  font-bold ">
                          GOST
                        </th>

                        <th className=" text-start text-[10px]   bg-white text-gray-900  font-bold ">
                          O&apos;lchov birligi
                        </th>
                      </tr>
                    </thead>

                    <tbody>
                      {get(data, "data.materials")?.map((item, index) => (
                        <tr
                          key={index}
                          className="text-sm odd:bg-[#EDF4FC] even:bg-white"
                        >
                          <td className=" font-medium text-xs py-[10px]  text-center">
                            {index + 1}
                          </td>
                          <td className=" font-medium text-xs py-[10px] text-[#0256BA]  text-start">
                            <Link
                              href={`materials/${get(
                                item,
                                "material_csr_code"
                              )}`}
                            >
                              {get(item, "material_csr_code")}
                            </Link>
                          </td>

                          <td className=" font-medium text-xs py-[10px] max-w-[200px]">
                            {get(item, "material_name")}
                          </td>
                          <td className=" font-medium text-xs py-[10px] max-w-[200px]">
                            {get(item, "materil_gost")}
                          </td>
                          <td className=" font-medium text-xs py-[10px] text-center">
                            <div className="flex space-x-[4px]">
                              <Image
                                src={"/icons/measure-basket.svg"}
                                alt="measure-basket"
                                width={16}
                                height={16}
                              />
                              <p>{get(item, "material_measure")}</p>
                            </div>
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
                        {get(data, "data.total_items")} tadan 1-12 tasi
                        ko&apos;rsatilgan
                      </p>
                    </div>

                    <div>
                      <Pagination
                        pageCount={get(data, "data.total_pages")}
                        page={get(data, "data.current_page")}
                        setPage={(prev) => setPage(prev + 1)}
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
