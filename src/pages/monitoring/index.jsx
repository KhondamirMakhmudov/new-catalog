import Footer from "@/components/footer";
import Header from "@/components/header";
import Link from "next/link";
import RightIcon from "@/components/icons/right";
import HorizontalBarChart from "@/components/bar";
import MapOfUz from "@/components/icons/uz-map";

const Index = () => {
  return (
    <div className="bg-[#F7F7F7] ">
      <Header />

      <main className="container mb-[46px]">
        <section className="mt-[16px] flex items-center space-x-[12px] font-gilroy">
          <Link href={"/"} className="text-[#262D33] text-sm font-semibold">
            Bosh sahifa
          </Link>
          <RightIcon color="#BCBFC2" />
          <Link className="text-[#0256BA] text-sm font-semibold" href={"#"}>
            Monitoring
          </Link>
        </section>

        <section>
          <h1 className="text-[32px] font-bold text-[#21201F] my-[24px]">
            Mintaqalar bo&apos;yicha monitoring
          </h1>
          <div className="flex gap-x-[30px] bg-white p-[30px] rounded-[20px]">
            <div className="flex-1">
              <HorizontalBarChart />
            </div>
            <MapOfUz />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
