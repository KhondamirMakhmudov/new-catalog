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
      <div className="container bg-[#125EC2] pt-[42px] pb-[12px] px-[42px] rounded-[20px] mt-[4px] max-w-[1340px]">
        <Reveal>
          <div className="grid grid-cols-12">
            <div className="col-span-2">
              <h1 className="uppercase text-white text-sm font-bold font-gilroy">
                Qurilish resurslari
                <br />
                milliy klassifikatori
              </h1>

              <div className="mt-[42px]">
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
            </div>

            <div className="col-span-2 font-gilroy">
              <ul className="text-[#B9D0EC] text-xs space-y-[8px]">
                <li>
                  <h4 className="text-white font-semibold !text-sm">
                    Sahifalar
                  </h4>
                </li>
                <li>
                  <Link href={"/"}>Biz haqimizda</Link>
                </li>

                <li>
                  <Link href={"/"}>Yangiliklar</Link>
                </li>

                <li>
                  <Link href={"/"}>Loyihalar</Link>
                </li>

                <li>
                  <Link href={"/"}>Bog&apos;lanish</Link>
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
                  <Link href={"/"}>Material va jixozlar</Link>
                </li>

                <li>
                  <Link href={"/"}>Mashina va mexanizmlar</Link>
                </li>

                <li>
                  <Link href={"/"}>Uskuna va qurilmalar</Link>
                </li>

                <li>
                  <Link href={"/"}>Kichik mexanizatsiyalar</Link>
                </li>

                <li>
                  <Link href={"/"}>Qurilish ishlari</Link>
                </li>
                <li>
                  <Link href={"/"}>Integratsiyalar</Link>
                </li>
              </ul>
            </div>
            <div className="col-span-2 font-gilroy">
              <h4 className="text-sm font-semibold text-white">
                Murojaat uchun
              </h4>

              <div className="   text-white space-y-[24px] mt-[20px]">
                <div>
                  <div className="flex space-x-[8px]">
                    <div className="p-[9px] bg-[#3F7ECB] rounded-[12px] inline-block">
                      <Image
                        src={"/icons/phone-call.svg"}
                        alt="phone-call"
                        width={24}
                        height={24}
                      />
                    </div>
                    <Link href={"tel:+998 93 222 29 82"}>
                      <p className="text-sm font-bold">+998 93 222 29 82</p>
                      <p>09:00 dan 21:00 gacha</p>
                    </Link>
                  </div>
                </div>

                <div className="flex space-x-[8px]">
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
