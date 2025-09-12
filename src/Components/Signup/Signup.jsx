import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import { auth, db } from "../../../firebase";

const Signup = ({ onSwitchToLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState("");

  const validateForm = () => {
    if (!email) {
      setErrors("Email is required");
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setErrors("Email is invalid");
      return false;
    }
    if (!password) {
      setErrors("Password is required");
      return false;
    }
    if (password.length < 6) {
      setErrors("Password must be at least 6 characters");
      return false;
    }
    setErrors("");
    return true;
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      await setDoc(doc(db, "users", user.uid), {
        email: user.email,
        uid: user.uid,
        createdAt: new Date(),
      });
      console.log("User signed up:", user);
      if (onSwitchToLogin) onSwitchToLogin();
    } catch (error) {
      console.log("Sign up error", error);
      setErrors(error.message || "Failed to sign up");
    }
  };

  return (
    <div className="Signup-modal">
      <h2>Create an account</h2>
      <form onSubmit={handleSignup}>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Sign up</button>
      </form>
      {errors && <p style={{ color: "red" }}>{errors}</p>}
      <p>
        Already have an account?{" "}
        <button onClick={onSwitchToLogin} className="link-button">
          Login
        </button>
      </p>
    </div>
  );
};

export default Signup;
