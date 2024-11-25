import React from "react";
import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });
import { useState, useEffect } from "react";

const HorizontalBarChart = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);
  const options = {
    chart: {
      type: "bar",
      toolbar: { show: false },
    },
    plotOptions: {
      bar: {
        horizontal: true,
        barHeight: "70%", // Adjust the bar height as needed
      },
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      categories: [
        "Andijon",
        "Buxoro",
        "Farg'ona",
        "Jizzax",
        "Xorazm",
        "Namangan",
        "Navoiy",
        "Qashqadaryo",
        "Qoraqalpog'iston",
        "Samarqand",
        "Sirdaryo",
        "Surxondaryo",
        "Toshkent sh.",
      ],
      tickAmount: 12, // Maximum value on x-axis (for example, 12)
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
        lines: { show: true }, // Show grid lines
      },
    },
    tooltip: {
      enabled: true,
    },
    fill: {
      colors: ["#0256BA"], // Adjust color as needed
    },
  };

  const series = [
    {
      data: [12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 1, 1], // Data values
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
