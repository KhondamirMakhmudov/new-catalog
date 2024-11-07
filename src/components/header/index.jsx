import Image from "next/image";
import Brand from "../brand";
import CatalogButton from "../buttons/catalog";
import Basket from "../buttons/basket";
import Selected from "../buttons/selected";
import WebAccess from "../buttons/web-accessibility";
import Login from "../buttons/login";
import Search from "../search";

const Header = () => {
  return (
    <header>
      <div className={"text-white bg-[#0256BA] py-[13px]   font-gilroy"}>
        <div className="container ">
          {/* top of the header. will be component in next time */}
          <div className={"flex justify-between"}>
            <ul className={"flex gap-x-[32px]"}>
              <li>Bo'limlar</li>
              <li>Klassifikator haqida</li>
              <li>Loyihalar</li>
              <li>Monitoring</li>
              <li>Integratsiya</li>
              <li>Kontaktlar</li>
            </ul>
            <div className={"flex items-center"}>
              <div className={"flex gap-x-[10px]"}>
                <h4>Toshkent shahri</h4>
                <Image
                  src={"/icons/down.svg"}
                  alt={"down"}
                  width={18}
                  height={18}
                />
              </div>

              <div className={"bg-[#4885CD] w-[1px] h-[11px] mx-[13px]"}></div>

              <div className={"flex gap-x-[10px]"}>
                <h4>Uz</h4>
                <Image
                  src={"/icons/down.svg"}
                  alt={"down"}
                  width={18}
                  height={18}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={"bg-white py-[20px] font-gilroy"}>
        <div className={"container flex items-center justify-between"}>
          <Brand />

          <CatalogButton />

          <Search />

          <ul className={"flex gap-x-[12px]"}>
            <li>
              <WebAccess />
            </li>
            <li>
              <Selected />
            </li>
            <li>
              <Basket />
            </li>
          </ul>

          <Login />
        </div>
      </div>
    </header>
  );
};

export default Header;
