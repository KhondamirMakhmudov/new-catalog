import Header from "@/components/header";
import Image from "next/image";
import Link from "next/link";
import RightIcon from "@/components/icons/right";
import { motion } from "framer-motion";
import { useCounter } from "@/context/counter";
import { useSession } from "next-auth/react";
import { useSettingsStore } from "@/store";
import { KEYS } from "@/constants/key";
import { URLS } from "@/constants/url";
import useGetQuery from "@/hooks/api/useGetQuery";
import { findCategoryName } from "@/utils";
import { ORDER_STATUS } from "@/constants/enums";
import { forEach, get, head, isEmpty, last, entries } from "lodash";
import usePostQuery from "@/hooks/api/usePostQuery";
import { NumericFormat } from "react-number-format";
import toast from "react-hot-toast";

const Index = () => {
  const { state, dispatch } = useCounter();
  const { data: session } = useSession();
  const token = useSettingsStore((state) => get(state, "token", null));

  const { data: currency } = useGetQuery({
    key: KEYS.currency,
    url: URLS.currency,
  });

  const { data: user } = useGetQuery({
    key: KEYS.getCustomer,
    url: URLS.getCustomer,
    headers: { token: token ?? `${get(session, "user.token")}` },
    enabled: !!(get(session, "user.token") || token),
  });

  const { mutate: sendOrder, isLoading: isLoadingOrder } = usePostQuery({
    listKeyId: "order-one",
  });

  const handleIncrement = (product) => {
    dispatch({ type: "INCREMENT", payload: JSON.stringify(product) });
  };

  const handleDecrement = (product) => {
    dispatch({ type: "DECREMENT", payload: JSON.stringify(product) });
    if (state.count <= 0) {
      state.count = 0;
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    forEach(entries(state), (item) => {
      const customer = parseInt(get(user, "data.id"), 10);
      const phone = get(user, "data.phone");

      const attributes = {
        customer: customer,
        company_name: get(JSON.parse(head(item)), "company_name"),
        product_category: findCategoryName(JSON.parse(head(item))),
        ad_id: get(JSON.parse(head(item)), "id"),
        company: get(JSON.parse(head(item)), "company_stir"),
        product_code: get(
          JSON.parse(head(item)),
          `${findCategoryName(JSON.parse(head(item)))}_name_id`
        ),
        product_name: get(
          JSON.parse(head(item)),
          `${findCategoryName(JSON.parse(head(item)))}_name`
        ),
        phone: phone,
        price: get(
          JSON.parse(head(item)),
          `${
            findCategoryName(JSON.parse(head(item))) === "mmechano"
              ? "mmechano_rent"
              : findCategoryName(JSON.parse(head(item))) === "smallmechano"
              ? "smallmechano_rent"
              : findCategoryName(JSON.parse(head(item)))
          }_price`
        ),
        order_status: ORDER_STATUS.new_order,
        quantity: parseInt(last(item)),
      };

      console.log(findCategoryName(JSON.parse(head(item))));

      sendOrder(
        { url: URLS.sendOrders, attributes: attributes },
        {
          onSuccess: () => {
            toast.success("Jarayon muvafaqqiyatli yakunlandi!", {
              position: "top-center",
            });
          },
        }
      );
    });
  };
  return (
    <div className="bg-[#F7F7F7] min-h-screen">
      <Header />

      <main className="container mb-[46px]">
        <section className="mt-[16px] flex items-center space-x-[12px] font-gilroy">
          <Link href={"/"} className="text-[#262D33] text-sm font-semibold">
            Bosh sahifa
          </Link>
          <RightIcon color="#BCBFC2" />
          <Link className="text-[#0256BA] text-sm font-semibold" href={"#"}>
            Savat
          </Link>
        </section>

        <section className="">
          <div className="flex my-[16px] items-baseline gap-x-[20px]">
            <h1 className="font-bold text-[32px]  font-anybody">Savat</h1>
            <p className="text-[#718096] font-medium">2 ta mahsulot</p>
          </div>

          <div className="grid grid-cols-12 gap-x-[30px]">
            <div className="col-span-8 font-gilroy bg-white  border border-[#E0E2F0] rounded-[12px] self-start">
              <div>
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

                      <th className=" text-start text-[10px]   bg-white text-gray-900  font-bold ">
                        Kompaniya
                      </th>

                      <th className=" text-start text-[10px]   bg-white text-gray-900  font-bold ">
                        Resurs nomi
                      </th>

                      <th className=" text-start text-[10px]   bg-white text-gray-900  font-bold ">
                        Narxi (so’m)
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {Object.entries(state).map((item, index) => (
                      <tr
                        key={index}
                        className="text-sm odd:bg-[#EDF4FC] even:bg-white"
                      >
                        <td className=" font-medium text-xs py-[10px]  text-center">
                          {index + 1}
                        </td>

                        <td className=" font-medium text-xs py-[10px]  text-start max-w-[200px]">
                          <Link
                            href={`/company/${get(item, "company_stir")}`}
                            className="underline-0 hover:underline transition-all duration-300"
                          >
                            {get(JSON.parse(head(item)), "company_name")}
                          </Link>

                          <p className={"hidden"}>
                            {get(JSON.parse(head(item)), "company_stir")}
                          </p>
                          <p className={"hidden"}>
                            {get(JSON.parse(head(item)), "id")}
                          </p>
                        </td>

                        <td className="hidden">
                          <p className={"hidden"}>
                            {get(JSON.parse(head(item)), "material_name_id")
                              ? "material"
                              : get(JSON.parse(head(item)), "mmechano_name_id")
                              ? "mmechano"
                              : get(JSON.parse(head(item)), "techno_name_id")
                              ? "techno"
                              : get(JSON.parse(head(item)), "smallmechano_code")
                              ? "smallmechano"
                              : get(JSON.parse(head(item)), "work_name_id")
                              ? "work"
                              : ""}
                          </p>
                        </td>

                        <td className="hidden">
                          {get(JSON.parse(head(item)), "material_name_id")
                            ? "material"
                            : get(JSON.parse(head(item)), "mmechano_name_id")
                            ? "mmechano"
                            : get(JSON.parse(head(item)), "techno_name_id")
                            ? "techno"
                            : get(JSON.parse(head(item)), "material_name_id")
                            ? "work"
                            : ""}
                        </td>

                        <td className=" font-medium text-xs py-[10px] max-w-[200px]">
                          <p
                            className={`text-xs  ${
                              isEmpty(
                                get(JSON.parse(head(item)), "material_name")
                              )
                                ? "hidden"
                                : "visible"
                            }`}
                          >
                            {get(JSON.parse(head(item)), "material_name")}
                          </p>

                          <p
                            className={`text-xs ${
                              isEmpty(
                                get(JSON.parse(head(item)), "techno_name")
                              )
                                ? "hidden"
                                : "visible"
                            } font-bold`}
                          >
                            {get(JSON.parse(head(item)), "techno_name")}
                          </p>
                          <p
                            className={`text-xs ${
                              isEmpty(get(JSON.parse(head(item)), "work_name"))
                                ? "hidden"
                                : "visible"
                            } font-bold`}
                          >
                            {get(JSON.parse(head(item)), "work_name")}
                          </p>
                          <p
                            className={`text-xs ${
                              isEmpty(
                                get(JSON.parse(head(item)), "mmechano_name")
                              )
                                ? "hidden"
                                : "visible"
                            } font-bold`}
                          >
                            {get(JSON.parse(head(item)), "mmechano_name")}
                          </p>
                        </td>

                        <td className=" font-medium text-xs py-[10px] ">
                          <p
                            className={`${
                              isEmpty(
                                get(JSON.parse(head(item)), "material_name")
                              )
                                ? "hidden"
                                : "visible"
                            }`}
                          >
                            <NumericFormat
                              displayType={"text"}
                              thousandSeparator={" "}
                              value={(
                                get(
                                  JSON.parse(head(item)),
                                  "material_price",
                                  0
                                ) *
                                last(item) *
                                get(
                                  currency,
                                  `data[${get(
                                    JSON.parse(head(item)),
                                    "material_price_currency"
                                  )}]`,
                                  1
                                )
                              ).toFixed(2)}
                              suffix={` so'm / ${get(
                                JSON.parse(head(item)),
                                "material_measure"
                              )}`}
                            />
                          </p>
                          <p
                            className={`${
                              isEmpty(
                                get(JSON.parse(head(item)), "techno_name")
                              )
                                ? "hidden"
                                : "visible"
                            }`}
                          >
                            <NumericFormat
                              displayType={"text"}
                              thousandSeparator={" "}
                              value={(
                                get(JSON.parse(head(item)), "techno_price", 0) *
                                last(item) *
                                get(
                                  currency,
                                  `data[${get(
                                    JSON.parse(head(item)),
                                    "techno_price_currency"
                                  )}]`,
                                  1
                                )
                              ).toFixed(2)}
                              suffix={` so'm / ${get(
                                JSON.parse(head(item)),
                                "techno_measure"
                              )}`}
                            />
                          </p>
                          <p
                            className={`${
                              isEmpty(
                                get(JSON.parse(head(item)), "mmechano_name")
                              )
                                ? "hidden"
                                : "visible"
                            }`}
                          >
                            <NumericFormat
                              displayType={"text"}
                              thousandSeparator={" "}
                              value={(
                                get(
                                  JSON.parse(head(item)),
                                  "mmechano_rent_price",
                                  0
                                ) *
                                last(item) *
                                get(
                                  currency,
                                  `data[${get(
                                    JSON.parse(head(item)),
                                    "mmechano_rent_price_currency"
                                  )}]`,
                                  1
                                )
                              ).toFixed(2)}
                              suffix={` so'm / ${get(
                                JSON.parse(head(item)),
                                "mmechano_measure"
                              )}`}
                            />
                          </p>

                          <p
                            className={`${
                              isEmpty(get(JSON.parse(head(item)), "work_name"))
                                ? "hidden"
                                : "visible"
                            }`}
                          >
                            <NumericFormat
                              displayType={"text"}
                              thousandSeparator={" "}
                              value={(
                                get(JSON.parse(head(item)), "work_price", 0) *
                                last(item) *
                                get(
                                  currency,
                                  `data[${get(
                                    JSON.parse(head(item)),
                                    "work_price_currency"
                                  )}]`,
                                  1
                                )
                              ).toFixed(2)}
                              suffix={` so'm / ${get(
                                JSON.parse(head(item)),
                                "work_measure"
                              )}`}
                            />
                          </p>
                        </td>

                        <td>
                          <div className="flex items-center gap-x-[4px]">
                            <button
                              onClick={() =>
                                handleDecrement(JSON.parse(head(item)))
                              }
                              className={
                                "p-[5px] bg-[#DAE8F7] rounded-[8px] active:scale-110 scale-100 transition-all duration-200"
                              }
                            >
                              <Image
                                src={"/icons/minus-circle.svg"}
                                alt={"minus-circle"}
                                width={20}
                                height={20}
                              />
                            </button>
                            <p className={"p-1 inline-flex  text-[#28366D]"}>
                              {last(item)}
                            </p>
                            <button
                              onClick={() =>
                                handleIncrement(JSON.parse(head(item)))
                              }
                              className={
                                "p-[5px] bg-[#DAE8F7] rounded-[8px] active:scale-110 scale-100 transition-all duration-200"
                              }
                            >
                              <Image
                                src={"/icons/add-circle.svg"}
                                alt={"add-circle"}
                                width={20}
                                height={20}
                              />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </motion.table>
              </div>
            </div>

            <div className="col-span-4 font-gilroy bg-white  border border-[#E0E2F0] rounded-[12px] p-[20px]">
              <h1 className="font-bold text-[24px] mb-[20px]">
                Buyurtma tafsilotlari
              </h1>

              <ul className="space-y-[12px]">
                <li>
                  <p className="text-sm font-medium text-[#718096]">
                    Mahsulot miqdori
                  </p>
                </li>

                <li>
                  <p className="text-sm font-medium text-[#718096]">
                    Mahsulot narxlari
                  </p>
                </li>

                <li>
                  <p className="text-sm font-medium text-[#718096]">
                    Yetkazib berish narxi
                  </p>
                </li>
              </ul>

              <div className="bg-[#E5E7E9] h-[1px] w-full my-[20px]"></div>

              <div className="font-semibold text-xl flex justify-between">
                <p>Jami</p>
                <p> so&apos;m</p>
              </div>

              <button
                onClick={onSubmit}
                className="py-[15px] bg-[#0256BA] rounded-[12px] w-full text-white mt-[20px]"
              >
                Buyurtma berish
              </button>
            </div>
          </div>
          {/* <motion.div
            initial={{ scale: 0.01 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3 }}
            className="max-w-[510px]  text-center"
          >
            <div className="bg-white font-gilroy p-[40px] rounded-[16px]">
              <button
                className={
                  "p-[16px] bg-[#EBF2FA] rounded-[8px] active:scale-110 scale-100 transition-all duration-200 mb-[24px]"
                }
              >
                <Image
                  src={"/icons/basket.svg"}
                  alt={"basket"}
                  width={36}
                  height={36}
                />
              </button>

              <h1 className="font-semibold text-[32px] mb-[16px]">
                Sizda bo&apos;sh savat bor
              </h1>

              <p className="text-[#718096]">
                Savatga mahsulot qo&apos;shish uchun uni mahsulotlar
                ro&apos;yxatidan tanlashingiz kerak.
              </p>
            </div>
          </motion.div> */}
        </section>
      </main>
    </div>
  );
};

export default Index;
