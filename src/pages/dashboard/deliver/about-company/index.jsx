import MainContent from "@/layouts/dashboard/deliver/components/main-page/main";
import MyAdsAll from "@/layouts/dashboard/deliver/components/myAds-page/my-ads";
import DeliverDashboard from "@/layouts/dashboard/deliver/dashboard";
import Image from "next/image";
import { KEYS } from "@/constants/key";
import { URLS } from "@/constants/url";
import useGetQuery from "@/hooks/api/useGetQuery";
import { get } from "lodash";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Link from "next/link";

const Index = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const {
    data: aboutCompany,
    isLoadingCompany,
    isFetching: isFetchingCompany,
  } = useGetQuery({
    key: KEYS.aboutCompany,
    url: URLS.aboutCompany,
    headers: { token: `${get(session, "user.token")}` },
    enabled: !!(
      get(session, "user.token") && get(session, "user.role") === "company"
    ),
  });

  console.log(aboutCompany, "aboutCompany");

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
              value={get(aboutCompany, "data[0].company_name")}
              type="text"
              placeholder="Kiriting"
              disabled={true}
              className="py-[14px] px-[16px] bg-white w-full border border-[#E2E8F0] rounded-[12px]"
            />
          </div>

          <div className="col-span-12">
            <label className="text-[#718096]">Korxona direktori</label>
            <input
              value={get(aboutCompany, "data[0].company_ceo")}
              type="text"
              placeholder="Kiriting"
              disabled={true}
              className="py-[14px] px-[16px] bg-white w-full border border-[#E2E8F0] rounded-[12px]"
            />
          </div>

          <div className="col-span-12 md:col-span-6 lg:col-span-6">
            <label className="text-[#718096]">Korxona manzili</label>
            <input
              type="text"
              value={get(aboutCompany, "data[0].company_address")}
              disabled={true}
              placeholder="Kiriting"
              className="py-[14px] px-[16px] bg-white w-full border border-[#E2E8F0] rounded-[12px]"
            />
          </div>

          <div className="col-span-6">
            <label className="text-[#718096]">Korxona STIR</label>
            <input
              type="number"
              value={get(aboutCompany, "data[0].company_stir")}
              disabled={true}
              placeholder="Kiriting"
              className="py-[14px] px-[16px] bg-white w-full border border-[#E2E8F0] rounded-[12px]"
            />
          </div>

          <div className="col-span-6">
            <label className="text-[#718096]">Korxona telefon raqami</label>
            <input
              type="text"
              value={get(aboutCompany, "data[0].company_phone_main")}
              disabled={true}
              placeholder="Kiriting"
              className="py-[14px] px-[16px] bg-white w-full border border-[#E2E8F0] rounded-[12px]"
            />
          </div>

          {/* <div className="col-span-12 space-y-[10px]">
            <label className="text-[#718096]">Korxona haqida</label>

            <textarea
              name="about-material"
              className=" py-[14px] px-[16px] bg-white w-full border border-[#E2E8F0] rounded-[12px]"
            ></textarea>
          </div> */}

          <div className="col-span-6">
            <label className="text-[#718096]">Pochta </label>
            <input
              type="mail"
              value={get(aboutCompany, "data[0].company_email")}
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
              value={get(aboutCompany, "data[0].company_phone_other")}
              disabled={true}
              className="py-[14px] px-[16px] bg-white w-full border border-[#E2E8F0] rounded-[12px]"
            />
          </div>

          <Link
            href={"/dashboard/deliver/about-company/update"}
            className="col-span-12"
          >
            <button className="w-full bg-[#0256BA] rounded-[12px] py-[12px] text-white">
              Tahrirlash
            </button>
          </Link>
        </form>
      </MainContent>
    </DeliverDashboard>
  );
};

export default Index;
