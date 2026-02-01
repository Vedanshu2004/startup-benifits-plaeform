import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { claims as claimsApi, users as usersApi } from '../api';
import Navbar from '../components/Navbar';

function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [claims, setClaims] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const [profileRes, claimsRes] = await Promise.all([
        usersApi.getProfile(),
        claimsApi.getMyClaims(),
      ]);
      setUser(profileRes.data); 
      setClaims(claimsRes.data);
    } catch (error) {
      console.error('Error fetching data:', error);
      navigate('/login');
    } finally {
      setLoading(false);
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 'approved':
        return 'status-approved';
      case 'pending':
        return 'status-pending';
      case 'rejected':
        return 'status-rejected';
      default:
        return '';
    }
  };

  if (loading) {
    return (
      <div>
        <Navbar />
        <div className="loading">Loading...</div>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      
      <div className="container" style={{ paddingTop: '2rem', paddingBottom: '2rem' }}>
        <div className="dashboard-grid">
          <div className="profile-card">
            <h2>My Profile</h2>
            <div className="profile-grid">
              <div className="profile-item">
                <label>Name</label>
                <p>{user?.name}</p>
              </div>
              <div className="profile-item">
                <label>Email</label>
                <p>{user?.email}</p>
              </div>
              <div className="profile-item">
                <label>Status</label>
                <span className={`status-badge ${user?.isVerified ? 'status-verified' : 'status-unverified'}`}>
                  {user?.isVerified ? '✓ Verified' : 'Not Verified'}
                </span>
              </div>
            </div>
          </div>

          <div className="profile-card">
            <h2>My Claimed Deals</h2>
            
            {claims.length === 0 ? (
              <div className="empty-state">
                <p>You haven't claimed any deals yet</p>
                <Link to="/deals">
                  <button className="btn btn-primary">Browse Deals</button>
                </Link>
              </div>
            ) : (
              <div className="claims-list">
                {claims.map((claim) => (
                  <div key={claim._id} className="claim-item">
                    <img
                      src={claim.dealId.imageUrl}
                      alt={claim.dealId.title}
                      className="claim-image"
                    />
                    <div className="claim-details">
                      <h3 className="claim-title">{claim.dealId.title}</h3>
                      <p className="claim-info">
                        {claim.dealId.partner} • {claim.dealId.discount}
                      </p>
                      <div className="claim-meta">
                        <span className={`claim-status ${getStatusClass(claim.status)}`}>
                          {claim.status}
                        </span>
                        <span className="claim-date">
                          Claimed on {new Date(claim.claimedAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
