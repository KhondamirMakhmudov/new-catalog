import Header from "@/components/header";
import Link from "next/link";
import RightIcon from "@/components/icons/right";

const CustomerDashboard = () => {
  return (
    <div className="bg-[#F7F7F7] min-h-screen">
      <Header />

      <main className="container ">
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
            Login
          </Link>
          <RightIcon color="#BCBFC2" />
          <Link className="text-[#0256BA] text-sm font-semibold" href={"#"}>
            Buyurtmachi
          </Link>
        </section>

        <section className="pb-[50px]">
          <div className="grid grid-cols-12">
            <Sidebar />
            {children}
          </div>
        </section>
      </main>
    </div>
  );
};

export default CustomerDashboard;
