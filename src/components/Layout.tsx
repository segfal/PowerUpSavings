import { Outlet, Link } from 'react-router-dom';
import logo from '../assets/logo.png'

const Layout = () => {
  return (
    <div className="app-container">
      <aside className="sidebar">
        <div className="logo-section">
          <div className="logo-container">
            <img src={logo} alt="PowerUpSavings" />
            <div className="logo-text">
              <span className="brand-name">Power Up</span>
              <span className="brand-subtitle">Savings</span>
            </div>
          </div>
        </div>
        <nav className="nav-section">
          <ul>

            <li className="nav-item">
              <Link to="/">
                <i className="icon-overview"></i>
                Overview
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/quiz">
                <i className="icon-estimates"></i>
                2024 Estimates
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/cards">
                <i className="icon-cards"></i>
                Cards
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/rewards">
                <i className="icon-rewards"></i>
                Rewards
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/settings">
                <i className="icon-settings"></i>
                Settings
              </Link>
            </li>
          </ul>
        </nav>
        <div className="coffee-quote">
          <p>"Save smart, live better."</p>
          <span>- Capital One</span>
        </div>
      </aside>
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout; 