import RightIcon from "@/components/icons/right";
import { KEYS } from "@/constants/key";
import useGetQuery from "@/hooks/api/useGetQuery";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { URLS } from "@/constants/url";
import { get } from "lodash";
import toast from "react-hot-toast";
import { signIn } from "next-auth/react";
import Header from "@/components/header";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import NavigationButtom from "@/components/bottom-navigation";

const Index = () => {
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const router = useRouter();
  const { data: session } = useSession();

  const { data: logins } = useGetQuery({
    key: KEYS.captcha,
    url: URLS.login,
  });

  const onSubmit = async (data) => {
    try {
      const response = await signIn("credentials", {
        email: get(data, "email"),
        password: get(data, "password"),
        captcha_response: get(data, "captcha_response").toLowerCase(),
        captcha_key: get(logins, "data.captcha_key"),
        redirect: false,
        callbackUrl: "/",
      });

      if (response.ok) {
        toast.success("Kirish muvaffaqiyatli yakunlandi!");
        router.push("/dashboard/customer");
      } else {
        toast.error(
          "Kirish muvaffaqiyatsiz yakunlandi! Iltimos, ma'lumotlaringizni tekshiring."
        );
      }
    } catch (error) {
      toast.error("An error occurred during login.");
    }
  };

  return (
    <div className="bg-[#F7F7F7]">
      <Header />
      <NavigationButtom />
      <main className="container font-gilroy h-screen">
        <section className="mt-[16px] flex items-center space-x-[12px]">
          <Link href={"/"} className="text-[#262D33] text-sm font-semibold">
            Bosh sahifa
          </Link>
          <RightIcon color="#BCBFC2" />
          <Link
            className="text-[#262D33] text-sm font-semibold"
            href={"/select-position"}
          >
            Kirish
          </Link>
          <RightIcon color="#BCBFC2" />
          <Link href={"#"} className="text-[#0256BA] text-sm font-semibold">
            Buyurtmachi
          </Link>
        </section>
        <section>
          <div className="lg:grid grid-cols-12 flex justify-center items-center gap-[48px] ">
            <div className="col-span-6 lg:col-span-6">
              <div className="lg:max-w-2xl w-full flex flex-col justify-center items-center mt-[72px]">
                <h1 className="text-[32px] font-bold ">Kirish</h1>
                <p className="font-normal text-[#718096]">
                  Oqilona yuboring, sarflang va tejang
                </p>

                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="my-[30px] space-y-[16px]">
                    <div>
                      <input
                        {...register("email", { required: true })}
                        type="text"
                        placeholder="E-mailni kiriting"
                        className="placeholder:text-[#A0AEC0] text-black  w-full p-[16px] border border-[#C8CED5] rounded-lg"
                      />
                      {errors.email && (
                        <span className={"text-xs text-red-500"}>
                          Ushbu qator to&apos;ldirilishi shart
                        </span>
                      )}
                    </div>
                    <div className="relative">
                      <input
                        {...register("password", { required: true })}
                        type={showPassword ? "text" : "password"}
                        placeholder="Parol"
                        className="placeholder:text-[#A0AEC0] text-black  w-full p-[16px] border border-[#C8CED5] rounded-lg"
                      />
                      <div
                        onClick={() => setShowPassword((prev) => !prev)}
                        className="absolute top-4 right-3 bottom-0 cursor-pointer"
                      >
                        {showPassword ? (
                          <Image
                            src={"/icons/eyes.svg"}
                            alt={"edit"}
                            width={24}
                            height={24}
                          />
                        ) : (
                          <Image
                            src={"/icons/eye-off.svg"}
                            alt={"edit"}
                            width={24}
                            height={24}
                          />
                        )}
                      </div>

                      {errors.password && (
                        <span className={"text-xs text-red-500"}>
                          Ushbu qator to&apos;ldirilishi shart
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="mb-[20px]">
                    <Image
                      src={`${get(logins, "data.captcha_image_url")?.replace(
                        "http://",
                        "https://"
                      )}`}
                      loader={() =>
                        get(logins, "data.captcha_image_url")?.replace(
                          "http://",
                          "https://"
                        )
                      }
                      alt="captcha_image"
                      width={100}
                      height={40}
                      className="mb-[20px] w-[100px] h-[40px]"
                    />

                    <label className={"block mb-1.5"} htmlFor="#">
                      Rasmdagi matnni kiriting
                    </label>
                    <input
                      {...register("captcha_response", { required: true })}
                      className={
                        "w-full shadow-input h-12 rounded-[5px] outline-none px-3"
                      }
                      type={"text"}
                    />
                  </div>

                  <Link href={"/auth/forget-password"}>
                    <p className="text-[#0256BA] font-semibold float-right">
                      Parolni unutdingizmi?
                    </p>
                  </Link>

                  <button className="bg-[#0256BA] rounded-[12px] w-full text-white font-semibold py-[15px] my-[30px]">
                    Kirish
                  </button>

                  <div>
                    <p className="text-center">
                      Akkaunt mavjud emasmi?{" "}
                      <span className="font-extrabold ">
                        <Link href={"/auth/signup"}>
                          Ro&apos;yxatdan o&apos;tish
                        </Link>
                      </span>
                    </p>
                  </div>
                </form>
              </div>
            </div>

            <div className="col-span-6 hidden lg:block">
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
                      Biz to&apos;y rejalashtiruvchisi bilan erta suhbatlashdik
                      biz to&apos;y rejalashtiruvchisi Rano Artykova bilan kelin
                      va kuyovlar o&apos;rtasidagi ziddiyatlar, keraksiz
                      urf-odatlar va keyingi sevgi haqida suhbatlashdik
                    </p>
                    <Link href="/loyihalar">
                      <div
                        className={
                          "  py-[7px] px-[13px]  items-center border border-[#D7D9DC] inline-flex rounded-[8px]"
                        }
                      >
                        <p className={"text-[#21201FCC] text-[9px]"}>Qarang</p>
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
                      Biz to&apos;y rejalashtiruvchisi bilan erta suhbatlashdik
                      biz to&apos;y rejalashtiruvchisi Rano Artykova bilan kelin
                      va kuyovlar o&apos;rtasidagi ziddiyatlar, keraksiz
                      urf-odatlar va keyingi sevgi haqida suhbatlashdik
                    </p>
                    <Link href="/loyihalar">
                      <div
                        className={
                          "  py-[7px] px-[13px]  items-center border border-[#D7D9DC] inline-flex rounded-[8px]"
                        }
                      >
                        <p className={"text-[#21201FCC] text-[9px]"}>Qarang</p>
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
        </section>
      </main>
    </div>
  );
};

export default Index;
