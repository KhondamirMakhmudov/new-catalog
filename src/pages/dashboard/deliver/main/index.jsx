import MainSectionContent from "@/layouts/dashboard/deliver/components/main-page/content";
import RecentAds from "@/layouts/dashboard/deliver/components/main-page/recent-ads";
import DeliverDashboard from "@/layouts/dashboard/deliver/dashboard";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

const Index = () => {
  const router = useRouter();

  return (
    <DeliverDashboard>
      <MainSectionContent>
        <RecentAds></RecentAds>
      </MainSectionContent>
    </DeliverDashboard>
  );
};

export default Index;
