import Image from "next/image";
import { signOut } from "next-auth/react";
const LogOut = () => {
  const handleLogout = async () => {
    await signOut({ callbackUrl: "/" });

    localStorage.clear();
    sessionStorage.clear();
  };
  return (
    <div className="mt-[200px]">
      <button
        onClick={() => handleLogout()}
        className="bg-[#F4DADB] hover:bg-[#fcd7d8] py-[17px] px-[16px] flex gap-x-[8px] items-center  w-full rounded-[20px] transition-all duration-200"
      >
        <Image
          src={"/icons/log-out.svg"}
          alt="log-out"
          width={24}
          height={24}
        />

        <p className="text-[#DD2033] text-sm font-extrabold">
          Sistemadan chiqish
        </p>
      </button>
    </div>
  );
};

export default LogOut;
