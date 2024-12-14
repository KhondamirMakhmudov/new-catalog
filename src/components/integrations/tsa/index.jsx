import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import Image from "next/image";
import { get, debounce } from "lodash";
import useGetQuery from "@/hooks/api/useGetQuery";
import { URLS } from "@/constants/url";
import { KEYS } from "@/constants/key";
import { NumericFormat } from "react-number-format";
import Pagination from "@/components/pagination";
import SimpleLoader from "@/components/loader/simple-loader";
import ContentLoader from "@/components/loader/content-loader";

const TSAComponent = () => {
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const {
    data: technicsTSA,
    isLoading,
    isFetching,
  } = useGetQuery({
    key: KEYS.technicTSA,
    url: URLS.technicTSA,
    params: { page: page },
  });

  useEffect(() => {
    if (get(technicsTSA, "data.results", [])) {
      const searchResults = get(technicsTSA, "data.results", []).filter(
        (item) =>
          get(item, "name").toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredData(searchResults);
    }
  }, [searchQuery, technicsTSA]);
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
                  Mahsulot nomi
                </th>
                <th className=" text-start text-[10px]   bg-white text-gray-900  font-bold ">
                  Gost
                </th>
                <th className=" text-start text-[10px]   bg-white text-gray-900  font-bold ">
                  Kompaniya nomi
                </th>
                <th className=" text-center text-[10px] rounded-tr-[10px]   bg-white text-gray-900  font-bold ">
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
                  <td className=" font-medium text-xs py-[10px] max-w-[300px]">
                    {get(item, "name")}
                  </td>
                  <td className=" font-medium text-xs py-[10px] max-w-[300px]">
                    {get(item, "gost")}
                  </td>
                  <td className="text-start font-medium text-xs py-[10px]">
                    {get(item, "company_name")}
                  </td>

                  <td className=" font-medium  text-xs py-[10px] text-center">
                    <NumericFormat
                      thousandSeparator={" "}
                      displayType="text"
                      value={get(item, "price")}
                      className="bg-transparent"
                    />
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
                {get(technicsTSA, "data.count")} tadan{" "}
                {get(technicsTSA, "data.current_page_number")}-
                {get(technicsTSA, "data.items_per_page")} tasi ko&apos;rsatilgan
              </p>
            </div>

            <div>
              <Pagination
                page={page}
                pageCount={get(technicsTSA, "data.total_pages")}
                setPage={(prev) => setPage(prev)}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TSAComponent;
