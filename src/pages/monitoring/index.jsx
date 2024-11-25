import Footer from "@/components/footer";
import Header from "@/components/header";
import Link from "next/link";
import RightIcon from "@/components/icons/right";
import HorizontalBarChart from "@/components/bar";
import MapOfUz from "@/components/icons/uz-map";
import useGetQuery from "@/hooks/api/useGetQuery";
import { KEYS } from "@/constants/key";
import { URLS } from "@/constants/url";
import { motion } from "framer-motion";
import { get } from "lodash";
import { NumericFormat } from "react-number-format";
import dayjs from "dayjs";
import Image from "next/image";

const Index = () => {
  const {
    data: monitoring,
    isLoading,
    isFetching,
  } = useGetQuery({
    key: KEYS.monitoring,
    url: URLS.monitoring,
  });
  return (
    <div className="bg-[#F7F7F7] ">
      <Header />

      <main className="container mb-[46px]">
        <section className="mt-[16px] flex items-center space-x-[12px] font-gilroy">
          <Link href={"/"} className="text-[#262D33] text-sm font-semibold">
            Bosh sahifa
          </Link>
          <RightIcon color="#BCBFC2" />
          <Link className="text-[#0256BA] text-sm font-semibold" href={"#"}>
            Monitoring
          </Link>
        </section>

        <section>
          <h1 className="text-[32px] font-bold text-[#21201F] my-[24px]">
            Mintaqalar bo&apos;yicha monitoring
          </h1>
          <div className=" bg-white p-[30px] rounded-[20px]">
            <div className="flex gap-x-[30px]  ">
              <div className="flex-1">
                <HorizontalBarChart />
              </div>
              <MapOfUz />
            </div>

            <div className="font-gilroy">
              <ul className="flex flex-wrap gap-[10px]">
                <li>
                  <button className="text-[16px] text-[#62677A] border border-[#D1D3DA] p-[8px] rounded-[6px] bg-[#F2F5FB] font-semibold">
                    Andijon viloyati
                  </button>
                </li>

                <li>
                  <button className="text-[16px] text-[#62677A] border border-[#D1D3DA] p-[8px] rounded-[6px] bg-[#F2F5FB] font-semibold">
                    Buxoro viloyati
                  </button>
                </li>

                <li>
                  <button className="text-[16px] text-[#62677A] border border-[#D1D3DA] p-[8px] rounded-[6px] bg-[#F2F5FB] font-semibold">
                    Fargʻona viloyati
                  </button>
                </li>

                <li>
                  <button className="text-[16px] text-[#62677A] border border-[#D1D3DA] p-[8px] rounded-[6px] bg-[#F2F5FB] font-semibold">
                    Jizzax viloyati
                  </button>
                </li>

                <li>
                  <button className="text-[16px] text-[#62677A] border border-[#D1D3DA] p-[8px] rounded-[6px] bg-[#F2F5FB] font-semibold">
                    Xorazm viloyati
                  </button>
                </li>

                <li>
                  <button className="text-[16px] text-[#62677A] border border-[#D1D3DA] p-[8px] rounded-[6px] bg-[#F2F5FB] font-semibold">
                    Samarqand viloyati
                  </button>
                </li>

                <li>
                  <button className="text-[16px] text-[#62677A] border border-[#D1D3DA] p-[8px] rounded-[6px] bg-[#F2F5FB] font-semibold">
                    Namangan viloyati
                  </button>
                </li>

                <li>
                  <button className="text-[16px] text-[#62677A] border border-[#D1D3DA] p-[8px] rounded-[6px] bg-[#F2F5FB] font-semibold">
                    Navoiy viloyati
                  </button>
                </li>

                <li>
                  <button className="text-[16px] text-[#62677A] border border-[#D1D3DA] p-[8px] rounded-[6px] bg-[#F2F5FB] font-semibold">
                    Qashqadaryo viloyati
                  </button>
                </li>

                <li>
                  <button className="text-[16px] text-[#62677A] border border-[#D1D3DA] p-[8px] rounded-[6px] bg-[#F2F5FB] font-semibold">
                    Sirdaryo viloyati
                  </button>
                </li>
              </ul>
            </div>
          </div>

          <div className="grid grid-cols-12 gap-x-[10px] mt-[24px] font-gilroy">
            <div className="col-span-12 bg-white  border border-[#E0E2F0] rounded-[12px] px-[16px] relative">
              <Image
                src={"/icons/search.svg"}
                alt="search"
                width={20}
                height={20}
                className="absolute left-[16px] top-[15px]"
              />

              <input
                type="text"
                className="w-full pl-[30px] text-sm py-[16px]"
                placeholder="Qidiring"
              />
            </div>
          </div>

          <div className="font-gilroy bg-white  border border-[#E0E2F0] rounded-[12px] mt-[24px]">
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
                    Hudud
                  </th>
                  <th className=" text-start text-[10px]   bg-white text-gray-900  font-bold ">
                    Kompaniya
                  </th>
                  <th className=" text-start text-[10px]   bg-white text-gray-900  font-bold ">
                    Resurs kodi
                  </th>
                  <th className=" text-start text-[10px]   bg-white text-gray-900  font-bold ">
                    Resurs nomi
                  </th>
                  <th className=" text-start text-[10px]   bg-white text-gray-900  font-bold ">
                    O&apos;lchov birligi
                  </th>
                  <th className=" text-start text-[10px]   bg-white text-gray-900  font-bold ">
                    Narxi (so’m)
                  </th>

                  <th className=" text-start text-[10px]   bg-white text-gray-900  font-bold ">
                    Oxirgi o&apos;zgarish
                  </th>
                </tr>
              </thead>

              <tbody>
                {get(monitoring, "data.materials")?.map((item, index) => (
                  <tr
                    key={index}
                    className="text-sm odd:bg-[#EDF4FC] even:bg-white"
                  >
                    <td className=" font-medium text-xs py-[10px]  text-center">
                      {index + 1}
                    </td>
                    <td className=" font-medium text-xs py-[10px]  text-start">
                      {get(item, "material_region_name")}
                    </td>

                    <td className=" font-medium text-xs py-[10px]  text-start max-w-[200px]">
                      <Link
                        href={`/company/${get(item, "company_stir")}`}
                        className="underline-0 hover:underline transition-all duration-300"
                      >
                        {get(item, "company_name")}
                      </Link>
                    </td>

                    <td className=" font-medium text-xs py-[10px]">
                      <Link
                        href={`/materials/${get(item, "material_name_id")}`}
                        className="underline-0 hover:underline transition-all duration-300"
                      >
                        {get(item, "material_name_id")}
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
                    <td className=" font-medium text-xs py-[10px] ">
                      <NumericFormat
                        thousandSeparator={" "}
                        className="bg-transparent max-w-[100px]"
                        value={
                          Number.isInteger(get(item, "material_price"))
                            ? get(item, "material_price")
                            : parseFloat(get(item, "material_price")).toFixed(2)
                        }
                      />
                    </td>
                    <td className=" font-medium text-xs py-[10px]">
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
                  </tr>
                ))}
              </tbody>
            </motion.table>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
