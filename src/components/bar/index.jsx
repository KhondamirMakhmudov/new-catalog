import React from "react";
import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });
import { useState, useEffect } from "react";
import useGetQuery from "@/hooks/api/useGetQuery";
import { KEYS } from "@/constants/key";
import { URLS } from "@/constants/url";
import { get } from "lodash";

const HorizontalBarChart = () => {
  const { data: company, isLoading } = useGetQuery({
    key: KEYS.companyCount,
    url: URLS.companyCount,
  });
  const [isClient, setIsClient] = useState(false);

  const regions = get(company, "data", [])?.map((item) => get(item, "region"));

  const regionColors = [
    { region: "Toshkent shahri", regionColor: "#0256BA" },
    { region: "Navoiy", regionColor: "#123456" },
    { region: "Toshkent", regionColor: "#654321" },
    { region: "Buxoro", regionColor: "#abcdef" },
    { region: "Namangan", regionColor: "#fedcba" },
    { region: "Samarqand", regionColor: "#ff5733" },
    { region: "Jizzax", regionColor: "#33ff57" },
    { region: "Fargona", regionColor: "#57ff33" },
    { region: "Xorazm", regionColor: "#33aaff" },
    { region: "Surxondaryo", regionColor: "#aa33ff" },
    { region: "Sirdaryo", regionColor: "#ffaa33" },
    { region: "Qashqadaryo", regionColor: "#33ffaa" },
    { region: "Rossiya federatsiyasi", regionColor: "#ff33aa" },
    { region: "Andijon", regionColor: "#aaff33" },
    { region: "Qoraqalpogiston Respublikasi", regionColor: "#aa33ff" },
  ];

  const getRegionColor = (region) => {
    const regionObj = regionColors.find((r) => r.region === region);
    return regionObj ? regionObj.regionColor : "#0256BA";
  };

  const filteredRegionColors = regions.map((region) => {
    const regionObj = regionColors.find((r) => r.region === region);
    return regionObj ? regionObj.regionColor : "#0256BA";
  });

  const companyCounts = get(company, "data", [])?.map((item) =>
    get(item, "company_count")
  );

  useEffect(() => {
    setIsClient(true);
  }, []);
  const options = {
    chart: {
      type: "bar",
      toolbar: { show: true },
    },
    plotOptions: {
      bar: {
        horizontal: true,
        barHeight: "70%",
      },
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      categories: regions,
      tickAmount: 12,
    },
    yaxis: {
      labels: {
        style: {
          fontSize: "10px",
          fontWeight: "600",
        },
      },
    },
    grid: {
      xaxis: {
        lines: { show: true },
      },
    },
    tooltip: {
      enabled: true,
    },
    fill: {
      colors: filteredRegionColors,
    },
  };

  const series = [
    {
      name: "Korxonalar soni",
      data: companyCounts,
    },
  ];

  return (
    <>
      {isClient && (
        <Chart options={options} series={series} type="bar" height={400} />
      )}
    </>
  );
};

export default HorizontalBarChart;
