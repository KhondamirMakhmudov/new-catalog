import Header from "@/components/header";
import Link from "next/link";

import RightIcon from "@/components/icons/right";
import { head } from "lodash";
import { useEffect, useState } from "react";
import parse from "html-react-parser";
import Footer from "@/components/footer";
import { useTranslation } from "react-i18next";
import Image from "next/image";

const Index = ({ data }) => {
  const { t } = useTranslation();
  const [dataShnq, setDataShnq] = useState(null);

  const [openGroup, setOpenGroup] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openItems, setOpenItems] = useState({}); // itemlarni ochish/berkitish uchun
  const [openGroups, setOpenGroups] = useState({});

  useEffect(() => {
    fetch("https://shnk.tmsiti.uz/subsystems/")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Ma'lumotlarni yuklab bo‘lmadi");
        }
        return response.json();
      })
      .then((result) => {
        setDataShnq(result);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  // if (loading)
  //   return (
  //     <Main>
  //       <ContentLoader />
  //     </Main>
  //   );
  // if (error) return <p>Xatolik: {error}</p>;

  const toggleItem = (index) => {
    setOpenItems((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  const toggleGroup = (itemIndex, groupIndex) => {
    setOpenGroups((prev) => ({
      ...prev,
      [`${itemIndex}-${groupIndex}`]: !prev[`${itemIndex}-${groupIndex}`],
    }));
  };

  return (
    <div className="bg-[#F7F7F7] ">
      <Header />

      <main className="container mb-[46px]">
        <section className="mt-[16px] flex items-center space-x-[12px] font-gilroy">
          <button
            onClick={() => router.back()}
            className="text-[#262D33] text-sm font-semibold"
          >
            <div className="bg-[#9AA8BC] rounded-full p-[5px] rotate-180">
              <RightIcon color="white" />
            </div>
          </button>
          <Link href={"/"} className="text-[#262D33] text-sm font-semibold">
            Bosh sahifa
          </Link>
          <RightIcon color="#BCBFC2" />
          <Link className="text-[#0256BA] text-sm font-semibold" href={"#"}>
            Shaharsozlik normalari va qoidalari
          </Link>
        </section>

        <section className="my-[30px]">
          <h1 className="font-bold text-[32px] my-[16px] font-anybody">
            Shaharsozlik normalari va qoidalari
          </h1>

          {dataShnq?.map((item, itemIndex) => (
            <div
              key={itemIndex}
              className="border rounded-md p-4 col-span-12 mb-2"
            >
              {/* Title */}
              <div
                className="flex justify-between cursor-pointer"
                onClick={() => toggleItem(itemIndex)}
              >
                <h3 className="font-bold cursor-pointer text-lg">
                  {item.title}
                </h3>

                <Image
                  src={"/icons/arrow-up.svg"}
                  alt={"up-down"}
                  width={24}
                  height={24}
                  className={`md:w-[24px] md:h-[24px] w-[19px] h-[19px] transform duration-300 ${
                    openItems[itemIndex] ? " rotate-180" : ""
                  }`}
                />
              </div>

              {/* Groups (agar ochilgan bo‘lsa ko‘rsatiladi) */}
              {!openItems[itemIndex] && item.groups && (
                <div className="ml-4 mt-2">
                  {item.groups.map((group, groupIndex) => (
                    <div key={groupIndex} className=" p-2 mb-2 space-y-2">
                      {/* Group title */}
                      <div
                        className="flex justify-between cursor-pointer"
                        onClick={() => toggleGroup(itemIndex, groupIndex)}
                      >
                        <h4 className="font-semibold cursor-pointer">
                          {group.title}{" "}
                        </h4>
                        <Image
                          src={"/icons/arrow-up.svg"}
                          alt={"up-down"}
                          width={24}
                          height={24}
                          className={`md:w-[24px] md:h-[24px] w-[19px] h-[19px] transform duration-300 ${
                            openGroups[`${itemIndex}-${groupIndex}`]
                              ? " rotate-180"
                              : ""
                          }`}
                        />
                      </div>
                      <div className="w-full h-[1px] bg-gray-200"></div>

                      {/* Documents (agar ochilgan bo‘lsa ko‘rsatiladi) */}
                      {!openGroups[`${itemIndex}-${groupIndex}`] && (
                        <table className=" mt-2 border-collapse border border-gray-300 w-full text-left">
                          <thead>
                            <tr className="bg-gray-100">
                              <th className="border border-gray-300 px-4 py-2 w-1/5">
                                Шифр
                              </th>
                              <th className="border border-gray-300 px-4 py-2 w-3/5">
                                Ҳужжат номи
                              </th>
                              <th className="border border-gray-300 text-center px-4 py-2 w-1/5">
                                Ҳавола
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {group.documents &&
                              group.documents.map((doc, docIndex) => (
                                <tr
                                  key={docIndex}
                                  className="border border-gray-300"
                                >
                                  <td className="border border-gray-300 px-4 py-2 w-1/5">
                                    {doc.designation}
                                  </td>
                                  <td className="border border-gray-300 px-4 py-2 w-3/5">
                                    {doc.name_uz}
                                  </td>

                                  <td className="border border-gray-300 px-4 py-2 w-1/5 text-center">
                                    <a
                                      href={
                                        doc.url
                                          ? doc.url
                                          : doc.pdf_uz
                                          ? `https://main.tmsiti.uz/media/${doc.pdf_uz}`
                                          : "#"
                                      }
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="text-blue-600 underline"
                                    >
                                      Кўриш
                                    </a>
                                  </td>
                                </tr>
                              ))}
                          </tbody>
                        </table>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </section>
        <Footer />
      </main>
    </div>
  );
};

export default Index;
