import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowDownRight, ArrowUpRight, CalendarDays, Compass, MapPin, Plane, Sparkles } from 'lucide-react';
import { getUserTrips, getUserBookings } from '../services/api';
import './Home.css';

function Home() {
  const [tripCount, setTripCount] = useState(0);
  const [bookingCount, setBookingCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const currentUser = JSON.parse(localStorage.getItem('user') || '{}');
  const userId = currentUser._id || currentUser.id;
  const userName = currentUser.name || 'Traveler';

  useEffect(() => {
    const fetchDashboardData = async () => {
      if (!userId) {
        setLoading(false);
        return;
      }
      try {
        const [tripsRes, bookingsRes] = await Promise.all([
          getUserTrips(userId),
          getUserBookings(userId)
        ]);
        setTripCount(tripsRes.data.length);
        setBookingCount(bookingsRes.data.length);
      } catch (err) {
        console.error("Error loading dashboard stats:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [userId]);

  if (loading) {
    return <div className="dashboard-loading">Getting your travel dashboard ready...</div>;
  }

  return (
    <main className="dashboard-shell">
      <div className="dashboard-content">
        <section className="dashboard-hero">
          <div className="hero-copy">
            <div className="hero-eyebrow"><Sparkles size={15} /> YOUR NEXT CHAPTER STARTS HERE</div>
            <h1>Welcome back,<br /><span>{userName}.</span></h1>
            <p>Your next great escape is closer than you think. Find a place that moves you, then make every moment count.</p>
            <button className="hero-cta" onClick={() => navigate('/explore')}>
              <Compass size={18} /> Discover somewhere new <ArrowUpRight size={17} />
            </button>
          </div>
          <div className="hero-side" aria-hidden="true">
            <div className="floating-orbit orbit-one" />
            <div className="floating-orbit orbit-two" />
            <div className="floating-destination">
              <div className="destination-icon"><MapPin size={20} /></div>
              <div><span>THE WORLD IS WAITING</span><strong>Find your next view</strong></div>
              <ArrowUpRight size={18} />
            </div>
            <div className="floating-stamp"><Plane size={19} /><span>GO<br />FAR</span></div>
          </div>
        </section>

        <section className="dashboard-stats" aria-label="Your travel overview">
          <article className="stat-card trips-stat">
            <div className="stat-icon"><Plane size={19} /></div>
            <div className="stat-copy"><span>YOUR JOURNEYS</span><h2>{tripCount}</h2><p>Planned trips</p></div>
            <ArrowUpRight className="stat-arrow" size={18} />
          </article>
          <article className="stat-card bookings-stat">
            <div className="stat-icon"><CalendarDays size={19} /></div>
            <div className="stat-copy"><span>READY TO GO</span><h2>{bookingCount}</h2><p>Active bookings</p></div>
            <ArrowUpRight className="stat-arrow" size={18} />
          </article>
        </section>

        <section className="dashboard-actions">
          <div className="section-intro">
            <div><span className="section-kicker">MAKE IT HAPPEN</span><h2>Your next move</h2></div>
            <span className="section-note"><ArrowDownRight size={16} /> Pick a direction</span>
          </div>
          <div className="action-grid">
            <button className="action-card explore-action" onClick={() => navigate('/explore')}>
              <span className="action-icon"><Compass size={21} /></span>
              <span className="action-copy"><strong>Explore destinations</strong><small>Get inspired by somewhere new</small></span>
              <ArrowUpRight className="action-arrow" size={18} />
            </button>
            <button className="action-card plan-action" onClick={() => navigate('/create-trip')}>
              <span className="action-icon"><Plane size={21} /></span>
              <span className="action-copy"><strong>Plan a new trip</strong><small>Turn your idea into an itinerary</small></span>
              <ArrowUpRight className="action-arrow" size={18} />
            </button>
            <button className="action-card trips-action" onClick={() => navigate('/trips')}>
              <span className="action-icon"><MapPin size={21} /></span>
              <span className="action-copy"><strong>View your trips</strong><small>Pick up where you left off</small></span>
              <ArrowUpRight className="action-arrow" size={18} />
            </button>
          </div>
        </section>
      </div>
    </main>
  );
}

export default Home;