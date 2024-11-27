import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend);

const WeightChart = ({data,target}) => {
  const labels = data.map(entry => {
    const date = entry.date.split('T')[0];
    return date;
  });
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

