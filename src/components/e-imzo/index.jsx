import React, { useEffect, useState } from "react";
import { ReactEIMZO } from "@/services/e-imzo";
import { get, isArray, isEmpty, isEqual } from "lodash";
import dayjs from "dayjs";
import { useTranslation } from "react-i18next";

import Link from "next/link";

import { toast } from "react-hot-toast";

const ESIGN = ({
  setOpen = () => {},
  open = false,
  eSign = () => {},
  ...rest
}) => {
  const { t } = useTranslation();
  const [error, setError] = useState(null);
  const [keys, setKeys] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    initEIMZO();
  }, []);
  const initEIMZO = async () => {
    try {
      await ReactEIMZO.install();
      try {
        const allKeys = await ReactEIMZO.listAllUserKeys();
        await setKeys(allKeys);
        setLoading(false);
      } catch (e) {
        setError("KEY_NOT_FOUND");
        setLoading(false);
      }
    } catch (e) {
      setError("NOT_INSTALLED");
      setLoading(false);
    }
  };

  const handleOk = async (key) => {
    try {
      let res = await ReactEIMZO.signPkcs7(key, "Hello world");
      eSign(res, key);
    } catch (e) {
      toast.error(t("Incorrect password"), { position: "top-right" });
    }
  };
  return (
    <>
      {loading && <div>Loading</div>}

      {isArray(keys) && !isEmpty(keys) && (
        <div className="container font-gilroy  text-[#1F2937] cursor-pointer ">
          <div className={" space-y-[16px] mb-[29px] text-center"}>
            <h1 className="text-[32px] font-bold ">
              Tizim uchun ERI-ni tanlang
            </h1>
            <p className="font-normal text-[#718096]">
              Oqilona yuboring, sarflang va tejang
            </p>
          </div>
          <div className="space-y-[16px]">
            {keys.map((key, i) => (
              <div
                key={i}
                onClick={() => handleOk(key)}
                className={
                  "grid grid-cols-12 border border-[#CEEFDF] rounded-[16px] hover:bg-[#0256BA] e-imzo bg-white hover:text-white  p-[20px] transition-all duration-300 active:scale-90 scale-100"
                }
              >
                <h3 className={"col-span-12 font-bold text-lg "}>
                  {get(key, "CN", "-")}
                </h3>

                <div className="bg-[#F1F2F4] w-full h-[1px] my-[24px] col-span-12"></div>
                <div className={"col-span-12 grid grid-cols-12 gap-x-[16px]"}>
                  <div className={"col-span-4"}>
                    <h4
                      className={"text-sm font-medium text-[#718096] mb-[4px]"}
                    >
                      PINFL:
                    </h4>
                    <p className={"font-extrabold text-[#323B49]"}>
                      {get(key, "PINFL", "-")}
                    </p>
                  </div>

                  <div className={"col-span-4"}>
                    <h4
                      className={"text-sm font-medium text-[#718096] mb-[4px]"}
                    >
                      INN:
                    </h4>
                    <p className={"font-extrabold text-[#323B49]"}>
                      {get(key, "TIN", "-")}
                    </p>
                  </div>

                  <div className={"col-span-4"}>
                    <h4
                      className={"text-sm font-medium text-[#718096] mb-[4px]"}
                    >
                      Mulkchilik turi:
                    </h4>
                    <p className={"font-extrabold text-[#323B49]"}>
                      {get(key, "O") ? "Yuridik shaxs" : "Jismoniy shaxs"}
                    </p>
                  </div>
                </div>
                {/* 
              <div className={"col-span-12 my-[10px]"}>
                <h4 className={"text-sm"}>Tashkilot:</h4>
                <p className={"font-medium"}>{get(key, "O", "-")}</p>
              </div> */}

                <div
                  className={
                    "col-span-12 grid grid-cols-12 gap-x-[16px] mt-[24px]"
                  }
                >
                  <div className={"col-span-4"}>
                    <h4
                      className={"text-sm font-medium text-[#718096] mb-[4px]"}
                    >
                      Sertifikat raqami:
                    </h4>
                    <p className={"font-extrabold text-[#323B49]"}>
                      {get(key, "serialNumber", "-")}
                    </p>
                  </div>

                  <div className={"col-span-4"}>
                    <h4
                      className={"text-sm font-medium text-[#718096] mb-[4px]"}
                    >
                      Sertifikatning amal qilish muddati:
                    </h4>
                    <p className={"font-extrabold text-[#323B49]"}>
                      {dayjs(get(key, "validFrom", "-")).format("DD.MM.YYYY")} -{" "}
                      {dayjs(get(key, "validTo", "-")).format("DD.MM.YYYY")}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {isEqual(error, "NOT_INSTALLED") ? (
        <>
          <div className={"!text-start !font-semibold mb-[20px]"}>
            <h4 className={"text-base"}>ERI urnatilmagan.</h4>
          </div>
          <div className={"!text-start text-sm "}>
            <p>Xatoni hal qilish uchun quyidagilarni bajaring:</p>

            <ol className={"list-decimal ml-[20px]"}>
              <li>
                ERI kalitlari C:\DSKEYS yoki D:\DSKEYS manzilida
                joylashganligini hamda ushbu kalitlar aynan sizga tegishligini
                tekshiring
              </li>

              <li>
                Antivirus dasturi kalitlardan foydalanishni
                ta&apos;qiqlamayotganligini tekshiring
              </li>

              <li>
                Korporativ kompyuterlarni ko&apos;llash holatida tashkilot
                siyosati sizga ERI kalitlaridan foydalanishga ruxsat
                berayotganiga ishonch hosil qiling
              </li>
            </ol>

            <p className={"mt-[20px] text-[#525D8A]"}>
              E-Imzo modulini o&apos;rnatish bo&apos;yicha yo&apos;riqnoma va
              yuzaga kelishi mumkin bo&apos;lgan muammolar bilan{" "}
              <Link
                href={"https://e-imzo.uz/#instructions"}
                className={"text-[#017EFA] underline"}
              >
                shu yerda
              </Link>{" "}
              tanishishingiz mumkin
            </p>
          </div>
        </>
      ) : isEqual(error, "KEY_NOT_FOUND") ? (
        <>
          <div className={"!text-start !font-semibold mb-[20px]"}>
            <h4 className={"text-base"}>
              ERI urnatilgan lekin kalit topilmadi.
            </h4>
          </div>
          <div className={"!text-start text-sm "}>
            <p>Xatoni hal qilish uchun quyidagilarni bajaring:</p>

            <ol className={"list-decimal ml-[20px]"}>
              <li>
                ERI kalitlari C:\DSKEYS yoki D:\DSKEYS manzilida
                joylashganligini hamda ushbu kalitlar aynan sizga tegishligini
                tekshiring
              </li>
              <li>
                Antivirus dasturi kalitlardan foydalanishni
                ta&apos;qiqlamayotganligini tekshiring
              </li>

              <li>
                Korporativ kompyuterlarni ko&apos;llash holatida tashkilot
                siyosati sizga ERI kalitlaridan foydalanishga ruxsat
                berayotganiga ishonch hosil qiling
              </li>
            </ol>

            <p className={"mt-[20px] text-[#525D8A]"}>
              E-Imzo modulini o&apos;rnatish bo&apos;yicha yo&apos;riqnoma va
              yuzaga kelishi mumkin bo&apos;lgan muammolar bilan{" "}
              <Link
                href={"https://e-imzo.uz/#instructions"}
                className={"text-[#017EFA] underline"}
              >
                shu yerda
              </Link>{" "}
              tanishishingiz mumkin
            </p>
          </div>
        </>
      ) : (
        ""
      )}
      {!loading && (
        <button
          onClick={() => {
            initEIMZO();
            setKeys([]);
            setError(null);
            setLoading(true);
          }}
          className={
            "mt-[30px] border py-[10px] px-[20px] float-right bg-[#2E73C6] hover:bg-[#2e72c6ef] text-white rounded-[8px] active:scale-110 scale-100 transition-all duration-300"
          }
        >
          Yangilash
        </button>
      )}
    </>
  );
};

export default ESIGN;
