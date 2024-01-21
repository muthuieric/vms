/* global google */

import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';

const HostVisitorChart = () => {
  const [hostVisitorData, setHostVisitorData] = useState([]);

  const drawChart = useCallback(() => {
    const data = new window.google.visualization.DataTable();
    data.addColumn('string', 'Host');
    data.addColumn('number', 'Visitor Count');

    // Add rows from the fetched data
    hostVisitorData.forEach((entry) => {
      data.addRow([entry.host, entry.visitor_count]);
    });

    const options = {
      title: 'Host Visitor Chart',
      titleTextStyle: {
        fontSize: 20,
        marginTop: -20,
      },
      chartArea: { width: '80%' },
      hAxis: {
        title: 'Host',
      },
      vAxis: {
        title: 'Visitor Count',
      },
    };

    const chart = new window.google.charts.Bar(document.getElementById('host-visitor-chart'));
    chart.draw(data, google.charts.Bar.convertOptions(options));
  }, [hostVisitorData]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/host-visitor-data/');
        setHostVisitorData(response.data.host_visitor_data);
      } catch (error) {
        console.error('Error fetching host-visitor data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (hostVisitorData.length > 0) {
      google.charts.load('current', { packages: ['bar'] });
      google.charts.setOnLoadCallback(drawChart);
    }
  }, [drawChart, hostVisitorData]);

  return (
    <div className="flex flex-col md:flex-row md:space-x-4 p-4">
      <div id="host-visitor-chart" className='w-full h-full' ></div>
    </div>
  );
};

export default HostVisitorChart;
