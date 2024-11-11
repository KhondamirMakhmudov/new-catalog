import Header from "@/components/header";
import Link from "next/link";
import RightIcon from "@/components/icons/right";
import Image from "next/image";

const Index = () => {
  return (
    <>
      <Header />
      <main className="container font-gilroy h-screen">
        <section className="mt-[16px] flex items-center space-x-[12px]">
          <Link href={"/"} className="text-[#262D33] text-sm font-semibold">
            Bosh sahifa
          </Link>
          <RightIcon color="#BCBFC2" />
          <Link
            className="text-[#262D33] text-sm font-semibold"
            href={"/select-position"}
          >
            Kirish
          </Link>
          <RightIcon color="#BCBFC2" />
          <Link
            href={"/auth/login"}
            className="text-[#262D33] text-sm font-semibold"
          >
            Buyurtmachi
          </Link>
          <RightIcon color="#BCBFC2" />
          <Link href={"#"} className="text-[#0256BA] text-sm font-semibold">
            Parolni tiklash
          </Link>
        </section>

        <div className="flex justify-center items-center translate-y-1/2">
          <div className="max-w-[427px] flex flex-col justify-center w-full font-gilroy !bg-white py-[40px] px-[27px] shadow-2xl rounded-[16px]">
            <div className="mx-auto mb-[30px]">
              <Image
                src={"/icons/party-icon.svg"}
                alt="party-icon"
                width={42}
                height={42}
              />
            </div>
            <h1 className="font-semibold text-[32px] text-center">
              Parol o&apos;zgartirildi
            </h1>
            <p className="text-[#718096] font-medium text-center  mt-[16px] mb-[30px]">
              Parolingiz muvaffaqiyatli o&apos;zgartirildi.
            </p>

            <Link href={"/auth/login"}>
              <button className="bg-[#0256BA] rounded-[12px] w-full text-white font-semibold py-[15px] ">
                Kirish joyiga qayting
              </button>
            </Link>
          </div>
        </div>
      </main>
    </>
  );
};

export default Index;
