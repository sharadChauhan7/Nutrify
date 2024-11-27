import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const CalorieChart = ({data , target}) => {
  const data1 = [
    { date: '2024-06-28', calories: 2000 },
    { date: '2024-06-29', calories: 1800 },
    { date: '2024-06-30', calories: 2200 },
    { date: '2024-07-01', calories: 1900 },
    { date: '2024-07-02', calories: 2100 },
    { date: '2024-07-03', calories: 2300 },
    { date: '2024-07-04', calories: 2500 },
  ];
  if(data === null || data == [])data=data1;
  const labels = data? data.map(entry => entry.date):data.map(entry => entry.date);
  const calories = data? data.map(entry => entry.calories):data.map(entry => entry.calories);

  const chartData = {
    labels,
    datasets: [
      {
        label: 'Calories Intake',
        data: calories,
        backgroundColor: [
          'rgba(255, 227, 87, 1)',
          'rgba(255, 227, 87, 1)',
          'rgba(255, 227, 87, 1)',
          'rgba(255, 227, 87, 1)',
          'rgba(255, 227, 87, 1)',
          'rgba(255, 227, 87, 1)',
          'rgba(255, 227, 87, 1)',
        ],
        borderColor: [
          'rgb(255, 150, 0)',
          'rgb(255, 150, 0)',
          'rgb(255, 150, 0)',
          'rgb(255, 150, 0)',
          'rgb(255, 150, 0)',
          'rgb(255, 150, 0)',
          'rgb(255, 150, 0)',
        ],
        borderWidth: 1,
      },
      {
        label: 'Target',
        data: [target, target, target, target, target,target, target],
        pointRadius: 0, // Target value for each label
        type: 'line',
        borderColor: 'red',
        borderWidth: 1,
        fill: false
      }
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      customCanvasBackgroundColor: {
        color: 'lightGreen',
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        // grid: {
        //   display: false
        // }
      },
      x:{
        grid:{
          display:false
        }
      }
    },
  };

  return <Bar data={chartData} options={options} />;
};

export default CalorieChart;
