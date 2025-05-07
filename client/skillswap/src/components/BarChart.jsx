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
        <div className="bg-white p-4 rounded shadow">
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
                options={{ responsive: true }}
            />
        </div>
    );
}

export default BarChart;
