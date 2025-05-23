import Header from "@/components/header";
import Link from "next/link";
import RightIcon from "@/components/icons/right";
import { KEYS } from "@/constants/key";
import { URLS } from "@/constants/url";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import usePostQuery from "@/hooks/api/usePostQuery";
import NavigationButtom from "@/components/bottom-navigation";

const Index = () => {
  const router = useRouter();
  const { reset_code } = router.query;
  const {
    register,
    handleSubmit,

    setValue,
    formState: { errors },
  } = useForm();
  const { mutate: confirmCodeForNewPassword, isLoading } = usePostQuery({
    listKeyId: KEYS.newPasswordConfirm,
    hideSuccessToast: true,
  });

  useEffect(() => {
    if (!reset_code) {
      router.push("/auth/forget-password/confirm-code");
    } else {
      setValue("reset_code", reset_code);
    }
  }, [reset_code, router, setValue]);

  const onSubmit = (data) => {
    confirmCodeForNewPassword(
      {
        url: URLS.newPasswordConfirm,
        attributes: {
          reset_code: reset_code,
          new_password: data.new_password,
        },
      },
      {
        onSuccess: () => {
          toast.success("Muvaqqiyatli yakunlandi", { position: "top-right" });
          router.push("/auth/forget-password/final-step");
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
          <div className="max-w-[510px] w-full font-gilroy !bg-white py-[40px] px-[27px] shadow-2xl rounded-[16px]">
            <h1 className="font-semibold text-[32px] text-center">
              Parolni tiklash
            </h1>
            <p className="text-[#718096] font-medium text-center  mt-[16px]">
              Iltimos, eslab qoladigan narsani ko&apos;rsating
            </p>

            <form onSubmit={handleSubmit(onSubmit)}>
              <input
                {...register("new_password", { required: true })}
                type="password"
                placeholder="Kiriting"
                className="placeholder:text-[#A0AEC0] text-black w-full p-[16px] border border-[#C8CED5] rounded-lg my-[30px]"
              />
              {errors.password && (
                <span className={"text-xs text-red-500"}>
                  Ushbu qator to&apos;ldirilishi shart
                </span>
              )}

              <input
                {...register("new_password", { required: true })}
                type="password"
                placeholder="Kiriting"
                className="placeholder:text-[#A0AEC0] text-black w-full p-[16px] border border-[#C8CED5] rounded-lg mb-[30px]"
              />
              {errors.password && (
                <span className={"text-xs text-red-500"}>
                  Ushbu qator to&apos;ldirilishi shart
                </span>
              )}

              <button className="bg-[#0256BA] hover:bg-[#0255bae3] rounded-[12px] w-full text-white font-semibold py-[15px] mb-[12px] transition-all duration-200">
                Yuborish
              </button>

              <p className="font-semibold text-[#1A202C] text-center">
                Parolni esingizdami?{" "}
                <span>
                  <Link
                    href={"/auth/login"}
                    className="text-[#1677FF] underline"
                  >
                    Kirish
                  </Link>
                </span>
              </p>
            </form>
          </div>
        </div>
      </main>
    </>
  );
};

export default Index;
