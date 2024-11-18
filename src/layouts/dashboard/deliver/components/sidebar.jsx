import { useState } from "react";
import DeliverIcon from "@/components/icons/deliver";
import Link from "next/link";
import { useRouter } from "next/router";

const Sidebar = () => {
  const [selectBar, setSelectBar] = useState("main");
  const router = useRouter();
  const handleSelectBar = (nav) => {
    setSelectBar(nav);
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
          <Link href={"/dashboard/deliver/orders"}>
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
                <DeliverIcon
                  color={selectBar === "orders" ? "white" : "#0256BA"}
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
      </ul>
    </div>
  );
};

export default Sidebar;
