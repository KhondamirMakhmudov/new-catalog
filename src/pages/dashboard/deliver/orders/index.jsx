import MainContent from "@/layouts/dashboard/deliver/components/main-page/main";
import MyAdsAll from "@/layouts/dashboard/deliver/components/myAds-page/my-ads";
import DeliverDashboard from "@/layouts/dashboard/deliver/dashboard";
import Image from "next/image";
import { motion } from "framer-motion";
import { get } from "lodash";
import useGetQuery from "@/hooks/api/useGetQuery";
import { KEYS } from "@/constants/key";
import { URLS } from "@/constants/url";
import Link from "next/link";
import dayjs from "dayjs";

const Index = () => {
  const {
    data: listOrders,
    isLoading,
    isFetching,
  } = useGetQuery({ key: KEYS.orderListCompany, url: URLS.orderListCompany });

  console.log(listOrders);

  return (
    <DeliverDashboard>
      <MainContent>
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
                  Buyurtmachi
                </th>
                <th className=" text-[10px]  text-start  bg-white text-gray-900  font-bold ">
                  Resurs kodi
                </th>
                <th className=" text-start text-[10px]   bg-white text-gray-900  font-bold ">
                  Resurs nomi
                </th>
                <th className=" text-start text-[10px]   bg-white text-gray-900  font-bold  ">
                  Telefon raqami
                </th>
                <th className=" text-start text-[10px]   bg-white text-gray-900  font-bold  ">
                  Vaqti
                </th>
                <th className=" text-[10px]  text-start  bg-white text-gray-900  font-bold ">
                  Narxi
                </th>
                <th className=" text-[10px]  text-start  bg-white text-gray-900  font-bold ">
                  Miqdori
                </th>
                <th className=" text-[10px]  text-start  bg-white text-gray-900  font-bold rounded-tr-[10px]">
                  Buyurtmaning holati
                </th>
              </tr>
            </thead>

            <tbody>
              {get(listOrders, "data.results", []).map((item, index) => (
                <tr
                  key={index}
                  className="text-sm odd:bg-[#EDF4FC] even:bg-white"
                >
                  <td className=" font-medium text-xs py-[10px]  text-center">
                    {index + 1}
                  </td>
                  <td className=" font-medium text-xs py-[10px] max-w-[200px]">
                    {get(item, "first_name")} {get(item, "last_name")}
                  </td>
                  <td className=" font-medium text-xs py-[10px]">
                    <Link
                      href={`/materials/${get(item, "material_csr_code")}`}
                      className="underline-0 hover:underline transition-all duration-300"
                    >
                      {get(item, "product_code")}
                    </Link>
                  </td>
                  <td className=" font-medium text-xs py-[10px] max-w-[200px]">
                    {get(item, "product_name")}
                  </td>
                  <td className=" font-medium text-xs py-[10px] text-center">
                    {get(item, "phone")}
                  </td>
                  <td className=" font-medium text-xs py-[10px] text-center">
                    <div className="flex space-x-[4px]">
                      <p>
                        {" "}
                        {dayjs(get(item, "update_at")).format("DD.MM.YYYY")}
                      </p>
                      <p>{dayjs(get(item, "update_at")).format("HH:mm")}</p>
                    </div>
                  </td>
                  <td className=" font-medium text-xs py-[10px] text-center">
                    <div className="flex space-x-[4px]">
                      {get(item, "price")}
                      {get(item, "material_price_currency")}
                    </div>
                  </td>
                  <td className=" font-medium text-xs py-[10px] text-center">
                    {get(item, "quantity")}
                  </td>
                  <td className=" font-medium text-xs py-[10px] text-center">
                    {get(item, "order_status")}
                  </td>
                </tr>
              ))}
            </tbody>
          </motion.table>
          <div className="w-full h-[1px] text-[#E2E2EA]"></div>
          <div className="py-[20px] px-[24px] bg-white rounded-br-[12px] rounded-bl-[12px] flex items-center justify-between">
            {/* <div>
              <p className="text-sm text-[#9392A0]">
                {" "}
                {get(myMaterials, "data.count")} tadan 1-{pageSize}
                tasi ko&apos;rsatilgan
              </p>
            </div>

            <div>
              <Pagination
                page={page}
                pageCount={get(myMaterials, "data.total_pages", 0)}
              />
            </div> */}
          </div>
        </div>
      </MainContent>
    </DeliverDashboard>
  );
};

export default Index;
