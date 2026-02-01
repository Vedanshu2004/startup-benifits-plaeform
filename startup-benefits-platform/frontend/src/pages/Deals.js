import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { deals as dealsApi } from '../api';
import Navbar from '../components/Navbar';

function Deals() {
  const [deals, setDeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState('');
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchDeals();
  }, [category, search]);

  const fetchDeals = async () => {
    try {
      const response = await dealsApi.getAll({ category, search });
      setDeals(response.data);
    } catch (error) {
      console.error('Error fetching deals:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />
      
      <div className="container">
        <div className="page-header">
          <h1 className="page-title">Browse Deals</h1>
        </div>

        <div className="filters">
          <div className="filters-grid">
            <div className="filter-group">
              <label className="form-label">Search</label>
              <input
                type="text"
                placeholder="Search deals..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="form-input"
              />
            </div>
            <div className="filter-group">
              <label className="form-label">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="form-input"
              >
                <option value="">All Categories</option>
                <option value="Cloud Services">Cloud Services</option>
                <option value="Marketing">Marketing</option>
                <option value="Analytics">Analytics</option>
                <option value="Productivity">Productivity</option>
                <option value="Development">Development</option>
              </select>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="loading">Loading deals...</div>
        ) : (
          <div className="deals-grid">
            {deals.map((deal) => (
              <Link to={`/deals/${deal._id}`} key={deal._id} className="deal-card">
                <div className="deal-content">
                  <div className="deal-category">{deal.category}</div>
                  <h3 className="deal-title">{deal.title}</h3>
                  <p className="deal-description">{deal.description}</p>
                  <div className="deal-footer">
                    <span className="deal-discount">{deal.discount}</span>
                    <span className="deal-partner">{deal.partner}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        
      </div>
    </div>
  );
}

export default Deals;
