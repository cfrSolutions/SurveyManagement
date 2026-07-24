import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { AuthContext } from "../../context/AuthContext";
import api from "../../services/api";
import "../../styles/login.css";

function Login() {
  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    identifier: "",
    password: "",
    userType: "EMPLOYEE",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async () => {
    try {
      const response = await api.post("/auth/login", {
        identifier: formData.identifier,
        password: formData.password,
        userType: formData.userType,
      });

      const { token, user } = response.data;
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      setUser(user);

      if (user.userType === "CLIENT") {
        navigate("/client-dashboard");
      } else if (user.userType === "VENDOR") {
        navigate("/vendor-dashboard");
      } else {
        navigate("/");
      }
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.message ||
        "Login failed";
      alert(message);
    }
  };

  return (
    <div className="login-container">

      <div className="login-left">
        <h1>INPUTIFY</h1>

        <h2>
          Survey Management Platform
        </h2>

        <p>
          Manage Clients, Vendors, Projects,
          Employees and Survey Operations
          from one centralized dashboard.
        </p>
      </div>

      <div className="login-card">

        <h2>Welcome Back</h2>

        <p>Sign in to continue</p>

        <select
          name="userType"
          value={formData.userType}
          onChange={handleChange}
        >
          <option value="EMPLOYEE">Employee / Admin</option>
          <option value="CLIENT">Client</option>
          <option value="VENDOR">Vendor</option>
        </select>

        <input
          type="text"
          name="identifier"
          placeholder="Email or Username"
          value={formData.identifier}
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
        />

        <button onClick={handleLogin}>
          Login
        </button>

      </div>

    </div>
  );
}

export default Login;