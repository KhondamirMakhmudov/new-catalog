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

const Index = () => {
  const searchParams = useSearchParams();
  const search = searchParams.get("code");
  console.log(search);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const {
    data: customer,
    isLoading,
    isFetching,
  } = useGetQuery({
    key: KEYS.oneIdCustomer,
    url: URLS.oneIdCustomer,
    params: {
      code: search,
    },
  });
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
        toast.success("Login successful!");
        router.push("/dashboard/customer");
      } else {
        toast.error("Login failed! Please check your credentials.");
      }
    } catch (error) {
      toast.error("An error occurred during login.");
    }
  };

  return (
    <div className="bg-[#F7F7F7]">
      <Header />

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
          <div className="grid grid-cols-12 gap-x-[48px] ">
            <div className="col-span-6">
              <div className="max-w-[427px] w-full flex flex-col justify-center items-center mt-[72px]">
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
                        className="placeholder:text-[#A0AEC0] text-black max-w-[427px] w-full p-[16px] border border-[#C8CED5] rounded-lg"
                      />
                      {errors.email && (
                        <span className={"text-xs text-red-500"}>
                          Ushbu qator to&apos;ldirilishi shart
                        </span>
                      )}
                    </div>
                    <div>
                      <input
                        {...register("password", { required: true })}
                        type="password"
                        placeholder="Parol"
                        className="placeholder:text-[#A0AEC0] text-black max-w-[427px] w-full p-[16px] border border-[#C8CED5] rounded-lg"
                      />

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

            <div className="col-span-6 ">
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
