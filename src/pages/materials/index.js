import Header from "@/components/header";
import Link from "next/link";
import RightIcon from "@/components/icons/right";
import Pagination from "@/components/pagination";
import useGetQuery from "@/hooks/api/useGetQuery";
import { KEYS } from "@/constants/key";
import { URLS } from "@/constants/url";
import { motion } from "framer-motion";
import { get } from "lodash";
import { useState, useEffect } from "react";
import Image from "next/image";
import Footer from "@/components/footer";
import { NumericFormat } from "react-number-format";
import dayjs from "dayjs";
import ContentLoader from "@/components/loader/content-loader";
import usePostQuery from "@/hooks/api/usePostQuery";
import { useCounter } from "@/context/counter";
import toast from "react-hot-toast";
import Calendar from "react-calendar";
import { useRouter } from "next/router";
import * as XLSX from "xlsx";

import "react-calendar/dist/Calendar.css";
const regions = [
  { id: 1, name: "Toshkent" },
  { id: 2, name: "Andijon" },
  { id: 3, name: "Buxoro" },
  { id: 4, name: "Fargona" },
  { id: 5, name: "Jizzax" },
  { id: 6, name: "Xorazm" },
  { id: 7, name: "Namangan" },
  { id: 8, name: "Navoiy" },
  { id: 9, name: "Qashqadaryo" },
  { id: 10, name: "Qoraqalpog'iston" },
  { id: 11, name: "Samarqand" },
  { id: 12, name: "Sirdaryo" },
  { id: 13, name: "Surxondaryo" },
  { id: 14, name: "Rossiya federatsiyasi" },
];

