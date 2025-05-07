import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import API from '../services/api';

function FreelancerProjectDetail() {
    const { id } = useParams();
    const [project, setProject] = useState(null);
    const [timeline, setTimeline] = useState({ progress: 0, milestones: [], timeLogs: [] });

    useEffect(() => {
        API.get(`/projects/${id}`).then(res => {
            setProject(res.data);
            setTimeline(res.data.timeline || { progress: 0, milestones: [], timeLogs: [] });
        });
    }, [id]);

    const updateTimeline = async (e) => {
        e.preventDefault();
        await API.put(`/projects/${id}/timeline`, timeline);
        alert('Timeline updated');
    };

    const addTimeLog = () => {
        setTimeline(prev => ({
            ...prev,
            timeLogs: [...prev.timeLogs, { date: new Date().toISOString(), hours: 1 }]
        }));
    };

    const addMilestone = () => {
        setTimeline(prev => ({
            ...prev,
            milestones: [...prev.milestones, { name: `Milestone ${prev.milestones.length + 1}`, status: 'in progress' }]
        }));
    };

    return (
        <div className="p-6 max-w-3xl mx-auto">
            {project ? (
                <>
                    <h2 className="text-xl font-bold mb-4">{project.title} - Timeline</h2>

                    <form onSubmit={updateTimeline} className="space-y-4">
                        <label className="block">
                            % Completed:
                            <input
                                type="number"
                                value={timeline.progress}
                                onChange={(e) => setTimeline({ ...timeline, progress: e.target.value })}
                                className="input mt-1"
                            />
                        </label>

                        <div>
                            <h4 className="font-semibold">Milestones</h4>
                            {timeline.milestones.map((m, i) => (
                                <p key={i}>{m.name} - {m.status}</p>
                            ))}
                            <button type="button" className="btn mt-2" onClick={addMilestone}>+ Add Milestone</button>
                        </div>

                        <div>
                            <h4 className="font-semibold">Time Logs</h4>
                            {timeline.timeLogs.map((t, i) => (
                                <p key={i}>{new Date(t.date).toLocaleDateString()} - {t.hours}h</p>
                            ))}
                            <button type="button" className="btn mt-2" onClick={addTimeLog}>+ Add Time Log</button>
                        </div>

                        <button type="submit" className="btn w-full bg-green-600 hover:bg-green-700">Save Timeline</button>
                    </form>
                </>
            ) : (
                <p>Loading project...</p>
            )}
        </div>
    );
}

export default FreelancerProjectDetail;
