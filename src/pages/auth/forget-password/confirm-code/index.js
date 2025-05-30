import Header from "@/components/header";
import Link from "next/link";
import RightIcon from "@/components/icons/right";
import { KEYS } from "@/constants/key";
import { URLS } from "@/constants/url";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import usePostQuery from "@/hooks/api/usePostQuery";
import NavigationButtom from "@/components/bottom-navigation";

const Index = () => {
  const router = useRouter();
  const { email } = router.query;
  console.log(router);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { mutate: confirmCodeFromEmail, isLoading } = usePostQuery({
    listKeyId: KEYS.confirmCode,
    hideSuccessToast: true,
  });

  const onSubmit = (data) => {
    confirmCodeFromEmail(
      {
        url: URLS.confirmCode,
        attributes: { ...data },
      },
      {
        onSuccess: () => {
          toast.success("Muvaqqiyatli yakunlandi", { position: "top-right" });
          router.push({
            pathname: "/auth/forget-password/reset-new-password",
            query: { reset_code: data.reset_code },
          });
        },
      }
    );
  };
  return (
    <>
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
          <Link
            href={"/auth/login"}
            className="text-[#262D33] text-sm font-semibold"
          >
            Buyurtmachi
          </Link>
          <RightIcon color="#BCBFC2" />
          <Link href={"#"} className="text-[#0256BA] text-sm font-semibold">
            Parolni tiklash
          </Link>
        </section>

        <div className="flex justify-center items-center translate-y-1/2">
          <div className="max-w-[510px] w-full font-gilroy !bg-white py-[40px] px-[27px] shadow-xl">
            <h1 className="font-semibold text-[32px] text-center">
              Elektron pochtangizni tekshiring
            </h1>
            <p className="text-[#718096] font-medium text-center  mt-[16px]">
              Biz kodni quyidagi manzilga yubordik {email}
            </p>

            <form onSubmit={handleSubmit(onSubmit)}>
              <input
                {...register("reset_code", { required: true })}
                type="text"
                placeholder="Elektron pochtangizga kelgan parolni kiriting"
                className="placeholder:text-[#A0AEC0] text-black w-full p-[16px] border border-[#C8CED5] rounded-lg my-[30px]"
              />
              {errors.email && (
                <span className={"text-xs text-red-500"}>
                  Ushbu qator to&apos;ldirilishi shart
                </span>
              )}

              <button className="bg-[#0256BA] rounded-[12px] w-full text-white font-semibold py-[15px] ">
                Yuborish
              </button>
            </form>
          </div>
        </div>
      </main>
    </>
  );
};

export default Index;
