import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const CalorieChart = () => {
  const data = [
    { date: '2024-06-28', calories: 2000 },
    { date: '2024-06-29', calories: 1800 },
    { date: '2024-06-30', calories: 2200 },
    { date: '2024-07-01', calories: 1900 },
    { date: '2024-07-02', calories: 2100 },
    { date: '2024-07-03', calories: 2300 },
    { date: '2024-07-04', calories: 2500 },
  ];
  const labels = data.map(entry => entry.date);
  const calories = data.map(entry => entry.calories);

  const chartData = {
    labels,
    datasets: [
      {
        label: 'Calories Intake',
        data: calories,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 205, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(201, 203, 207, 0.2)'
        ],
        borderColor: [
          'rgb(255, 99, 132)',
          'rgb(255, 159, 64)',
          'rgb(255, 205, 86)',
          'rgb(75, 192, 192)',
          'rgb(54, 162, 235)',
          'rgb(153, 102, 255)',
          'rgb(201, 203, 207)'
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    indexAxis: 'x',
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Calories Intake Over the Last 7 Days',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return <Bar data={chartData} options={options} />;
};

export default CalorieChart;