const Index = () => {
  const [volumed, setVolumed] = useState(null);
  const [categoryId, setCategoryId] = useState(null);
  const [showAllProjects, setShowAllProjects] = useState(!false);
  const [minValue, setMinValue] = useState(0);
  const [maxValue, setMaxValue] = useState(0);
  const [regionName, setRegionName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [nameValue, setNameValue] = useState("");
  const [selectedItems, setSelectedItems] = useState({});
  const [page, setPage] = useState(1);
  const [selectedDate, setSelectedDate] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const { state, dispatch } = useCounter();
  const [tableData, setTableData] = useState([]);
  const [posted, setPosted] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [showCalendarEnd, setShowCalendarEnd] = useState(false);

  const router = useRouter();

  const handleStartChange = (date) => {
    const formattedDate = date.toISOString().split("T")[0];
    setStartDate(formattedDate);
    setShowCalendar(false);
  };

  const handleEndChange = (date) => {
    const formattedDate = date.toISOString().split("T")[0];
    setEndDate(formattedDate);
    setShowCalendarEnd(false);
  };

  const [limit] = useState(24);
  const [offset, setOffset] = useState(1);
  const {
    data: materialsFast,
    isLoading: materialLoading,
    isFetching: isFetchingMaterials,
  } = useGetQuery({
    key: [KEYS.materialsFast, regionName],
    url: URLS.materialsFast,
    params: {
      region_name: regionName || undefined,
      min_price: minValue || undefined,
      max_price: maxValue || undefined,
      page: page,
      start_date: startDate || undefined,
      end_date: endDate || undefined,
      page_size: 20,
      company_name: companyName || undefined,
      name_value: nameValue || undefined,
      date: selectedDate || undefined,
    },
    enabled: true,
  });

  const exportToExcel = (data) => {
    if (!data || data.length === 0) {
      alert("Yuklab olish uchun ma'lumot mavjud emas!");
      return;
    }

    const formattedData = data.map((item, index) => ({
      "№": index + 1,
      Hudud: item.material_region_name,
      "Korxona nomi": item.company_name,
      "Resurs kodi": item.material_name_id,
      "Resurs nomi": item.material_name,
      "O‘lchov birligi": item.material_measure,
      "Narxi (QQSsiz)": item.material_price,
      "Narxi (QQS)": (item.material_price * 1.12).toFixed(2),
      "Oxirgi o‘zgarish": dayjs(item.material_updated_date).format(
        "DD.MM.YYYY HH:mm"
      ),
    }));

    const worksheet = XLSX.utils.json_to_sheet(formattedData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Materials");

    XLSX.writeFile(workbook, "materials.xlsx");
  };
  // material volume
  const {
    data: materialVolume,
    isLoading,
    isFetching,
  } = useGetQuery({
    key: KEYS.materialVolumeFast,
    url: URLS.materialVolumeFast,
  });
  // material category
  const { data: materialCategory, isLoading: isLoadingCategory } = useGetQuery({
    key: [KEYS.materialCategoryFast, volumed],
    url: `${URLS.materialCategoryFast}${volumed}`,
  });
  // material group
  const { data: materialGroup, isLoading: isLoadingGroup } = useGetQuery({
    key: [KEYS.materialGroupFast, categoryId],
    url: `${URLS.materialGroupFast}${categoryId}`,
  });

  const { data: currency } = useGetQuery({
    key: KEYS.currency,
    url: URLS.currency,
  });

  const { mutate: getMaterial } = usePostQuery({
    listKeyId: KEYS.getMaterial,
    hideSuccessToast: false,
  });

  const handleCheckboxChange = (item) => {
    const isSelected = !selectedItems[item.id];
    const newSelectedState = { ...selectedItems, [item.id]: isSelected };
    setSelectedItems(newSelectedState);

    getMaterial({
      url: URLS.getMaterial,
      attributes: [item.id],
      onSuccess: (response) => {
        console.log("response", response);

        setTableData((prevData) => [...prevData, ...response.data]);
        setPosted(true);
      },
      onError: (error) => {
        console.error("Error fetching material:", error);
        toast.error("Xato yuz berdi");
      },
    });
  };
  console.log("posted", posted);

  const handleIncrement = (product) => {
    dispatch({ type: "INCREMENT", payload: JSON.stringify(product) });
    toast.success("Tanlagan mahsulotingiz savatchaga qo'shildi!", {
      duration: 3000,
      position: "top-left",
    });
  };

  return (
    <div className="bg-[#F7F7F7] ">
      <Header />

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
            Materiallar va jihozlar
          </Link>
        </section>

        <section>
          <div className="flex justify-between items-center">
            <h1 className="font-bold text-[22px]  md:text-[26px] lg:text-[32px] my-[16px] font-anybody">
              Material va jihozlar
            </h1>

            <button
              onClick={() => exportToExcel(materialsFast?.data?.materials)}
              className="flex gap-x-[10px] bg-[#00733B] hover:bg-[#00733bf1] scale-100 active:scale-90  lg:py-[9px] py-[10px] lg:px-[20px] px-[10px] items-center rounded-[8px] transform-all duration-200"
            >
              <Image
                src={"/icons/excel.svg"}
                alt="excel"
                width={24}
                height={24}
                className="lg:w-[24px] lg:h-[24px] hidden"
              />
              <p className="text-xs lg:text-sm font-gilroy text-white ">
                Excel yuklash
              </p>
            </button>
          </div>

          <div className="grid grid-cols-12 gap-[30px]">
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
                          const clickedVolume = get(volume, "id");
                          setVolumed((prev) =>
                            prev === clickedVolume ? null : clickedVolume
                          );
                        }}
                        key={get(volume, "id")}
                        className=""
                      >
                        <div className="flex gap-x-[4px] hover:bg-[#EDF4FC] bg-transparent transition-all duration-200">
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
                                        const clickedCategoryId = get(
                                          category,
                                          "id"
                                        );
                                        setCategoryId((prevCategoryId) =>
                                          prevCategoryId === clickedCategoryId
                                            ? null
                                            : clickedCategoryId
                                        );
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
                                            <ul className="ml-[10px]">
                                              {get(materialGroup, "data")?.map(
                                                (group) => (
                                                  <li key={get(group, "id")}>
                                                    <div className="flex gap-x-[4px] items-center ">
                                                      <input
                                                        type="checkbox"
                                                        onClick={(e) =>
                                                          e.stopPropagation()
                                                        }
                                                        onChange={() =>
                                                          handleCheckboxChange(
                                                            group
                                                          )
                                                        }
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
                </motion.div>
              )}
            </div>

            <div className="col-span-12 lg:col-span-9 space-y-[16px]">
              <div className="grid grid-cols-12 gap-[16px] p-[16px] font-gilroy bg-white  border border-[#E0E2F0] rounded-[12px] ">
                <div className="col-span-12 lg:col-span-4 self-stretch">
                  <h3 className="font-semibold text-sm mb-[6px] ">Viloyat</h3>

                  <div
                    className="border rounded-[8px] py-[12px] px-[15px] cursor-pointer bg-white flex justify-between text-[#939699]"
                    onClick={() => setDropdownOpen((prev) => !prev)}
                  >
                    <p className="text-sm">{regionName || "Hudud"}</p>
                    <RightIcon
                      classname={`${
                        !dropdownOpen ? "rotate-90" : "-rotate-90"
                      } transition-all duration-200`}
                      color="#BCBFC2"
                    />
                  </div>
                  {dropdownOpen && (
                    <div className="absolute border bg-white rounded-[8px] mt-1 max-h-60 overflow-y-auto shadow-lg z-50">
                      {regions.map((region) => (
                        <div
                          key={get(region, "id")}
                          className="px-4 py-2 text-sm cursor-pointer hover:bg-gray-100"
                          onClick={() => {
                            setRegionName(get(region, "name"));
                            setDropdownOpen(false);
                          }}
                        >
                          {get(region, "name")}
                        </div>
                      ))}
                    </div>
                  )}

                  {/* <select
                    placeholder="Kiriting"
                    value={regionName}
                    onChange={(e) => {
                      const value = e.target.value;
                      setRegionName(value);
                    }}
                    className="py-[10px]  border w-full rounded-[8px]"
                  >
                    {regions.map((item) => (
                      <option key={get(item, "id")}>{get(item, "name")}</option>
                    ))}
                  </select> */}
                </div>

                <div className="col-span-12 lg:col-span-4">
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

                <div className="col-span-12 lg:col-span-4">
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
                <div className="col-span-12 lg:col-span-4">
                  <h3 className="font-semibold text-sm mb-[6px] ">Sana</h3>
                  <div className="flex gap-x-[2px] items-center">
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Boshlanishi"
                        value={startDate}
                        readOnly
                        onClick={() => {
                          setShowCalendar(!showCalendar);
                        }}
                        className="py-[10px] pl-[15px] border w-full rounded-[8px] cursor-pointer"
                      />

                      {showCalendar && (
                        <div className="absolute z-10 bg-white -left-[100px] shadow-md mt-2">
                          <Calendar onChange={handleStartChange} />
                        </div>
                      )}
                    </div>

                    <div className="h-[1px] w-full max-w-[8px] bg-[#BCBFC2]"></div>

                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Tugashi"
                        value={endDate}
                        readOnly
                        onClick={() => {
                          setShowCalendarEnd(!showCalendarEnd);
                        }}
                        className="py-[10px] pl-[15px] border w-full rounded-[8px] cursor-pointer"
                      />

                      {showCalendarEnd && (
                        <div className="absolute z-10 bg-white left-[90px] shadow-md mt-2">
                          <Calendar onChange={handleEndChange} />
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="col-span-12 lg:col-span-8">
                  <h3 className="font-semibold text-sm mb-[6px] ">
                    Korxona nomi
                  </h3>
                  <input
                    type="text"
                    placeholder="Kiriting"
                    onChange={(e) => {
                      const value = e.target.value;
                      setCompanyName(value);
                    }}
                    className="py-[10px] pl-[15px] border w-full rounded-[8px]"
                  />
                </div>
              </div>
              {!posted ? (
                <div>
                  {materialLoading && isFetchingMaterials ? (
                    <ContentLoader />
                  ) : (
                    <div className="font-gilroy bg-white  border border-[#E0E2F0] rounded-[12px]">
                      <div className="overflow-x-auto">
                        <motion.table
                          className="w-full border-collapse border-[#D7D9E7] min-w-[800px]"
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
                                Korxona nomi
                              </th>
                              <th className=" text-start text-[10px]   bg-white text-gray-900  font-bold ">
                                Resurs kodi
                              </th>
                              <th className=" text-start text-[10px] lg:w-auto w-[200px]  bg-white text-gray-900  font-bold ">
                                Resurs nomi
                              </th>
                              <th className=" text-start text-[10px]   bg-white text-gray-900  font-bold ">
                                O&apos;lchov birligi
                              </th>
                              <th
                                className="text-[10px]   bg-white text-gray-900  font-bold text-center"
                                colSpan={2}
                              >
                                Narxi (so&apos;m)
                              </th>

                              <th className=" text-start text-[10px] rounded-tr-[10px]  bg-white text-gray-900  font-bold ">
                                Oxirgi o&apos;zgarish
                              </th>
                            </tr>
                            <tr className="rounded-tr-[10px]">
                              <th colSpan={6}></th>
                              <th className="text-center border-r border-l text-[10px] bg-white text-gray-900 font-bold ">
                                QQSsiz
                              </th>
                              <th className="text-center border-r border-l text-[10px] bg-white text-gray-900 font-bold">
                                QQS
                              </th>
                              <th className="rounded-tr-[10px]"></th>
                            </tr>
                          </thead>

                          <tbody>
                            {get(materialsFast, "data.materials", [])?.map(
                              (item, index) => (
                                <tr
                                  key={get(item, "id")}
                                  className="text-sm odd:bg-[#EDF4FC] even:bg-white"
                                >
                                  <td className=" font-medium text-xs py-[10px]  text-center">
                                    {(page - 1) * 20 + index + 1}
                                  </td>
                                  <td className=" font-medium text-xs py-[10px]  text-start">
                                    {get(item, "material_region_name")}
                                  </td>

                                  <td className=" font-medium text-xs text-[#0256BA] py-[10px]  text-start max-w-[200px]">
                                    <Link
                                      href={`/company/${get(
                                        item,
                                        "company_stir"
                                      )}`}
                                      className="underline-0 hover:underline transition-all duration-300"
                                    >
                                      {get(item, "company_name")}
                                    </Link>
                                  </td>

                                  <td className=" font-medium text-xs text-[#0256BA] py-[10px]">
                                    <Link
                                      href={`/materials/${get(
                                        item,
                                        "material_name_id"
                                      )}`}
                                      className="underline-0 hover:underline transition-all duration-300"
                                    >
                                      {get(item, "material_name_id")}
                                    </Link>
                                  </td>
                                  <td className=" font-medium text-xs py-[10px]  lg:w-auto w-[300px]">
                                    {get(item, "material_name")}
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
                                  <td className=" font-medium text-[10px] py-[10px] ">
                                    <NumericFormat
                                      thousandSeparator={" "}
                                      displayType="text"
                                      className="bg-transparent max-w-[100px]"
                                      value={
                                        Number.isInteger(
                                          get(item, "material_price")
                                        )
                                          ? get(item, "material_price") *
                                            get(
                                              currency,
                                              `data[${get(
                                                item,
                                                "material_price_currency"
                                              )}]`,
                                              1
                                            )
                                          : parseFloat(
                                              get(item, "material_price")
                                            ).toFixed(2) *
                                            get(
                                              currency,
                                              `data[${get(
                                                item,
                                                "material_price_currency"
                                              )}]`,
                                              1
                                            )
                                      }
                                    />
                                  </td>
                                  <td className=" font-medium text-[10px] py-[10px] ">
                                    <NumericFormat
                                      thousandSeparator={" "}
                                      displayType="text"
                                      className="bg-transparent max-w-[100px]"
                                      value={
                                        Number.isInteger(
                                          get(item, "material_price")
                                        )
                                          ? (
                                              get(item, "material_price") *
                                              get(
                                                currency,
                                                `data[${get(
                                                  item,
                                                  "material_price_currency"
                                                )}]`,
                                                1
                                              ) *
                                              1.12
                                            ).toFixed(2)
                                          : (
                                              parseFloat(
                                                get(item, "material_price")
                                              ).toFixed(2) *
                                              get(
                                                currency,
                                                `data[${get(
                                                  item,
                                                  "material_price_currency"
                                                )}]`,
                                                1
                                              ) *
                                              1.12
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
                                          get(item, "material_updated_date")
                                        ).format("DD.MM.YYYY")}
                                      </p>
                                      <p>
                                        {dayjs(
                                          get(item, "material_updated_date")
                                        ).format("HH:mm")}
                                      </p>
                                    </div>
                                  </td>
                                  <td className=" lg:w-auto w-[100px] flex items-center justify-center">
                                    <div className="flex items-center gap-x-[4px]">
                                      <button
                                        className={
                                          "p-[5px] bg-[#DAE8F7] rounded-[8px] b active:scale-110 scale-100 transition-all duration-200"
                                        }
                                      >
                                        <Image
                                          src={"/icons/heart.svg"}
                                          alt={"heart"}
                                          width={18}
                                          height={18}
                                          className="w-[18px] h-[18px]"
                                        />
                                      </button>

                                      <button
                                        onClick={() => handleIncrement(item)}
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
                      </div>
                      <div className="w-full h-[1px] text-[#E2E2EA] "></div>
                      <div className="py-[20px] px-[24px] bg-white rounded-br-[12px] rounded-bl-[12px] flex flex-col md:flex-row items-center justify-between">
                        <div>
                          <p className="text-sm text-[#9392A0]">
                            {" "}
                            {get(materialsFast, "data.total_items")} tadan 20
                            tasi ko&apos;rsatilgan
                          </p>
                        </div>

                        <div>
                          <Pagination
                            pageCount={get(materialsFast, "data.total_pages")}
                            page={page}
                            setPage={(prev) => setPage(prev)}
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex justify-center items-center h-[200px]">
                  hello
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
