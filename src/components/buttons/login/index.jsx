import Link from "next/link";
import { useRouter } from "next/router";
import { useSettingsStore } from "@/store";
import useGetQuery from "@/hooks/api/useGetQuery";
import { KEYS } from "@/constants/key";
import { URLS } from "@/constants/url";
import { get } from "lodash";
import { useSession } from "next-auth/react";

import DeliverIcon from "@/components/icons/deliver";

const Login = () => {
  const router = useRouter();
  const { data: session } = useSession();

  return (
    <div className="hidden md:block">
      {!get(session, "user.token") ? (
        <Link href={"/select-position"}>
          <button
            className={
              "text-[#0256BA] font-semibold py-[10px] px-[20px] bg-[#EBF2FA] rounded-[8px] text-sm active:scale-110 scale-100 transition-all duration-200"
            }
          >
            Kirish
          </button>
        </Link>
      ) : get(session, "user.role") === "company" ? (
        <div>
          <button
            onClick={() => router.push("/dashboard/deliver/main")}
            className={
              "text-[#0256BA] font-semibold py-[10px] px-[20px] bg-[#EBF2FA] rounded-[8px] text-sm active:scale-110 scale-100 transition-all duration-200 flex items-center gap-x-[10px]"
            }
          >
            <DeliverIcon color="#0256BA" />
            <p>Shaxsiy kabinet</p>
          </button>
        </div>
      ) : get(session, "user.role") === "customer" ? (
        <button
          onClick={() => router.push("/dashboard/customer/main")}
          className={
            "text-[#0256BA] font-semibold py-[10px] px-[20px] bg-[#EBF2FA] rounded-[8px] text-sm active:scale-110 scale-100 transition-all duration-200 flex items-center gap-x-[10px]"
          }
        >
          <DeliverIcon color="#0256BA" />
          <p>Shaxsiy kabinet</p>
        </button>
      ) : (
        <Link href={"/select-position"}>
          <button
            className={
              "text-[#0256BA] font-semibold py-[10px] px-[20px] bg-[#EBF2FA] rounded-[8px] text-sm active:scale-110 scale-100 transition-all duration-200"
            }
          >
            Kirish
          </button>
        </Link>
      )}
    </div>
  );
};

export default Login;
