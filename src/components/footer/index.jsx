import Link from "next/link";
import { TelegramIcon } from "../icons/social-media/telegram";
import { InstagramIcon } from "../icons/social-media/instagram";
import { FacebookIcon } from "../icons/social-media/facebook";
import { YoutubeIcon } from "../icons/social-media/youtube";
import Image from "next/image";
import Reveal from "../reveal";

const Footer = () => {
  return (
    <footer>
      <div className="container bg-[#125EC2] pt-[42px] pb-[12px] px-[42px] rounded-[20px] mt-[4px] ">
        <Reveal>
          <div className="grid grid-cols-12 gap-[20px]">
            <div className="col-span-12 md:col-span-2">
              <h1 className="uppercase text-white text-sm font-bold font-gilroy">
                Qurilish resurslari
                <br />
                milliy klassifikatori
              </h1>

              <div className="hidden md:inline-block mt-[42px]">
                <p className="font-gilroy text-sm text-[#B3CCEA]">
                  Biz haqimizda ijtimoiy <br /> tarmoqlarda kuzating
                </p>

                <ul className="space-x-[12px] mt-[16px]">
                  <li className="p-[9px] bg-[#3F7ECB] inline-block rounded-[12px]">
                    <a href={"https://t.me/tmsiti"} target="_blank">
                      <TelegramIcon />
                    </a>
                  </li>

                  {/* <li className="p-[9px] bg-[#3F7ECB] inline-block rounded-[12px]">
                    <Link href={"#"}>
                      <InstagramIcon />
                    </Link>
                  </li>

                  <li className="p-[9px] bg-[#3F7ECB] inline-block rounded-[12px]">
                    <Link href={"#"}>
                      <FacebookIcon />
                    </Link>
                  </li> */}

                  <li className="p-[9px] bg-[#3F7ECB] inline-block rounded-[12px]">
                    <a href={"https://www.youtube.com/@tmsiti"} target="_blank">
                      <YoutubeIcon />
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            <div className="col-span-6 md:col-span-2 font-gilroy">
              <ul className="text-[#B9D0EC] text-xs space-y-[8px]">
                <li>
                  <h4 className="text-white font-semibold !text-sm">
                    Sahifalar
                  </h4>
                </li>
                <li>
                  <a href={"https://www.tmsiti.uz/about"} target="_blank">
                    Biz haqimizda
                  </a>
                </li>
                {/* 
                <li>
                  <Link href={"/"}>Yangiliklar</Link>
                </li> */}

                <li>
                  <Link href={"/loyihalar"}>Loyihalar</Link>
                </li>

                <li>
                  <Link href={"/contacts"}>Bog&apos;lanish</Link>
                </li>
              </ul>
            </div>

            <div className="col-span-6 font-gilroy">
              <ul className="text-[#B9D0EC] text-xs space-y-[8px]">
                <li>
                  <h4 className="text-white font-semibold !text-sm">
                    Bo&apos;limlar
                  </h4>
                </li>
                <li>
                  <Link href={"/materials"}>Material va jihozlar</Link>
                </li>

                <li>
                  <Link href={"/machine-mechano"}>Mashina va mexanizmlar</Link>
                </li>

                <li>
                  <Link href={"/technos"}>Uskuna va qurilmalar</Link>
                </li>

                <li>
                  <Link href={"/works"}>Qurilish ishlari</Link>
                </li>
                <li>
                  <Link href={"/integrations"}>Integratsiyalar</Link>
                </li>
              </ul>
            </div>
            <div className="col-span-12 md:col-span-2 font-gilroy">
              <h4 className="text-sm font-semibold text-white">
                Murojaat uchun
              </h4>

              <div className="   text-white space-y-[24px] mt-[20px]">
                <div>
                  <div className="flex items-start space-x-[8px]">
                    <div className="p-[9px] bg-[#3F7ECB] rounded-[12px] inline-block">
                      <Image
                        src={"/icons/phone-call.svg"}
                        alt="phone-call"
                        width={24}
                        height={24}
                      />
                    </div>
                    <Link href={"tel:+998 71 244-51-84"}>
                      <p className="text-sm font-bold">+998 71 244-51-84</p>
                      <p>09:00 dan 21:00 gacha</p>
                    </Link>
                  </div>
                </div>

                <div className="flex items-start space-x-[8px]">
                  <div className="p-[9px] bg-[#3F7ECB] rounded-[12px] inline-block">
                    <Image
                      src={"/icons/mail.svg"}
                      alt="phone-call"
                      width={24}
                      height={24}
                    />
                  </div>
                  <Link href={"mailto:+998 93 222 29 82"}>
                    <p className="text-sm font-bold">info@tmsiti.uz</p>
                    <p>09:00 dan 21:00 gacha</p>
                  </Link>
                </div>
              </div>
            </div>

            <div className="col-span-12 md:hidden mt-[42px]">
              <p className="font-gilroy text-sm text-[#B3CCEA]">
                Biz haqimizda ijtimoiy <br /> tarmoqlarda kuzating
              </p>

              <ul className="space-x-[12px] mt-[16px]">
                <li className="p-[9px] bg-[#3F7ECB] inline-block rounded-[12px]">
                  <Link href={"#"}>
                    <TelegramIcon />
                  </Link>
                </li>

                <li className="p-[9px] bg-[#3F7ECB] inline-block rounded-[12px]">
                  <Link href={"#"}>
                    <InstagramIcon />
                  </Link>
                </li>

                <li className="p-[9px] bg-[#3F7ECB] inline-block rounded-[12px]">
                  <Link href={"#"}>
                    <FacebookIcon />
                  </Link>
                </li>

                <li className="p-[9px] bg-[#3F7ECB] inline-block rounded-[12px]">
                  <Link href={"#"}>
                    <YoutubeIcon />
                  </Link>
                </li>
              </ul>
            </div>

            <div className="col-span-12 py-[14px] w-full text-center text-white font-gilroy bg-[#FFFFFF0A] rounded-[8px] mt-[54px]">
              <h1 className="text-sm ">
                Qurilish Resurslari Milliy Klassifikatori 2024
              </h1>
            </div>
          </div>
        </Reveal>
      </div>
    </footer>
  );
};

export default Footer;
