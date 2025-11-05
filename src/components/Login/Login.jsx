import React, { useState, useEffect, useMemo } from "react";
import "./Login.scss";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/action/userAction";
import { useNavigate } from "react-router-dom";
import {
  FiMail,
  FiLock,
  FiEye,
  FiEyeOff,
  FiShield,
  FiAlertTriangle,
  FiCheckCircle,
} from "react-icons/fi";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [touched, setTouched] = useState({ email: false, password: false });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, message, isAuthenticated, user } = useSelector(
    (state) => state.user
  );

  const emailError = useMemo(() => {
    if (!touched.email) return "";
    const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    return ok ? "" : "Enter a valid email address.";
  }, [email, touched.email]);

  const passwordError = useMemo(() => {
    if (!touched.password) return "";
    return password.length >= 6
      ? ""
      : "Password must be at least 6 characters.";
  }, [password, touched.password]);

  const formInvalid = !!emailError || !!passwordError || !email || !password;

  const handleSubmit = (e) => {
    e.preventDefault();
    setTouched({ email: true, password: true });
    if (formInvalid) return;
    dispatch(login(email.trim(), password));
  };

  useEffect(() => {
    if (isAuthenticated) {
      // Optional guard: only admins allowed
      // If you want to block non-admins, uncomment:
      // if (user?.role !== "admin") return;
      navigate("/blog-list");
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="login-container" aria-busy={loading ? "true" : "false"}>
      <div className="bg-ornament" />
      <div className="login-box" role="dialog" aria-labelledby="login-title">
        <div className="brand">
          <div className="logo">
            <FiShield />
          </div>
          <div className="brand-text">
            <h1 id="login-title">TechTime.ai Admin</h1>
            <p className="subtitle">Secure access — Admins only</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} noValidate>
          {/* Email */}
          <div className={`input-group ${emailError ? "has-error" : ""}`}>
            <span className="icon" aria-hidden="true">
              <FiMail />
            </span>
            <label htmlFor="email" className="sr-only">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="you@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={() => setTouched((t) => ({ ...t, email: true }))}
              aria-invalid={emailError ? "true" : "false"}
              autoComplete="email"
            />
          </div>
          {emailError && (
            <div className="field-error" role="alert">
              <FiAlertTriangle /> {emailError}
            </div>
          )}

          {/* Password */}
          <div className={`input-group ${passwordError ? "has-error" : ""}`}>
            <span className="icon" aria-hidden="true">
              <FiLock />
            </span>
            <label htmlFor="password" className="sr-only">
              Password
            </label>
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onBlur={() => setTouched((t) => ({ ...t, password: true }))}
              aria-invalid={passwordError ? "true" : "false"}
              autoComplete="current-password"
            />
            <button
              type="button"
              className="toggle-visibility"
              onClick={() => setShowPassword((s) => !s)}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <FiEyeOff /> : <FiEye />}
            </button>
          </div>
          {passwordError && (
            <div className="field-error" role="alert">
              <FiAlertTriangle /> {passwordError}
            </div>
          )}

          {/* Actions */}
          <div className="form-row">
            <label className="remember">
              <input type="checkbox" /> Keep me signed in
            </label>
            <button
              type="button"
              className="linklike"
              onClick={() => navigate("/forgot-password")}
            >
              Forgot password?
            </button>
          </div>

          <button
            type="submit"
            className="primary-btn"
            disabled={loading || formInvalid}
          >
            {loading ? "Signing in…" : "Sign in"}
          </button>

          {/* Global messages */}
          {/* Global messages */}
          {error && (
            <div className="banner error" role="alert">
              <FiAlertTriangle />{" "}
              {error.toLowerCase().includes("please login")
                ? "Your session has expired. Please sign in again to continue."
                : error.toLowerCase().includes("invalid credentials")
                ? "Incorrect email or password. Please try again."
                : error.toLowerCase().includes("network")
                ? "Network error — please check your internet connection."
                : error}
            </div>
          )}

          {message && !error && (
            <div className="banner success" role="status">
              <FiCheckCircle /> {message}
            </div>
          )}
        </form>

        <footer className="footnote">
          © {new Date().getFullYear()} TechTime.ai
        </footer>
      </div>
    </div>
  );
};

export default LoginPage;
