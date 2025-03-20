import MainContent from "@/layouts/dashboard/customer/components/main-content";
import CustomerDashboard from "@/layouts/dashboard/customer/dashboard";
import useGetQuery from "@/hooks/api/useGetQuery";
import Link from "next/link";
import { KEYS } from "@/constants/key";
import { URLS } from "@/constants/url";
import { get, dropRight } from "lodash";
import { motion } from "framer-motion";
import dayjs from "dayjs";
import ContentLoader from "@/components/loader/content-loader";
import { useSession } from "next-auth/react";
import { useSettingsStore } from "@/store";
const Index = () => {
  const { data: session } = useSession();

  const token = useSettingsStore((state) => get(state, "token", null));
  const {
    data: ordersOfCostumer,
    isLoading,
    isFetching,
  } = useGetQuery({
    key: KEYS.orderListCustomer,
    url: URLS.orderListCustomer,
    headers: { token: token ?? `${get(session, "user.token")}` },
    enabled: !!(
      get(session, "user.token") && get(session, "user.role") === "customer"
    ),
  });

  if (isLoading || isFetching) {
    return (
      <CustomerDashboard>
        <MainContent>
          <ContentLoader />
        </MainContent>
      </CustomerDashboard>
    );
  }
  return (
    <CustomerDashboard>
      <MainContent>
        {" "}
        <div className="font-gilroy bg-white  border border-[#E0E2F0] rounded-[12px] mt-[12px]">
          <div className="overflow-x-auto">
            <motion.table
              className="w-full border-collapse border-[#D7D9E7] min-w-[600px]"
              initial={{ opacity: 0, translateY: "60px" }}
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
                    Yetkazib beruvchi
                  </th>
                  <th className=" text-[10px]  text-start  bg-white text-gray-900  font-bold ">
                    Resurs kodi
                  </th>
                  <th className=" text-start text-[10px]   bg-white text-gray-900  font-bold ">
                    Resurs nomi
                  </th>
                  <th className=" text-[10px]  text-start  bg-white text-gray-900  font-bold ">
                    Narxi
                  </th>

                  <th className=" text-[10px]  text-start  bg-white text-gray-900  font-bold ">
                    Oxirgi o&apos;zgarish
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
                {get(ordersOfCostumer, "data.results", []).map(
                  (item, index) => (
                    <tr
                      key={index}
                      className="text-sm odd:bg-[#EDF4FC] even:bg-white"
                    >
                      <td className=" font-medium text-xs py-[10px]  text-center rounded-bl-[10px]">
                        {index + 1}
                      </td>
                      <td className=" font-medium text-xs py-[10px] max-w-[200px]">
                        <Link href={`/company/${get(item, "company")}`}>
                          {get(item, "company_name")}
                        </Link>
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
                        {get(item, "price")}
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
                          {get(item, "quantity")}
                        </div>
                      </td>
                      <td className=" font-medium text-xs py-[10px] text-center ">
                        <div className="flex space-x-[4px]">
                          {get(item, "order_status")}
                        </div>
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </motion.table>
          </div>
        </div>
      </MainContent>
    </CustomerDashboard>
  );
};

export default Index;
