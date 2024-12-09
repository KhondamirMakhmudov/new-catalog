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
      // Fetch token from the OneID API
      fetch(`https://backend.mkinfo.uz/fastapi/auth/callback/?code=${code}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to fetch OneID data");
          }
          return response.json();
        })
        .then((data) => {
          if (data.token) {
            // Log in using NextAuth
            signIn("credentials", {
              redirect: false,
              token: data.token, // Pass the token to the credentials provider
              id: data.id,
              full_name: data.full_name,
              pin: data.pin,
              role: data.role,
            }).then((signInResult) => {
              if (signInResult?.ok) {
                // Redirect to the dashboard
                router.push("/dashboard/customer");
              } else {
                console.error("Login failed:", signInResult?.error);
              }
            });
          }
        })
        .catch((error) => {
          console.error("Error during OneID login:", error);
        });
    }
  }, [searchParams, router]);
  

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
