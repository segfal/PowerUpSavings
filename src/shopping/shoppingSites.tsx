import { motion } from 'framer-motion';
import './shoppingSites.css';

interface ShoppingSite {
  id: string;
  name: string;
  category: string;
  logo: string;
  description: string;
  url: string;
}

const shoppingSites: ShoppingSite[] = [
  {
    id: '1',
    name: 'Amazon',
    category: 'Online Shopping',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg',
    description: 'Shop electronics, clothing, and more. Earn 1 point for every item purchased!',
    url: 'https://amazon.com'
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
    id: '3',
    name: 'Dunkin\' Donuts',
    category: 'Coffee & Snacks',
    logo: 'https://logo.com/image-cdn/images/kts928pd/production/a21c8a29a28c8998ca840a00064142e93f085f6f-700x394.png?w=1920&q=72&fm=webp',
    description: 'Start your day right with coffee and donuts. 1 point per item!',
    url: 'https://dunkindonuts.com'
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
    id: '7',
    name: 'Best Buy',
    category: 'Electronics',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/f/f5/Best_Buy_Logo.svg',
    description: 'Shop electronics and earn points on every gadget!',
    url: 'https://bestbuy.com'
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
        staggerChildren: 0.1
      }
    }
  };

  const cardVariants = {
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

  const buttonVariants = {
    rest: { scale: 1 },
    hover: { 
      scale: 1.05,
      backgroundColor: "var(--success-green)",
    },
    tap: { scale: 0.95 }
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
        <h1>Featured Stores</h1>
        <p>Shop at your favorite stores and earn 1 point for every item purchased!</p>
      </motion.header>

      <motion.div className="stores-grid" style={{ marginLeft: '100px' }}fo>
        {shoppingSites.map((site) => (
          <motion.div
            key={site.id}
            className="store-card"
            variants={cardVariants}
            whileHover={{ 
              scale: 1.02,
              boxShadow: "0 8px 32px rgba(0, 0, 0, 0.12)"
            }}
          >
            <div className="store-logo">
              <img src={site.logo} alt={`${site.name} logo`} />
            </div>
            <div className="store-info">
              <h3>{site.name}</h3>
              <span className="category">{site.category}</span>
              <p>{site.description}</p>
              <motion.button
                className="shop-now-button"
                onClick={() => handleStoreClick(site.url)}
                variants={buttonVariants}
                initial="rest"
                whileHover="hover"
                whileTap="tap"
              >
                Shop Now
              </motion.button>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default ShoppingSites;
