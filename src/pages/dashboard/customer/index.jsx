import Header from "@/components/header";
import RightIcon from "@/components/icons/right";
import Link from "next/link";
import { useState, useEffect } from "react";
import DeliverIcon from "@/components/icons/deliver";
import ArrowRightButton from "@/components/buttons/arrow-right";
import Image from "next/image";
import SidebarCustomer from "@/layouts/dashboard/customer/components/sidebar";
import { useSearchParams } from "next/navigation";
import useGetQuery from "@/hooks/api/useGetQuery";
import { KEYS } from "@/constants/key";
import { URLS } from "@/constants/url";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";

const Index = () => {

  const router = useRouter();
  const [selectBar, setSelectBar] = useState("");
  const searchParams = useSearchParams();
  const code = searchParams.get("code");


  const { data: session } = useSession();
  console.log(session, "session");
  console.log(code, "code");

  // const {
  //   data: customer,
  //   isLoading,
  //   isFetching,
  // } = useGetQuery({
  //   key: KEYS.oneIdCustomer,
  //   url: URLS.oneIdCustomer,
  //   params: {
  //     code: search,
  //   },
  // });
  // console.log(customer);

  useEffect(() => {
    if (code) {
      // Call the credentials provider with the code
      signIn("credentials", {
        code, // Pass the code from the query string
        redirect: false, // Handle redirection manually
      })
        .then((result) => {
          if (result?.ok) {
            // Redirect to the appropriate page based on the role or logic
            router.push("/dashboard/customer/main");
          } else {
            // Handle login error
            console.error("Login failed:", result?.error);
            alert("Login failed. Please try again.");
          }
        })
        .catch((err) => console.error("Sign-in error:", err));
    }
  

  }, [code, router])
  

  const handleSelectBar = (nav) => {
    setSelectBar(nav);
  };
  return (
    <div className="bg-[#F7F7F7] min-h-screen">
      <Header />

      <main className="container">
        <section className="my-[16px] flex items-center space-x-[12px] font-gilroy">
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
            className="text-[#262D33] text-sm font-semibold"
            href={"/auth/login"}
          >
            Login
          </Link>
          <RightIcon color="#BCBFC2" />
          <Link className="text-[#0256BA] text-sm font-semibold" href={"#"}>
            Buyurtmachi
          </Link>
        </section>

        <section>
          <div className="grid grid-cols-12 ">
            <SidebarCustomer />
          </div>
        </section>
      </main>
    </div>
  );
};

export default Index;
