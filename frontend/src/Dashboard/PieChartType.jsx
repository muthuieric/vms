/* global google */

import React, { useEffect, useState } from 'react';

const PieChartType = () => {
  const [visitTypeData, setVisitTypeData] = useState([]);

  useEffect(() => {
    // Load Google Charts library and define callback function
    google.charts.load('current', { packages: ['corechart'] });
    google.charts.setOnLoadCallback(fetchData);

    function fetchData() {
      // Fetch the data from your Django API
      fetch('http://127.0.0.1:8000/visit-type-data/')
        .then((response) => response.json())
        .then((data) => {
          // Format the data for the pie chart
          const visitTypeChartData = data.visit_types.map((visitType) => [
            visitType.visit_type,
            visitType.count
          ]);
          setVisitTypeData(visitTypeChartData);
        })
        .catch((error) => {
          console.error('Error fetching visit type data:', error);
        });
    }
  }, []);

  useEffect(() => {
    if (visitTypeData.length === 0) return; // Wait until data is available

    // Create the pie chart once data is available
    const dataTable = new google.visualization.DataTable();
    dataTable.addColumn('string', 'Visit Type');
    dataTable.addColumn('number', 'Count');
    dataTable.addRows(visitTypeData);

    const options = {
      title: 'Number of Visits per Visit Type'
    };

    const chart = new google.visualization.PieChart(
      document.getElementById('piechart')
    );
    chart.draw(dataTable, options);
  }, [visitTypeData]);

  return (
    <div id="piechart" className="shadow-lg lg:w-full mb-4"></div>
  );
};

export default PieChartType;
