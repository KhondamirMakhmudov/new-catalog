import Header from "@/components/header";
import RightIcon from "@/components/icons/right";
import Link from "next/link";
import Image from "next/image";
import useGetQuery from "@/hooks/api/useGetQuery";
import { KEYS } from "@/constants/key";
import { URLS } from "@/constants/url";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import { get, debounce } from "lodash";
import { useState, useEffect } from "react";
import BasketIcon from "@/components/icons/basket";
import dayjs from "dayjs";
import ContentLoader from "@/components/loader/content-loader";
import usePostQuery from "@/hooks/api/usePostQuery";
import { useCounter } from "@/context/counter";
import toast from "react-hot-toast";
import Footer from "@/components/footer";
import { NumericFormat } from "react-number-format";

const Index = () => {
  const [limit] = useState(9);
  const router = useRouter();
  const { code } = router.query;
  const [soliqAveragePrice, setSoliqAveragePrice] = useState(null);
  const [soliqProductCount, setSoliqProductCount] = useState(null);
  const [hasPosted, setHasPosted] = useState(false);
  const { state, dispatch } = useCounter();
  const [minimum, setMinimum] = useState(0);
  const [maximum, setMaximum] = useState(0);
  const [average, setAverage] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  const handleIncrement = (product) => {
    dispatch({ type: "INCREMENT", payload: JSON.stringify(product) });
    toast.success("Tanlagan mahsulotingiz savatchaga qo'shildi!", {
      duration: 3000,
      position: "top-left",
    });
  };

  const {
    data: material,
    isLoading,
    isFetching,
  } = useGetQuery({
    key: [KEYS.materials, code],
    url: `${URLS.materials}${code}/`,
    enabled: !!code,
  });

  const { data: soliqData } = useGetQuery({
    key: KEYS.soliqDatas,
    url: URLS.soliqDatas,
    params: {
      mxik_code: get(material, "data.mxik_soliq")?.split(".")[0],
    },
  });
  // Soliqdan ma'lumotlarni olib joylash
  useEffect(() => {
    const soliqDataArray = get(soliqData, "data.data", []);

    const productCount = soliqDataArray.reduce(
      (initialQuantity, currentQuantity) =>
        initialQuantity + get(currentQuantity, "product_count"),
      0
    );
    setSoliqProductCount(productCount);

    const deliver = soliqDataArray.map(
      (item) => get(item, "delivery_sum") / get(item, "product_count")
    );

    const deliverSum = deliver.reduce(
      (initialValue, currentValue) => initialValue + currentValue,
      0
    );

    const averageDeliverySum = (deliverSum / soliqDataArray.length).toFixed(2);

    setSoliqAveragePrice(averageDeliverySum);
  });

  const {
    data: materialAds,
    isLoading: isLoadingMaterialAds,
    isFetching: isFetchingMaterialAds,
  } = useGetQuery({
    key: [KEYS.materialAds, code],
    url: `${URLS.materialAds}${code}/`,
    enabled: !!code,
  });

  const { data: currency } = useGetQuery({
    key: KEYS.currency,
    url: URLS.currency,
  });

  useEffect(() => {
    if (get(materialAds, "data.results", [])) {
      const searchResults = get(materialAds, "data.results", []).filter(
        (item) =>
          get(item, "company_name")
            .toLowerCase()
            .includes(searchQuery.toLowerCase())
      );
      setFilteredData(searchResults);
    }
  }, [searchQuery, materialAds]);

  //////// Max price //////////////////
  useEffect(() => {
    const results = get(materialAds, "data.results", []);

    if (results.length === 0) {
      setMaximum(0);
      return;
    }

    let maxPrice = 0;

    for (const obj of results) {
      const price =
        obj["material_price"] *
        get(currency, `data[${obj["material_price_currency"]}]`, 1);

      if (price > maxPrice) {
        maxPrice = price;
      }
    }

    // Use `toFixed(2)` only once outside the loop for optimization
    setMaximum(maxPrice.toFixed(2));
  }, [materialAds, currency]);

  useEffect(() => {
    const results = get(materialAds, "data.results", []);
    const resultsLength = results.length;

    if (resultsLength === 0) {
      setAverage(0);
      return;
    }

    let totalPrice = 0;

    for (const obj of results) {
      const price =
        obj["material_price"] *
        get(currency, `data[${obj["material_price_currency"]}]`, 1);
      totalPrice += price;
    }

    const averagePrice = +(totalPrice / resultsLength).toFixed(2);
    setAverage(averagePrice);
  }, [materialAds, currency]);

  ///////// Min Price ///////////////
  useEffect(() => {
    const results = get(materialAds, "data.results", []);

    if (results.length === 0) {
      setMinimum(false);
      return;
    }

    let minPrice = Infinity;

    for (const obj of results) {
      const price =
        obj["material_price"] *
        get(currency, `data[${obj["material_price_currency"]}]`, 1);

      if (price < minPrice) {
        minPrice = price;
      }
    }

    // Use `toFixed(2)` only once outside the loop for optimization
    setMinimum(minPrice.toFixed(2));
  }, [materialAds, currency]);

  return (
    <div className="bg-[#F7F7F7] min-h-screen">
      <Header />

      <main className="container mb-[46px]">
        <section className="mt-[16px] flex items-center space-x-[12px] font-gilroy">
          <Link href={"/"} className=" text-sm font-semibold">
            Bosh sahifa
          </Link>
          <RightIcon color="#BCBFC2" />
          <Link
            className="text-[#262D33] text-sm font-semibold"
            href={"/materials"}
          >
            Materiallar va jihozlar
          </Link>
          <RightIcon color="#BCBFC2" />
          <Link className="text-[#0256BA] text-sm font-semibold" href={"#"}>
            Mahsulotlar
          </Link>
        </section>

        <section className="mt-[16px] ">
          <div>
            <div>
              {isLoading || isFetching ? (
                <ContentLoader />
              ) : (
                <div className="grid grid-cols-12 bg-white p-[20px] border border-[#E4E7F5] rounded-[12px] gap-y-[30px] font-gilroy">
                  <div className="col-span-12 flex justify-between items-center">
                    <div className="">
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
                  </div>

                  <div className="col-span-12 grid grid-cols-10 gap-x-[14px]">
                    <div className="p-[14px] col-span-2 border border-[#E6E5ED] rounded-[16px] inline-block">
                      <div className="flex gap-x-[10px] items-center">
                        <div>
                          <div
                            className={`relative  px-[1px] py-[6px] bg-white border w-[44px] h-[44px] bg-[length:40px_40px] bg-center  border-[#E6E5ED] rounded-[10px] inline-block`}
                            style={{
                              backgroundImage: "url(/icons/soliq.svg)",
                            }}
                          ></div>
                        </div>

                        <p className="text-xs font-bold">
                          Davlat soliq qo&apos;mitasi
                        </p>
                      </div>

                      <ul className="space-y-[8px] mt-[8px]">
                        <li className="text-xs flex justify-between items-center">
                          <p>O&apos;tgan oydagi savdolar soni:</p>

                          <p className="font-bold">{soliqProductCount}</p>
                        </li>

                        <li className="text-xs flex justify-between items-center">
                          <p>Narxi:</p>

                          <p className="font-bold">
                            {soliqAveragePrice} so&apos;m
                          </p>
                        </li>
                      </ul>
                    </div>

                    <div className="p-[14px] col-span-2 border border-[#E6E5ED] rounded-[16px] inline-block">
                      <div className="flex gap-x-[10px] items-center">
                        <div>
                          <div
                            className={`relative  px-[1px] py-[6px] bg-white border w-[44px] h-[44px] bg-[length:40px_30px] bg-no-repeat bg-center  border-[#E6E5ED] rounded-[10px] inline-block`}
                            style={{
                              backgroundImage: "url(/icons/birja.svg)",
                            }}
                          ></div>
                        </div>

                        <p className="text-xs font-bold">
                          Tovar xomashyo birjasi
                        </p>
                      </div>

                      <ul className="space-y-[8px] mt-[8px]">
                        <li className="text-xs flex justify-between items-center">
                          <p>O&apos;tgan oydagi savdolar soni:</p>

                          <p className="font-bold">20</p>
                        </li>

                        <li className="text-xs flex justify-between items-center">
                          <p>Narxi:</p>

                          <p className="font-bold">12 000 000 so&apos;m</p>
                        </li>
                      </ul>
                    </div>

                    <div className="p-[14px] col-span-2 border border-[#E6E5ED] rounded-[16px] inline-block">
                      <div className="flex gap-x-[10px] items-center">
                        <div>
                          <div
                            className={`relative  px-[1px] py-[6px] bg-white border w-[44px] h-[44px] bg-[length:40px_40px] bg-no-repeat bg-center  border-[#E6E5ED] rounded-[10px] inline-block`}
                            style={{
                              backgroundImage: "url(/icons/statistics.svg)",
                            }}
                          ></div>
                        </div>

                        <p className="text-xs font-bold">
                          Statistika agentligi
                        </p>
                      </div>

                      <ul className="space-y-[8px] mt-[8px]">
                        <li className="text-xs flex justify-between items-center">
                          <p>O&apos;tgan oydagi savdolar soni:</p>

                          <p className="font-bold">20</p>
                        </li>

                        <li className="text-xs flex justify-between items-center">
                          <p>Narxi:</p>

                          <p className="font-bold">12 000 000 so&apos;m</p>
                        </li>
                      </ul>
                    </div>

                    <div className="p-[14px] col-span-2 border border-[#E6E5ED] rounded-[16px] inline-block">
                      <div className="flex gap-x-[10px] items-center">
                        <div>
                          <div
                            className={`relative  px-[1px] py-[6px] bg-white border w-[44px] h-[44px] bg-[length:40px_40px] bg-no-repeat bg-center  border-[#E6E5ED] rounded-[10px] inline-block`}
                            style={{
                              backgroundImage: "url(/icons/bojxona.svg)",
                            }}
                          ></div>
                        </div>

                        <p className="text-xs font-bold">
                          Davlat bojxona qo&apos;mitasi
                        </p>
                      </div>

                      <ul className="space-y-[8px] mt-[8px]">
                        <li className="text-xs flex justify-between items-center">
                          <p>O&apos;tgan oydagi savdolar soni:</p>

                          <p className="font-bold">20</p>
                        </li>

                        <li className="text-xs flex justify-between items-center">
                          <p>Narxi:</p>

                          <p className="font-bold">12 000 000 so&apos;m</p>
                        </li>
                      </ul>
                    </div>

                    <div className="p-[14px] col-span-2 border border-[#E6E5ED] rounded-[16px] inline-block">
                      <ul className="space-y-[13px] flex flex-col">
                        <li className="flex justify-between items-end">
                          <p className="text-xs font-bold">Maksimal narx:</p>
                          <div class="flex-grow border-t border-dotted mx-2"></div>
                          <p className="text-[#4B5157] text-xs font-medium">
                            {maximum}
                            so&apos;m
                          </p>
                        </li>

                        <li className="flex justify-between items-end">
                          <p className="text-xs font-bold">
                            O&apos;rtacha narx:
                          </p>
                          <div class="flex-grow border-t border-dotted mx-2"></div>
                          <p className="text-[#4B5157] text-xs font-medium">
                            {average}
                            so&apos;m
                          </p>
                        </li>

                        <li className="flex justify-between items-end">
                          <p className="text-xs font-bold">Minimal narx:</p>
                          <div class="flex-grow border-t border-dotted mx-2"></div>
                          <p className="text-[#4B5157] text-xs font-medium">
                            {minimum}
                            so&apos;m
                          </p>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {isLoadingMaterialAds || isFetchingMaterialAds ? (
              <ContentLoader />
            ) : (
              <div className="grid grid-cols-12">
                <div className="col-span-12 mt-[30px] mb-[16px]">
                  <h1 className="text-[32px] font-bold !font-anybody">
                    Boshqa e’lonlar
                  </h1>
                </div>
                <div className="col-span-12">
                  <div className="grid grid-cols-12 gap-[16px] p-[16px] font-gilroy bg-white  border border-[#E0E2F0] rounded-[12px] ">
                    <div className="col-span-12">
                      <h3 className="font-semibold text-sm mb-[6px] ">
                        Korxona nomi
                      </h3>

                      <div className="relative flex border rounded-[8px] ">
                        <input
                          onChange={debounce(function (e) {
                            setSearchQuery(e.target.value);
                          }, 500)}
                          type="text"
                          placeholder="Qidiring"
                          className="  w-full p-[10px]  "
                        />
                      </div>
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
                        {filteredData.map((item, index) => (
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
                              <Link
                                href={`/company/${get(item, "company_stir")}`}
                                className="underline-0 hover:underline transition-all duration-300"
                              >
                                {get(item, "company_name")}
                              </Link>
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
                              {get(item, "material_price").toFixed(2)}
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
                        ))}
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
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
