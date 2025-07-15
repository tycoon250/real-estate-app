import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  Title
} from 'chart.js';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend, Title);

const ConversationChart = ({ data }) => {
  // Example `data` = [{ date: 'Jan-2025', count: 3 }, ...]
  const labels = data.map(e => e.date);
  const counts = data.map(e => e.count);

  const chartData = {
    labels,
    datasets: [{
      label: 'Deals / month',
      data: counts,
      backgroundColor: 'rgba(54, 162, 235, 0.6)',
      borderColor: 'rgba(54, 162, 235, 1)',
      borderWidth: 1
    }]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: { display: true, text: 'Deals attempted in the current year' }
    },
    scales: {
      y: {
        beginAtZero: true,
        title: { display: true, text: 'Count' }
      },
      x: {
        title: { display: true, text: 'Month' }
      }
    }
  };

  return <Bar data={chartData} options={options} />;
};

export default ConversationChart;
