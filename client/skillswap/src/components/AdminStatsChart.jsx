import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Register necessary Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const AdminStatsChart = ({ data }) => {
    // Prepare chart data
    const chartData = {
        labels: data.map((stat) => stat.status),
        datasets: [
            {
                label: 'Project Statuses',
                data: data.map((stat) => stat.count),
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        plugins: {
            title: {
                display: true,
                text: 'Project Status Statistics',
            },
        },
    };

    return <Bar data={chartData} options={chartOptions} />;
};

export default AdminStatsChart;
