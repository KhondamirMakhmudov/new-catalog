import MainContent from "@/layouts/dashboard/deliver/components/main-page/main";
import MyAdsAll from "@/layouts/dashboard/deliver/components/myAds-page/my-ads";
import DeliverDashboard from "@/layouts/dashboard/deliver/dashboard";
import Image from "next/image";

const Index = () => {
  const {
    data: editCompany,
    isLoading: isLoadingCompany,
    isFetching: isFetchingCompany,
  } = useGetQuery({});
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
          <div className="col-span-12 md:col-span-6 lg:col-span-4">
            <label className="text-[#718096]">Korxona yuridik nomi</label>
            <input
              type="text"
              placeholder="Kiriting"
              className="py-[14px] px-[16px] bg-white w-full border border-[#E2E8F0] rounded-[12px]"
            />
          </div>

          <div className="col-span-12 md:col-span-6 lg:col-span-4">
            <label className="text-[#718096]">Korxona nomi</label>
            <input
              type="text"
              placeholder="Kiriting"
              className="py-[14px] px-[16px] bg-white w-full border border-[#E2E8F0] rounded-[12px]"
            />
          </div>

          <div className="col-span-6">
            <label className="text-[#718096]">Korxona INN</label>
            <input
              type="number"
              placeholder="Kiriting"
              className="py-[14px] px-[16px] bg-white w-full border border-[#E2E8F0] rounded-[12px]"
            />
          </div>

          <div className="col-span-6">
            <label className="text-[#718096]">Korxona guvohnoma raqami</label>
            <input
              type="text"
              placeholder="Kiriting"
              className="py-[14px] px-[16px] bg-white w-full border border-[#E2E8F0] rounded-[12px]"
            />
          </div>

          <div className="col-span-12 space-y-[10px]">
            <label className="text-[#718096]">Korxona haqida</label>

            <textarea
              name="about-material"
              className=" py-[14px] px-[16px] bg-white w-full border border-[#E2E8F0] rounded-[12px]"
            ></textarea>
          </div>

          <div className="col-span-6">
            <label className="text-[#718096]">Pochta </label>
            <input
              type="mail"
              placeholder="Kiriting"
              className="py-[14px] px-[16px] bg-white w-full border border-[#E2E8F0] rounded-[12px]"
            />
          </div>

          <div className="col-span-6">
            <label className="text-[#718096]">Telefon raqami</label>
            <input
              type="text"
              placeholder="Kiriting"
              className="py-[14px] px-[16px] bg-white w-full border border-[#E2E8F0] rounded-[12px]"
            />
          </div>

          <button className="col-span-12 w-full bg-[#0256BA] rounded-[12px] py-[12px] text-white">
            Keyingi
          </button>
        </form>
      </MainContent>
    </DeliverDashboard>
  );
};

export default Index;
