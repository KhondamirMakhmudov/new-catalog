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
      colors: ["#0256BA"],
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
