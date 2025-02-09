import { Outlet, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import logo from '../assets/logo.png';
import '../styles/Sidebar.css';

const Layout = () => {
  const location = useLocation();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isActiveLink = (path: string) => {
    return location.pathname === path ? 'active' : '';
  };

  const sidebarVariants = {
    hidden: { x: -280, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
        mass: 1,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { x: -20, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  const menuItems = [
    { path: '/', icon: '📊', label: 'Overview', color: '#4CC9F0' },
    { path: '/shop', icon: '🛍️', label: 'Shop Now', color: '#F72585' },
    { path: '/quiz', icon: '❓', label: 'Shopping Quiz', color: '#7209B7' },
    { path: '/rewards', icon: '🎁', label: 'Rewards', color: '#4361EE' }
  ];

  if (!mounted) return null;

  return (
    <div className="app-container">
      <AnimatePresence>
        <motion.aside 
          className="sidebar"
          initial="hidden"
          animate="visible"
          variants={sidebarVariants}
          key="sidebar"
        >
          <motion.div 
            className="logo-section"
            variants={itemVariants}
          >
            <div className="logo-container">
              <motion.img 
                src={logo} 
                alt="PowerUpSavings"
                whileHover={{ scale: 1.1, rotate: 360 }}
                transition={{ duration: 0.5 }}
              />
              <div className="logo-text">
                <motion.span 
                  className="brand-name"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  Power Up
                </motion.span>
                <motion.span 
                  className="brand-subtitle"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  Savings
                </motion.span>
              </div>
            </div>
          </motion.div>
          
          <nav className="nav-section">
            <motion.ul variants={itemVariants}>
              {menuItems.map((item, index) => (
                <motion.li 
                  key={item.path}
                  className="nav-item"
                  variants={itemVariants}
                  custom={index}
                  whileHover={{ scale: 1.02 }}
                >
                  <Link 
                    to={item.path} 
                    className={isActiveLink(item.path)}
                    style={{
                      '--hover-color': item.color
                    } as React.CSSProperties}
                  >
                    <motion.i 
                      className="nav-icon"
                      whileHover={{ scale: 1.2, rotate: [0, -10, 10, -10, 0] }}
                      transition={{ duration: 0.5 }}
                    >
                      {item.icon}
                    </motion.i>
                    {item.label}
                  </Link>
                </motion.li>
              ))}
            </motion.ul>
          </nav>

          <motion.div 
            className="quote-section"
            variants={itemVariants}
          >
            <motion.div 
              className="quote-box"
              whileHover={{ 
                scale: 1.02,
                boxShadow: '0 8px 20px rgba(0,0,0,0.2)'
              }}
            >
              <p className="quote-text">"Save smart, live better."</p>
              <span className="quote-author">- Capital One</span>
            </motion.div>
          </motion.div>
        </motion.aside>
      </AnimatePresence>

      <main className="main-content">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
};

export default Layout; 