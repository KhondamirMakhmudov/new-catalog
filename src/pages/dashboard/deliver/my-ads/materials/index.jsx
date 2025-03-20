import useGetQuery from "@/hooks/api/useGetQuery";
import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { KEYS } from "@/constants/key";
import { URLS } from "@/constants/url";
import { get, isNil } from "lodash";
import Pagination from "@/components/pagination";
import DeliverDashboard from "@/layouts/dashboard/deliver/dashboard";
import MyAdsAll from "@/layouts/dashboard/deliver/components/myAds-page/my-ads";
import MainContent from "@/layouts/dashboard/deliver/components/main-page/main";
import dayjs from "dayjs";
import Image from "next/image";
import usePutQuery from "@/hooks/api/usePutQuery";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";

const MyMaterials = () => {
  const { data: session } = useSession();
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(24);
  const [itemId, setItemId] = useState(null);

  const { mutate: deactivateRequest, isLoading: isLoadingDeActivate } =
    usePutQuery({
      listKeyId: KEYS.myMaterials,
    });

  const { data: myMaterials } = useGetQuery({
    key: KEYS.myMaterials,
    url: URLS.myMaterials,
    params: {
      page: page,
      page_size: pageSize,
    },
    headers: { token: `${get(session, "user.token")}` },
    enabled: !!(
      get(session, "user.token") && get(session, "user.role") === "company"
    ),
  });

  const deActivate = (_id) => {
    if (_id) {
      deactivateRequest(
        {
          url: URLS.deactivateMaterial,
          attributes: {
            id: _id,
          },
          config: {
            headers: { token: `${get(session, "user.token")}` },
          },
        },
        {
          onSuccess: () => {
            toast.success("E‘lon muvaffaqiyatli o‘chirildi!", {
              position: "top-center",
            });
            setItemId(null);
          },
        }
      );
    }
  };

  return (
    <DeliverDashboard>
      <MainContent>
        <MyAdsAll>
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
                  {get(myMaterials, "data.results", []).map((item, index) => (
                    <tr
                      key={index}
                      className="text-sm odd:bg-[#EDF4FC] even:bg-white"
                    >
                      <td className=" font-medium text-xs py-[10px]  text-center">
                        {(page - 1) * pageSize + index + 1}
                      </td>
                      <td className=" font-medium text-xs py-[10px] max-w-[200px]">
                        {get(item, "company_name")}
                      </td>
                      <td className=" font-medium text-xs py-[10px]">
                        <Link
                          href={`/materials/${get(item, "material_csr_code")}`}
                          className="underline-0 hover:underline transition-all duration-300"
                        >
                          {get(item, "material_code")}
                        </Link>
                      </td>
                      <td className=" font-medium text-xs py-[10px] max-w-[200px]">
                        {get(item, "material_name")}
                      </td>
                      <td className=" font-medium text-xs py-[10px] text-center">
                        <div className="flex space-x-[4px]">
                          <Image
                            src={"/icons/measure-basket.svg"}
                            alt="measure-basket"
                            width={16}
                            height={16}
                          />
                          <p>{get(item, "material_measure")}</p>
                        </div>
                      </td>
                      <td className=" font-medium text-xs py-[10px] text-center">
                        <div className="flex space-x-[4px]">
                          {get(item, "material_price")}
                          {get(item, "material_price_currency")}
                        </div>
                      </td>
                      <td className=" font-medium text-xs py-[10px] text-center">
                        <div className="flex space-x-[4px]">
                          <Image
                            src={"/icons/clock.svg"}
                            alt="clock"
                            width={16}
                            height={16}
                          />
                          <p>
                            {" "}
                            {dayjs(get(item, "material_updated_date")).format(
                              "DD.MM.YYYY"
                            )}
                          </p>
                          <p>
                            {dayjs(get(item, "material_updated_date")).format(
                              "HH:mm"
                            )}
                          </p>
                        </div>
                      </td>
                      <td>
                        <div className="flex gap-x-[4px]">
                          <Link
                            href={`/materials/${get(item, "material_code")}`}
                          >
                            <button className="bg-[#DAE8F7] rounded-[8px] p-[5px]">
                              <Image
                                src={"/icons/eye.svg"}
                                alt="clock"
                                width={18}
                                height={18}
                              />
                            </button>
                          </Link>
                          <Link href={`${URLS.materials}${get(item, "id")}`}>
                            <button className="bg-[#DAE8F7] rounded-[8px] p-[5px]">
                              <Image
                                src={"/icons/edit.svg"}
                                alt="clock"
                                width={18}
                                height={18}
                              />
                            </button>
                          </Link>
                          <button className="bg-[#E9E1E8] rounded-[8px] p-[5px]">
                            <Image
                              src={"/icons/delete.svg"}
                              alt="clock"
                              width={18}
                              onClick={() => setItemId(get(item, "id"))}
                              height={18}
                            />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </motion.table>
            </div>
            <div className="w-full h-[1px] text-[#E2E2EA]"></div>
            <div className="py-[20px] px-[24px] bg-white rounded-br-[12px] rounded-bl-[12px] flex items-center flex-col lg:flex-row justify-between">
              <div>
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
                  setPage={setPage}
                />
              </div>
            </div>
            {/* delete modal */}
            <div
              className={`fixed inset-0  z-50 bg-black bg-opacity-75 flex justify-center items-center ${
                isNil(itemId) ? "hidden" : "visible"
              }`}
            >
              <div
                className={
                  "w-[480px] p-[30px] rounded-[5px] bg-white flex justify-center items-center flex-col"
                }
              >
                <div className="p-[18px] rounded-full bg-[#FAEBEB] mx-auto inline-block ">
                  <Image
                    onClick={() => setItemId(null)}
                    src={"/images/info-circle.png"}
                    alt={"circle"}
                    width={24}
                    height={24}
                    className={"  cursor-pointer"}
                  />
                </div>

                <h1 className="font-bold text-[32px] mt-[10px] text-center">
                  E’lonni o‘chirasizmi?
                </h1>
                <p className="font-medium text-[#75758B] text-center">
                  E’lonni o‘chirish tugmasi bosilganidan keyin siz tanlagan
                  e’lon o’chadi
                </p>
                <br />

                <div
                  className={"grid grid-cols-4 gap-x-[20px] mt-[20px] w-full"}
                >
                  <button
                    onClick={() => deActivate(itemId)}
                    className="text-[#DD2033] bg-[#FAEBEB] py-[14px] col-span-2 rounded-[12px] w-full"
                  >
                    O&apos;chirish
                  </button>
                  <button
                    className="col-span-2 bg-[#0256BA] text-white rounded-[12px] w-full"
                    onClick={() => setItemId(null)}
                  >
                    Bekor qilish
                  </button>
                </div>
              </div>
            </div>
          </div>
        </MyAdsAll>
      </MainContent>
    </DeliverDashboard>
  );
};

export default MyMaterials;
