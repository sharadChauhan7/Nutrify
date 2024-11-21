import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend);

const WeightChart = () => {
    const data = [
        { date: '2024-06-01', weight: 70.2 },
        { date: '2024-06-08', weight: 70.5 },
        { date: '2024-06-15', weight: 70.2 },
        { date: '2024-06-22', weight: 70.1 },
        { date: '2024-06-29', weight: 69.7 },
      ];
  const labels = data.map(entry => entry.date);
  const weights = data.map(entry => entry.weight);
  const minWeight = Math.min(...weights) - 1; // Adjusting the y-axis to start from a little below the minimum weight

  const chartData = {
    labels,
    datasets: [
      {
        label: 'Weight',
        data: weights,
        fill: false,
        backgroundColor: 'rgba(255, 255, 255, .9)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      // legend: {
      //   position: 'top',
      // },
      title: {
        // display: true,
        text: 'Weight Progress Over the Last 4 Weeks',
      },
      // Styling
      layout: {
        padding: 10,
        backgroundColor: 'rgba(255, 255, 255, .9)',
      },
    },
    scales: {
      y: {
        beginAt: minWeight,
      },
    },
  };

  return <Line data={chartData} options={options} />;
};

export default WeightChart;

