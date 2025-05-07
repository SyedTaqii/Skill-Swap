import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ForgotPassword from './pages/ForgotPassword';
import VerifyOtp from './pages/VerifyOtp';
import ResetPassword from './pages/ResetPassword';
import MainDashboard from './pages/MainDashboard'; // Redirects based on role
import ClientDashboard from './pages/ClientDashboard';
import FreelancerDashboard from './pages/FreelancerDashboard';
import PostProject from './pages/PostProject';
import FreelancerSearch from './pages/FreelancerSearch'; // Freelancer search page
import PaymentDetails from './pages/PaymentDetails'; // Payment details page for clients
import LeaveReview from './pages/LeaveReview'; // Leave a review page
import FreelancerProfile from './pages/FreelancerProfile'; // Freelancer profile page
import ProjectDetails from './pages/ProjectDetails'; // Project details page (with chat)
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute'; // To protect routes

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/verify-otp" element={<VerifyOtp />} />
          <Route path="/reset-password" element={<ResetPassword />} />

          {/* Protected Routes */}
          <Route path="/dashboard" element={<ProtectedRoute><MainDashboard /></ProtectedRoute>} />
          <Route path="/client-dashboard" element={<ProtectedRoute><ClientDashboard /></ProtectedRoute>} />
          <Route path="/freelancer-dashboard" element={<ProtectedRoute><FreelancerDashboard /></ProtectedRoute>} />

          {/* Client-specific routes */}
          <Route path="/projects/new" element={<ProtectedRoute><PostProject /></ProtectedRoute>} />
          <Route path="/freelancer-search" element={<ProtectedRoute><FreelancerSearch /></ProtectedRoute>} />
          <Route path="/projects/:projectId/payment" element={<ProtectedRoute><PaymentDetails /></ProtectedRoute>} /> {/* Project payment route */}
          <Route path="/projects/:projectId/review/:freelancerId" element={<ProtectedRoute><LeaveReview /></ProtectedRoute>} /> {/* Leave Review route */}

          {/* Freelancer profile */}
          <Route path="/freelancer/:freelancerId" element={<ProtectedRoute><FreelancerProfile /></ProtectedRoute>} /> {/* Freelancer profile page */}

          {/* Project details page with chat functionality */}
          <Route path="/projects/:projectId" element={<ProtectedRoute><ProjectDetails /></ProtectedRoute>} /> {/* Project details page */}
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
