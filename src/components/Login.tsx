import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import '../styles/Login.css';
import logo from '../assets/logo.png';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    if (username === 'admin' && password === 'admin') {
      // Add success animation before redirecting
      setIsLoading(false);
      localStorage.setItem('isLoggedIn', 'true');
      navigate('/dashboard');
    } else {
      setIsLoading(false);
      setError('Invalid credentials. Try admin/admin');
      // Shake animation for error
      const form = document.querySelector('.login-form');
      form?.classList.add('shake');
      setTimeout(() => form?.classList.remove('shake'), 500);
    }
  };

  return (
    <div className="login-container">
      <motion.div 
        className="login-card"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div 
          className="login-logo"
          initial={{ y: -50 }}
          animate={{ y: 0 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
        >
          <motion.img 
            src={logo} 
            alt="Power Up Savings"
            whileHover={{ rotate: 360, scale: 1.1 }}
            transition={{ duration: 0.5 }}
          />
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Power Up Savings
          </motion.h1>
        </motion.div>

        <form onSubmit={handleLogin} className="login-form">
          <motion.div 
            className="form-group"
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <label>Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username"
              className="login-input"
            />
          </motion.div>

          <motion.div 
            className="form-group"
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              className="login-input"
            />
          </motion.div>

          {error && (
            <motion.div 
              className="error-message"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {error}
            </motion.div>
          )}

          <motion.button
            className={`login-button ${isLoading ? 'loading' : ''}`}
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="loader"></div>
            ) : (
              'Login'
            )}
          </motion.button>

          <motion.p 
            className="login-hint"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            Hint: Use admin/admin to login
          </motion.p>
        </form>
      </motion.div>

      {/* Animated background elements */}
      <div className="background-animations">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="floating-circle"
            initial={{ 
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight
            }}
            animate={{ 
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "linear"
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default Login; 