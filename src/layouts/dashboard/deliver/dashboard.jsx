import Header from "@/components/header";

import Sidebar from "./components/sidebar";
import Link from "next/link";
import RightIcon from "@/components/icons/right";

const DeliverDashboard = ({ children }) => {
  return (
    <div className="bg-[#F7F7F7]">
      <Header />

      <main className="container">
        <section className="my-[16px] flex items-center space-x-[12px] font-gilroy">
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
            className="text-[#262D33] text-sm font-semibold"
            href={"/auth/e-imzo"}
          >
            E-imzo
          </Link>
          <RightIcon color="#BCBFC2" />
          <Link className="text-[#0256BA] text-sm font-semibold" href={"#"}>
            Yetkazib beruvchi
          </Link>
        </section>

        <section>
          <div className="grid grid-cols-12">
            <Sidebar />
            {children}
          </div>
        </section>
      </main>
    </div>
  );
};

export default DeliverDashboard;
