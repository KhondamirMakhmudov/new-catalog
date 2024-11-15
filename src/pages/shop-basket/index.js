import Header from "@/components/header";
import Image from "next/image";
import Link from "next/link";
import RightIcon from "@/components/icons/right";
import { motion } from "framer-motion";

const Index = () => {
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

        <section className="flex justify-center items-center translate-y-1/2">
          <motion.div
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
          </motion.div>
        </section>
      </main>
    </div>
  );
};

export default Index;
