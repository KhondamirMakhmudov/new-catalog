import { get, debounce, drop } from "lodash";
import useGetQuery from "@/hooks/api/useGetQuery";
import { URLS } from "@/constants/url";
import { KEYS } from "@/constants/key";
import { motion } from "framer-motion";
import { NumericFormat } from "react-number-format";
import Pagination from "@/components/pagination";
import { useState, useEffect } from "react";
import ContentLoader from "@/components/loader/content-loader";
const MinistryComponent = () => {
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const {
    data: ministry,
    isLoading: isLoadingMinistry,
    isFetching: isFetchingMinistry,
  } = useGetQuery({
    key: KEYS.ministry,
    url: URLS.ministry,
    params: { page: page },
  });

  useEffect(() => {
    if (get(ministry, "data.results", [])) {
      const searchResults = get(ministry, "data.results", []).filter((item) =>
        get(item, "productName")
          .toLowerCase()
          .includes(searchQuery.toLowerCase())
      );
      setFilteredData(searchResults);
    }
  }, [searchQuery, ministry]);

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
      {isLoadingMinistry || isFetchingMinistry ? (
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
                  Mahsulot kodi
                </th>
                <th className=" text-[10px]  text-start  bg-white text-gray-900  font-bold ">
                  Mahsulot nomi
                </th>
                <th className=" text-start text-[10px]   bg-white text-gray-900  font-bold ">
                  INN
                </th>
                <th className=" text-start text-[10px]   bg-white text-gray-900  font-bold ">
                  Sana
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
                  key={get(item, "id")}
                  className="text-sm odd:bg-[#EDF4FC] even:bg-white"
                >
                  <td className=" font-medium text-xs py-[10px]  text-center">
                    {(page - 1) * get(ministry, "data.items_per_page", 0) +
                      index +
                      1}
                  </td>
                  <td className=" font-medium text-xs py-[10px]">
                    {get(item, "productCode")}
                  </td>
                  <td className=" font-medium text-xs py-[10px]">
                    {get(item, "productName")}
                  </td>
                  <td className=" font-medium text-xs py-[10px]">
                    {get(item, "inn")}
                  </td>
                  <td className=" font-medium text-xs py-[10px]">
                    {get(item, "lot_Date")}
                  </td>
                  <td className="text-start font-medium text-xs py-[10px] max-w-[200px]">
                    {get(item, "company_name")}
                  </td>

                  <td className=" font-medium text-xs py-[10px] text-center">
                    <NumericFormat
                      thousandSeparator={" "}
                      displayType="text"
                      value={get(item, "productPrice")}
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
                {get(ministry, "data.count")} tadan{" "}
                {get(ministry, "data.current_page_number")}-
                {get(ministry, "data.items_per_page")} tasi ko&apos;rsatilgan
              </p>
            </div>

            <div>
              <Pagination
                page={page}
                pageCount={get(ministry, "data.total_pages")}
                setPage={(prev) => setPage(prev)}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MinistryComponent;
