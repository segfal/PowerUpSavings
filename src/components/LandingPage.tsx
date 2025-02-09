import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import '../styles/LandingPage.css';
import logo from '../assets/logo.png';

const LandingPage = () => {
  return (
    <div className="landing-container">
      <div className="stars"></div>
      <div className="twinkling"></div>

      <nav className="landing-nav">
        <motion.div 
          className="nav-logo"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <img src={logo} alt="Power Up Savings" />
          <span>Power Up Savings</span>
        </motion.div>
        <motion.div 
          className="nav-links"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Link to="/login" className="login-link">Launch App</Link>
        </motion.div>
      </nav>

      <main className="landing-main">
        <div className="hero-section">
          <motion.div 
            className="hero-content"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="savings-badge"
            >
              🚀 Your Journey to Financial Freedom
            </motion.div>
            <h1>
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                Power Up
              </motion.span>{" "}
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="gradient-text"
              >
                Your Savings
              </motion.span>{" "}
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9 }}
              >
                To The Moon! 🌕
              </motion.span>
            </h1>
            <motion.div
              className="savings-stats"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1 }}
            >
              <div className="stat">
                <span className="stat-number">30%</span>
                <span className="stat-label">Average Savings Increase</span>
              </div>
              <div className="stat">
                <span className="stat-number">$500+</span>
                <span className="stat-label">Monthly Savings Potential</span>
              </div>
              <div className="stat">
                <span className="stat-number">1000+</span>
                <span className="stat-label">Active Users</span>
              </div>
            </motion.div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.3 }}
            >
              Join the next generation of smart savers who are transforming their financial future through gamified saving challenges and real-time rewards.
            </motion.p>
            <motion.div
              className="cta-container"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5 }}
            >
              <Link to="/login" className="cta-button">
                Start Saving Now
                <span className="button-glow"></span>
              </Link>
              <div className="cta-info">No Credit Card Required • Start Free</div>
            </motion.div>
          </motion.div>

          <motion.div 
            className="hero-visual"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <motion.div 
              className="moon"
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.8, 1, 0.8],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            />
            <motion.div 
              className="rocket-container"
              animate={{ 
                y: [0, -200],
                x: [0, 100],
                rotate: [0, 15],
                scale: [1, 0.8]
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "linear"
              }}
            >
              <div className="rocket">
                <div className="rocket-body">
                  <div className="window"></div>
                </div>
                <div className="fins">
                  <div className="fin left"></div>
                  <div className="fin right"></div>
                </div>
              </div>
              <motion.div 
                className="savings-trail"
                animate={{
                  opacity: [0, 0.5, 0],
                  scale: [1, 2, 1]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity
                }}
              >
                💰
              </motion.div>
            </motion.div>
          </motion.div>
        </div>

        <motion.div 
          className="features-section"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
        >
          <h2>Supercharge Your Savings</h2>
          <div className="features-grid">
            <motion.div 
              className="feature-card"
              whileHover={{ scale: 1.05, rotateY: 10 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="feature-icon">💎</div>
              <h3>Gamified Challenges</h3>
              <p style={{ color: 'white' }}>Complete daily saving missions and watch your wealth grow exponentially.</p>
              <div className="feature-highlight">Up to 50% more savings</div>
            </motion.div>

            <motion.div 
              className="feature-card"
              whileHover={{ scale: 1.05, rotateY: -10 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="feature-icon">🎯</div>
              <h3>Smart Goals</h3>
              <p style={{ color: 'white' }}>Set personalized saving goals with AI-powered recommendations.</p>
              <div className="feature-highlight">Achieve goals 3x faster</div>
            </motion.div>

            <motion.div 
              className="feature-card"
              whileHover={{ scale: 1.05, rotateY: 10 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="feature-icon">🏆</div>
              <h3>Real Rewards</h3>
              <p style={{ color: 'white' }}>Earn points and unlock exclusive rewards as you save more.</p>
              <div className="feature-highlight">$100+ in rewards</div>
            </motion.div>

            <motion.div 
              className="feature-card"
              whileHover={{ scale: 1.05, rotateY: -10 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="feature-icon">📱</div>
              <h3>Smart Analytics</h3>
              <p style={{ color: 'white' }}>Track your progress with beautiful, interactive charts and insights.</p>
              <div className="feature-highlight">Real-time tracking</div>
            </motion.div>
          </div>
        </motion.div>

        <motion.div 
          className="cta-section"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.7 }}
        >
          <div className="cta-card">
            <h2>Ready to Transform Your Savings?</h2>
            <div className="cta-features">
              <div className="cta-feature">✨ Gamified Experience</div>
              <div className="cta-feature">💰 Real Savings</div>
              <div className="cta-feature">🎁 Instant Rewards</div>
            </div>
            <Link to="/login" className="cta-button pulse">
              Launch Your Savings Journey
              <span className="button-glow"></span>
            </Link>
          </div>
        </motion.div>
      </main>

      <footer className="landing-footer">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
        >
          © 2024 Power Up Savings • Built with 💙 for MLH Hackathon
        </motion.p>
      </footer>
    </div>
  );
};

export default LandingPage; 