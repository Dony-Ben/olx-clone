import React from "react";
import "./Category.css"; 

const categories = [
  "Cars",
  "Motorcycles",
  "Mobile Phones",
  "For Sale: Houses & Apartments",
  "Scooters",
  "Commercial & Other Vehicles",
  "For Rent: Houses & Apartments",
];

const CategoryBar = () => {
  return (
    <div className="category-bar">
      <div className="all-categories">
        <strong>ALL CATEGORIES</strong>
        <span className="dropdown-icon">▼</span>
      </div>

      <div className="categories-list">
        {categories.map((cat, index) => (
          <span key={index} className="category-item">
            {cat}
          </span>
        ))}
      </div>
    </div>
  );
};

export default CategoryBar;
