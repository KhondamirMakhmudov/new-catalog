import Header from "@/components/header";
import Link from "next/link";
import RightIcon from "@/components/icons/right";
import Footer from "@/components/footer";
import { TelegramIcon } from "@/components/icons/social-media/telegram";
import { InstagramIcon } from "@/components/icons/social-media/instagram";
import { FacebookIcon } from "@/components/icons/social-media/facebook";
import { YoutubeIcon } from "@/components/icons/social-media/youtube";
import Reveal from "@/components/reveal";
import Image from "next/image";
import { motion } from "framer-motion";
import { useRouter } from "next/router";

const Index = () => {
  const router = useRouter();
  return (
    <div className="bg-[#F7F7F7]">
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
            Kontaktlar
          </Link>
        </section>

        <section>
          <h1 className="font-bold text-[32px] my-[16px] font-anybody">
            Kontaktlar
          </h1>
          <div className="grid grid-cols-12 gap-x-[24px]">
            <motion.div
              initial={{ opacity: 0, translateX: "-40px" }}
              animate={{ opacity: 1, translateX: "0px" }}
              transition={{ duration: 0.5 }}
              className="font-gilroy bg-white p-[16px] border border-[#E0E2F0] rounded-[20px] col-span-5 space-y-[30px]"
            >
              <div>
                <h1 className="text-sm text-[#718096] mb-[10px]">
                  Asosiy aloqa
                </h1>

                <Link
                  className="text-lg font-bold "
                  href={"tel:+998 +998 71 210 11 04"}
                >
                  +998 71 210 11 04
                </Link>
              </div>

              <div>
                <h1 className="text-sm text-[#718096] mb-[10px]">Manzil</h1>

                <p className="text-lg font-bold ">
                  Toshkent sh, Shayhontohur tumani, Abay ko&apos;chasi 6A
                </p>
              </div>

              <div>
                <h1 className="text-sm text-[#718096] mb-[10px]">
                  Yuridik shaxslar uchun
                </h1>

                <p className="text-lg font-bold ">6006</p>
              </div>

              <div>
                <h1 className="text-sm text-[#718096] mb-[10px]">
                  Bizning ijtimoiy tarmoqlar
                </h1>

                <div>
                  <ul className="space-x-[12px] mt-[16px]">
                    <li className="p-[9px] bg-[#EBF1F9] hover:bg-[#DEECFF] cursor-pointer transition-all duration-300 inline-block rounded-[12px]">
                      <Link href={"https://t.me/tmsiti"}>
                        <TelegramIcon color="#0256BA" />
                      </Link>
                    </li>

                    <li className="p-[9px] bg-[#EBF1F9] hover:bg-[#DEECFF] cursor-pointer transition-all duration-300 inline-block rounded-[12px]">
                      <Link href={"#"}>
                        <InstagramIcon color="#0256BA" />
                      </Link>
                    </li>

                    <li className="p-[9px] bg-[#EBF1F9] hover:bg-[#DEECFF] cursor-pointer transition-all duration-300 inline-block rounded-[12px]">
                      <Link href={"#"}>
                        <FacebookIcon color="#0256BA" />
                      </Link>
                    </li>

                    <li className="p-[9px] bg-[#EBF1F9] hover:bg-[#DEECFF] cursor-pointer transition-all duration-300 inline-block rounded-[12px]">
                      <Link href={"https://www.youtube.com/@tmsiti"}>
                        <YoutubeIcon color="#0256BA" />
                      </Link>
                    </li>
                  </ul>

                  <div className="bg-[#E2E8F0] w-full h-[1px] my-[20px]"></div>

                  <div className="flex justify-between items-center">
                    <Image
                      src={"/icons/tmsiti.svg"}
                      alt="tmsiti"
                      width={249}
                      height={48}
                    />

                    <Link href={"https://tmsiti.uz/"}>
                      <button className="py-[13px] px-[24px] border border-[#DFDFDF] rounded-[12px] text-[#4B4B4B] flex items-center gap-x-[12px] font-medium">
                        <p className="">Saytga o‘tish</p>
                        <Image
                          src={"/icons/arrow-right.svg"}
                          alt="arrow-right"
                          width={20}
                          height={20}
                        />
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, translateX: "40px" }}
              animate={{ opacity: 1, translateX: "0px" }}
              transition={{ duration: 0.5 }}
              className="font-gilroy bg-white p-[16px] border border-[#E0E2F0] rounded-[20px] col-span-7"
            >
              <h3 className="text-[24px] font-bold mb-[20px]">
                Ariza qoldirish
              </h3>

              <form>
                <div className="flex gap-x-[20px]">
                  <div className="w-full">
                    <label className="text-[#718096] ">FIO</label> <br />
                    <input
                      type="text"
                      placeholder="Toʻliq ismingizni kiriting"
                      className="py-[14px] px-[16px] border border-[#DDE3EA] rounded-[12px] w-full mt-[10px]"
                    />
                  </div>

                  <div className="w-full">
                    <label className="text-[#718096]">Telefon raqam</label>{" "}
                    <br />
                    <input
                      type="tel"
                      placeholder="+998"
                      className="py-[14px] px-[16px] border border-[#DDE3EA] rounded-[12px] w-full  mt-[10px]"
                    />
                  </div>
                </div>

                <div className="w-full mt-[20px]">
                  <label className="text-[#718096]">
                    Murojaatingiz mavzusi
                  </label>{" "}
                  <br />
                  <textarea
                    placeholder="Kiriting"
                    className="py-[14px] px-[16px] border border-[#DDE3EA] rounded-[12px] w-full  mt-[10px]"
                  ></textarea>
                </div>

                <button className="font-semibold text-white py-[12px] px-[24px] bg-[#0256BA] rounded-[12px] mt-[20px]">
                  Yuborish
                </button>
              </form>
            </motion.div>

            <div className="col-span-12 mt-[60px]">
              {" "}
              <Reveal>
                <div
                  className=" min-h-[164px] w-full bg-center bg-no-repeat
            bg-cover rounded-[20px] flex items-center justify-center"
                  style={{ backgroundImage: `url(/images/address.png)` }}
                >
                  <Link
                    href={"https://maps.app.goo.gl/nxPwsjmq6vi6hCPa7"}
                    className="py-[14px] px-[28px] text-sm font-medium font-gilroy text-white bg-[#0256BA] rounded-[12px]"
                  >
                    Google Maps ni ochish
                  </Link>
                </div>
              </Reveal>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
