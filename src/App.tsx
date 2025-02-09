import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import MainPage from './mainPage';
import ShoppingSites from './shopping/shoppingSites';
import QuizGame from './gameSection/QuizGame';
import SpendingGame from './gameSection/SpendingGame';
import Rewards from './rewards/Rewards';
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

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }>
          <Route index element={<MainPage />} />
          <Route path="shopping" element={<ShoppingSites />} />
          <Route path="quiz" element={<QuizGame />} />
          <Route path="spending-game" element={<SpendingGame />} />
          <Route path="rewards" element={<Rewards />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
