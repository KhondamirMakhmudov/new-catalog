import Header from "@/components/header";
import Link from "next/link";
import { useSettingsStore } from "@/store";
import RightIcon from "@/components/icons/right";
import SidebarCustomer from "./components/sidebar";
import useGetQuery from "@/hooks/api/useGetQuery";
import { URLS } from "@/constants/url";
import { KEYS } from "@/constants/key";
import { get } from "lodash";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

const CustomerDashboard = ({ children }) => {
  const { data: session } = useSession();
  const token = useSettingsStore((state) => get(state, "token", null));

  const setToken = useSettingsStore((state) =>
    get(state, "setToken", () => {})
  );

  useEffect(() => {
    if (get(session, "user.token")) {
      setToken(get(session, "user.token"));
    }
  }, [session, setToken]);
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
            <SidebarCustomer />
            {children}
          </div>
        </section>
      </main>
    </div>
  );
};

export default CustomerDashboard;
