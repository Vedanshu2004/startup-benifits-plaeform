import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

function Home() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div>
      <Navbar />
      
      <div className={`hero 'fade-in'  ''}`}>
        <div className="container">
          <h1> Premium SaaS Tools<br />
            <span className="highlight">For Early-Stage Startups</span>
          </h1>
          <p>
            Get exclusive discounts and deals on the best SaaS products. 
            Save thousands on cloud services, marketing tools, and more.
          </p>
          <Link to="/deals"><button className="btn btn-primary" style={{ fontSize: '1.125rem', padding: '1rem 2rem' }}>
              Browse Deals</button>
          </Link>
        </div>

        <div className="container">
          <div className="features-grid">
            <div className="feature-card slide-up">
              <div className="feature-icon"></div>
              <h3>Save Money</h3>
              <p>Get up to 90% off on premium SaaS tools</p>
            </div>
            
            <div className="feature-card slide-up" style={{ animationDelay: '0.1s' }}>
              <div className="feature-icon"></div>
              <h3>Grow Faster</h3>
              <p>Access tools used by successful startups</p>
            </div>
            
            <div className="feature-card slide-up" style={{ animationDelay: '0.2s' }}>
              <div className="feature-icon"></div>
              <h3>Easy Access</h3>
              <p>Claim deals instantly with one click</p>
            </div>
          </div>

          <div className="stats">
            <div className="stats-grid">
              <div>
                <div className="stat-number"> 100K+</div>
                <div className="stat-label">In Total Savings</div>
              </div>
              <div>
                <div className="stat-number">50+</div>
                <div className="stat-label">Partner Companies</div>
              </div>
              <div>
                <div className="stat-number">1000+</div>
                <div className="stat-label">Startups Helped</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
