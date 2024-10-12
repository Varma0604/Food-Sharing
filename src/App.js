import React, { useState, useEffect } from 'react';
import { Search, MapPin, User, Menu, X, Clock, Filter } from 'lucide-react';

// Mock data for food listings
const mockFoodListings = [
  { id: 1, title: 'Fresh Apples', description: 'A basket of freshly picked apples', distance: '0.5 miles', image: '/api/placeholder/300/200', category: 'Fruits', expiresIn: '2 days' },
  { id: 2, title: 'Homemade Lasagna', description: 'Delicious vegetarian lasagna, serves 4', distance: '1.2 miles', image: '/api/placeholder/300/200', category: 'Prepared Meals', expiresIn: '1 day' },
  { id: 3, title: 'Canned Goods', description: 'Assorted canned vegetables and soups', distance: '0.8 miles', image: '/api/placeholder/300/200', category: 'Non-perishables', expiresIn: '30 days' },
  { id: 4, title: 'Fresh Carrots', description: 'Organic carrots from my garden', distance: '0.3 miles', image: '/api/placeholder/300/200', category: 'Vegetables', expiresIn: '5 days' },
];

const FoodListing = ({ title, description, distance, image, category, expiresIn, onReserve, onViewDetails }) => (
  <div style={styles.foodListing}>
    <img src={image} alt={title} style={styles.image} />
    <h3 style={styles.title}>{title}</h3>
    <p style={styles.description}>{description}</p>
    <div style={styles.distanceContainer}>
      <span style={styles.distance}><MapPin size={14} style={styles.icon} />{distance}</span>
      <span style={styles.distance}><Clock size={14} style={styles.icon} />Expires in {expiresIn}</span>
    </div>
    <div style={styles.buttonContainer}>
      <button onClick={onViewDetails} style={styles.detailsButton}>View Details</button>
      <button onClick={onReserve} style={styles.reserveButton}>Reserve</button>
    </div>
  </div>
);

const SearchFilters = ({ onApplyFilters }) => {
  const [distance, setDistance] = useState('');
  const [category, setCategory] = useState('');
  const [expiration, setExpiration] = useState('');

  const handleApplyFilters = () => {
    onApplyFilters({ distance, category, expiration });
  };

  return (
    <div style={styles.filters}>
      <h4 style={styles.filterTitle}>Filters</h4>
      <select style={styles.select} value={distance} onChange={(e) => setDistance(e.target.value)}>
        <option value="">Distance</option>
        <option value="5">Within 5 miles</option>
        <option value="10">Within 10 miles</option>
        <option value="20">Within 20 miles</option>
      </select>
      <select style={styles.select} value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="">Category</option>
        <option value="fruits">Fruits</option>
        <option value="vegetables">Vegetables</option>
        <option value="prepared">Prepared Meals</option>
        <option value="non-perishable">Non-perishables</option>
      </select>
      <select style={styles.select} value={expiration} onChange={(e) => setExpiration(e.target.value)}>
        <option value="">Expiration</option>
        <option value="1">Within 1 day</option>
        <option value="3">Within 3 days</option>
        <option value="7">Within a week</option>
      </select>
      <button onClick={handleApplyFilters} style={styles.applyButton}>Apply Filters</button>
    </div>
  );
};

export default function Homepage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [foodListings, setFoodListings] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    // In a real app, this would fetch data from an API
    setFoodListings(mockFoodListings);
  }, []);

  const handleSearch = () => {
    const filteredListings = mockFoodListings.filter(listing =>
      listing.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      listing.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFoodListings(filteredListings);
  };

  const handleReserve = (id) => {
    alert(`You've reserved item ${id}. In a full implementation, this would open a chat with the donor.`);
  };

  const handleViewDetails = (id) => {
    alert(`Viewing details for item ${id}. This would open a detailed page for the food listing.`);
  };

  const handleApplyFilters = (filters) => {
    console.log('Applying filters:', filters);
    // In a real app, this would apply the filters to the food listings
    setShowFilters(false);
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <div style={styles.headerContainer}>
          <h1 style={styles.title}>NFS Network</h1>
          <nav style={styles.nav}>
            <ul style={styles.navList}>
              <li style={styles.navItem}><a href="#" style={styles.navLink}>Home</a></li>
              <li style={styles.navItem}><a href="#" style={styles.navLink}>Donate</a></li>
              <li style={styles.navItem}><a href="#" style={styles.navLink}>Find Food</a></li>
              <li style={styles.navItem}><a href="#" style={styles.navLink}>About</a></li>
            </ul>
          </nav>
          <div style={styles.menuButtonContainer}>
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} style={styles.menuButton}>
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {isMenuOpen && (
        <div style={styles.mobileMenu}>
          <ul style={styles.mobileNavList}>
            <li style={styles.mobileNavItem}><a href="#" style={styles.mobileNavLink}>Home</a></li>
            <li style={styles.mobileNavItem}><a href="#" style={styles.mobileNavLink}>Donate</a></li>
            <li style={styles.mobileNavItem}><a href="#" style={styles.mobileNavLink}>Find Food</a></li>
            <li style={styles.mobileNavItem}><a href="#" style={styles.mobileNavLink}>About</a></li>
          </ul>
        </div>
      )}

      <main style={styles.main}>
        <section style={styles.hero}>
          <h2 style={styles.heroTitle}>Share Food, Build Community</h2>
          <p style={styles.heroText}>Connect with neighbors, reduce waste, and help those in need.</p>
          <div style={styles.heroButtons}>
            <button style={styles.heroButton}>Browse Food Listings</button>
            <button style={styles.heroButton}>Donate Food</button>
          </div>
        </section>

        <section style={styles.searchSection}>
          <div style={styles.searchContainer}>
            <input
              type="text"
              placeholder="Search for food or categories..."
              style={styles.searchInput}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            />
            <Search style={styles.searchIcon} size={20} onClick={handleSearch} />
            <button style={styles.filterButton} onClick={() => setShowFilters(!showFilters)}>
              <Filter size={20} />
            </button>
          </div>
        </section>

        {showFilters && <SearchFilters onApplyFilters={handleApplyFilters} />}

        <section style={styles.listingSection}>
          <h3 style={styles.listingTitle}>Nearby Food Listings</h3>
          <div style={styles.listingGrid}>
            {foodListings.map((listing) => (
              <FoodListing 
                key={listing.id} 
                {...listing} 
                onReserve={() => handleReserve(listing.id)}
                onViewDetails={() => handleViewDetails(listing.id)}
              />
            ))}
          </div>
        </section>

        <section style={styles.communitySection}>
          <h3 style={styles.communityTitle}>Join Our Community</h3>
          <p style={styles.communityText}>Sign up now to start sharing and receiving food in your neighborhood.</p>
          <button style={styles.communityButton}>Sign Up</button>
        </section>
      </main>

      <footer style={styles.footer}>
        <p style={styles.footerText}>&copy; 2024 NFS Network. All rights reserved.</p>
      </footer>
    </div>
  );
}

