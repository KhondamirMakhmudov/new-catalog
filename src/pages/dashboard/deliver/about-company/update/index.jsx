import MainContent from "@/layouts/dashboard/deliver/components/main-page/main";
import MyAdsAll from "@/layouts/dashboard/deliver/components/myAds-page/my-ads";
import DeliverDashboard from "@/layouts/dashboard/deliver/dashboard";
import Image from "next/image";
import { KEYS } from "@/constants/key";
import { URLS } from "@/constants/url";
import useGetQuery from "@/hooks/api/useGetQuery";
import { get } from "lodash";
import usePutQuery from "@/hooks/api/usePutQuery";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

const Index = () => {
  const router = useRouter();
  const { data: session } = useSession();

  const { mutate: updateCompanyInfo, isLoading } = usePutQuery({
    listKeyId: "update-profile-deliver",
  });

  const onSubmit = ({
    company_name,
    company_ceo,
    company_address,
    company_stir,
    company_phone_main,
    company_email,
    company_phone_other,
  }) => {
    let formData = new FormData();
    formData.append("company_name", company_name);
    formData.append("company_ceo", company_ceo);
    formData.append("company_address", company_address);
    formData.append("company_stir", company_stir);
    formData.append("company_phone_main", company_phone_main);
    formData.append("company_email", company_email);
    formData.append("company_phone_other", company_phone_other);

    editAdds(
      {
        url: URLS.updateCompanyInfo,
        attributes: formData,
        config: {
          headers: { token: `${get(session, "user.token")}` },
        },
      },
      {
        onSuccess: () => {
          toast.success("E'lon muvaffaqiyatli tahrirlandi", {
            position: "top-center",
          });
          router.push("/dashboard/deliver/profile");
        },
        onError: (error) => {
          toast.error(`Error is ${error}`, { position: "top-right" });
        },
      }
    );
  };
  return (
    <DeliverDashboard>
      <MainContent>
        <h1 className="text-[26px] font-bold">
          Korxonangiz xaqidagi malumotlar
        </h1>

        <p className="text-[#718096] text-sm">
          Oqilona yuboring, sarflang va tejang
        </p>
        <form className="grid grid-cols-12 gap-[16px] mt-[16px]">
          <div className="col-span-12">
            <label className="text-[#718096]">Korxona yuridik nomi</label>
            <input
              {...register("company_name", { required: true })}
              type="text"
              placeholder="Kiriting"
              className="py-[14px] px-[16px] bg-white w-full border border-[#E2E8F0] rounded-[12px]"
            />
          </div>

          <div className="col-span-12">
            <label className="text-[#718096]">Korxona direktori</label>
            <input
              {...register("company_ceo", { required: true })}
              type="text"
              placeholder="Kiriting"
              className="py-[14px] px-[16px] bg-white w-full border border-[#E2E8F0] rounded-[12px]"
            />
          </div>

          <div className="col-span-12 md:col-span-6 lg:col-span-6">
            <label className="text-[#718096]">Korxona manzili</label>
            <input
              type="text"
              {...register("company_address", { required: true })}
              placeholder="Kiriting"
              className="py-[14px] px-[16px] bg-white w-full border border-[#E2E8F0] rounded-[12px]"
            />
          </div>

          <div className="col-span-6">
            <label className="text-[#718096]">Korxona STIR</label>
            <input
              type="number"
              {...register("company_stir", { required: true })}
              placeholder="Kiriting"
              className="py-[14px] px-[16px] bg-white w-full border border-[#E2E8F0] rounded-[12px]"
            />
          </div>

          <div className="col-span-6">
            <label className="text-[#718096]">Korxona telefon raqami</label>
            <input
              type="text"
              {...register("company_phone_main", { required: true })}
              placeholder="Kiriting"
              className="py-[14px] px-[16px] bg-white w-full border border-[#E2E8F0] rounded-[12px]"
            />
          </div>

          <div className="col-span-6">
            <label className="text-[#718096]">Pochta </label>
            <input
              type="mail"
              value={get(aboutCompany, "data[0].company_email")}
              {...register("company_email", { required: true })}
              disabled={true}
              placeholder="Kiriting"
              className="py-[14px] px-[16px] bg-white w-full border border-[#E2E8F0] rounded-[12px]"
            />
          </div>

          <div className="col-span-6">
            <label className="text-[#718096]">Telefon raqami (boshqa)</label>
            <input
              type="text"
              placeholder="Kiriting"
              {...register("company_phone_other", { required: true })}
              className="py-[14px] px-[16px] bg-white w-full border border-[#E2E8F0] rounded-[12px]"
            />
          </div>

          <Link href={"/dashboard/deliver/about-company/update"}>
            <button className="col-span-12 w-full bg-[#0256BA] rounded-[12px] py-[12px] text-white">
              Tahrirlash
            </button>
          </Link>
        </form>
      </MainContent>
    </DeliverDashboard>
  );
};

export default Index;
