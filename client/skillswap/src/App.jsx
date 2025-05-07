import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
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
  const [count, setCount] = useState(0)

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/signup" element={<Signup />} />

        <Route path="/login" element={<Login />} />

        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />

        <Route path="/freelancers" element={<FreelancerSearch />} />
        <Route path="/projects/new" element={
          <ProtectedRoute role="client">
            <ProjectForm />
          </ProtectedRoute>
        } />

        <Route path="/chat" element={<ProtectedRoute><Chat /></ProtectedRoute>} />

        <Route path="/projects/:id" element={<ProtectedRoute role="client"><ProjectDetail /></ProtectedRoute>} />

        <Route path="/freelancer/projects/:id" element={
          <ProtectedRoute role="freelancer">
            <FreelancerProjectDetail />
          </ProtectedRoute>
        } />

        <Route path="/reviews/submit/:projectId" element={
          <ProtectedRoute role="client">
            <SubmitReview />
          </ProtectedRoute>
        } />

        <Route path="/freelancers/profile/:id" element={<FreelancerProfile />} />

        <Route path="/admin/verification" element={
          <ProtectedRoute role="admin">
            <AdminVerification />
          </ProtectedRoute>
        } />

        <Route path="/notifications/preferences" element={
          <ProtectedRoute>
            <NotificationPreferences />
          </ProtectedRoute>
        } />
      </Routes>
    </Router>
  )
}

export default App
