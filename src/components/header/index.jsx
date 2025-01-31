import Image from "next/image";
import Brand from "../brand";
import CatalogButton from "../buttons/catalog";
import Basket from "../buttons/basket";
import Selected from "../buttons/selected";
import WebAccess from "../buttons/web-accessibility";
import Login from "../buttons/login";
import Search from "../search";
import Lang from "../lang";
import Link from "next/link";
import Documents from "../documents";

const Header = ({ id }) => {
  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    section.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <header className="sticky top-0 z-50">
      <div className={"text-white bg-[#0256BA] py-[13px]   font-gilroy"}>
        <div className="container ">
          {/* top of the header. will be component in next time */}
          <div className={"flex justify-between"}>
            <ul className={"flex gap-x-[32px] cursor-pointer"}>
              <li>
                <Link href={"/classifier"}>Klassifikator</Link>
              </li>

              <li>
                <Link href={"/loyihalar"}>Loyihalar</Link>
              </li>

              <li>
                <Link href={"/monitoring"}>Monitoring</Link>
              </li>

              <li>
                <Link href={"/integrations"}>Integratsiya</Link>
              </li>
              {/* 
              <li>
                <Documents />
              </li> */}

              {/* <li onClick={() => scrollToSection("about-classifier")}>
                <p>Klassifikator bu</p>
              </li> */}

              <li>
                <Link href={"/contacts"}>Kontaktlar</Link>
              </li>
            </ul>
            <div className={"flex items-center"}>
              {/* <div className={"flex gap-x-[10px]"}>
                <h4>Toshkent shahri</h4>
                <Image
                  src={"/icons/down.svg"}
                  alt={"down"}
                  width={18}
                  height={18}
                />
              </div> */}

              {/* <div className={"bg-[#4885CD] w-[1px] h-[11px] mx-[13px]"}></div> */}

              <Lang />
            </div>
          </div>
        </div>
      </div>

      <div
        className={"bg-white py-[20px] font-gilroy rounded-b-[24px] shadow-xl"}
      >
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
