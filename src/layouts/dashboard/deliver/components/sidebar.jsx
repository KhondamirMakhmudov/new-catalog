import { useState } from "react";
import DeliverIcon from "@/components/icons/deliver";
import Link from "next/link";
import { useRouter } from "next/router";
import MyAdsIcon from "@/components/icons/my-ads";
import { signOut, useSession } from "next-auth/react";

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
                selectBar === "main"
                  ? "bg-white border-l-[2px] border-[#0256BA]"
                  : "bg-transparent"
              } w-full flex items-center gap-x-[14px] py-[14px] px-[12px] transition-all duration-100`}
            >
              <div
                className={`p-[14px] ${
                  selectBar === "main" ? " bg-[#0256BA]" : "bg-white"
                } inline-block rounded-full`}
              >
                <DeliverIcon
                  color={selectBar === "main" ? "white" : "#0256BA"}
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
                selectBar === "orders"
                  ? "bg-white border-l-[2px] border-[#0256BA]"
                  : "bg-transparent"
              } w-full flex items-center gap-x-[14px] py-[14px] px-[12px] transition-all duration-100`}
            >
              <div
                className={`p-[14px] ${
                  selectBar === "orders" ? " bg-[#0256BA]" : "bg-white"
                } inline-block rounded-full`}
              >
                <MyAdsIcon
                  color={selectBar === "orders" ? "white" : "#0256BA"}
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
          onClick={() => handleSelectBar("profile")}
          className="cursor-pointer"
        >
          <div
            className={`${
              selectBar === "profile"
                ? "bg-white border-l-[2px] border-[#0256BA]"
                : "bg-transparent"
            } w-full flex items-center gap-x-[14px] py-[14px] px-[12px] transition-all duration-100`}
          >
            <div
              className={`p-[14px] ${
                selectBar === "profile" ? " bg-[#0256BA]" : "bg-white"
              } inline-block rounded-full`}
            >
              <DeliverIcon
                color={selectBar === "profile" ? "white" : "#0256BA"}
              />
            </div>

            <div>
              <h1 className="font-extrabold text-sm">Profile</h1>
              <p className="text-xs text-[#718096]">Manage notifications</p>
            </div>
          </div>
        </li>

        <li>
          <button onClick={() => handleLogout()}>Chiqish</button>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
