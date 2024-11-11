import Link from "next/link";

const Login = () => {
  return (
    <Link href={"/select-position"}>
      <button
        className={
          "text-[#0256BA] font-semibold py-[10px] px-[20px] bg-[#EBF2FA] rounded-[8px] text-sm "
        }
      >
        Kirish
      </button>
    </Link>
  );
};

export default Login;
