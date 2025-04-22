import dynamic from "next/dynamic";
import { signIn } from "next-auth/react";
import { get } from "lodash";
import { toast } from "react-hot-toast";
import Header from "@/components/header";
import Link from "next/link";
import RightIcon from "@/components/icons/right";
import Image from "next/image";
import NavigationButtom from "@/components/bottom-navigation";
const ESIGN = dynamic(() => import("../../components/e-imzo"), {
  ssr: false,
});

const EimzoLogin = () => {
  const loginWithKey = async (data, key) => {
    if (get(key, "O")) {
      const result = await signIn("eimzo", {
        pkcs7:get(data,'pkcs7_64'),
        company_name: get(key, "O"),
        company_stir: get(key, "TIN"),
        company_ceo: get(key, "CN"),
        redirect: false,
        callbackUrl: "/dashboard/deliver/main",
      });
      if (result?.error) {
        alert("Login failed: " + result.error);
      }
    } else {
      toast.error("Jismoniy shaxs kalitida tizimga kirish mumkin emas", {
        position: "top-right",
      });
    }
  };

  return (
    <>
      <Header />
      <NavigationButtom />
      <main className="container font-gilroy">
        <section className="mt-[16px] flex items-center space-x-[12px] font-gilroy mb-[21px]">
          <Link href={"/"} className="text-[#262D33] text-sm font-semibold">
            Bosh sahifa
          </Link>
          <RightIcon color="#BCBFC2" />
          <Link
            className="ext-[#262D33] text-sm font-semibold"
            href={"/select-position"}
          >
            Kirish
          </Link>
          <RightIcon color="#BCBFC2" />
          <Link className="text-[#0256BA] text-sm font-semibold" href={"#"}>
            E-imzo
          </Link>
        </section>
        <section>
          <div className="lg:grid grid-cols-12 flex items-center lg:items-start justify-center">
            <div className="col-span-6 hidden lg:block">
              <div className=" ">
                <div
                  className="bg-[#0256BA] rounded-[20px] min-h-[823px] bg-no-repeat bg-center px-[31px] relative"
                  style={{ backgroundImage: `url(/images/map_uzb.png)` }}
                >
                  <div>
                    <div
                      className={
                        "bg-white flex flex-col float-right p-[18px] min-h-[157px] max-w-[343px] rounded-[14px] relative mt-[80px] animate-upDown"
                      }
                    >
                      <div className="absolute bottom-0 right-0 p-[13px]">
                        <Image
                          src={"/images/school.png"}
                          alt={"school"}
                          width={84}
                          height={67}
                          className={"ml-[16px]"}
                        />
                      </div>
                      <h1 className="text-[18px] font-extrabold text-[#21201F]">
                        Maktab
                      </h1>
                      <p
                        className={
                          "text-[8px] font-normal text-[#9392A0] line-clamp-3 flex-1 mt-[10px]"
                        }
                      >
                        Biz to&apos;y rejalashtiruvchisi bilan erta
                        suhbatlashdik biz to&apos;y rejalashtiruvchisi Rano
                        Artykova bilan kelin va kuyovlar o&apos;rtasidagi
                        ziddiyatlar, keraksiz urf-odatlar va keyingi sevgi
                        haqida suhbatlashdik
                      </p>
                      <Link href="/loyihalar">
                        <div
                          className={
                            "  py-[7px] px-[13px]  items-center border border-[#D7D9DC] inline-flex rounded-[8px]"
                          }
                        >
                          <p className={"text-[#21201FCC] text-[9px]"}>
                            Qarang
                          </p>
                          <Image
                            src={"/icons/arrow-right.svg"}
                            alt={"arrow-right"}
                            width={11}
                            height={11}
                            className={"ml-[16px]"}
                          />
                        </div>
                      </Link>
                    </div>
                  </div>

                  <div>
                    <div
                      className={
                        "bg-white flex flex-col float-left p-[18px] min-h-[157px] max-w-[343px] rounded-[14px] relative mt-[50px] animate-upDownSecond"
                      }
                    >
                      <div className="absolute bottom-0 right-0 p-[13px]">
                        <Image
                          src={"/images/medicine.png"}
                          alt={"medicine"}
                          width={84}
                          height={67}
                          className={"ml-[16px]"}
                        />
                      </div>
                      <h1 className="text-[18px] font-extrabold text-[#21201F]">
                        Poliklinika
                      </h1>
                      <p
                        className={
                          "text-[8px] font-normal text-[#9392A0] line-clamp-3 flex-1 mt-[10px]"
                        }
                      >
                        Biz to&apos;y rejalashtiruvchisi bilan erta
                        suhbatlashdik biz to&apos;y rejalashtiruvchisi Rano
                        Artykova bilan kelin va kuyovlar o&apos;rtasidagi
                        ziddiyatlar, keraksiz urf-odatlar va keyingi sevgi
                        haqida suhbatlashdik
                      </p>
                      <Link href="/loyihalar">
                        <div
                          className={
                            "  py-[7px] px-[13px]  items-center border border-[#D7D9DC] inline-flex rounded-[8px]"
                          }
                        >
                          <p className={"text-[#21201FCC] text-[9px]"}>
                            Qarang
                          </p>
                          <Image
                            src={"/icons/arrow-right.svg"}
                            alt={"arrow-right"}
                            width={11}
                            height={11}
                            className={"ml-[16px]"}
                          />
                        </div>
                      </Link>
                    </div>
                  </div>

                  <div className="absolute bottom-0 px-[68px] pb-[30px] text-center">
                    <h1 className="text-white text-[34px]  font-bold">
                      Marketing maydonchasini tashkil etish
                    </h1>
                    <p className="text-[#BDD8F3] text-sm font-medium">
                      F. Kotlerning so&apos;zlariga ko&apos;ra, iste&apos;mol
                      jamiyati madaniy mahsulot assortimentini yomon tiklamoqda.
                      Baing va Selling reklama debriyajini tezlashtiradi
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-span-6">
              <ESIGN open={true} setOpen={() => {}} eSign={loginWithKey} />
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default EimzoLogin;
