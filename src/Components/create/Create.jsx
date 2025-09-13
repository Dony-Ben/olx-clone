import React, { useState } from "react";
import { db, storage, auth } from "../../../firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import "./Create.css";

export default function Create({ onClose }) {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Mobiles");
  const [location, setLocation] = useState("");
  const [image, setImage] = useState([]);
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});


  const validateForm = () => {
    const newErrors = {};

    if (!title.trim()) {
      newErrors.title = "Title is required";
    } else if (title.length < 3) {
      newErrors.title = "Title must be at least 3 characters";
    }

    if (!desc.trim()) {
      newErrors.desc = "Description is required";
    } else if (desc.length < 10) {
      newErrors.desc = "Description must be at least 10 characters";
    }

    if (!price) {
      newErrors.price = "Price is required";
    } else if (isNaN(price) || Number(price) <= 0) {
      newErrors.price = "Price must be a positive number";
    }

    if (!location.trim()) {
      newErrors.location = "Location is required";
    }

    if (image && image.length > 0) {
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
      for (const file of image) {
        if (!allowedTypes.includes(file.type)) {
          newErrors.image = "Please select a valid image file (JPEG, PNG, GIF)";
          break;
        } else if (file.size > 5 * 1024 * 1024) {
          newErrors.image = "Image size must be less than 5MB";
          break;
        }
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  async function uploadToCloudinary(file) {
    const url = `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`;
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);
    const folder = import.meta.env.VITE_CLOUDINARY_FOLDER;
    if (folder) formData.append("folder", folder);

    const res = await fetch(url, { method: "POST", body: formData });
    if (!res.ok) {
      const t = await res.text();
      throw new Error(`Cloudinary upload failed: ${res.status} ${t}`);
    }
    const data = await res.json();
    return data.secure_url;
  }


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      const user = auth.currentUser;
      if (!user) {
        setMessage("You must be logged in to post an ad.");
        return;
      }

      let imageUrl = [];
      if (image?.length) {
        for (const file of image) {
          const url = await uploadToCloudinary(file);
          imageUrl.push(url);
        }
      } else {
        console.log("No images selected");
      }

      await addDoc(collection(db, "ads"), {
        title,
        description: desc,
        price: Number(price),
        category,
        location,
        images: imageUrl,
        sellerId: user.uid,
        sellerEmail: user.email,
        createdAt: serverTimestamp(),
      });

      console.log("Product posted successfully ✅");

      setTitle("");
      setDesc("");
      setPrice("");
      setCategory("Mobiles");
      setLocation("");
      setImage([]);
      setErrors({});
      setMessage("Ad posted successfully ✅");
    } catch (error) {
      console.error("Error posting ad:", error);
      setMessage("Something went wrong ❌");
    }
  };

  return (
    <div className="create-container">
      <button className="close-btn" onClick={onClose}>×</button>
      <form onSubmit={handleSubmit} className="post-form">
        <h2>Post Your Ad</h2>
        {message && <p className="message">{message}</p>}

        <div className="form-group">
          <input
            type="text"
            className="form-input"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            
          />
          {errors.title && <span className="error-message">{errors.title}</span>}
        </div>

        <div className="form-group">
          <textarea
            className="form-textarea"
            placeholder="Description"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            
          />
          {errors.desc && <span className="error-message">{errors.desc}</span>}
        </div>

        <div className="form-group">
          <input
            type="number"
            className="form-input"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            
          />
          {errors.price && <span className="error-message">{errors.price}</span>}
        </div>

        <select
          className="form-select"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option>Mobiles</option>
          <option>Cars</option>
          <option>Bikes</option>
          <option>Electronics</option>
          <option>Furniture</option>
        </select>

        <div className="form-group">
          <input
            type="text"
            className="form-input"
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            
          />
          {errors.location && <span className="error-message">{errors.location}</span>}
        </div>

        <div className="form-group">
          <input
            type="file"
            className="form-file"
            multiple
            accept="image/*"
            onChange={(e) => {
              const files = Array.from(e.target.files || []);
              console.log("Files selected:", files);
              setImage(files);
            }}

          />
          {errors.image && <span className="error-message">{errors.image}</span>}
        </div>

        <button type="submit" className="form-button">
          Post Ad
        </button>
      </form>
    </div>
  );
}
