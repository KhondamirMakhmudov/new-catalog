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
import usePostQuery from "@/hooks/api/usePostQuery";
import { useState, useRef } from "react";
import { toast } from "react-hot-toast";
import Image from "next/image";
const Index = () => {
  const { data: session } = useSession();
  const [selectedStars, setSelectedStars] = useState(0);
  const [comments, setComments] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const productCategoryRef = useRef(null);
  const companyStirRef = useRef(null);
  const ratingValueRef = useRef(null);
  const companyRatingValueRef = useRef(null);
  const commentRef = useRef(null);
  const productIdRef = useRef(null);
  const token = useSettingsStore((state) => get(state, "token", null));
  const [rating, setRating] = useState(0);
  const [ratingCompany, setRatingCompany] = useState(0);
  const [hover, setHover] = useState(0);
  const [hoverRatingCompany, setHoverRatingCompany] = useState(0);

  const { data: user } = useGetQuery({
    key: KEYS.getCustomer,
    url: URLS.getCustomer,
    headers: { token: token ?? `${get(session, "user.token")}` },
    enabled: !!(get(session, "user.token") || token),
  });

  const handleClick = (ratingValue) => {
    setRating(ratingValue);
    ratingValue = ratingValueRef.current?.value;
  };

  const handleRatingCompany = (ratingValue) => {
    setRatingCompany(ratingValue);
    ratingValue = companyRatingValueRef.current?.value;
  };

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

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

  const { mutate: sendOrderStatus, isLoading: isLoadingSendOrderStatus } =
    usePostQuery({
      listKeyId: "customer-info-one",
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

  const { mutate: sendComment, isLoadingComment } = usePostQuery({
    listKeyId: "comment-one",
  });

  const handleSendComment = (row) => {
    console.log(row, "ROEw");
    const enteredProductCategory = row?.product_category;
    const selectedStars = rating;
    const enteredComment = commentRef.current?.value;
    const customer = parseInt(get(user, "data.id"));
    const productId = parseInt(row?.ad_id);
    const enteredRatingCompany = ratingCompany;
    const enteredCompanyStir = parseInt(row?.company);

    const commentInfo = {
      product_category: enteredProductCategory,
      ad_id: productId,
      comment: enteredComment,
      rating: selectedStars,
      customer: customer,
      company_stir: enteredCompanyStir,
      rating_company: enteredRatingCompany,
    };

    setComments(commentInfo);

    sendComment(
      {
        url: URLS.sendComment,
        attributes: commentInfo,
      },
      {
        onSuccess: () => {
          toast.success(
            "Siz bergan izoh va baho yetkazib beruvchiga yuborildi",
            { position: "top-right" }
          );
        },
      }
    );
    setIsOpen(false);
  };

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
              className="w-full border-collapse border-[#D7D9E7] min-w-[800px]"
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
                  <th className=" text-[10px]  text-center  bg-white text-gray-900  font-bold rounded-tr-[10px]">
                    Buyurtmaning holati
                  </th>
                  <th className=" text-[10px]  text-center  bg-white text-gray-900  font-bold rounded-tr-[10px]">
                    Sharh qoldirish
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
                        {get(item, "quantity")}
                      </td>
                      <td className=" font-medium text-xs py-[10px] text-center ">
                        <div className="flex space-x-[4px]">
                          {get(item, "order_status") === "new_order" ? (
                            <div className={"flex flex-col gap-y-2"}>
                              <button
                                onClick={() =>
                                  handleSendOrderStatus(
                                    get(item, "id"),
                                    "customer_canceled"
                                  )
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
                              <p
                                className={
                                  "bg-green-600 hover:bg-green-700 text-center active:bg-green-500 text-white py-2 px-8 rounded-[6px]"
                                }
                              >
                                Buyurtma qabul qilindi
                              </p>
                            </div>
                          ) : get(item, "order_status") === "sent" ? (
                            <div className={"rounded-[6px]"}>
                              <div
                                className={
                                  "flex bg-yellow-600 text-white mb-[10px] justify-center py-2 px-2 rounded-[6px] items-center gap-x-2"
                                }
                              >
                                <p>Mahsulot yo&apos;lda</p>
                              </div>
                              <button
                                onClick={() =>
                                  handleSendOrderStatus(
                                    get(item, "id"),
                                    "customer_accepted"
                                  )
                                }
                                className={
                                  "bg-green-600 w-full text-center hover:bg-green-700 active:bg-green-500 text-white py-2 px-8 rounded-[6px]"
                                }
                              >
                                Mahsulotni qabul qilish
                              </button>
                            </div>
                          ) : get(item, "order_status") ===
                            "customer_canceled" ? (
                            <div
                              className={
                                "flex items-center gap-x-2  rounded-[6px]"
                              }
                            >
                              <p>Buyurtmani bekor qildingiz</p>
                            </div>
                          ) : get(item, "order_status") === "canceled" ? (
                            <div
                              className={
                                "flex items-center gap-x-2  rounded-[6px]"
                              }
                            >
                              <p>Yetkazib beruvchi mahsulotni bekor qildi</p>
                            </div>
                          ) : get(item, "order_status") === "on_way" ? (
                            <div className={"text-center w-full mb-[15px]"}>
                              <p>Mahsulot yo&apos;lda</p>
                            </div>
                          ) : get(item, "order_status") ===
                            "customer_accepted" ? (
                            <div className={"text-center w-full mb-[15px]"}>
                              <p>Mahsulot qabul qilindi</p>
                            </div>
                          ) : (
                            ""
                          )}
                        </div>
                      </td>
                      <td>
                        <button
                          onClick={() => {
                            setIsOpen(item.id);
                          }}
                          className={
                            "text-center text-white bg-[#FF6A04] py-2 px-4 rounded-md"
                          }
                        >
                          Yuborish
                        </button>

                        {Boolean(isOpen) && (
                          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
                            <div className="bg-white p-8 rounded shadow-md w-[700px] h-auto flex flex-col">
                              <div
                                className={"flex justify-between items-center "}
                              >
                                <h1>Mahsulotni baholash</h1>

                                <Image
                                  onClick={closeModal}
                                  className={"cursor-pointer"}
                                  src={"/icons/x-close.svg"}
                                  alt={"close"}
                                  width={30}
                                  height={30}
                                />
                              </div>
                              <p className={"text-lg mb-[15px]"}>
                                Mahsulot borasida o&apos;z izohingizni
                                qoldiring.
                              </p>
                              <textarea
                                ref={commentRef}
                                rows={10}
                                placeholder={"Izoh qoldirish"}
                                className={
                                  "border p-3 shadow-lg rounded-[6px] mb-[20px] "
                                }
                              ></textarea>

                              <p className={"text-lg mb-[15px]"}>
                                Mahsulotni baholang
                              </p>
                              <div
                                className={"mb-[30px]"}
                                style={{
                                  display: "flex",
                                  flexDirection: "row",
                                }}
                              >
                                {[...Array(5)].map((star, index) => {
                                  const ratingValue = index + 1;

                                  return (
                                    <label
                                      key={index}
                                      style={{ display: "inline-block" }}
                                    >
                                      <input
                                        type="radio"
                                        name="rating"
                                        value={ratingValue}
                                        onClick={() => handleClick(ratingValue)}
                                        style={{ display: "none" }}
                                      />
                                      <svg
                                        className="star"
                                        width="25"
                                        height="25"
                                        viewBox="0 0 24 24"
                                        fill={
                                          ratingValue <= (hover || rating)
                                            ? "#ffd700"
                                            : "#ccc"
                                        }
                                        onMouseEnter={() =>
                                          setHover(ratingValue)
                                        }
                                        onMouseLeave={() => setHover(0)}
                                      >
                                        <polygon points="12,2 15,8 22,9 17,14 18,21 12,17 6,21 7,14 2,9 9,8" />
                                      </svg>
                                    </label>
                                  );
                                })}
                              </div>

                              <p className={"text-lg mb-[15px]"}>
                                Yetkazib beruvchini baholang
                              </p>
                              <div
                                style={{
                                  display: "flex",
                                  flexDirection: "row",
                                }}
                              >
                                {[...Array(5)].map((star, index) => {
                                  const companyRatingValue = index + 1;

                                  return (
                                    <label
                                      key={index}
                                      style={{ display: "inline-block" }}
                                    >
                                      <input
                                        type="radio"
                                        name="rating"
                                        value={companyRatingValue}
                                        onClick={() =>
                                          handleRatingCompany(
                                            companyRatingValue
                                          )
                                        }
                                        style={{ display: "none" }}
                                      />
                                      <svg
                                        className="star"
                                        width="25"
                                        height="25"
                                        viewBox="0 0 24 24"
                                        fill={
                                          companyRatingValue <=
                                          (hoverRatingCompany || ratingCompany)
                                            ? "#ffd700"
                                            : "#ccc"
                                        }
                                        onMouseEnter={() =>
                                          setHoverRatingCompany(
                                            companyRatingValue
                                          )
                                        }
                                        onMouseLeave={() =>
                                          setHoverRatingCompany(0)
                                        }
                                      >
                                        <polygon points="12,2 15,8 22,9 17,14 18,21 12,17 6,21 7,14 2,9 9,8" />
                                      </svg>
                                    </label>
                                  );
                                })}
                              </div>

                              <button
                                className={
                                  "bg-blue-500 hover:bg-blue-600 active:bg-blue-400 mt-[30px] text-white w-full text-lg py-2 rounded-[6px]"
                                }
                                onClick={() => handleSendComment(item)}
                              >
                                Yuborish
                              </button>
                            </div>
                          </div>
                        )}
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
