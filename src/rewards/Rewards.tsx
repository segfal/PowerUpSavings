import { motion } from 'framer-motion';
import './Rewards.css';

interface RewardFeature {
  id: string;
  title: string;
  description: string;
  icon: string;
}

const rewardFeatures: RewardFeature[] = [
  {
    id: '1',
    title: 'One Point Per Item',
    description: 'Earn 1 point for every item you purchase using your Capital One card.',
    icon: '🎯'
  },
  {
    id: '2',
    title: 'Sign Up Bonus',
    description: 'Get a free item worth up to $20 when you sign up!',
    icon: '🎁'
  },
  {
    id: '3',
    title: 'Referral Rewards',
    description: 'Earn 5 bonus points and a free item up to $10 for each friend you refer!',
    icon: '👥'
  },
  {
    id: '4',
    title: 'Team Rewards',
    description: 'Form teams with friends and family to pool rewards together. When your team reaches 50 points, unlock exclusive discounts!',
    icon: '🤝'
  },
  {
    id: '5',
    title: 'Milestone Rewards',
    description: 'Reach 20 points and get a free item worth up to $20 plus 5 bonus points!',
    icon: '🏆'
  },
  {
    id: '6',
    title: 'Special Store Bonuses',
    description: 'Earn extra points on special items, like bonus points on coffee at Dunkin!',
    icon: '⭐'
  }
];

const Rewards = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  return (
    <motion.div
      className="rewards-container"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.header className="rewards-header" variants={itemVariants}>
        <h1>Power Up Your Savings</h1>
        <p>Earn points, unlock rewards, and save money with every purchase!</p>
      </motion.header>

      <motion.section className="rewards-highlight" variants={itemVariants}>
        <div className="highlight-content">
          <h2>No Interest, Just Rewards!</h2>
          <p>Our cards have no interest fees - we make money through partnerships with stores and restaurants.</p>
          <div className="highlight-points">
            <div className="point-item">
              <span className="point-icon">💳</span>
              <span>Zero Interest</span>
            </div>
            <div className="point-item">
              <span className="point-icon">🤝</span>
              <span>Partner Benefits</span>
            </div>
            <div className="point-item">
              <span className="point-icon">💰</span>
              <span>More Savings</span>
            </div>
          </div>
        </div>
      </motion.section>

      <motion.section className="rewards-features" variants={itemVariants}>
        <h2>Rewards & Benefits</h2>
        <div className="features-grid">
          {rewardFeatures.map((feature) => (
            <motion.div
              key={feature.id}
              className="feature-card"
              variants={itemVariants}
              whileHover={{ scale: 1.02, boxShadow: "0 8px 32px rgba(0, 0, 0, 0.12)" }}
            >
              <span className="feature-icon">{feature.icon}</span>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      <motion.section className="upcoming-deals" variants={itemVariants}>
        <h2>Upcoming Deals</h2>
        <div className="deals-content">
          <div className="deal-card">
            <span className="deal-badge">Coming Soon</span>
            <h3>Double Points Weekend</h3>
            <p>Earn 2x points on all purchases this weekend!</p>
          </div>
          <div className="deal-card">
            <span className="deal-badge">Limited Time</span>
            <h3>Team Challenge</h3>
            <p>Form a team of 4 and earn 100 points collectively to get $50 in rewards!</p>
          </div>
          <div className="deal-card">
            <span className="deal-badge">Premium</span>
            <h3>Coffee Lovers</h3>
            <p>3x points on all coffee purchases at Dunkin this month!</p>
          </div>
        </div>
      </motion.section>

      <motion.section className="rewards-cta" variants={itemVariants}>
        <h2>Ready to Start Earning?</h2>
        <p>Use your Capital One card for purchases to start earning points today!</p>
        <div className="important-note">
          <span className="note-icon">ℹ️</span>
          <p>Remember: You must use your Capital One card and linked bank account to earn points!</p>
        </div>
      </motion.section>
    </motion.div>
  );
};

export default Rewards; 