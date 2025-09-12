import { useState } from "react";
import { X, ChevronLeft, ChevronRight, Phone } from "lucide-react";
import { auth, googleProvider, db } from "../../../firebase";
import { signInWithPopup, signInWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import Signup from "../Signup/Signup.jsx"
import { Link } from "react-router-dom";
import img1 from "../../assets/avatar3.png";
import Img2 from "../../assets/avatar.png";
import Img3 from "../../assets/avatar2.png";
import "./Login.css";

const AuthModal = ({ isOpen, onClose }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [isSignup, setIsSignup] = useState(false);

  if (!isOpen) return null;

  const slides = [
    {
      icon: Img2,
      title: "Help us become one of the safest places to buy and sell",
    },
    {
      icon: Img3,
      title: "Buy and sell with confidence",
    },
    {
      icon: img1,
      title: "Find great deals near you",
    },
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const handleGoogleLogin = async () => {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;
    console.log("Google user info:", user);
    await setDoc(doc(db, "users", user.uid), {
      email: user.email,
      uid: user.uid,
      displayName: user.displayName,
      photoURL: user.photoURL,
      lastLogin: new Date()
    });

    onClose();
  };

  const handleEmailLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      await setDoc(doc(db, "users", user.uid), {
        email: user.email,
        uid: user.uid,
        lastLogin: new Date()
      });

      onClose();
      console.log("User info:", userCredential.user);
    } catch (error) {
      let errorMessage = "Login failed. Please try again.";
      if (error.code === "auth/user-not-found") {
        errorMessage = "No account found with this email.";
      } else if (error.code === "auth/wrong-password") {
        errorMessage = "Incorrect password.";
      } else if (error.code === "auth/invalid-email") {
        errorMessage = "Invalid email address.";
      }
      setErrors({ email: errorMessage });
      console.error("Email login error:", error);
    }
  };

  const handleBackToMain = () => {
    setShowEmailForm(false);
    setEmail("");
    setPassword("");
    setErrors({});
  };

  const validateForm = () => {
    const newErrors = {};
    if (!email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email is invalid";
    }
    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      await handleEmailLogin();
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <button
          onClick={onClose}
          className="close-button"
        >
          <X />
        </button>

        <button
          onClick={prevSlide}
          className="nav-arrow nav-arrow-left"
        >
          <ChevronLeft />
        </button>

        <button
          onClick={nextSlide}
          className="nav-arrow nav-arrow-right"
        >
          <ChevronRight />
        </button>

        <div className="modal-content">
          <div className="icon-container">
            <img
              src={slides[currentSlide].icon}
              alt="Guitar icon"
            />
          </div>

          <h2 className="modal-title">
            {slides[currentSlide].title}
          </h2>

          <div className="dots-container">
            {slides.map((_, index) => (
              <div
                key={index}
                className={`dot ${index === currentSlide ? "dot-active" : "dot-inactive"
                  }`}
              />
            ))}
          </div>

          <div className="button-container">
            {isSignup ? (
              <Signup onSwitchToLogin={() => setIsSignup(false)} />
            ) : (
              <>
                {!showEmailForm ? (
                  <>
                    <button className="button-base button-phone" disabled>
                      <Phone /> Continue with phone
                    </button>

                    <button className="button-base button-google" onClick={handleGoogleLogin}>
                      <svg viewBox="0 0 24 24">
                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                      </svg>
                      Continue with Google
                    </button>

                    <div className="divider">OR</div>

                    <button className="email-link" onClick={() => setShowEmailForm(true)}>
                      Login with Email
                    </button>
                  </>
                ) : (
                  <form onSubmit={handleSubmit} className="email-login-form">
                    <div className="form-group">
                      <label htmlFor="email">Email</label>
                      <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                      {errors.email && <span className="error-message">{errors.email}</span>}
                    </div>

                    <div className="form-group">
                      <label htmlFor="password">Password</label>
                      <input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      {errors.password && <span className="error-message">{errors.password}</span>}
                    </div>

                    {/* 🔑 Switch to Signup */}
                    <button
                      type="button"
                      onClick={() => setIsSignup(true)}
                      className="email-link"
                    >
                      Don’t have an account? Signup
                    </button>

                    <div className="form-buttons">
                      <button type="submit" className="button-base button-submit">
                        Login
                      </button>
                      <button
                        type="button"
                        className="button-base button-back"
                        onClick={handleBackToMain}
                      >
                        Back
                      </button>
                    </div>
                  </form>
                )}
              </>
            )}
          </div>


          <div className="legal-text">
            <p>All your personal details are safe with us.</p>
            <p>
              If you continue, you are accepting{" "}
              <a href="#">
                OLX Terms and Conditions and Privacy Policy
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;