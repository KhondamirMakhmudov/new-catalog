import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import Image from "next/image";
import { get, debounce } from "lodash";
import useGetQuery from "@/hooks/api/useGetQuery";
import { URLS } from "@/constants/url";
import { KEYS } from "@/constants/key";
import { NumericFormat } from "react-number-format";
import Pagination from "@/components/pagination";
import dayjs from "dayjs";
import ContentLoader from "@/components/loader/content-loader";

const BojxonaComponent = () => {
  const limit = 100;
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  const { data: currency } = useGetQuery({
    key: KEYS.currency,
    url: URLS.currency,
  });
  const currencyUSD = currency?.data?.USD;
  const {
    data: customs,
    isLoading,
    isFetching,
  } = useGetQuery({
    key: KEYS.customs,
    url: URLS.customs,
    params: {
      limit: limit,
    },
  });

  useEffect(() => {
    if (get(customs, "data.results", [])) {
      const searchResults = get(customs, "data.results", []).filter((item) =>
        get(item, "codeName").toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredData(searchResults);
    }
  }, [searchQuery, customs]);
  return (
    <>
      <div className="grid grid-cols-12 gap-[16px] p-[16px] font-gilroy bg-white  border border-[#E0E2F0] rounded-[12px] ">
        <div className="col-span-12">
          <h3 className="font-semibold text-sm mb-[6px] ">Mahsulot nomi</h3>

          <input
            onChange={debounce(function (e) {
              setSearchQuery(e.target.value);
            }, 500)}
            type="text"
            placeholder="Tanlash"
            className="py-[10px] px-[15px] border w-full  rounded-[8px]"
          />
        </div>
      </div>
      {isLoading || isFetching ? (
        <ContentLoader />
      ) : (
        <div className="font-gilroy bg-white  border border-[#E0E2F0] rounded-[12px] mt-[16px]">
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
                    Guruh nomi
                  </th>
                  <th className=" text-start text-[10px]   bg-white text-gray-900  font-bold ">
                    Massasi
                  </th>
                  <th className=" text-start text-[10px]   bg-white text-gray-900  font-bold ">
                    Joylangan vaqti
                  </th>
                  <th className=" text-start text-[10px] rounded-tr-[10px]   bg-white text-gray-900  font-bold ">
                    Narxi (so’m)
                  </th>
                </tr>
              </thead>

              <tbody>
                {filteredData.map((item, index) => (
                  <tr
                    key={index}
                    className="text-sm odd:bg-[#EDF4FC] even:bg-white"
                  >
                    <td className=" font-medium text-xs py-[10px]  text-center">
                      {index + 1}
                    </td>
                    <td className=" font-medium text-xs py-[10px]">
                      {get(item, "codeTiftn")}
                    </td>
                    <td className=" font-medium text-xs py-[10px] max-w-[250px]">
                      {get(item, "codeName")}
                    </td>
                    <td className="text-start font-medium text-xs py-[10px]">
                      {get(item, "netMass")}
                    </td>
                    <td className="text-start font-medium text-xs py-[10px]">
                      <div className="flex space-x-[4px]">
                        <Image
                          src={"/icons/clock.svg"}
                          alt="clock"
                          width={16}
                          height={16}
                        />
                        <p>
                          {" "}
                          {dayjs(get(item, "create_date")).format("DD.MM.YYYY")}
                        </p>
                        <p>{dayjs(get(item, "create_date")).format("HH:mm")}</p>
                      </div>
                    </td>

                    <td className=" font-medium text-xs py-[10px] text-start">
                      <NumericFormat
                        thousandSeparator={" "}
                        displayType="text"
                        value={(
                          get(item, "value") *
                          1000 *
                          parseInt(currencyUSD)
                        ).toFixed(2)}
                        className="bg-transparent"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </motion.table>
          </div>
          <div className="w-full h-[1px] text-[#E2E2EA] "></div>
          <div className="py-[20px] px-[24px] bg-white rounded-br-[12px] rounded-bl-[12px] flex flex-col lg:flex-row items-center justify-between">
            <div>
              <p className="text-sm text-[#9392A0]">
                {" "}
                {get(customs, "data.count")} tadan{" "}
                {/* {get(technicsTSA, "data.current_page_number")}-
            {get(technicsTSA, "data.items_per_page")} tasi ko&apos;rsatilgan */}
              </p>
            </div>

            <div>
              <Pagination
                page={page}
                pageCount={get(customs, "data.total_pages")}
                setPage={(prev) => setPage(prev)}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BojxonaComponent;
