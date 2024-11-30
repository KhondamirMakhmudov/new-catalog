import Header from "@/components/header";
import Link from "next/link";
import RightIcon from "@/components/icons/right";
import useGetQuery from "@/hooks/api/useGetQuery";
import { KEYS } from "@/constants/key";
import { URLS } from "@/constants/url";
import { useRouter } from "next/router";
import Image from "next/image";
import { get } from "lodash";
import Reveal from "@/components/reveal";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Pagination from "@/components/pagination";
import { NumericFormat } from "react-number-format";
import dayjs from "dayjs";
import MyAdsAll from "@/layouts/dashboard/deliver/components/myAds-page/my-ads";
import CompanyFilterAds from "@/layouts/dashboard/deliver/components/company-filter/companeFilter";
const Index = () => {
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [showAllProjects, setShowAllProjects] = useState(!false);
  const router = useRouter();
  const { stir } = router.query;
  const {
    data: company,
    isLoading,
    isFetching,
  } = useGetQuery({
    key: [KEYS.companies, stir],
    url: `${URLS.companies}${stir}/`,
    enabled: !!stir,
  });

  const {
    data: companyAds,
    isLoading: isLoadingAds,
    isFetching: isFetchingAds,
  } = useGetQuery({
    key: [KEYS.companyAds, stir],
    url: `${URLS.companyAds}${stir}/`,
    params: {
      page: page,
    },
    enabled: !!stir,
  });

  useEffect(() => {
    if (get(companyAds, "data.results", [])) {
      const searchResults = get(companyAds, "data.results", []).filter((item) =>
        get(item, "material_name")
          .toLowerCase()
          .includes(searchQuery.toLowerCase())
      );
      setFilteredData(searchResults);
    }
  }, [searchQuery, companyAds]);

  return (
    <div className="bg-[#F7F7F7] min-h-screen">
      <Header />

      <main className="container mb-[46px]">
        <section className="mt-[16px] flex items-center space-x-[12px] font-gilroy">
          <Link href={"/"} className="text-[#262D33] text-sm font-semibold">
            Bosh sahifa
          </Link>
          <RightIcon color="#BCBFC2" />
          <Link className="text-[#0256BA] text-sm font-semibold" href={"#"}>
            Kompaniya haqida
          </Link>
        </section>

        <section>
          <div className="grid grid-cols-12 bg-white p-[20px] border border-[#E4E7F5] rounded-[12px] gap-y-[30px] font-gilroy mt-[16px]">
            <div className="col-span-12">
              <div className="flex items-center gap-x-[16px]">
                <Image
                  src={"/images/company_default.png"}
                  alt="company"
                  width={70}
                  height={70}
                />

                <div className="">
                  <h3 className="font-semibold text-lg">
                    {get(company, "data.company_name")}
                  </h3>
                  <div className="flex gap-x-[6px]">
                    <Image
                      src={"/icons/location.svg"}
                      alt="location"
                      width={16}
                      height={16}
                    />
                    <p className="text-sm font-medium">
                      {get(company, "data.company_address")}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-span-7 flex gap-x-[36px] items-center">
              <div>
                <div className="flex gap-x-[8px]">
                  <p className="text-sm font-bold">Rahbari:</p>
                  <p className="text-[#4B5157] text-sm font-medium">
                    {get(company, "data.company_ceo")}
                  </p>
                </div>

                <div className="flex gap-x-[8px]">
                  <p className="text-sm font-bold">Hudud:</p>
                  <p className="text-[#4B5157] text-sm font-medium">
                    {get(company, "data.company_address")?.split(",")[0]}
                  </p>
                </div>
              </div>

              <div className="w-[1px] h-[36px] bg-[#E6E5ED]"></div>
              <div>
                <div className="flex gap-x-[8px]">
                  <p className="text-sm font-bold">Elektron pochta:</p>
                  <Link
                    href={`mailto:${get(company, "data.company_email")}`}
                    className="text-[#4B5157] text-sm font-medium"
                  >
                    {get(company, "data.company_email")}
                  </Link>
                </div>

                <div className="flex gap-x-[8px]">
                  <p className="text-sm font-bold">Telefon raqami:</p>
                  <Link
                    href={`tel:${get(company, "data.company_phone_main")}`}
                    className="text-[#4B5157] text-sm font-medium"
                  >
                    {get(company, "data.company_phone_main")}
                  </Link>
                </div>
              </div>
            </div>

            <div className="col-span-12">
              <Reveal>
                <div
                  className=" min-h-[164px] w-full bg-center bg-no-repeat bg-cover rounded-[20px] flex items-center justify-center"
                  style={{ backgroundImage: `url(/images/address.png)` }}
                >
                  <Link
                    href={"https://maps.app.goo.gl/nxPwsjmq6vi6hCPa7"}
                    className="py-[14px] px-[28px] text-sm font-medium font-gilroy text-white bg-[#0256BA] rounded-[12px]"
                  >
                    Google xarita orqali ko‘rish
                  </Link>
                </div>
              </Reveal>
            </div>
          </div>

          <div className="mt-[30px] mb-[16px]">
            <h1 className="text-[32px] text-[#21201F] font-bold">
              Korxonaning barcha e&apos;lonlari
            </h1>
            <p className="font-gilroy text-[#4B5157] text-lg font-semibold mt-[12px]">
              {get(companyAds, "data.count")} ta e’lon mavjud
            </p>
          </div>

          <div className="grid grid-cols-12 gap-x-[30px]">
            <div className="col-span-12  space-y-[16px]">
              <div>
                <div className="grid grid-cols-12 items-end gap-x-[30px]">
                  <button
                    className={`col-span-2 py-[10px] px-[20px] font-gilroy bg-[#0256BA] text-white border-none rounded-[8px] text-sm `}
                  >
                    Barcha e&apos;lonlar
                  </button>

                  <div className="flex flex-col font-gilroy col-span-10 gap-y-[3px]">
                    <label className="font-semibold">Mahsulot nomi</label>
                    <input
                      type="text"
                      className="py-[10px] px-[15px]  border  w-full rounded-[8px] font-gilroy"
                      placeholder="Qidirish"
                    />
                  </div>
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
                        Hudud
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
                        Narxi (so’m)
                      </th>
                      <th className=" text-start text-[10px]   bg-white text-gray-900  font-bold ">
                        Oxirgi o&apos;zgarish
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {get(companyAds, "data.results", []).map((item, index) => (
                      <tr
                        key={index}
                        className="text-sm odd:bg-[#EDF4FC] even:bg-white"
                      >
                        <td className=" font-medium text-xs py-[10px]  text-center">
                          {index + 1}
                        </td>
                        <td className=" font-medium text-xs py-[10px]">
                          {get(item, "material_region")}
                        </td>
                        <td className=" font-medium text-xs py-[10px]">
                          <Link
                            href={`/materials/${get(item, "material_name")}`}
                            className="underline-0 hover:underline transition-all duration-300"
                          >
                            {get(item, "material_csr_code")}
                          </Link>
                        </td>
                        <td className=" font-medium text-xs py-[10px]">
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

                        <td className=" font-medium text-xs py-[10px]">
                          <NumericFormat
                            thousandSeparator={" "}
                            displayType="text"
                            value={get(item, "material_price")}
                            className="w-[80px] bg-transparent"
                          />
                        </td>

                        <td className=" font-medium text-xs py-[10px] text-center">
                          <div className="flex space-x-[4px]">
                            <Image
                              src={"/icons/clock.svg"}
                              alt="clock"
                              width={16}
                              height={16}
                            />
                            <p>
                              {" "}
                              {dayjs(get(item, "material_updated_date")).format(
                                "DD.MM.YYYY"
                              )}
                            </p>
                            <p>
                              {dayjs(get(item, "material_updated_date")).format(
                                "HH:mm"
                              )}
                            </p>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </motion.table>
                <div className="w-full h-[1px] text-[#E2E2EA] "></div>
                <div className="py-[20px] px-[24px] bg-white rounded-br-[12px] rounded-bl-[12px] flex items-center justify-between">
                  <div>
                    <p className="text-sm text-[#9392A0]">
                      {get(companyAds, "data.count")} tadan{" "}
                      {get(companyAds, "data.current_page_number")}-
                      {get(companyAds, "data.items_per_page")} tasi
                      ko&apos;rsatilgan
                    </p>
                  </div>

                  <div>
                    <Pagination
                      pageCount={get(companyAds, "data.total_pages")}
                      setPage={setPage}
                    />
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
