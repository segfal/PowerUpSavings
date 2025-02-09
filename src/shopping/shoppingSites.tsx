import { motion } from 'framer-motion';
import './shoppingSites.css';

interface PurchaseHistory {
  itemName: string;
  price: number;
  date: string;
  quantity: number;
}

interface Recommendation {
  itemName: string;
  price: number;
  cashbackPercentage: number;
  reason: string;
}

interface ShoppingSite {
  id: string;
  name: string;
  category: string;
  logo: string;
  description: string;
  url: string;
  currentStreak?: number;
  nextReward?: string;
  pointsToNextReward?: number;
  purchaseHistory?: PurchaseHistory[];
  recommendations?: Recommendation[];
}

const shoppingSites: ShoppingSite[] = [
  {
    id: '1',
    name: 'Amazon',
    category: 'Online Shopping',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg',
    description: 'Shop electronics, clothing, and more. Earn 1 point for every item purchased!',
    url: 'https://amazon.com',
    currentStreak: 6,
    nextReward: 'Free Prime Delivery for a Month',
    pointsToNextReward: 50,
    purchaseHistory: [
      {
        itemName: 'Sony WH-1000XM4 Headphones',
        price: 349.99,
        date: '2024-03-15',
        quantity: 1
      },
      {
        itemName: 'Kindle Paperwhite',
        price: 139.99,
        date: '2024-02-28',
        quantity: 1
      }
    ],
  },
  {
    id: '2',
    name: 'Best Buy',
    category: 'Electronics',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/f/f5/Best_Buy_Logo.svg',
    description: 'Shop electronics and earn points on every gadget!',
    url: 'https://bestbuy.com',
    currentStreak: 4,
    purchaseHistory: [
      {
        itemName: 'Samsung 65" QLED TV',
        price: 999.99,
        date: '2024-01-15',
        quantity: 1
      },
      {
        itemName: 'PlayStation 5',
        price: 499.99,
        date: '2024-02-01',
        quantity: 1
      }
    ],
    recommendations: [
      {
        itemName: 'PS5 Games Bundle',
        price: 159.99,
        cashbackPercentage: 8,
        reason: 'Perfect for your new PlayStation 5'
      },
    ]
  },
  {
    id: '3',
    name: 'Dunkin\' Donuts',
    category: 'Coffee & Snacks',
    logo: 'https://logo.com/image-cdn/images/kts928pd/production/a21c8a29a28c8998ca840a00064142e93f085f6f-700x394.png?w=1920&q=72&fm=webp',
    description: 'Start your day right with coffee and donuts. 1 point per item!',
    url: 'https://dunkindonuts.com',
    currentStreak: 3,
    purchaseHistory: [
      {
        itemName: 'Medium Iced Coffee',
        price: 3.99,
        date: '2024-03-20',
        quantity: 1
      },
      {
        itemName: 'Dozen Donuts',
        price: 12.99,
        date: '2024-03-18',
        quantity: 1
      }
    ],
    recommendations: [
      {
        itemName: 'Coffee Subscription',
        price: 19.99,
        cashbackPercentage: 15,
        reason: 'You buy coffee 3 times a week - save more with a subscription!'
      }
    ]
  },
  {
    id: '4',
    name: 'Target',
    category: 'Retail',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/9/9a/Target_logo.svg',
    description: 'Shop essentials and earn points on every item in your cart!',
    url: 'https://target.com'
  },
  {
    id: '5',
    name: 'Walmart',
    category: 'Retail',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/c/ca/Walmart_logo.svg',
    description: 'Get everyday low prices and earn points on every purchase!',
    url: 'https://walmart.com'
  },
  {
    id: '6',
    name: 'Starbucks',
    category: 'Coffee & Snacks',
    logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/d/d3/Starbucks_Corporation_Logo_2011.svg/1200px-Starbucks_Corporation_Logo_2011.svg.png',
    description: 'Treat yourself and earn points on every drink and snack!',
    url: 'https://starbucks.com'
  },
  {
    id: '2',
    name: 'McDonald\'s',
    category: 'Fast Food',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/3/36/McDonald%27s_Golden_Arches.svg',
    description: 'Perfect for quick meals. Earn 1 point for every item in your order!',
    url: 'https://mcdonalds.com'
  },
  {
    id: '8',
    name: 'Adidas',
    category: 'Sports & Fashion',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/2/20/Adidas_Logo.svg',
    description: 'Score points on every piece of sportswear and athletic gear!',
    url: 'https://adidas.com'
  },
  {
    id: '10',
    name: 'Apple',
    category: 'Electronics',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg',
    description: 'Get the latest tech and earn points on every Apple product!',
    url: 'https://apple.com'
  },
  {
    id: '11',
    name: 'Subway',
    category: 'Fast Food',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/5/5c/Subway_2016_logo.svg',
    description: 'Enjoy fresh sandwiches and earn points on every menu item!',
    url: 'https://subway.com'
  },
  {
    id: '12',
    name: 'Chipotle',
    category: 'Fast Food',
    logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/3/3b/Chipotle_Mexican_Grill_logo.svg/1200px-Chipotle_Mexican_Grill_logo.svg.png',
    description: 'Build your perfect burrito bowl and earn points per item!',
    url: 'https://chipotle.com'
  },
  {
    id: '13',
    name: 'H&M',
    category: 'Fashion',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/5/53/H%26M-Logo.svg',
    description: 'Style your wardrobe and earn points on every fashion item!',
    url: 'https://hm.com'
  },
  {
    id: '14',
    name: 'Sephora',
    category: 'Beauty & Cosmetics',
    logo: 'https://1000logos.net/wp-content/uploads/2018/08/Sephora-Logo.jpg',
    description: 'Discover beauty products and earn points on every item!',
    url: 'https://sephora.com'
  },
  {
    id: '15',
    name: 'GameStop',
    category: 'Gaming & Entertainment',
    logo: 'https://cdn.worldvectorlogo.com/logos/gamestop.svg',
    description: 'Level up your gaming and earn points on every purchase!',
    url: 'https://gamestop.com'
  },
  {
    id: '16',
    name: 'Uber Eats',
    category: 'Food Delivery',
    logo: 'https://cdn.prod.website-files.com/60414b21f1ffcdbb0d5ad688/63cecf750aa7463091b17adf_5310366-uber-eats-logo-png-and-vector-logo-download-uber-eats-png-3500_3500_preview.png',
    description: 'Get food delivered and earn points on every item ordered!',
    url: 'https://ubereats.com'
  },
  {
    id: '18',
    name: 'DoorDash',
    category: 'Food Delivery',
    logo: 'https://logos-world.net/wp-content/uploads/2020/11/DoorDash-Logo-2018-present.jpg',
    description: 'Order from your favorite restaurants and earn points per item!',
    url: 'https://doordash.com'
  },
  {
    id: '19',
    name: 'Spotify',
    category: 'Entertainment',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/2/26/Spotify_logo_with_text.svg',
    description: 'Stream your favorite music and earn points on subscriptions!',
    url: 'https://spotify.com'
  },
  {
    id: '20',
    name: 'Netflix',
    category: 'Entertainment',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg',
    description: 'Watch your favorite shows and earn points on subscriptions!',
    url: 'https://netflix.com'
  }
];

