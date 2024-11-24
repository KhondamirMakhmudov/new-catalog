import React from "react";

import Chart from "react-apexcharts";

const HorizontalBarChart = () => {
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
        "Andijon viloyati",
        "Buxoro viloyati",
        "Farg'ona viloyati",
        "Jizzax viloyati",
        "Xorazm viloyati",
        "Namangan viloyati",
        "Navoiy viloyati",
        "Qashqadaryo viloyati",
        "Qoraqalpog'iston",
        "Samarqand viloyati",
        "Sirdaryo viloyati",
        "Surxondaryo viloyati",
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

  return <Chart options={options} series={series} type="bar" height={400} />;
};

export default HorizontalBarChart;
