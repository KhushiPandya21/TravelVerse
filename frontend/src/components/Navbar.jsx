import { Link, useNavigate } from 'react-router-dom';
import { Compass } from 'lucide-react';
import './Navbar.css';

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <nav className="travel-navbar">
      <Link to="/explore" className="travel-logo" aria-label="TravelVerse home">
        <span className="travel-logo-mark"><Compass size={23} strokeWidth={2.2} /></span>
        <span className="travel-logo-copy">
          <span className="travel-logo-name">Travel<span>Verse</span></span>
          <span className="travel-logo-tagline">FIND YOUR WAY OUT THERE</span>
        </span>
      </Link>
      <div className="travel-nav-links">
        {token ? (
          <>
            <Link to="/explore" className="travel-nav-link">Explore</Link>
            <Link to="/trips" className="travel-nav-link">My Trips</Link>
            <Link to="/bookings" className="travel-nav-link">Bookings</Link>
            <button onClick={handleLogout} className="travel-logout-btn">Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" className="travel-nav-link">Login</Link>
            <Link to="/register" className="travel-nav-link">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;