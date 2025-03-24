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
import usePostQuery from "@/hooks/api/usePostQuery";
import { useSession } from "next-auth/react";
import { useSettingsStore } from "@/store";
import { useState } from "react";
import { config } from "@/config";

const Index = () => {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const [extractedData, setExtractedData] = useState(null);
  const token = useSettingsStore((state) => get(state, "token", null));
  const {
    data: listOrders,
    isLoading,
    isFetching,
  } = useGetQuery({
    key: KEYS.orderListCompany,
    url: URLS.orderListCompany,
    headers: { token: `${get(session, "user.token")}` },
    enabled: !!(
      get(session, "user.token") && get(session, "user.role") === "company"
    ),
  });

  const { mutate: sendOrderStatus, isLoadingSendOrderStatus } = usePostQuery({
    listKeyId: "company-info-one",
    hideSuccessToast: true,
  });

  const handleSendOrderStatus = (id, selectStatus) => {
    const selectedId = +id;
    sendOrderStatus({
      url: `${URLS.sendOrderStatus}${selectedId}/`,
      attributes: {
        order_status: `${selectStatus}`,
      },
      config: {
        headers: { token: `${get(session, "user.token")}` },
      },
    });
  };

  function handleListComment(row) {
    setIsOpen(true);
    console.log(row);
    fetch(`${config.API_URL}${URLS.customerComment}`, {
      method: "POST",
      body: JSON.stringify({
        product_category: row?.product_category,
        ad_id: parseInt(row?.ad_id),
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        const extractedData = data; // replace 'someSpecificField' with the actual field name
        console.log(extractedData);
        if (Array.isArray(extractedData)) {
          setExtractedData(extractedData);
        } else {
          console.error("Extracted data is not an array:", extractedData);
        }
      });
  }

  const openModal = () => {
    setIsOpen(!isOpen);
  };

  return (
    <DeliverDashboard>
      <MainContent>
        <div className="font-gilroy bg-white  border border-[#E0E2F0] rounded-[12px] mt-[12px]">
          <div className="overflow-x-auto">
            <motion.table
              className="w-full border-collapse border-[#D7D9E7] min-w-[800px]"
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
                  <th className=" text-[10px]  text-start  bg-white text-gray-900  font-bold rounded-tr-[10px]">
                    Sharhni ko&apos;rish
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
                      {get(item, "order_status") === "new_order" ? (
                        <div className={"flex flex-col gap-y-2"}>
                          <button
                            onClick={() =>
                              handleSendOrderStatus(get(item, "id"), "accepted")
                            }
                            className={
                              "bg-green-600 hover:bg-green-700 active:bg-green-500 text-white py-2 px-8 rounded-[6px]"
                            }
                          >
                            Qabul qilish
                          </button>
                          <button
                            onClick={() =>
                              handleSendOrderStatus(get(item, "id"), "canceled")
                            }
                            className={
                              "bg-red-600 hover:bg-red-700 active:bg-red-500 text-white py-2 px-8 rounded-[6px]"
                            }
                          >
                            Bekor qilish
                          </button>
                        </div>
                      ) : get(item, "order_status") === "accepted" ? (
                        <div>
                          <button
                            onClick={() =>
                              handleSendOrderStatus(get(item, "id"), "sent")
                            }
                            className={
                              "bg-blue-600  hover:bg-blue-700 active:bg-blue-500 text-white py-2 px-8 rounded-[6px] w-full"
                            }
                          >
                            Yuborish
                          </button>
                        </div>
                      ) : get(item, "order_status") === "sent" ? (
                        <div
                          className={
                            "flex flex-col items-center gap-y-2  rounded-[6px]"
                          }
                        >
                          <div className={"flex items-center gap-x-2"}>
                            <p>Mahsulot yo&apos;lda</p>
                          </div>
                        </div>
                      ) : get(item, "order_status") === "customer_canceled" ? (
                        <div
                          className={"flex items-center gap-x-2  rounded-[6px]"}
                        >
                          <p>Buyurtmachi mahsulotni bekor qildi</p>
                        </div>
                      ) : get(item, "order_status") === "customer_accepted" ? (
                        <div
                          className={"flex items-center gap-x-2  rounded-[6px]"}
                        >
                          <p>Mahsulot yetkazildi</p>
                        </div>
                      ) : get(item, "order_status") === "canceled" ? (
                        <div
                          className={"flex items-center gap-x-2  rounded-[6px]"}
                        >
                          <p>Buyurtmani bekor qildingiz</p>
                        </div>
                      ) : get(item, "order_status") === "on_way" ? (
                        <div
                          className={"flex items-center gap-x-2  rounded-[6px]"}
                        >
                          <p>Xabar yetkazildi</p>
                        </div>
                      ) : (
                        ""
                      )}
                    </td>
                    <td>
                      <div className={""}>
                        <button
                          onClick={() => {
                            handleListComment(item);
                          }}
                          className={
                            "text-center text-white bg-[#2563EB] py-2 px-4 rounded-md"
                          }
                        >
                          Ko&apos;rish
                        </button>

                        {Boolean(isOpen) && (
                          <div
                            className="fixed inset-0 z-50 flex items-center justify-center"
                            style={{ backgroundColor: "rgba(0, 0, 0, 0.3)" }}
                          >
                            <div className="bg-white p-8 rounded shadow-md w-[700px] h-[800px] overflow-y-scroll flex flex-col">
                              <div
                                className={
                                  "flex justify-between items-center mb-[30px]"
                                }
                              >
                                <p>Izoh qismi</p>

                                <button onClick={() => setIsOpen(!isOpen)}>
                                  <Image
                                    src={"/icons/x-close.svg"}
                                    alt={"modalcloser"}
                                    width={24}
                                    height={24}
                                    className={
                                      "float-right block cursor-pointer bg-white p-1 rounded-[2px]"
                                    }
                                  />
                                </button>
                              </div>

                              {extractedData?.map((item, index) => (
                                <div
                                  key={index}
                                  className={
                                    "border mb-[20px] shadow rounded-[10px]"
                                  }
                                >
                                  <div className={"flex gap-x-2 p-2 font-bold"}>
                                    <p>{get(item, "first_name")}</p>
                                    <p>{get(item, "last_name")}</p>
                                  </div>

                                  <p className={"text-lg mb-[15px] p-2"}>
                                    Mahsulotga berilgan baho
                                  </p>
                                  <div
                                    className={"mb-[10px] p-2"}
                                    style={{
                                      display: "flex",
                                      flexDirection: "row",
                                    }}
                                  >
                                    {[...Array(get(item, "rating"))].map(
                                      (star, index) => {
                                        return (
                                          <label
                                            key={index}
                                            style={{ display: "inline-block" }}
                                          >
                                            <input
                                              type="radio"
                                              name="rating"
                                              value={get(item, "rating")}
                                              style={{ display: "none" }}
                                            />
                                            <svg
                                              className="star"
                                              width="25"
                                              height="25"
                                              viewBox="0 0 24 24"
                                              fill={"#ffd700"}
                                            >
                                              <polygon points="12,2 15,8 22,9 17,14 18,21 12,17 6,21 7,14 2,9 9,8" />
                                            </svg>
                                          </label>
                                        );
                                      }
                                    )}
                                  </div>

                                  <div
                                    className={
                                      "w-full h-[1px] bg-gray-400 my-[20px]"
                                    }
                                  ></div>
                                  <p className={"text-lg p-2 mb-[15px]"}>
                                    Yetkazib beruvchiga berilgan baho
                                  </p>
                                  <div
                                    style={{
                                      display: "flex",
                                      flexDirection: "row",
                                    }}
                                    className={"p-2"}
                                  >
                                    {[
                                      ...Array(get(item, "rating_company")),
                                    ].map((star, index) => {
                                      return (
                                        <label
                                          key={index}
                                          style={{ display: "inline-block" }}
                                        >
                                          <input
                                            type="radio"
                                            name="rating"
                                            value={get(item, "rating_company")}
                                            style={{ display: "none" }}
                                          />
                                          <svg
                                            className="star"
                                            width="25"
                                            height="25"
                                            viewBox="0 0 24 24"
                                            fill={"#ffd700"}
                                          >
                                            <polygon points="12,2 15,8 22,9 17,14 18,21 12,17 6,21 7,14 2,9 9,8" />
                                          </svg>
                                        </label>
                                      );
                                    })}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </motion.table>
          </div>
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
