import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
ChartJS.register(ArcElement, Tooltip, Legend);

function PieChart({ labels, data }) {
    return (
        <div className="bg-white p-4 rounded shadow">
            <Pie
                data={{
                    labels,
                    datasets: [
                        {
                            label: 'Count',
                            data,
                            backgroundColor: ['#60a5fa', '#34d399', '#fbbf24'],
                        },
                    ],
                }}
            />
        </div>
    );
}

export default PieChart;
