"use client"; // Ensures this runs only on the client side

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/resources/firebase";

// Dynamically import Plotly to avoid server-side execution errors
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
  const [PlotlyComponent, setPlotlyComponent] = useState<any>(null);

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

  useEffect(() => {
    import("plotly.js-dist-min").then((Plotly) => {
      import("react-plotly.js/factory").then((createPlotlyComponent) => {
        setPlotlyComponent(() => createPlotlyComponent.default(Plotly));
      });
    });
  }, []);

  if (loading) return <div className="text-center p-5">Loading visuals...</div>;
  if (!PlotlyComponent) return <p className="text-center p-5">Loading chart...</p>;

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold text-center mb-5">Salary Visualizations</h1>
      <div className="flex justify-center items-center py-10">
        <PlotlyComponent
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
