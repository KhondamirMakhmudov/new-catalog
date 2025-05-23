import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import LogOut from "@/components/buttons/logout";
import MainCustomerIcon from "@/components/icons/main-customer";
import CustomerOrderIcon from "@/components/icons/customer-order";
import CustomerProfileIcon from "@/components/icons/customer-profile";

const SidebarCustomer = () => {
  const [selectBar, setSelectBar] = useState("");
  const router = useRouter();
  const { data: session } = useSession();
  const handleSelectBar = (nav) => {
    setSelectBar(nav);
  };

  return (
    <div className="col-span-12 lg:col-span-3 border border-r border-t border-l-0 border-b-0  py-[20px] font-gilroy flex flex-col space-y-[388px] self-start">
      <ul className="">
        <li onClick={() => handleSelectBar("main")} className="cursor-pointer">
          <Link href={"/dashboard/customer/main"}>
            <div
              className={`${
                router.pathname === "/dashboard/customer/main"
                  ? "bg-white border-l-[2px] border-[#0256BA]"
                  : "bg-transparent"
              } w-full flex items-center gap-[14px] py-[14px] px-[12px] transition-all duration-100`}
            >
              <div
                className={`p-[14px] ${
                  router.pathname === "/dashboard/customer/main"
                    ? " bg-[#0256BA]"
                    : "bg-white"
                } inline-block rounded-full`}
              >
                <MainCustomerIcon
                  color={
                    router.pathname === "/dashboard/customer/main"
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
          <Link href={"/dashboard/customer/orders"}>
            <div
              className={`${
                router.pathname === "/dashboard/customer/orders"
                  ? "bg-white border-l-[2px] border-[#0256BA]"
                  : "bg-transparent"
              } w-full flex items-center gap-[14px] py-[14px] px-[12px] transition-all duration-100`}
            >
              <div
                className={`p-[14px] ${
                  router.pathname === "/dashboard/customer/orders"
                    ? " bg-[#0256BA]"
                    : "bg-white"
                } inline-block rounded-full`}
              >
                <CustomerOrderIcon
                  color={
                    router.pathname === "/dashboard/customer/orders"
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
          <Link href={"/dashboard/customer/profile"}>
            <div
              className={`${
                router.pathname === "/dashboard/customer/profile"
                  ? "bg-white border-l-[2px] border-[#0256BA]"
                  : "bg-transparent"
              } w-full flex items-center gap-[14px] py-[14px] px-[12px] transition-all duration-100`}
            >
              <div
                className={`p-[14px] ${
                  router.pathname === "/dashboard/customer/profile"
                    ? " bg-[#0256BA]"
                    : "bg-white"
                } inline-block rounded-full`}
              >
                <CustomerProfileIcon
                  color={
                    router.pathname === "/dashboard/customer/profile"
                      ? "white"
                      : "#0256BA"
                  }
                />
              </div>

              <div>
                <h1 className="font-extrabold text-sm">Profile</h1>
                <p className="text-xs text-[#718096]">Manage notifications</p>
              </div>
            </div>
          </Link>
        </li>
      </ul>

      <LogOut />
    </div>
  );
};

export default SidebarCustomer;
