"use client"; // Ensures this runs only on the client side

import SalaryVisContainer from "@/components/vis-containers/salary-vis-container";
import MekkoVisContainer from "@/components/vis-containers/mekko-vis-container";

export default function VisualizationsPage() {
  return (
    <div className="container mx-auto py-10 space-y-8">
      <h1 className="text-2xl font-bold text-center">Salary Visualizations</h1>

      <div className="space-y-4">
        <h2 className="text-xl text-center">Salary vs. Years of Experience</h2>
        <SalaryVisContainer />
      </div>

      <div className="space-y-4">
        <h2 className="text-xl text-center">Salary vs. Years of Experience</h2>
        <MekkoVisContainer />
      </div>
    </div>
  );
}
