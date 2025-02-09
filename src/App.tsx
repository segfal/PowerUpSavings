import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import MainPage from "./mainPage";
import QuizPage from "./gameSection/QuizGame";
import Layout from "./components/Layout";
import ShoppingSites from "./shopping/shoppingSites";
import Rewards from "./rewards/Rewards";
import Login from './components/Login';
import LandingPage from './components/LandingPage';
import './App.css';

// Protected Route component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

// Public Route component - redirects to dashboard if already logged in
const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  
  if (isLoggedIn) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
};

function App() {
  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={
          <PublicRoute>
            <LandingPage />
          </PublicRoute>
        } />
        <Route path="/login" element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        } />

        {/* Protected dashboard routes */}
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }>
          <Route index element={<MainPage />} />
          <Route path="quiz" element={<QuizPage />} />
          <Route path="shopping" element={<ShoppingSites />} />
          <Route path="cards" element={<div>Cards Page Coming Soon</div>} />
          <Route path="rewards" element={<Rewards />} />
          <Route path="settings" element={<div>Settings Page Coming Soon</div>} />
        </Route>

        {/* Catch all route - redirect to landing page */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
