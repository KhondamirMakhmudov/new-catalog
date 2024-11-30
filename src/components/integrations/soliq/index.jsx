import { get, debounce } from "lodash";
import useGetQuery from "@/hooks/api/useGetQuery";
import { URLS } from "@/constants/url";
import { KEYS } from "@/constants/key";
import { motion } from "framer-motion";
import { NumericFormat } from "react-number-format";
import Pagination from "@/components/pagination";
import { useState, useEffect } from "react";
const SoliqComponent = () => {
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  const { data: soliqData } = useGetQuery({
    key: KEYS.soliqDatas,
    url: URLS.soliqDatas,
    params: {
      mxik_code: "06806001001000001",
    },
  });

  useEffect(() => {
    if (get(soliqData, "data.data", [])) {
      const searchResults = get(soliqData, "data.data", []).filter((item) =>
        get(item, "mxik_code").toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredData(searchResults);
    }
  }, [searchQuery, soliqData]);

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
                STIR raqam
              </th>
              <th className=" text-[10px]  text-start  bg-white text-gray-900  font-bold ">
                Mxik kodi
              </th>
              <th className=" text-start text-[10px]   bg-white text-gray-900  font-bold ">
                Mahsulotlar soni
              </th>
              <th className=" text-start text-[10px]   bg-white text-gray-900  font-bold ">
                Faktura sanasi
              </th>
              <th className=" text-start text-[10px]   bg-white text-gray-900  font-bold ">
                Yetkazib berish narxi
              </th>
              <th className=" text-start text-[10px] rounded-tr-[10px]   bg-white text-gray-900  font-bold ">
                Narxi (so’m)
              </th>
              <th className=" text-start text-[10px] rounded-tr-[10px]   bg-white text-gray-900  font-bold ">
                Narxi
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
                  {get(item, "tin")}
                </td>
                <td className=" font-medium text-xs py-[10px]">
                  {get(item, "mxik_code")}
                </td>
                <td className=" font-medium text-xs py-[10px]">
                  {get(item, "product_count")}
                </td>
                <td className=" font-medium text-xs py-[10px]">
                  {get(item, "factura_date")}
                </td>

                <td className="text-start font-medium text-xs py-[10px] max-w-[200px]">
                  <NumericFormat
                    thousandSeparator={" "}
                    displayType="text"
                    value={get(item, "delivery_sum")}
                    className="bg-transparent"
                  />
                </td>

                <td className="text-start font-medium text-xs py-[10px] max-w-[200px]">
                  <NumericFormat
                    thousandSeparator={" "}
                    displayType="text"
                    value={get(item, "vat_sum")}
                    className="bg-transparent"
                  />
                </td>

                <td className="text-start font-medium text-xs py-[10px] max-w-[200px]">
                  <NumericFormat
                    thousandSeparator={" "}
                    displayType="text"
                    value={get(item, "delivery_sum_with_vat")}
                    className="bg-transparent"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </motion.table>
        <div className="w-full h-[1px] text-[#E2E2EA] "></div>
        <div className="py-[20px] px-[24px] bg-white rounded-br-[12px] rounded-bl-[12px] flex items-center justify-between">
          <div></div>

          <div></div>
        </div>
      </div>
    </>
  );
};

export default SoliqComponent;
