const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Destination = require('./models/Destination');

dotenv.config();

const MONGO_URI = process.env.MONGO_URI;

const sampleDestinations = [
  // Beaches
  {
    title: "Goa Beach Retreat",
    location: "Goa, India",
    category: "Beaches",
    description: "Sun, sand, and vibrant nightlife on the pristine beaches of Goa.",
    price: 15000,
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "Andaman Island Escape",
    location: "Andaman & Nicobar",
    category: "Beaches",
    description: "Crystal clear turquoise waters, white sandy beaches, and vibrant coral reefs.",
    price: 22000,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1586861635167-e5223aadc9fe?auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "Gokarna Coastal Haven",
    location: "Karnataka, India",
    category: "Beaches",
    description: "Relaxed temple town featuring pristine beaches and peaceful cliffside views.",
    price: 11000,
    rating: 4.3,
    image: "https://images.unsplash.com/photo-1641192936002-80e89555786f?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D"
  },

  // Mountains
  {
    title: "Manali Mountain Escape",
    location: "Himachal Pradesh, India",
    category: "Mountains",
    description: "Breathtaking snow-capped peaks, pine forests, and adventure sports.",
    price: 18000,
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "Leh Ladakh Expedition",
    location: "Ladakh, India",
    category: "Mountains",
    description: "Rugged high-altitude desert landscapes, winding mountain roads, and majestic passes.",
    price: 25000,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1593118845043-359e5f628214?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D"
  },
  {
    title: "Darjeeling Tea Hills",
    location: "West Bengal, India",
    category: "Mountains",
    description: "Rolling green tea gardens with panoramic views of the magnificent Kangchenjunga.",
    price: 14000,
    rating: 4.4,
    image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80"
  },

  // Heritage
  {
    title: "Jaipur Royal Heritage",
    location: "Rajasthan, India",
    category: "Heritage",
    description: "Explore majestic palaces, historic forts, and rich Rajasthani culture in the Pink City.",
    price: 12000,
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "Agra Monument of Love",
    location: "Uttar Pradesh, India",
    category: "Heritage",
    description: "Discover world-renowned Mughal architecture, including the breathtaking Taj Mahal.",
    price: 10000,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "Varanasi Spiritual Journey",
    location: "Uttar Pradesh, India",
    category: "Heritage",
    description: "Experience ancient traditions, holy ghats, and mesmerizing evening rituals by the Ganges.",
    price: 9000,
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1706186839147-0d708602587b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D"
  },

  // Nature
  {
    title: "Kerala Backwater Cruise",
    location: "Kerala, India",
    category: "Nature",
    description: "Peaceful houseboat cruises through tranquil palm-fringed backwaters and lush greenery.",
    price: 20000,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "Munnar Hillside Paradise",
    location: "Kerala, India",
    category: "Nature",
    description: "Mist-covered hills, cascading waterfalls, and sprawling endless green plantations.",
    price: 13000,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1742106850868-b7d797b8e560?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D"
  },
  {
    title: "Jim Corbett Wildlife Safari",
    location: "Uttarakhand, India",
    category: "Nature",
    description: "Thrilling jungle safaris in India's oldest national park amidst diverse flora and fauna.",
    price: 16000,
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1534567153574-2b12153a87f0?auto=format&fit=crop&w=800&q=80"
  }
];

const seedDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB for seeding...');

    await Destination.deleteMany({});
    console.log('Cleared existing destinations.');

    await Destination.insertMany(sampleDestinations);
    console.log('Successfully re-seeded destinations with pristine related images!');

    mongoose.connection.close();
    console.log('Database connection closed.');
  } catch (err) {
    console.error('Seeding error:', err);
    process.exit(1);
  }
};

seedDB();