import Header from "@/components/header";
import Link from "next/link";
import { useRouter } from "next/router";
import RightIcon from "@/components/icons/right";
import { useState, useEffect } from "react";
import { get } from "lodash";
import Footer from "@/components/footer";

const Index = () => {
  const router = useRouter();

  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("https://shnk.tmsiti.uz/reglament/qurilish/")
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) =>
        console.error("Ma'lumotlarni olishda xatolik yuz berdi:", error)
      );
  }, []);

  console.log(get);

  return (
    <div className="bg-[#F7F7F7] ">
      <Header />

      <main className="container ">
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
            Qurilish reglamentlari
          </Link>
        </section>

        <section>
          <h1 className="font-bold text-[32px] my-[16px] font-anybody">
            Qurilish reglamentlari
          </h1>

          <table className="col-span-12 mt-2 border-collapse border border-gray-300 w-full text-left my-[30px]">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-4 py-2 text-center">
                  №
                </th>
                <th className="border border-gray-300 px-4 py-2 ">
                  Белгиланиши{" "}
                </th>
                <th className="border border-gray-300 px-4 py-2 ">
                  Қурилиш регламентлари номи
                </th>
                <th className="border border-gray-300 text-center px-4 py-2 ">
                  Ҳужжат
                </th>
              </tr>
            </thead>
            <tbody>
              {data.map((doc, docIndex) => (
                <tr key={docIndex} className="border border-gray-300">
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    {docIndex + 1}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 ">
                    {doc.designation}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 ">
                    {doc.name}
                  </td>

                  <td className="border border-gray-300 px-4 py-2  text-center">
                    <a
                      href={`https://main.tmsiti.uz/media/${doc.pdf_uz}` || "#"}
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
        </section>

        <Footer />
      </main>
    </div>
  );
};

export default Index;
