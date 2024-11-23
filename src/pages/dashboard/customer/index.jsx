import Header from "@/components/header";
import RightIcon from "@/components/icons/right";
import Link from "next/link";
import { useState } from "react";
import DeliverIcon from "@/components/icons/deliver";
import ArrowRightButton from "@/components/buttons/arrow-right";
import Image from "next/image";
import SidebarCustomer from "@/layouts/dashboard/customer/components/sidebar";

const Index = () => {
  const [selectBar, setSelectBar] = useState("");

  const handleSelectBar = (nav) => {
    setSelectBar(nav);
  };
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
            href={"/auth/login"}
          >
            Login
          </Link>
          <RightIcon color="#BCBFC2" />
          <Link className="text-[#0256BA] text-sm font-semibold" href={"#"}>
            Buyurtmachi
          </Link>
        </section>

        <section>
          <div className="grid grid-cols-12 ">
            <SidebarCustomer />
          </div>
        </section>
      </main>
    </div>
  );
};

export default Index;
