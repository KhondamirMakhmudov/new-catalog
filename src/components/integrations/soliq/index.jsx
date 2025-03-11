import { get, debounce } from "lodash";
import useGetQuery from "@/hooks/api/useGetQuery";
import { URLS } from "@/constants/url";
import { KEYS } from "@/constants/key";
import { motion } from "framer-motion";
import { NumericFormat } from "react-number-format";
import Pagination from "@/components/pagination";
import { useState, useEffect } from "react";
import SimpleLoader from "@/components/loader/simple-loader";
import ContentLoader from "@/components/loader/content-loader";
import Link from "next/link";
const SoliqComponent = () => {
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  const {
    data: soliqData,
    isLoading,
    isFetching,
  } = useGetQuery({
    key: KEYS.soliqDataNew,
    url: URLS.soliqDataNew,
    params: {
      page: page,
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
                    Material kodi
                  </th>
                  <th className=" text-[10px]  text-start  bg-white text-gray-900  font-bold ">
                    Material nomi
                  </th>
                  <th className=" text-start text-[10px]   bg-white text-gray-900  font-bold ">
                    Mxik kodi
                  </th>
                  <th className=" text-start text-[10px]   bg-white text-gray-900  font-bold ">
                    O&apos;lchov birligi
                  </th>
                </tr>
              </thead>

              <tbody>
                {get(soliqData, "data.results", []).map((item, index) => (
                  <tr
                    key={index}
                    className="text-sm odd:bg-[#EDF4FC] even:bg-white"
                  >
                    <td className=" font-medium text-xs py-[10px]  text-center">
                      {(page - 1) * 20 + index + 1}
                    </td>
                    <td className=" font-medium text-xs text-[#0256BA] py-[10px]">
                      <Link
                        href={`/materials/${get(item, "material_csr_code")}`}
                        className="underline-0 hover:underline transition-all duration-300"
                      >
                        {get(item, "material_csr_code")}
                      </Link>
                    </td>
                    <td className=" font-medium text-xs py-[10px]">
                      {get(item, "material_name")}
                    </td>
                    <td className=" font-medium text-xs py-[10px]">
                      {get(item, "mxik_code")}
                    </td>
                    <td className=" font-medium text-center text-xs py-[10px]">
                      {get(item, "material_measure")}
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
                {get(soliqData, "data.count")} tadan 20 tasi ko&apos;rsatilgan
              </p>
            </div>

            <div>
              <Pagination
                pageCount={get(soliqData, "data.total_pages")}
                page={page}
                setPage={(prev) => setPage(prev)}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SoliqComponent;
