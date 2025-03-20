import { useState } from "react";
import Link from "next/link";
import Header from "@/components/header";
import CustomerIcon from "@/components/icons/customer";
import DeliverIcon from "@/components/icons/deliver";
import RightIcon from "@/components/icons/right";
import { motion } from "framer-motion";
import { URLS } from "@/constants/url";
import { KEYS } from "@/constants/key";
import useGetQuery from "@/hooks/api/useGetQuery";
import { get } from "lodash";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import NavigationButtom from "@/components/bottom-navigation";

const Index = () => {
  const router = useRouter();
  const [selectPosition, setSelectPosition] = useState("");
  const [isScaled, setIsScaled] = useState(false);

  const searchParams = useSearchParams();
  const search = searchParams.get("code");
  console.log(search);

  const handleSelection = (select) => {
    setSelectPosition(select);

    setIsScaled(!isScaled);
  };

  const { data: oneIdLogin } = useGetQuery({
    key: KEYS.fastApiLogin,
    url: URLS.fastApiLogin,
  });
  console.log(oneIdLogin);

  return (
    <>
      <Header />
      <NavigationButtom />
      <main className="container">
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
          <Link
            className="text-[#0256BA] text-sm font-semibold"
            href={"/select-position"}
          >
            Kirish
          </Link>
        </section>
        <section className="font-gilroy max-w-[456px] mx-auto lg:mt-[130px] mt-[30px]">
          <div className="  flex-col ">
            <div className="text-center">
              <motion.h1
                initial={{ opacity: 0, translateY: "-50px" }}
                animate={{ opacity: 1, translateY: "0px" }}
                transition={{ duration: 0.3 }}
                className="text-[20px] lg:text-[32px] font-bold  text-[#1A202C]"
              >
                Qaysi turdagi foydalanuvchi bo&apos;lishni xohlayotganingizni
                ko&apos;rsating
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, translateY: "-40px" }}
                animate={{ opacity: 1, translateY: "0px" }}
                transition={{ duration: 0.3 }}
                className="text-sm lg:text-base font-medium   text-[#718096]"
              >
                Oldingi media kampaniyalari natijalarini hisobga olgan holda,
                xaridor konventsiyasi tarkibni to&apos;liq o&apos;zgartiradi
              </motion.p>
            </div>

            <div className="flex gap-[24px] justify-center items-center lg:flex-nowrap flex-wrap my-[30px]">
              <motion.button
                initial={{ scale: 0.01 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.01 }}
                onClick={() => handleSelection("client")}
                className={`${
                  selectPosition === "client"
                    ? "bg-[#0256BA] text-white"
                    : "bg-[#DFE8F2] text-[#1A202C]"
                }  transition-all duration-200 max-w-[256px] w-full rounded-[16px]   p-[24px] flex flex-col items-center cursor-pointer`}
              >
                <div
                  className={`p-[14px] ${
                    selectPosition === "client" ? "bg-white" : "bg-[#0256BA]"
                  } inline-block rounded-full`}
                >
                  <CustomerIcon
                    color={selectPosition === "client" ? "#0256BA" : "white"}
                  />
                </div>

                <h1 className="text-lg font-bold mt-[16px]">Buyurtmachi</h1>

                <p
                  className={`${
                    selectPosition === "client"
                      ? "text-[#84BCFE]"
                      : "text-[#4A678A]"
                  } text-xs text-center font-medium`}
                >
                  Siz qurilish materiallarini buyurtma qiluvchi kompaniyasiz
                </p>
              </motion.button>

              <motion.button
                initial={{ scale: 0.01 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.07 }}
                onClick={() => handleSelection("deliver")}
                className={`${
                  selectPosition === "deliver"
                    ? "bg-[#0256BA] text-white"
                    : "bg-[#DFE8F2] text-[#1A202C]"
                }  transition-all duration-200 max-w-[256px] w-full rounded-[16px]   p-[24px] flex flex-col items-center cursor-pointer`}
              >
                <div
                  className={`p-[14px] ${
                    selectPosition === "deliver" ? "bg-white" : "bg-[#0256BA]"
                  } inline-block rounded-full`}
                >
                  <DeliverIcon
                    color={selectPosition === "deliver" ? "#0256BA" : "white"}
                  />
                </div>

                <h1 className="text-lg font-bold mt-[16px]">
                  Yetkazib beruvchi
                </h1>

                <p
                  className={`${
                    selectPosition === "deliver"
                      ? "text-[#84BCFE]"
                      : "text-[#4A678A]"
                  } text-xs text-center font-medium`}
                >
                  Siz qurilish materiallarini yetkazib beruvchi kompaniyasiz
                </p>
              </motion.button>
            </div>
            {selectPosition === "client" ? (
              <Link href={"/auth/login"} className="w-full  ">
                <motion.button
                  initial={{ opacity: 0, translateY: "30px" }}
                  animate={{ opacity: 1, translateY: "0px" }}
                  transition={{ duration: 0.3 }}
                  className="bg-[#0256BA] rounded-[12px] w-full text-white font-semibold py-[15px]"
                >
                  Keyingi
                </motion.button>
              </Link>
            ) : selectPosition === "deliver" ? (
              <Link href={"/auth/e-imzo"} className="w-full mt-[30px] ">
                <motion.button
                  initial={{ opacity: 0, translateY: "30px" }}
                  animate={{ opacity: 1, translateY: "0px" }}
                  transition={{ duration: 0.3 }}
                  className="bg-[#0256BA] rounded-[12px] w-full text-white font-semibold py-[15px]"
                >
                  Keyingi
                </motion.button>
              </Link>
            ) : (
              ""
            )}
          </div>
        </section>
      </main>

      <div></div>

      {/* <footer className="container font-gilroy py-[48px]">
        <div className="flex justify-between">
          <div>
            <p className="text-[#718096] text-semibold">
              Qurilish Resurslari Milliy Klassifikatori 2024
            </p>
          </div>

          <div>
            <p className="text-[#718096] text-semibold">Copyright 2024</p>
          </div>
        </div>
      </footer> */}
    </>
  );
};

export default Index;
