import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase.js";
import Navbar from "./Components/Navbar/Navbar.jsx";
import List from "./Components/List/List.jsx"
import ProductDetail from "./Components/ProductDetail/ProductDetail.jsx";
import Login from "./Components/Modal/Login.jsx"
import Signup from "./Components/Signup/Signup.jsx"
import Banner from "./Components/Banner/Banner.jsx"
import Category from "./Components/Categories/Category.jsx";
import Footer from "./Components/Footer/Footer.jsx"
function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  return (
    <Router>
      <Navbar user={user} setUser={setUser} />
      <Category />
      <Routes>
        <Route path="/" element={<List />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

      </Routes>
      <Banner />
      <Footer />
    </Router>
  );
}

export default App;
