import { useEffect, useState } from 'react';
import API from '../services/api';

function NotificationPreferences() {
    const [prefs, setPrefs] = useState({
        email: true,
        sms: false,
        inApp: true,
    });
    const [status, setStatus] = useState('');

    useEffect(() => {
        // Ideally fetch current prefs from user object
        const user = JSON.parse(localStorage.getItem('user'));
        if (user?.notificationPrefs) {
            setPrefs(user.notificationPrefs);
        }
    }, []);

    const handleChange = (e) => {
        const { name, checked } = e.target;
        setPrefs(prev => ({ ...prev, [name]: checked }));
    };

    const handleSave = async () => {
        try {
            await API.put('/notify/preferences', prefs);
            const user = JSON.parse(localStorage.getItem('user'));
            user.notificationPrefs = prefs;
            localStorage.setItem('user', JSON.stringify(user));
            setStatus('Preferences updated ✅');
        } catch (err) {
            setStatus('Failed to update preferences ❌');
        }
    };

    return (
        <div className="max-w-xl mx-auto p-6 bg-white rounded shadow">
            <h2 className="text-xl font-bold mb-4">🔔 Notification Preferences</h2>

            <div className="space-y-4">
                <label className="flex items-center gap-2">
                    <input type="checkbox" name="email" checked={prefs.email} onChange={handleChange} />
                    Email Notifications
                </label>

                <label className="flex items-center gap-2">
                    <input type="checkbox" name="sms" checked={prefs.sms} onChange={handleChange} />
                    SMS Notifications
                </label>

                <label className="flex items-center gap-2">
                    <input type="checkbox" name="inApp" checked={prefs.inApp} onChange={handleChange} />
                    In-App Notifications
                </label>

                <button onClick={handleSave} className="btn w-full mt-4">Save Preferences</button>
                {status && <p className="text-sm text-green-600 mt-2">{status}</p>}
            </div>
        </div>
    );
}

export default NotificationPreferences;
