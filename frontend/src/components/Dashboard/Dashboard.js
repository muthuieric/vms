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
    <div className="mx-auto h-screen ">
        <h2 className="text-2xl font-bold text-center pt-4 flex justify-start pl-6 ">Dashboard</h2>
  
      <div className="flex flex-col md:flex-row md:space-x-4 p-4 ">     
        <PieChartType  />
        <PurposePieChart />
        <div className="mb-4 lg:w-full  shadow-lg bg-blue-600 text-white rounded-lg p-4 ">
            <h2 className="text-2xl font-bold text-center mb-8">Total Visits</h2>
            <p className="text-5xl text-center">{totalVisits}</p>
        </div>
      </div>

            <HostVisitorChart />
    </div>
  );
};

export default Dashboard;