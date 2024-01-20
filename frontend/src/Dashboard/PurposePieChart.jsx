/* global google */

import React, { useEffect, useState } from 'react';

const PurposePieChart = () => {
  const [purposeData, setPurposeData] = useState([]);

  useEffect(() => {
    if (typeof google === 'undefined') {
      return; // Google Charts library is not loaded yet
    }

    google.charts.load('current', { packages: ['corechart'] });
    google.charts.setOnLoadCallback(fetchData);

    function fetchData() {
      // Fetch the data from your Django API
      fetch('http://127.0.0.1:8000/purpose-data/')
        .then((response) => response.json())
        .then((data) => {
          // Format the data for the pie chart
          const purposeChartData = data.purposes.map((purpose) => [
            purpose.purpose,
            purpose.count
          ]);
          setPurposeData(purposeChartData);
        })
        .catch((error) => {
          console.error('Error fetching purpose data:', error);
        });
    }
  }, []);

  useEffect(() => {
    if (purposeData.length === 0 || typeof google === 'undefined') return;

    const dataTable = new google.visualization.DataTable();
    dataTable.addColumn('string', 'Purpose');
    dataTable.addColumn('number', 'Count');
    dataTable.addRows(purposeData);

    const options = {
      title: 'Number of Visits per Purpose'
    };

    const chart = new google.visualization.PieChart(
      document.getElementById('purpose-piechart')
    );
    chart.draw(dataTable, options);
  }, [purposeData]);

  return (
    <div id="purpose-piechart" className="shadow-lg lg:w-full mb-4"></div>
  );
};

export default PurposePieChart;
