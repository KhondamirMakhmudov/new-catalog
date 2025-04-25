import Header from "@/components/header";
import Link from "next/link";
import { useRouter } from "next/router";
import RightIcon from "@/components/icons/right";
import { useState, useEffect } from "react";
import Image from "next/image";

const Index = () => {
  const router = useRouter();

  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch("https://shnk.tmsiti.uz/sren")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Ma'lumotlarni yuklab bo‘lmadi");
        }
        return response.json();
      })
      .then((result) => {
        setData(result);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  let rowNumber = 1;

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
            Smeta resurs normalari
          </Link>
        </section>

        <section>
          <h1 className="font-bold text-[32px] my-[16px] font-anybody">
            Smeta resurs normalari
          </h1>
        </section>
        <table className="table-auto border-collapse border border-black w-full text-sm">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-black p-2">№</th>
              <th className="border border-black p-2">Yangi ShNQ raqami</th>
              <th className="border border-black p-2">
                Yangidan ishlab chiqiladigan ShNQ nomi
              </th>
              <th className="border border-black p-2">ShNQ raqami</th>
              <th className="border border-black p-2">ShNQ nomi</th>
              <th className="border border-black p-2">Fayl</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, idx) =>
              item.sren_shnk.map((shnk, shnkIdx) => (
                <tr key={`${idx}-${shnkIdx}`}>
                  {shnkIdx === 0 ? (
                    <>
                      <td
                        className="border border-black p-2"
                        rowSpan={item.sren_shnk.length}
                      >
                        {rowNumber++}
                      </td>
                      <td
                        className="border border-black p-2"
                        rowSpan={item.sren_shnk.length}
                      >
                        <b>
                          <i>{item.sren_designation}</i>
                        </b>
                      </td>
                      <td
                        className="border border-black p-2"
                        rowSpan={item.sren_shnk.length}
                      >
                        {item.sren_name_uz}
                      </td>
                    </>
                  ) : null}
                  <td className="border border-black p-2">
                    <b>
                      <i>{shnk.sren_designation}</i>
                    </b>
                  </td>
                  <td className="border border-black p-2">
                    {shnk.sren_shnk_uz}
                  </td>
                  <td className="border border-black p-2">
                    {item.sren_pdf_uz ? (
                      <a
                        href={`https://main.tmsiti.uz/media/${item.sren_pdf_uz}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Image
                          src={"/icons/download.svg"}
                          alt="download"
                          width={24}
                          height={24}
                        />
                      </a>
                    ) : (
                      ""
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </main>
    </div>
  );
};

export default Index;
