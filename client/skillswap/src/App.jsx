import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import ProtectedRoute from './components/ProtectedRoutes';
import FreelancerSearch from './pages/FreelancerSearch';
import ProjectForm from './pages/ProjectForm';
import Chat from './pages/Chat';
import ProjectDetail from './pages/ProjectDetail';
import FreelancerProjectDetail from './pages/FreelancerProjectDetail';
import SubmitReview from './pages/SubmitReview';
import FreelancerProfile from './pages/FreelancerProfile';
import AdminVerification from './pages/AdminVerification';
import NotificationPreferences from './pages/NotificationPreferences';
import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      <Navbar />
      <div className="p-4 max-w-7xl mx-auto">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/freelancers" element={<ProtectedRoute><FreelancerSearch /></ProtectedRoute>} />
          <Route path="/post-project" element={<ProtectedRoute><ProjectForm /></ProtectedRoute>} />
          <Route path="/chat" element={<ProtectedRoute><Chat /></ProtectedRoute>} />
          <Route path="/project/:id" element={<ProtectedRoute><ProjectDetail /></ProtectedRoute>} />
          <Route path="/freelancer-project/:id" element={<ProtectedRoute><FreelancerProjectDetail /></ProtectedRoute>} />
          <Route path="/submit-review/:freelancerId" element={<ProtectedRoute><SubmitReview /></ProtectedRoute>} />
          <Route path="/freelancer-profile/:freelancerId" element={<ProtectedRoute><FreelancerProfile /></ProtectedRoute>} />
          <Route path="/admin/verify-freelancers" element={<ProtectedRoute><AdminVerification /></ProtectedRoute>} />
          <Route path="/notifications" element={<ProtectedRoute><NotificationPreferences /></ProtectedRoute>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
