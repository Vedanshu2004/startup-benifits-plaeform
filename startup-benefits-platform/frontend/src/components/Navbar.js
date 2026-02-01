import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="container navbar-content">
        <Link to="/" className="logo">StartupDeals</Link>
        <div className="nav-links">
          {token ? (
            <>
              <Link to="/deals"><button className="btn-text">Deals</button></Link>
              <Link to="/dashboard"><button className="btn-text">Dashboard</button>
              </Link><button onClick={handleLogout} className="btn-text">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login">
                <button className="btn-text">Login</button>
              </Link>
              <Link to="/register">
                <button className="btn btn-primary">Get Started</button>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
