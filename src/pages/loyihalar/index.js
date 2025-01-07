import Header from "@/components/header";
import Link from "next/link";
import RightIcon from "@/components/icons/right";
import Image from "next/image";
import { motion } from "framer-motion";
import Footer from "@/components/footer";
import { useRouter } from "next/router";

const Index = () => {
  const router = useRouter();
  return (
    <div className="bg-[#F7F7F7] min-h-screen">
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
          <Link
            className="text-[#0256BA] text-sm font-semibold"
            href={"/select-position"}
          >
            Loyihalar
          </Link>
        </section>

        <section>
          <h1 className="text-[32px] font-bold my-[16px]">Loyihalar</h1>

          <ul className="grid grid-cols-12 gap-[30px]">
            <motion.li
              initial={{ scale: 0.1 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.9 }}
              className="col-span-6 bg-white  rounded-[30px]"
            >
              <div
                className={
                  "bg-white flex flex-col p-[32px] min-h-[280px] rounded-[30px] relative"
                }
              >
                <div className="absolute bottom-0 right-0 p-[24px]">
                  <Image
                    src={"/images/kindergarten.png"}
                    alt={"kindergarten"}
                    width={150}
                    height={120}
                    className={"ml-[16px]"}
                  />
                </div>
                <h1 className="text-[28px] font-bold text-[#21201F]">
                  Bog&apos;cha
                </h1>
                <p
                  className={
                    "text-sm font-normal text-[#9392A0] line-clamp-3 flex-1 mt-[10px] opacity-0"
                  }
                >
                  Biz to&apos;y rejalashtiruvchisi bilan erta suhbatlashdik biz
                  to&apos;y rejalashtiruvchisi Rano Artykova bilan kelin va
                  kuyovlar o&apos;rtasidagi ziddiyatlar, keraksiz urf-odatlar va
                  keyingi sevgi haqida suhbatlashdik
                </p>
                <Link href="/loyihalar/1">
                  <div
                    className={
                      "  py-[14px] px-[24px]  hover:text-white text-[#21201FCC] hover:bg-[#0256BA] bg-white items-center border border-[#D7D9DC] inline-flex rounded-[8px] transition-all duration-300"
                    }
                  >
                    <p className={""}>Batafsil</p>
                  </div>
                </Link>
              </div>
            </motion.li>
            <motion.li
              initial={{ scale: 0.1 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3 }}
              className="col-span-6 bg-white  rounded-[30px]"
            >
              <div
                className={
                  " flex flex-col p-[32px] min-h-[280px] rounded-[30px] relative"
                }
              >
                <div className="absolute bottom-0 right-0 p-[24px]">
                  <Image
                    src={"/images/school.png"}
                    alt={"school"}
                    width={150}
                    height={120}
                    className={"ml-[16px]"}
                  />
                </div>
                <h1 className="text-[28px] font-bold text-[#21201F]">Maktab</h1>
                <p
                  className={
                    "text-sm font-normal text-[#9392A0] line-clamp-3 flex-1 mt-[10px] opacity-0"
                  }
                >
                  Biz to&apos;y rejalashtiruvchisi bilan erta suhbatlashdik biz
                  to&apos;y rejalashtiruvchisi Rano Artykova bilan kelin va
                  kuyovlar o&apos;rtasidagi ziddiyatlar, keraksiz urf-odatlar va
                  keyingi sevgi haqida suhbatlashdik
                </p>
                <Link href="/loyihalar/1">
                  <div
                    className={
                      "  py-[14px] px-[24px]  hover:text-white text-[#21201FCC] hover:bg-[#0256BA] bg-white items-center border border-[#D7D9DC] inline-flex rounded-[8px] transition-all duration-300"
                    }
                  >
                    <p className={""}>Batafsil</p>
                  </div>
                </Link>
              </div>
            </motion.li>

            <motion.li
              initial={{ scale: 0.1 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.6 }}
              className="col-span-6 bg-white rounded-[30px]"
            >
              <div
                className={
                  "bg-white flex flex-col p-[32px] min-h-[280px] rounded-[30px] relative"
                }
              >
                <div className="absolute bottom-0 right-0 p-[24px]">
                  <Image
                    src={"/images/medicine.png"}
                    alt={"medicine"}
                    width={150}
                    height={120}
                    className={"ml-[16px]"}
                  />
                </div>
                <h1 className="text-[28px] font-bold text-[#21201F]">
                  Poliklinika
                </h1>
                <p
                  className={
                    "text-sm font-normal text-[#9392A0] line-clamp-3 flex-1 mt-[10px] opacity-0"
                  }
                >
                  Biz to&apos;y rejalashtiruvchisi bilan erta suhbatlashdik biz
                  to&apos;y rejalashtiruvchisi Rano Artykova bilan kelin va
                  kuyovlar o&apos;rtasidagi ziddiyatlar, keraksiz urf-odatlar va
                  keyingi sevgi haqida suhbatlashdik
                </p>
                <Link href="/loyihalar/1">
                  <div
                    className={
                      "  py-[14px] px-[24px]  hover:text-white text-[#21201FCC] hover:bg-[#0256BA] bg-white items-center border border-[#D7D9DC] inline-flex rounded-[8px] transition-all duration-300"
                    }
                  >
                    <p className={""}>Batafsil</p>
                  </div>
                </Link>
              </div>
            </motion.li>
          </ul>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
