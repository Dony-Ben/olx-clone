import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../../../firebase";
import { FaRegHeart } from "react-icons/fa";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import "./List.css";

export default function ProductsList() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const q = query(collection(db, "ads"), orderBy("createdAt", "desc"));
        const querySnapshot = await getDocs(q);

        const items = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProducts(items);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="product-section">
  {products.length === 0 ? (
    <p>No products yet. Be the first to post!</p>
  ) : (
    <div className="products-grid">
      {products.map((item) => (
        <div 
          key={item.id} 
          className="product-card"
          onClick={() => navigate(`/product/${item.id}`)}
        >
          <div className="image-wrapper">
            <img
              src={item.images && item.images[0] ? item.images[0] : "/no-image.png"}
              alt={item.title}
              className="product-image"
            />
          <button className="wishlist-icon">
          <FaRegHeart />
        </button>
          </div>

          <div className="product-info">
            <p className="product-price">₹ {item.price.toLocaleString()}</p>
            <p className="product-title">{item.title}</p>
            <div className="bottom-row">
              <span className="product-location">{item.location}</span>
              <span className="product-date">
                {item.createdAt
                  ? item.createdAt.toDate().toLocaleDateString()
                  : "Today"}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  )}
</div>

)}
