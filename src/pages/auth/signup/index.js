import Header from "@/components/header";
import Link from "next/link";
import RightIcon from "@/components/icons/right";
import Image from "next/image";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import usePostQuery from "@/hooks/api/usePostQuery";
import { KEYS } from "@/constants/key";
import { URLS } from "@/constants/url";
import toast from "react-hot-toast";

const Index = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { mutate: signupRequest, isLoading } = usePostQuery({
    listKeyId: KEYS.signup,
    hideSuccessToast: true,
  });

  const onSubmit = (data) => {
    signupRequest(
      {
        url: URLS.signup,
        attributes: { ...data },
      },
      {
        onSuccess: () => {
          toast.success("Siz ro'yxatdan muvaffaqiyatli o'tdingiz", {
            position: "top-right",
          });
          router.push({
            pathname: "/auth/verify-email",
            query: { email: data.email },
          });
        },
      }
    );
  };
  return (
    <div>
      <Header />
      <main className="container font-gilroy   h-screen">
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
          <Link
            href={"/auth/login"}
            className="text-[#262D33] text-sm font-semibold"
          >
            Buyurtmachi
          </Link>
          <RightIcon color="#BCBFC2" />
          <Link href={"#"} className="text-[#0256BA] text-sm font-semibold">
            Ro&apos;yxatdan o&apos;tish
          </Link>
        </section>

        <section>
          <div className="grid grid-cols-12 gap-x-[48px] mt-[21px] ">
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

            <div className="col-span-6 place-items-center">
              <div className="max-w-[427px] w-full flex flex-col justify-center items-center ">
                <h1 className="text-[32px] font-bold mb-[16px]">
                  Ro&apos;yxatdan o&apos;tish
                </h1>
                <p className="font-normal text-[#718096]">
                  Oqilona yuboring, sarflang va tejang
                </p>

                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="my-[30px] space-y-[16px]">
                    <div className="w-full flex space-x-[16px]">
                      <input
                        type="text"
                        {...register("first_name", { required: true })}
                        placeholder="Ismingiz"
                        className="placeholder:text-[#A0AEC0] text-black w-1/2 p-[16px] bg-white border border-[#C8CED5] rounded-lg"
                      />

                      <input
                        type="text"
                        {...register("last_name", { required: true })}
                        placeholder="Familiyangiz"
                        className="placeholder:text-[#A0AEC0] text-black w-1/2 p-[16px] bg-white border border-[#C8CED5] rounded-lg"
                      />
                    </div>
                    <input
                      type="email"
                      {...register("email", { required: true })}
                      placeholder="E-mailni kiriting"
                      className="placeholder:text-[#A0AEC0] text-black max-w-[427px] bg-white w-full p-[16px] border border-[#C8CED5] rounded-lg"
                    />

                    <input
                      type="text"
                      {...register("company", { required: true })}
                      placeholder="INN"
                      className="placeholder:text-[#A0AEC0] text-black w-full p-[16px] bg-white border border-[#C8CED5] rounded-lg"
                    />

                    <input
                      type="tel"
                      {...register("phone", { required: true })}
                      placeholder="+998"
                      className="placeholder:text-[#A0AEC0] text-black w-full p-[16px] bg-white border border-[#C8CED5] rounded-lg"
                    />

                    <input
                      type="password"
                      {...register("password", { required: true })}
                      placeholder="Parol"
                      className="placeholder:text-[#A0AEC0] text-black max-w-[427px] w-full p-[16px] border border-[#C8CED5] rounded-lg"
                    />
                  </div>

                  <p>
                    Hisob qaydnomasini yaratish orqali siz biznikiga
                    qo&apos;shilasiz <br />
                    <strong>Maxfiylik siyosati</strong>, va{" "}
                    <strong>Elektron aloqa siyosati</strong>.
                  </p>

                  <button className="bg-[#0256BA] hover:bg-[#0255bae3] rounded-[12px] w-full text-white font-semibold py-[15px] my-[30px] transition-all duration-200">
                    Kirish
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Index;
