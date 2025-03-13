import Link from "next/link";
import HomeIcon from "../icons/home";
import SearchIcon from "../icons/search";
import SelectedIcon from "../icons/selected";
import ShopBasketIcon from "../icons/shop-basket";
import { useRouter } from "next/router";
import AccountIcon from "../icons/account";

const NavigationButtom = () => {
  const router = useRouter();
  return (
    <div className="lg:hidden fixed bottom-0 left-0 w-full bg-white shadow-md border-t flex justify-around py-3 z-50 font-gilroy">
      <Link href={"/"}>
        <button
          className={`flex flex-col justify-center items-center  ${
            router.pathname === "/" ? "text-[#0256BA]" : "text-gray-500"
          }`}
        >
          <HomeIcon color={router.pathname === "/" ? "#0256BA" : "#62677A"} />
          <span className="text-xs">Asosiy</span>
        </button>
      </Link>

      <div className="flex flex-col items-center text-gray-500">
        <SearchIcon color={"#62677A"} />
        <span className="text-xs">Qidiruv</span>
      </div>
      <Link href={"/selected"}>
        <button
          className={`flex flex-col justify-center items-center  ${
            router.pathname === "/selected" ? "text-[#0256BA]" : "text-gray-500"
          }`}
        >
          <SelectedIcon
            color={router.pathname === "/selected" ? "#0256BA" : "#62677A"}
          />
          <span className="text-xs">Saqlangan</span>
        </button>
      </Link>

      <Link href={"/shop-basket"}>
        <button
          className={`flex flex-col justify-center items-center  ${
            router.pathname === "/shop-basket"
              ? "text-[#0256BA]"
              : "text-gray-500"
          }`}
        >
          <ShopBasketIcon
            color={router.pathname === "/shop-basket" ? "#0256BA" : "#62677A"}
          />
          <span className="text-xs">Savatcha</span>
        </button>
      </Link>

      <Link href={"/select-position"}>
        <button
          className={`flex flex-col justify-center items-center  ${
            router.pathname === "/select-position"
              ? "text-[#0256BA]"
              : "text-gray-500"
          }`}
        >
          <AccountIcon
            color={
              router.pathname === "/select-position" ? "#0256BA" : "#62677A"
            }
          />
          <span className="text-xs">Profil</span>
        </button>
      </Link>
    </div>
  );
};

export default NavigationButtom;
