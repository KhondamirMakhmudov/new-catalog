import Image from "next/image";
import Link from "next/link";
import Pagination from "@/components/pagination";
import useGetQuery from "@/hooks/api/useGetQuery";
import { KEYS } from "@/constants/key";
import { URLS } from "@/constants/url";
import { motion } from "framer-motion";
import { get } from "lodash";
import { useState } from "react";
import ProjectPagination from "@/components/pagination/loyihalar-pagination";
import ContentLoader from "@/components/loader/content-loader";

const KindergardenProject = () => {
  const [limit] = useState(24);
  const [offset, setOffset] = useState(0);
  const {
    data: kinderGarden,
    isLoading,
    isFetching,
  } = useGetQuery({
    key: KEYS.kindergarden,
    url: URLS.kindergarden,
    params: { limit: limit, offset: offset },
  });

  const totalItems = get(kinderGarden, "data.count");
  const pageCount = Math.ceil(totalItems / limit);

  const handlePageClick = (event) => {
    const newOffset = event?.selected * limit;
    setOffset(newOffset);
  };
  return (
    <div>
      {isLoading || isFetching ? (
        <ContentLoader />
      ) : (
        <div className={"overflow-x-auto"}>
          <motion.table
            className="w-full border-collapse border-[#D7D9E7] min-w-[100px]"
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
                  Mahsulot Kodi
                </th>
                <th className=" text-start text-[10px] rounded-tr-[10px]   bg-white text-gray-900  font-bold ">
                  O&apos;lchov Birligi
                </th>
                {/* <th className=" text-start text-[10px] rounded-tr-[10px]  bg-white text-gray-900  font-bold ">
                Narxi
              </th> */}
              </tr>
            </thead>

            <tbody>
              {get(kinderGarden, "data.results", []).map((item, index) => (
                <tr
                  key={get(item, "id")}
                  className="text-sm odd:bg-[#EDF4FC] even:bg-white"
                >
                  <td className=" font-medium text-xs py-[10px]  text-center">
                    {offset + index + 1}
                  </td>
                  <td className=" font-medium text-xs py-[10px] text-[#0256BA]">
                    <Link href={`/materials/${get(item, "name")}`}>
                      {get(item, "name")}
                    </Link>
                  </td>
                  <td className=" font-medium text-xs py-[10px]">
                    {get(item, "code")}
                  </td>
                  <td className=" font-medium text-xs py-[10px] text-center">
                    {get(item, "measure")}
                  </td>
                  {/* <td className=" font-medium text-xs py-[10px]">
                  {get(item, "price")}
                </td> */}
                </tr>
              ))}
            </tbody>
          </motion.table>{" "}
        </div>
      )}
      <div className="w-full h-[1px] text-[#E2E2EA] "></div>
      <div className="py-[20px] px-[24px] bg-white rounded-br-[12px] rounded-bl-[12px] flex  lg:flex-row flex-col items-center justify-between">
        <div>
          <p className="text-sm text-[#9392A0]">
            {get(kinderGarden, "data.count")} tadan 1-{limit} tasi
            ko&apos;rsatilgan
          </p>
        </div>

        <div>
          <ProjectPagination
            pageCount={pageCount}
            onPageChange={handlePageClick}
          />
        </div>
      </div>
    </div>
  );
};

export default KindergardenProject;
