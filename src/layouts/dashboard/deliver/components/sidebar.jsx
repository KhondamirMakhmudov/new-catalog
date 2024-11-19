import { useState } from "react";
import DeliverIcon from "@/components/icons/deliver";
import Link from "next/link";
import { useRouter } from "next/router";
import MyAdsIcon from "@/components/icons/my-ads";
import { signOut, useSession } from "next-auth/react";
import CompanyIcon from "@/components/icons/about-company";
import DeliverOrderIcon from "@/components/icons/deliver-order";

const Sidebar = () => {
  const [selectBar, setSelectBar] = useState("");
  const router = useRouter();
  const { data: session } = useSession();
  const handleSelectBar = (nav) => {
    setSelectBar(nav);
  };
  const handleLogout = async () => {
    await signOut({ callbackUrl: "/" });

    localStorage.clear();
    sessionStorage.clear();
  };
  return (
    <div className="col-span-3 border border-r border-t border-l-0 border-b-0 h-screen py-[20px] font-gilroy">
      <ul>
        <li onClick={() => handleSelectBar("main")} className="cursor-pointer">
          <Link href={"/dashboard/deliver/main"}>
            <div
              className={`${
                router.pathname === "/dashboard/deliver/main"
                  ? "bg-white border-l-[2px] border-[#0256BA]"
                  : "bg-transparent"
              } w-full flex items-center gap-x-[14px] py-[14px] px-[12px] transition-all duration-100`}
            >
              <div
                className={`p-[14px] ${
                  router.pathname === "/dashboard/deliver/main"
                    ? " bg-[#0256BA]"
                    : "bg-white"
                } inline-block rounded-full`}
              >
                <DeliverIcon
                  color={
                    router.pathname === "/dashboard/deliver/main"
                      ? "white"
                      : "#0256BA"
                  }
                />
              </div>

              <div>
                <h1 className="font-extrabold text-sm">Asosiy</h1>
                <p className="text-xs text-[#718096]">Manage notifications</p>
              </div>
            </div>
          </Link>
        </li>

        <li
          onClick={() => handleSelectBar("orders")}
          className="cursor-pointer"
        >
          <Link href={"/dashboard/deliver/my-ads"}>
            <div
              className={`${
                router.pathname === "/dashboard/deliver/my-ads"
                  ? "bg-white border-l-[2px] border-[#0256BA]"
                  : "bg-transparent"
              } w-full flex items-center gap-x-[14px] py-[14px] px-[12px] transition-all duration-100`}
            >
              <div
                className={`p-[14px] ${
                  router.pathname === "/dashboard/deliver/my-ads"
                    ? " bg-[#0256BA]"
                    : "bg-white"
                } inline-block rounded-full`}
              >
                <MyAdsIcon
                  color={
                    router.pathname === "/dashboard/deliver/my-ads"
                      ? "white"
                      : "#0256BA"
                  }
                />
              </div>

              <div>
                <h1 className="font-extrabold text-sm">
                  Mening e&apos;lonlarim
                </h1>
                <p className="text-xs text-[#718096]">Manage notifications</p>
              </div>
            </div>
          </Link>
        </li>

        <li
          onClick={() => handleSelectBar("orders")}
          className="cursor-pointer"
        >
          <Link href={"/dashboard/deliver/orders"}>
            <div
              className={`${
                router.pathname === "/dashboard/deliver/orders"
                  ? "bg-white border-l-[2px] border-[#0256BA]"
                  : "bg-transparent"
              } w-full flex items-center gap-x-[14px] py-[14px] px-[12px] transition-all duration-100`}
            >
              <div
                className={`p-[14px] ${
                  router.pathname === "/dashboard/deliver/orders"
                    ? " bg-[#0256BA]"
                    : "bg-white"
                } inline-block rounded-full`}
              >
                <DeliverOrderIcon
                  color={
                    router.pathname === "/dashboard/deliver/orders"
                      ? "white"
                      : "#0256BA"
                  }
                />
              </div>

              <div>
                <h1 className="font-extrabold text-sm">Buyurtmalar</h1>
                <p className="text-xs text-[#718096]">Manage notifications</p>
              </div>
            </div>
          </Link>
        </li>

        <li
          onClick={() => handleSelectBar("profile")}
          className="cursor-pointer"
        >
          <Link href={"/dashboard/deliver/about-company"}>
            <div
              className={`${
                router.pathname === "/dashboard/deliver/about-company"
                  ? "bg-white border-l-[2px] border-[#0256BA]"
                  : "bg-transparent"
              } w-full flex items-center gap-x-[14px] py-[14px] px-[12px] transition-all duration-100`}
            >
              <div
                className={`p-[14px] ${
                  router.pathname === "/dashboard/deliver/about-company"
                    ? " bg-[#0256BA]"
                    : "bg-white"
                } inline-block rounded-full`}
              >
                <CompanyIcon
                  color={
                    router.pathname === "/dashboard/deliver/about-company"
                      ? "white"
                      : "#0256BA"
                  }
                />
              </div>

              <div>
                <h1 className="font-extrabold text-sm">Kompaniya haqida</h1>
                <p className="text-xs text-[#718096]">Manage notifications</p>
              </div>
            </div>
          </Link>
        </li>

        <li>
          <button onClick={() => handleLogout()}>Chiqish</button>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
