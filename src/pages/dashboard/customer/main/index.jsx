import CustomerDashboard from "@/layouts/dashboard/customer/dashboard";
import Link from "next/link";
import Image from "next/image";
import ArrowRightButton from "@/components/buttons/arrow-right";
import useGetQuery from "@/hooks/api/useGetQuery";
import { KEYS } from "@/constants/key";
import { URLS } from "@/constants/url";

import { get, dropRight } from "lodash";
import { motion } from "framer-motion";
import dayjs from "dayjs";
import ContentLoader from "@/components/loader/content-loader";

const Index = () => {
  const {
    data: ordersOfCostumer,
    isLoading,
    isFetching,
  } = useGetQuery({
    key: KEYS.orderListCustomer,
    url: URLS.orderListCustomer,
  });

  return (
    <CustomerDashboard>
      <div className="col-span-9 p-[20px] border border-t border-l-0 border-b-0 border-r-0">
        <div className="grid grid-cols-12 gap-x-[16px]">
          <div
            className={
              "col-span-6 p-[32px] bg-[#EAF1FF] rounded-[16px] min-h-[480px] h-full  overflow-hidden section z-10"
            }
          >
            {/* Material va jihozlar */}
            <div className={"z-30"}>
              <h1 className={"font-bold text-[24px] text-[#21201F]"}>
                Material va jihozlar
              </h1>
              <p className={"font-medium text-[#21201FB2] mt-[16px] mb-[24px]"}>
                Global strategiyani o&apos;zgartirish mahsulotning sublimatsiya
                qilingan hayot aylanishini tejaydi. Amaliyot aniq
              </p>

              <Link href="/materials">
                <div
                  className={
                    " z-20 py-[13px] px-[24px]  items-center border border-[#D7D9DC] inline-flex rounded-[8px]"
                  }
                >
                  <p className={"text-[#21201FCC]"}>Qarang</p>
                  <Image
                    src={"/icons/arrow-right.svg"}
                    alt={"arrow-right"}
                    width={20}
                    height={20}
                    className={"ml-[16px]"}
                  />
                </div>
              </Link>
            </div>
            <div className={"absolute bg-section bottom-0 left-0 -z-30"}>
              <Image
                src={"/images/materials.png"}
                alt={"materials"}
                width={910}
                height={485}
              />
            </div>
          </div>

          <div className={"col-span-6 relative z-10"}>
            {/* machine-mechano */}
            <div
              className={
                "bg-[#FFE7DB] px-[32px] pt-[32px] pb-[34px] max-h-[230px] h-full rounded-[16px] section overflow-hidden cursor-pontiner z-10"
              }
            >
              <div className={"z-30"}>
                <h1 className={"font-bold text-[24px] text-[#21201F]"}>
                  Mashina va mexanizmlar
                </h1>
                <p
                  className={"font-medium text-[#21201FB2] mt-[16px] mb-[24px]"}
                >
                  Global strategiyani o&apos;zgartirish <br /> sublimatsiyani
                  tejaydi
                </p>

                <Link href="/machine-mechano">
                  <div
                    className={
                      "  py-[13px] px-[24px]  items-center border border-[#D7D9DC] inline-flex rounded-[8px] -z-30"
                    }
                  >
                    <p className={"text-[#21201FCC]"}>Qarang</p>
                    <Image
                      src={"/icons/arrow-right.svg"}
                      alt={"arrow-right"}
                      width={20}
                      height={20}
                      className={"ml-[16px]"}
                    />
                  </div>
                </Link>
              </div>

              <div className={"absolute bg-section bottom-0 right-0 -z-10"}>
                <Image
                  src={"/images/machine-mechano.png"}
                  alt={"machine-mechano"}
                  width={174}
                  height={217}
                  className={"ml-[16px]"}
                />
              </div>
            </div>

            <div className={"flex gap-x-[20px] mt-[20px]"}>
              {/* uskunalar va qurilmalar */}
              <div
                className={
                  " works flex-col bg-[#EDF4FC]  w-1/2 p-[24px] rounded-[16px] cursor-pointer transition-all duration-300"
                }
              >
                <h1 className={"font-bold text-[20px] flex-1 text-[#21201F]"}>
                  Uskuna va <br /> qurilmalar
                </h1>
                <p
                  className={"font-medium text-[#21201FB2] mt-[16px] mb-[24px]"}
                >
                  Global strategiyani o&apos;zgartirish tejaydi
                </p>

                <Link href="/technos">
                  <ArrowRightButton />
                </Link>
              </div>
              {/* Qurilish ishlari */}
              <div
                className={
                  "works bg-[#EDF4FC]  w-1/2 p-[24px] rounded-[16px] flex flex-col transition-all duration-300"
                }
              >
                <h1 className={"font-bold text-[20px] text-[#21201F] flex-1"}>
                  Qurilish ishlari
                </h1>
                <p
                  className={"font-medium text-[#21201FB2] mt-[16px] mb-[24px]"}
                >
                  Global strategiyani o&apos;zgartirish tejaydi
                </p>

                <Link href="/works">
                  <ArrowRightButton />
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-[30px]">
          <h2 className="text-[26px] font-bold font-gilroy mb-[16px]">
            Oxirgi ko’rilgan mahsulotlar
          </h2>

          {isLoading || isFetching ? (
            <ContentLoader />
          ) : (
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
                  {dropRight(get(ordersOfCostumer, "data.results", []), 6).map(
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
                            href={`/materials/${get(
                              item,
                              "material_csr_code"
                            )}`}
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
                              {dayjs(get(item, "update_at")).format(
                                "DD.MM.YYYY"
                              )}
                            </p>
                            <p>
                              {dayjs(get(item, "update_at")).format("HH:mm")}
                            </p>
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
          )}
        </div>
      </div>
    </CustomerDashboard>
  );
};

export default Index;
