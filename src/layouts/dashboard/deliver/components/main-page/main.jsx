import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/router";
import MyMaterials from "@/pages/dashboard/deliver/main/materials";

const MainContent = ({ children }) => {
  const router = useRouter();

  return (
    <div className="col-span-9 p-[20px] border border-t border-l-0 border-b-0 border-r-0 font-gilroy">
      {children}
    </div>
  );
};

export default MainContent;
