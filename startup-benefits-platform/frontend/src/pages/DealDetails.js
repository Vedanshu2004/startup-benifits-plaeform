import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { deals as dealsApi, claims as claimsApi } from '../api';
import Navbar from '../components/Navbar';

function DealDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [deal, setDeal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [claiming, setClaiming] = useState(false);
  const [message, setMessage] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
    fetchDeal();
  }, [id]);

  const fetchDeal = async () => {
    try {
      const response = await dealsApi.getOne(id);
      setDeal(response.data);
    } catch (error) {
      console.error('Error fetching deal:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleClaim = async () => {
    if (!user) {
      navigate('/login');
      return;
    }

    setClaiming(true);
    setMessage('');

    
  };



  return (
    <div>
      <Navbar />
      
      <div className="container deal-details">
        <div className="deal-detail-card">
          <img src={deal.imageUrl} alt={deal.title} className="deal-detail-image" />
          
          <div className="deal-detail-content">
            <div className="deal-category">{deal.category}</div>

            <h1 className="deal-title" style={{ fontSize: '2.5rem', marginBottom: '1.5rem' }}>
              {deal.title}
            </h1>

            <div className="deal-detail-header">
              <span className="deal-detail-discount">{deal.discount}</span>
              {deal.isLocked && (
                <span className="locked-badge">Verification Required</span>
              )}
            </div>

            <div className="detail-section">
              <h2>Description</h2>
              <p>{deal.description}</p>
            </div>

            <div className="detail-section">
              <h2>Partner</h2>
              <p>{deal.partner}</p>
            </div>

            <div className="detail-section">
              <h2>Eligibility</h2>
              <p>{deal.eligibility}</p>
              {deal.isLocked && !user?.isVerified && (
                <p className="warning-text">
                  You need to verify your account to claim this deal
                </p>
              )}
            </div>

           

            <button onClick={handleClaim}disabled={claiming} className="btn btn-primary"
              style={{ width: '100%', fontSize: '1.125rem' }}
            >
              {claiming ? 'Claiming...' : 'Claim This Deal'}
            </button>

            <div style={{ marginTop: '1rem' }}>
              <Link to="/deals">
                <button className="btn btn-secondary" style={{ width: '100%' }}>
                  Back to Deals
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DealDetails;
