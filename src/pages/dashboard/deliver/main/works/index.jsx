import Link from "next/link";
import { useState } from "react";
import { KEYS } from "@/constants/key";
import { URLS } from "@/constants/url";
import { get } from "lodash";
import useGetQuery from "@/hooks/api/useGetQuery";
import { motion } from "framer-motion";
import Pagination from "@/components/pagination";
import DeliverDashboard from "@/layouts/dashboard/deliver/dashboard";
import MainSectionContent from "@/layouts/dashboard/deliver/components/main-page/content";
import RecentAds from "@/layouts/dashboard/deliver/components/main-page/recent-ads";

const MyWorks = () => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(24);

  const { data: works } = useGetQuery({
    key: KEYS.myWork,
    url: URLS.myWork,
    params: {
      page,
      page_size: pageSize,
    },
  });

  return (
    <DeliverDashboard>
      <MainSectionContent>
        <RecentAds>
          <div className="font-gilroy bg-white  border border-[#E0E2F0] rounded-[12px] mt-[12px]">
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
                    Material kodi
                  </th>
                  <th className=" text-start text-[10px]   bg-white text-gray-900  font-bold ">
                    Mahsulot Kodi
                  </th>
                  <th className=" text-start text-[10px]   bg-white text-gray-900  font-bold  rounded-tr-[10px]">
                    O&apos;lchov Birligi
                  </th>
                </tr>
              </thead>

              <tbody>
                {get(works, "data.results", []).map((item, index) => (
                  <tr
                    key={index}
                    className="text-sm odd:bg-[#EDF4FC] even:bg-white"
                  >
                    <td className=" font-medium text-xs py-[10px]  text-center">
                      {index + 1}
                    </td>
                    <td className=" font-medium text-xs py-[10px]">
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
                    <td className=" font-medium text-xs py-[10px] text-center">
                      {get(item, "material_measure")}
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
                  {get(works, "data.count")} tadan 1-{pageSize}
                  tasi ko&apos;rsatilgan
                </p>
              </div>

              <div>
                <Pagination
                  page={page}
                  pageCount={get(works, "data.total_pages", 0)}
                />
              </div>
            </div>
          </div>
        </RecentAds>
      </MainSectionContent>
    </DeliverDashboard>
  );
};

export default MyWorks;
