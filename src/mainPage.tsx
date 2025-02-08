import { useState } from 'react'
import { motion } from 'framer-motion'
import capitalOneCard from './assets/capitalOneCard.png'
import avatar from './assets/avatar.png'
import headPhones from './assets/headphones.png'
import fries from './assets/fries.png'
import tshirt from './assets/tshirt.png'
import dunkin from './assets/dunkin.png'
import './App.css'
import { head } from 'framer-motion/client'

interface Transaction {
  id: string;
  receiver: string;
  type: string;
  points: number;
  amount: number;
}

interface PastTrend {
  id: string;
  amount: string;
  daysAgo: number;
  itemName: string;
  imageUrl: string;
}

interface MostVisited {
  id: string;
  category: string;
  percentage: number;
  imageUrl: string;
}

function MainPage() {
  const [currentBalance, setCurrentBalance] = useState(479.40);
  const [memberSavings, setMemberSavings] = useState(100.50);
  const [spending, setSpending] = useState(350.60);
  
  const [transactions] = useState<Transaction[]>([
    { id: '1', receiver: 'One Fullerton', type: 'Shopping', points: 75, amount: 75.67 },
    { id: '2', receiver: 'The Shoppes MBS', type: 'Shopping', points: 25, amount: 25.45 },
    { id: '3', receiver: 'Deli Orchard', type: 'Shopping', points: 19, amount: 19.50 },
    { id: '4', receiver: 'Jelita Shopping Center', type: 'Shopping', points: 35, amount: 35.89 },
    { id: '5', receiver: 'Paragon Shopping Center', type: 'Shopping', points: 43, amount: 43.67 }
  ]);

  const [pastTrends] = useState<PastTrend[]>([
    { id: '1', amount: '$554.24', daysAgo: 1, itemName: 'Amazon Headphones', imageUrl: headPhones},
    { id: '2', amount: '$5.25', daysAgo: 4, itemName: 'McDonalds Fries', imageUrl: fries },
    { id: '3', amount: '$22.67', daysAgo: 16, itemName: 'Amazon T-Shirt', imageUrl: tshirt },
    { id: '4', amount: '$5.24', daysAgo: 24, itemName: 'Dunkin Donuts Coffee', imageUrl: dunkin },
  ]);

  const [mostVisited] = useState<MostVisited[]>([
    { id: '1', category: 'Food and Bevarages', percentage: 74, imageUrl: dunkin},
    { id: '2', category: 'Clothing', percentage: 52, imageUrl: tshirt },
    { id: '3', category: 'Electronics', percentage: 21, imageUrl: headPhones }
  ]);

  // Calculate total points
  const totalPoints = transactions.reduce((sum, transaction) => sum + transaction.points, 0);

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
    <motion.main
      className="main-content"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.header className="dashboard-header" variants={itemVariants}>
        <div className="dashboard-title">
          <h1>Dashboard</h1>
          <p>Get summary of your weekly online transactions here.</p>
        </div>
        <div className="user-actions">
          <button className="icon-button">
            <i className="icon-mail"></i>
          </button>
          <button className="icon-button">
            <i className="icon-notification"></i>
          </button>
          <div className="user-profile">
            <img src={avatar} alt="User" />
            <span>Admin Account</span>
          </div>
        </div>
      </motion.header>

      <div className="dashboard-grid">
        <motion.section className="card-section" variants={itemVariants}>
          <h2>Cards</h2>
          <div className="card-carousel">
            <button className="carousel-arrow left" aria-label="Previous card">‹</button>
            <motion.div 
              className="credit-card"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <img src={capitalOneCard} alt="Capital One Card" />
            </motion.div>
            <button className="carousel-arrow right" aria-label="Next card">›</button>
          </div>
          <div className="card-info">
            <div className="weekly-limit">
              <span>Weekly payment limit</span>
              <div className="limit-bar">
                <motion.div 
                  className="limit-progress" 
                  style={{width: '4%'}}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 1 }}
                />
              </div>
              <span>$20.60 / $500</span>
            </div>
          </div>
        </motion.section>

        <motion.section className="balance-section" variants={itemVariants}>
          <div className="balance-card">
            <div className="balance-header">
              <h3>Current Balance</h3>
              <div className="points-badge">
                <i className="icon-star"></i>
                {totalPoints} Points
              </div>
            </div>
            <motion.div 
              className="amount"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              ${currentBalance}
            </motion.div>
            <div className="balance-details">
              <motion.div className="savings" variants={itemVariants}>
                <span>Member Savings</span>
                <span className="green">$ {memberSavings}</span>
              </motion.div>
              <motion.div className="spending" variants={itemVariants}>
                <span>Spending</span>
                <span className="red">$ {spending}</span>
              </motion.div>
            </div>
            <div className="balance-footer">
              <span className="trend-indicator positive">
                <i className="icon-arrow-up"></i>
                +2.5%
              </span>
              <span className="period">spending vs last week</span>
            </div>
          </div>
        </motion.section>

        <motion.section className="past-trends" variants={itemVariants}>
          <h2>Past Trends</h2>
          <div className="trends-grid">
            {pastTrends.map((trend, index) => (
              <motion.div
                key={trend.id}
                className="trend-card"
                variants={itemVariants}
                custom={index}
                whileHover={{ y: -5 }}
              >
                <img src={trend.imageUrl} alt={trend.itemName} />
                <div className="trend-info">
                  <span className="amount">{trend.amount}</span>
                  <span className="days-ago">{trend.daysAgo} day{trend.daysAgo > 1 ? 's' : ''} ago</span>
                  <span className="item-name">{trend.itemName}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <section className="transaction-history">
          <h2>Major Transaction History</h2>
          <table>
            <thead>
              <tr>
                <th>Receiver</th>
                <th>Type</th>
                <th>Points</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map(transaction => (
                <tr key={transaction.id}>
                  <td>
                    <i className="icon-shop"></i>
                    {transaction.receiver}
                  </td>
                  <td>{transaction.type}</td>
                  <td>{transaction.points}</td>
                  <td>${transaction.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <section className="most-visited">
          <h2>Most Visited</h2>
          <div className="visited-list">
            {mostVisited.map(item => (
              <div key={item.id} className="visited-item">
                <img src={item.imageUrl} alt={item.category} />
                <div className="visited-info">
                  <span>{item.category}</span>
                  <div className="percentage-bar">
                    <div className="percentage-progress" style={{width: `${item.percentage}%`}}></div>
                  </div>
                </div>
                <span className="percentage-value">{item.percentage}%</span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </motion.main>
  )
}

export default MainPage