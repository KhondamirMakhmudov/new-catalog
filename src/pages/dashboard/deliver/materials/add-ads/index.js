import MainSectionContent from "@/layouts/dashboard/deliver/components/main-page/content";
import DeliverDashboard from "@/layouts/dashboard/deliver/dashboard";

const Index = () => {
  return (
    <DeliverDashboard>
      <MainSectionContent>
        <div className="font-gilroy">
          <h1 className="font-bold text-[26px]">Yangi qo’shish</h1>
          <p className="text-[#718096] text-sm mt-[6px]">
            Oqilona yuboring, sarflang va tejang
          </p>
        </div>
      </MainSectionContent>
    </DeliverDashboard>
  );
};

export default Index;
