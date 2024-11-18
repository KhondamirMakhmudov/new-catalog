import MainSectionContent from "@/layouts/dashboard/deliver/components/main-page/content";
import RecentAds from "@/layouts/dashboard/deliver/components/main-page/recent-ads";
import DeliverDashboard from "@/layouts/dashboard/deliver/dashboard";

const Index = () => {
  return (
    <DeliverDashboard>
      <MainSectionContent>
        <RecentAds></RecentAds>
      </MainSectionContent>
    </DeliverDashboard>
  );
};

export default Index;
