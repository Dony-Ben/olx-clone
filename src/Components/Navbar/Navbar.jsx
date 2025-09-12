import { useState } from "react";
import { FaSearch, FaHeart } from "react-icons/fa";
import { signOut } from "firebase/auth";
import { auth } from "../../../firebase.js";
import "./Navbar.css";
import img from "../../assets/addButton.png"
import Logo from "../../assets/olx-logo.svg"
import AuthModal from "../../Components/Modal/Login.jsx";
import Create from "../create/Create.jsx"

export default function Navbar({ user, setUser }) {
  const [location, setLocation] = useState("India");
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [modalOpen,setModalOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <nav className="navbar">
      <div className="logo">
        <img
          src={Logo}
          alt="OLX"
        />
      </div>
      <button
        className="menu-toggle"
        aria-label="Toggle menu"
        onClick={() => setMenuOpen((v) => !v)}
      >
        ☰
      </button>

      <div className="location-box">
        <FaSearch className="icon" />
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <select>
        </select>
      </div>

      <div className="search-box">
        <input type="text" placeholder='Search "Properties"' />
        <button>
          <FaSearch />
        </button>
      </div>

      <div className={`right-actions ${menuOpen ? "open" : ""}`}>
        <div className="language">
          <select>
            <option>ENGLISH</option>
            <option>हिन्दी</option>
          </select>
        </div>

        <FaHeart className="wishlist" />

        {user ? (
          <div className="user-section">
            <span className="username">{user.displayName || user.email}</span>
            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </div>
        ) : (
          <button className="login-btn" onClick={() => setIsLoginOpen(true)}>
            Login
          </button>
        )}

        <img src={img} alt="img" className="sell-btn" onClick={() => {
          if (user) {
            setModalOpen(true);
          } else {
            setIsLoginOpen(true);
          }
        }}/>
      </div>
      <AuthModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
      />
      {modalOpen && user && (
        <div className="modal-overlay" onClick={() => setModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <Create onClose={() => setModalOpen(false)} />
          </div>
        </div>
      )}
    </nav>
  );
}
