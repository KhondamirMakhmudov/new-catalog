import CustomerDashboard from "@/layouts/dashboard/customer/dashboard";
import MainContent from "@/layouts/dashboard/customer/components/main-content";
import Image from "next/image";
import { KEYS } from "@/constants/key";
import { URLS } from "@/constants/url";
import useGetQuery from "@/hooks/api/useGetQuery";
import { useSession } from "next-auth/react";
import { get } from "lodash";
const Index = () => {
  const { data: session } = useSession();
  const {
    data: aboutProfile,
    isLoading,
    isFetching,
  } = useGetQuery({
    key: KEYS.aboutProfile,
    url: URLS.aboutProfile,
    params: {
      email: `${get(session, "user.email")}`,
    },
  });
  return (
    <CustomerDashboard>
      <MainContent>
        <h1 className="text-[26px] font-bold">
          Sizning profilingiz, sizning hayotingiz
        </h1>

        <p className="text-[#718096] text-sm">
          Oqilona yuboring, sarflang va tejang
        </p>

        <form className="grid grid-cols-12 gap-[16px] mt-[16px]">
          {/* <div className="col-span-12 lg:col-span-4">
            <div className="flex gap-x-[10px] items-center">
              <div className="bg-white rounded-[12px] p-[27px] inline-block">
                <Image
                  src={"/icons/company-image.svg"}
                  alt="company-image"
                  width={32}
                  height={32}
                />
              </div>

              <div>
                <h3 className="text-[#718096] mb-[2px]">Rasmingiz</h3>
                <p className="text-[#718096] font-semibold text-sm">
                  Max size 10 mb
                </p>
              </div>
            </div>
          </div> */}

          <div className="col-span-12 md:col-span-6 lg:col-span-6">
            <label className="text-[#718096]">Ismingiz</label>
            <input
              type="text"
              value={get(aboutProfile, "data[0].first_name")}
              disabled={true}
              placeholder="Kiriting"
              className="py-[14px] px-[16px] bg-white w-full border border-[#E2E8F0] rounded-[12px]"
            />
          </div>

          <div className="col-span-12 md:col-span-6 lg:col-span-6">
            <label className="text-[#718096]">Familiyangiz</label>
            <input
              type="text"
              value={get(aboutProfile, "data[0].last_name")}
              disabled={true}
              placeholder="Kiriting"
              className="py-[14px] px-[16px] bg-white w-full border border-[#E2E8F0] rounded-[12px]"
            />
          </div>

          <div className="col-span-12 md:col-span-6 lg:col-span-6">
            <label className="text-[#718096]">JSHSHIR</label>
            <input
              type="text"
              value={get(aboutProfile, "data[0].company")}
              disabled={true}
              placeholder="Kiriting"
              className="py-[14px] px-[16px] bg-white w-full border border-[#E2E8F0] rounded-[12px]"
            />
          </div>

          <div className="col-span-12 md:col-span-6 lg:col-span-6">
            <label className="text-[#718096]">Pochta</label>
            <input
              type="text"
              placeholder="Kiriting"
              value={get(aboutProfile, "data[0].email")}
              disabled={true}
              className="py-[14px] px-[16px] bg-white w-full border border-[#E2E8F0] rounded-[12px]"
            />
          </div>

          {/* <div className="col-span-12 md:col-span-6 lg:col-span-4">
            <label className="text-[#718096]">Passport seriyasi</label>
            <input
              type="text"
              placeholder="Kiriting"
              className="py-[14px] px-[16px] bg-white w-full border border-[#E2E8F0] rounded-[12px]"
            />
          </div>

          <div className="col-span-12 space-y-[10px]">
            <label className="text-[#718096]">
              O&apos;zingiz haqingizda ma&apos;lumot bering
            </label>

            <textarea
              name="about-material"
              className=" py-[14px] px-[16px] bg-white w-full border border-[#E2E8F0] rounded-[12px]"
            ></textarea>
          </div>

          <div className="col-span-6">
            <label className="text-[#718096]">Email</label>
            <input
              type="number"
              placeholder="Kiriting"
              className="py-[14px] px-[16px] bg-white w-full border border-[#E2E8F0] rounded-[12px]"
            />
          </div> */}

          <div className="col-span-6">
            <label className="text-[#718096]">Telefon raqamingiz</label>
            <input
              type="text"
              value={get(aboutProfile, "data[0].phone")}
              disabled={true}
              placeholder="Kiriting"
              className="py-[14px] px-[16px] bg-white w-full border border-[#E2E8F0] rounded-[12px]"
            />
          </div>
          <button className="col-span-12 w-full bg-[#0256BA] rounded-[12px] py-[12px] text-white">
            Tasdiqlash
          </button>
        </form>
      </MainContent>
    </CustomerDashboard>
  );
};

export default Index;
