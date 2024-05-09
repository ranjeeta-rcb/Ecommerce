import React, { useState, useEffect } from "react";
import { Chart } from "react-google-charts";
import axios from 'axios';

function PieChart() {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const resp = await axios.get('http://localhost:8081/piechart');
      setData(resp.data);
    } catch (error) {
      console.error('Error fetching product data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const chartData = [["Category", "Items"], ...data.map((row) => [row.category, row.product_count])];

  const options = {
    title: "Available Products Overview",
    pieHole: 0.4,
    is3D: false,
    titleTextStyle: {
      fontSize: 18,
      bold: true,
    },
    colors: ["rgb(53, 138, 158)", "rgb(37, 11, 165)", "#188310"],
  };

  return (
    <Chart chartType="PieChart" width="110%" height="550px" data={chartData} options={options} />
  );
}

export default PieChart;
