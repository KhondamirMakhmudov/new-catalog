import useGetQuery from "@/hooks/api/useGetQuery";
import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { KEYS } from "@/constants/key";
import { URLS } from "@/constants/url";
import { get } from "lodash";
import Pagination from "@/components/pagination";
import DeliverDashboard from "@/layouts/dashboard/deliver/dashboard";
import MainSectionContent from "@/layouts/dashboard/deliver/components/main-page/content";
import RecentAds from "@/layouts/dashboard/deliver/components/main-page/recent-ads";
import dayjs from "dayjs";
import { useSession } from "next-auth/react";

const MyMaterials = () => {
  const { data: session } = useSession();
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(24);

  const { data: myWork } = useGetQuery({
    key: KEYS.myWork,
    url: URLS.myWork,
    params: {
      page,
      page_size: pageSize,
    },
    headers: { token: `${get(session, "user.token")}` },
    enabled: !!(
      get(session, "user.token") && get(session, "user.role") === "company"
    ),
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
                    Kompaniya
                  </th>
                  <th className=" text-[10px]  text-start  bg-white text-gray-900  font-bold ">
                    Resurs kodi
                  </th>
                  <th className=" text-start text-[10px]   bg-white text-gray-900  font-bold ">
                    Resurs nomi
                  </th>
                  <th className=" text-start text-[10px]   bg-white text-gray-900  font-bold  rounded-tr-[10px]">
                    O&apos;lchov Birligi
                  </th>
                  <th className=" text-[10px]  text-start  bg-white text-gray-900  font-bold ">
                    Narxi
                  </th>
                  <th className=" text-[10px]  text-start  bg-white text-gray-900  font-bold ">
                    Oxirgi o&apos;zgarish
                  </th>
                </tr>
              </thead>

              <tbody>
                {get(myWork, "data.results", []).map((item, index) => (
                  <tr
                    key={index}
                    className="text-sm odd:bg-[#EDF4FC] even:bg-white"
                  >
                    <td className=" font-medium text-xs py-[10px]  text-center">
                      {index + 1}
                    </td>
                    <td className=" font-medium text-xs py-[10px] max-w-[200px]">
                      {get(item, "company_name")}
                    </td>
                    <td className=" font-medium text-xs py-[10px]">
                      <Link
                        href={`/machine-mechano/${get(item, "work_code")}`}
                        className="underline-0 hover:underline transition-all duration-300"
                      >
                        {get(item, "work_code")}
                      </Link>
                    </td>
                    <td className=" font-medium text-xs py-[10px] max-w-[200px]">
                      {get(item, "work_name")}
                    </td>
                    <td className=" font-medium text-xs py-[10px] text-center">
                      {get(item, "work_measure")}
                    </td>
                    <td className=" font-medium text-xs py-[10px] text-center">
                      <div className="flex space-x-[4px]">
                        {get(item, "work_price")}
                        {get(item, "work_price_currency")}
                      </div>
                    </td>
                    <td className=" font-medium text-xs py-[10px] text-center">
                      <div className="flex space-x-[4px]">
                        <p>
                          {" "}
                          {dayjs(get(item, "work_updated_date")).format(
                            "DD.MM.YYYY"
                          )}
                        </p>
                        <p>
                          {dayjs(get(item, "work_updated_date")).format(
                            "HH:mm"
                          )}
                        </p>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </motion.table>
            <div className="w-full h-[1px] text-[#E2E2EA]"></div>
            <div className="py-[20px] px-[24px] bg-white rounded-br-[12px] rounded-bl-[12px] flex items-center justify-between">
              <div>
                <p className="text-sm text-[#9392A0]">
                  {get(myWork, "data.count")} tadan 1-
                  {get(myWork, "data.count")}
                  tasi ko&apos;rsatilgan
                </p>
              </div>

              <div>
                <Pagination
                  page={page}
                  pageCount={get(myWork, "data.total_pages", 0)}
                />
              </div>
            </div>
          </div>
        </RecentAds>
      </MainSectionContent>
    </DeliverDashboard>
  );
};

export default MyMaterials;
