import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchDestinations } from '../services/api';

function Explore() {
  const [destinations, setDestinations] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const filteredDestinations = useMemo(() => {
    let results = destinations;
    if (searchTerm) {
      results = results.filter((dest) =>
        (dest.title || dest.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
        (dest.location || '').toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (selectedCategory !== 'All') {
      results = results.filter((dest) =>
        (dest.category || '').toLowerCase() === selectedCategory.toLowerCase()
      );
    }
    return results;
  }, [searchTerm, selectedCategory, destinations]);

  useEffect(() => {
    const getDestinations = async () => {
      try {
        const data = await fetchDestinations();
        setDestinations(data || []);
      } catch (err) {
        console.error("Error fetching destinations:", err);
        setError('Failed to load destinations.');
      } finally {
        setLoading(false);
      }
    };
    getDestinations();
  }, []);

  const handleSelectDestination = (destinationId) => {
    navigate('/create-trip', { state: { selectedDestinationId: destinationId } });
  };

  const getDestinationImage = (dest) => {
    return dest.image || dest.imageUrl || 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=800&q=80';
  };

  if (loading) {
    return <div style={{ textAlign: 'center', marginTop: '50px', color: '#FFF' }}>Loading destinations...</div>;
  }

  const categories = ['All', 'Beaches', 'Mountains', 'Heritage', 'Nature'];

  return (
    <div className="explore-page-wrapper">
      <div className="page-header">
        <h2 className="page-title">Explore & Adore</h2>
        <p className="page-subtitle">Explore the world around you and find places you will adore.</p>
      </div>

      <div className="explore-container">
        {error && <p style={{ color: '#E74C3C', marginBottom: '15px', textAlign: 'center' }}>{error}</p>}

        <div className="controls-bar">
          <input
            type="text"
            placeholder="Search by name or location..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input-box"
          />

          <div className="category-pills">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`pill-btn ${selectedCategory === cat ? 'active' : ''}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Featured Destinations */}
        <div className="section-heading">
          <h3>Featured Destinations</h3>
          <span>{filteredDestinations.length} available</span>
        </div>

        {filteredDestinations.length === 0 ? (
          <p style={{ textAlign: 'center', color: '#7F8C8D', padding: '30px' }}>No destinations match this category.</p>
        ) : (
          <div className="destination-grid">
            {filteredDestinations.map((destination) => (
              <div key={destination._id} className="dest-card">
                <img
                  src={getDestinationImage(destination)}
                  alt={destination.title || destination.name}
                  className="dest-card-image"
                  onError={(e) => {
                    e.target.src = 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=800&q=80';
                  }}
                />
                <div className="dest-card-content">
                  <h3 className="dest-card-title">{destination.title || destination.name}</h3>
                  <div className="dest-card-location">📍 {destination.location}</div>
                  <p className="dest-card-desc">{destination.description}</p>

                  <div className="dest-card-footer">
                    <span className="dest-price">₹{destination.price || 15000}/day</span>
                    <span className="dest-rating">★ {destination.rating || 4.5}</span>
                  </div>

                  <button
                    onClick={() => handleSelectDestination(destination._id)}
                    className="btn-plan-trip"
                  >
                    Plan Trip Here
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}

export default Explore;