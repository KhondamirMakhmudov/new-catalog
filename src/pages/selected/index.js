import Header from "@/components/header";
import Image from "next/image";
import Link from "next/link";
import RightIcon from "@/components/icons/right";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import NavigationButtom from "@/components/bottom-navigation";

const Index = () => {
  const router = useRouter();
  return (
    <div className="bg-[#F7F7F7] min-h-screen">
      <NavigationButtom />
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
            Tanlangan
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
                  src={"/icons/archive-tick.svg"}
                  alt={"basket"}
                  width={36}
                  height={36}
                />
              </button>

              <h1 className="font-semibold text-[32px] mb-[16px]">
                Sizda tanlangan <br /> mahsulotlar yo&apos;q
              </h1>

              <p className="text-[#718096]">
                Mahsulotlarni saqlash uchun siz ularni mahsulotlar
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
