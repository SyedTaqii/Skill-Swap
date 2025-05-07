import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function BarChart({ labels, data, title }) {
    return (
        <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-3xl mx-auto">
            <Bar
                data={{
                    labels,
                    datasets: [
                        {
                            label: title,
                            data,
                            backgroundColor: '#60a5fa',
                        },
                    ],
                }}
                options={{ responsive: true, maintainAspectRatio: false }}
                height={300}
            />
        </div>
    );
}

export default BarChart;
