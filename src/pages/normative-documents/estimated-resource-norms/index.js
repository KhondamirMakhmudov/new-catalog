import Header from "@/components/header";
import Link from "next/link";
import { useRouter } from "next/router";
import RightIcon from "@/components/icons/right";
import { nth } from "lodash";
import { useState, useEffect } from "react";
import parse from "html-react-parser";

const Index = () => {
  const router = useRouter();
  const [responseData, setResponseData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://doc.mkinfo.uz/app_main/api/document/"
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setResponseData(data);
      } catch (error) {
        setError(error.message);
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
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

        {nth(
          responseData?.map((item) => (
            <div
              className="bg-white p-[30px] rounded-[20px] border-spacing-24 font-gilroy"
              key={item.id}
            >
              {parse(item.document)}
            </div>
          )),
          2
        )}
      </main>
    </div>
  );
};

export default Index;
