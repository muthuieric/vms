import React, { useState, useEffect } from "react";
import PieChartType from "./PieChartType";
import PurposePieChart from "./PurposePieChart";
import HostVisitorChart from "./HostVistorChart";

const Dashboard = () => {
  const [totalVisits, setTotalVisits] = useState(0);
  

  useEffect(() => {
    fetch("http://127.0.0.1:8000/total-visits")  
      .then((response) => response.json())
      .then((data) => {
        setTotalVisits(data.total_visits);
      })
      .catch((error) => {
        console.error("Error fetching total visits:", error);
      });
  }, []);

  return (
    <div className="mx-auto ">
        <h2 className="text-2xl font-bold text-center pt-2">Dashboard</h2>
  
      <div className="flex flex-col md:flex-row md:space-x-4 p-4 md:p-24">
        
        <div className="md:w-1/2   mb-12 lg:w-1/2 lg:h-64  shadow-lg bg-blue-600 text-white rounded-lg p-4 py-10">
            <h2 className="text-3xl font-bold text-center mb-10">Total Visits</h2>
            <p className="text-6xl text-center">{totalVisits}</p>
        </div>

        <PieChartType  />
        
        <PurposePieChart />

      </div>

      <div>
            <HostVisitorChart />
        </div>
    </div>
  );
};

export default Dashboard;