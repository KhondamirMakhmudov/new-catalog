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
import CustomerDashboard from "@/layouts/dashboard/customer/dashboard";

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
          console.log("Sign-in Result:", result);
          if (result?.ok) {
            // Redirect to the appropriate page based on the role or logic
            router.push("/dashboard/customer/");
          } else {
            // Handle login error
            console.error("Login failed:", result?.error);
            alert("Login failed. Please try again.");
          }
        })
        .catch((err) => console.error("Sign-in error:", err));
    }
  }, [code, router]);

  console.log("Code from query string:", code);

  const handleSelectBar = (nav) => {
    setSelectBar(nav);
  };
  return <CustomerDashboard></CustomerDashboard>;
};

export default Index;
