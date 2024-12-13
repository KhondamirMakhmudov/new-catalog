import Header from "@/components/header";
import { useSettingsStore } from "@/store";
import Sidebar from "./components/sidebar";
import Link from "next/link";
import RightIcon from "@/components/icons/right";
import useGetQuery from "@/hooks/api/useGetQuery";
import { URLS } from "@/constants/url";
import { KEYS } from "@/constants/key";
import { get } from "lodash";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

const DeliverDashboard = ({ children }) => {
  const { data: session } = useSession();

  console.log(session, "delivery session");

  const setToken = useSettingsStore((state) =>
    get(state, "setToken", () => {})
  );
  const token = useSettingsStore((state) => get(state, "token", null));
  const { data: user } = useGetQuery({
    key: KEYS.getMe,
    url: URLS.getMe,
    headers: { token: token ?? `${get(session, "user.token")}` },
    enabled: !!(
      get(session, "user.token") && get(session, "user.role") === "company"
    ),
  });

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
            E-imzo
          </Link>
          <RightIcon color="#BCBFC2" />
          <Link className="text-[#0256BA] text-sm font-semibold" href={"#"}>
            Yetkazib beruvchi
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

export default DeliverDashboard;
