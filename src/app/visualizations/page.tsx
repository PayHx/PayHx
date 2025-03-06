"use client";

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/resources/firebase";
import Plotly from "plotly.js-dist-min";
import createPlotlyComponent from "react-plotly.js/factory";

const Plot = dynamic(() => import("react-plotly.js"), { ssr: false });

interface SalaryData {
  experience: number;
  pay: number;
  hospital: string;
  city: string;
  state: string;
  specialty: string;
}

export default function VisualizationsPage() {
  const [data, setData] = useState<SalaryData[]>([]);
  const [loading, setLoading] = useState(true);
  const [PlotComponent, setPlotComponent] = useState<any>(null);

  useEffect(() => {
    const PlotlyComponent = createPlotlyComponent(Plotly);
    setPlotComponent(() => PlotlyComponent);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "salaries"));
        const salaries = querySnapshot.docs.map(doc => {
          const salary = doc.data();
          return {
            city: salary.city ?? "Unknown",
            state: salary.state ?? "Unknown",
            experience: salary.experience ?? 0,
            specialty: salary.specialty ?? "Unknown",
            hospital: salary.hospital ?? "Unknown",
            pay: typeof salary.pay === "string" ? parseFloat(salary.pay.replace(/[$,]/g, "")) || 0 : salary.pay ?? 0,
          };
        });

        console.log("Fetched Salary Data for Scatterplot Page:", salaries);
        setData(salaries);
      } catch (error) {
        console.error("Error fetching salaries:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (!PlotComponent) return <p>Loading chart...</p>;
  if (loading) return <div className="text-center p-5">Loading salary data...</div>;

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-center items-center py-10">
        <PlotComponent
          data={[
            {
              x: data.map((d) => d.experience), // X-axis: Experience
              y: data.map((d) => d.pay), // Y-axis: Pay
              text: data.map((d) => `${d.hospital}<br>${d.city}, ${d.state}<br>${d.specialty}`),
              mode: "markers",
              type: "scatter",
              marker: { size: 10, color: "blue" },
              hovertemplate:
                "%{text}<br>Experience: %{x} years<br>Salary: $%{y}<extra></extra>",
            },
          ]}
          layout={{
            width: 800,
            height: 600,
            title: "Salary vs. Years of Experience",
            xaxis: { title: "Years of Experience", showgrid: true },
            yaxis: { title: "Salary ($)", showgrid: true },
          }}
        />
      </div>
    </div>
  );
}