const styles = {
  container: {
    fontFamily: '"Arial", sans-serif',
    backgroundColor: '#f9f9f9',
  },
  header: {
    backgroundColor: '#333',
    color: '#fff',
    padding: '10px 20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  title: {
    fontSize: '24px',
    margin: 0,
  },
  nav: {
    marginLeft: '20px',
  },
  navList: {
    listStyleType: 'none',
    margin: 0,
    padding: 0,
    display: 'flex',
  },
  navItem: {
    margin: '0 10px',
  },
  navLink: {
    color: '#fff',
    textDecoration: 'none',
  },
  menuButtonContainer: {
    display: 'none',
  },
  menuButton: {
    background: 'none',
    border: 'none',
    color: '#fff',
    cursor: 'pointer',
  },
  mobileMenu: {
    position: 'absolute',
    top: '60px',
    right: '0',
    background: '#333',
    color: '#fff',
    padding: '10px',
    width: '200px',
  },
  mobileNavList: {
    listStyleType: 'none',
    padding: 0,
  },
  mobileNavItem: {
    margin: '10px 0',
  },
  mobileNavLink: {
    color: '#fff',
    textDecoration: 'none',
  },
  main: {
    padding: '20px',
  },
  hero: {
    textAlign: 'center',
    marginBottom: '20px',
  },
  heroTitle: {
    fontSize: '28px',
  },
  heroText: {
    margin: '10px 0',
  },
  heroButtons: {
    margin: '20px 0',
  },
  heroButton: {
    margin: '0 10px',
    padding: '10px 20px',
    background: '#007bff',
    color: '#fff',
    border: 'none',
    cursor: 'pointer',
  },
  searchSection: {
    marginBottom: '20px',
  },
  searchContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  searchInput: {
    flex: '1',
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    marginRight: '5px',
  },
  searchIcon: {
    cursor: 'pointer',
    marginRight: '5px',
  },
  filterButton: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
  },
  filters: {
    background: '#fff',
    padding: '10px',
    border: '1px solid #ccc',
    marginBottom: '20px',
  },
  filterTitle: {
    margin: '0 0 10px 0',
  },
  select: {
    margin: '0 5px',
    padding: '5px',
  },
  applyButton: {
    background: '#007bff',
    color: '#fff',
    border: 'none',
    padding: '5px 10px',
    cursor: 'pointer',
  },
  listingSection: {
    marginBottom: '20px',
  },
  listingTitle: {
    fontSize: '24px',
  },
  listingGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
    gap: '20px',
  },
  foodListing: {
    background: '#fff',
    padding: '10px',
    borderRadius: '5px',
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
  },
  image: {
    width: '100%',
    height: 'auto',
    borderRadius: '5px',
  },
  title: {
    fontSize: '18px',
    margin: '10px 0',
  },
  description: {
    margin: '10px 0',
    fontSize: '14px',
  },
  distanceContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    margin: '10px 0',
  },
  distance: {
    fontSize: '12px',
  },
  icon: {
    marginRight: '5px',
    verticalAlign: 'middle',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  detailsButton: {
    background: '#007bff',
    color: '#fff',
    border: 'none',
    padding: '5px 10px',
    cursor: 'pointer',
  },
  reserveButton: {
    background: '#28a745',
    color: '#fff',
    border: 'none',
    padding: '5px 10px',
    cursor: 'pointer',
  },
  communitySection: {
    textAlign: 'center',
    marginTop: '40px',
  },
  communityTitle: {
    fontSize: '24px',
  },
  communityText: {
    margin: '10px 0',
  },
  communityButton: {
    background: '#007bff',
    color: '#fff',
    border: 'none',
    padding: '10px 20px',
    cursor: 'pointer',
  },
  footer: {
    textAlign: 'center',
    padding: '10px',
    background: '#333',
    color: '#fff',
    position: 'relative',
    bottom: '0',
    width: '100%',
  },
  footerText: {
    margin: 0,
  },
};

// Styles for responsiveness (to be added)
// @media (max-width: 768px) {
//   .menuButtonContainer {
//     display: block;
//   }
//   .nav {
//     display: none;
//   }
//   .mobileMenu {
//     display: block;
//   }
// }
