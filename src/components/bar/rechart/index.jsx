import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import useGetQuery from "@/hooks/api/useGetQuery";
import { KEYS } from "@/constants/key";
import { URLS } from "@/constants/url";
import { get } from "lodash";

const HorizonChart = () => {
  const { data: company } = useGetQuery({
    key: KEYS.companyCount,
    url: URLS.companyCount,
  });

  const [chartData, setChartData] = useState([]);

  // Region colors
  const regionColors = {
    "Toshkent shahri": "#AFEEEE",
    Navoiy: "#F5F0D4",
    Toshkent: "#C6D8FF",
    Buxoro: "#abcdef",
    Namangan: "#87CEEB",
    Samarqand: "#B0C4DE",
    Jizzax: "#FDEED9",
    Fargona: "#66CDAA",
    Xorazm: "#FFE4B5",
    Surxondaryo: "#B5F2EA",
    Sirdaryo: "#9370DB",
    Qashqadaryo: "#C3FBD8",
    "Rossiya federatsiyasi": "#ff33aa",
    Andijon: "#aaff33",
    "Qoraqalpogiston Respublikasi": "#D7B59F",
  };

  useEffect(() => {
    // Transform company data into a format suitable for recharts
    const regions = get(company, "data", []).map((item) => ({
      region: get(item, "region"),
      companyCount: get(item, "company_count"),
      fill: regionColors[get(item, "region")] || "#0256BA", // Default color if not in the list
    }));
    setChartData(regions);
  }, [company]);

  return (
    <div style={{ width: "100%", height: "400px" }} className="text-xs">
      <ResponsiveContainer>
        <BarChart data={chartData} layout="vertical">
          <CartesianGrid />
          <XAxis type="number" />
          <YAxis dataKey="region" type="category" width={150} interval={0} />
          <Tooltip />
          <Bar dataKey="companyCount" fill="#8884d8" isAnimationActive={true}>
            {chartData.map((entry, index) => (
              <cell key={`cell-${index}`} fill={entry.fill} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default HorizonChart;