const ShoppingSites = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: { 
      y: 50,
      opacity: 0,
      scale: 0.8
    },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    }
  };

  const buttonVariants = {
    rest: { scale: 1 },
    hover: { 
      scale: 1.1,
      boxShadow: "0 0 30px rgba(0, 255, 0, 0.5)"
    },
    tap: { scale: 0.95 }
  };

  const streakVariants = {
    initial: { scale: 0, rotate: -180 },
    animate: { 
      scale: 1, 
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 10
      }
    }
  };

  const pointsVariants = {
    initial: { scale: 0 },
    animate: { 
      scale: [1.2, 1],
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const progressVariants = {
    initial: { width: "0%" },
    animate: (width: number) => ({
      width: `${width}%`,
      transition: { duration: 1, ease: "easeOut" }
    })
  };

  const handleStoreClick = (url: string) => {
    window.open(url, '_blank');
  };

  return (
    <motion.div 
      className="shopping-sites-container"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.header className="shopping-header" variants={cardVariants}>
        <motion.h1
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 100 }}
        >
          🎮 Power Up Your Shopping! 🎮
        </motion.h1>
        <div className="header-content">
          <motion.div 
            className="total-points"
            variants={pointsVariants}
            initial="initial"
            animate="animate"
            whileHover={{ scale: 1.05 }}
          >
            <span className="points-value">1,250</span>
            <span className="points-label">Total Points</span>
          </motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Level up your savings at these amazing stores! Each purchase brings you closer to epic rewards! 🏆
          </motion.p>
        </div>
      </motion.header>

      <motion.div className="stores-grid" style={{ marginLeft: '100px' }}>
        {shoppingSites.map((site) => (
          <motion.div
            key={site.id}
            className="store-card"
            variants={cardVariants}
            whileHover={{ 
              scale: 1.02,
              transition: { duration: 0.2 }
            }}
          >
            <div className="store-logo">
              <motion.img 
                src={site.logo} 
                alt={`${site.name} logo`}
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300 }}
              />
              {site.currentStreak && (
                <motion.div 
                  className="streak-badge"
                  variants={streakVariants}
                  initial="initial"
                  animate="animate"
                >
                  🔥 {site.currentStreak} Day Streak!
                </motion.div>
              )}
            </div>
            <div className="store-info">
              <motion.h3
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                {site.name}
              </motion.h3>
              <motion.span 
                className="category"
                whileHover={{ scale: 1.05 }}
              >
                {site.category}
              </motion.span>
              <p>{site.description}</p>
              
              {site.nextReward && site.pointsToNextReward && (
                <motion.div 
                  className="next-reward"
                  whileHover={{ scale: 1.02 }}
                >
                  <h4>🎁 Next Reward Unlock</h4>
                  <p className="reward-name">{site.nextReward}</p>
                  <div className="progress-container">
                    <motion.div 
                      className="progress-bar"
                      variants={progressVariants}
                      initial="initial"
                      animate="animate"
                      custom={Math.min(100, (100 - (site.pointsToNextReward / 100) * 100))}
                    />
                    <span className="points-remaining">{site.pointsToNextReward} points to go!</span>
                  </div>
                </motion.div>
              )}
              
              {site.purchaseHistory && site.purchaseHistory.length > 0 && (
                <motion.div 
                  className="purchase-history"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <h4>⚡ Recent Power-Ups</h4>
                  {site.purchaseHistory.map((purchase, index) => (
                    <motion.div 
                      key={index} 
                      className="purchase-item"
                      whileHover={{ x: 10, transition: { duration: 0.2 } }}
                    >
                      <span className="item-name">{purchase.itemName}</span>
                      <div className="purchase-details">
                        <motion.span 
                          className="price"
                          whileHover={{ scale: 1.1 }}
                        >
                          +${purchase.price.toFixed(2)} Points!
                        </motion.span>
                        <span className="date">{new Date(purchase.date).toLocaleDateString()}</span>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              )}
              
              {site.recommendations && site.recommendations.length > 0 && (
                <motion.div 
                  className="recommendations"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <h4>🎯 Epic Deals for You!</h4>
                  {site.recommendations.map((rec, index) => (
                    <motion.div 
                      key={index} 
                      className="recommendation-item"
                      whileHover={{ x: 10, transition: { duration: 0.2 } }}
                    >
                      <div className="rec-header">
                        <span className="item-name">{rec.itemName}</span>
                        <span className="price">${rec.price.toFixed(2)}</span>
                      </div>
                      <div className="rec-details">
                        <motion.span 
                          className="cashback"
                          whileHover={{ scale: 1.1 }}
                        >
                          💰 {rec.cashbackPercentage}% BONUS cash back!
                        </motion.span>
                        <p className="reason">{rec.reason}</p>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              )}

              <motion.button
                className="shop-now-button"
                onClick={() => handleStoreClick(site.url)}
                variants={buttonVariants}
                initial="rest"
                whileHover="hover"
                whileTap="tap"
              >
                ⚡ POWER UP NOW! ⚡
              </motion.button>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default ShoppingSites;
