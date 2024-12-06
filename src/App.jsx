import React, { lazy, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
const Navbar = lazy(() => import('./containers/Nav/Navbar'));
// import Navbar from './containers/Nav/Navbar';
const UsersPage = lazy(() => import('./pages/userPage/UsersPage'))
const AddBlogPage = lazy(() => import('./pages/AddBlog/AddBlogPage'))
const BlogListPage = lazy(() => import('./pages/BlogListPage/BlogListPage'))
const ContactPage = lazy(() => import('./pages/Contact/ContactPage'))
const LoginPage = lazy(() => import('./components/Login/Login'))
import './App.scss';

const App = () => {
  // State to track if the user is logged in
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  // Function to handle login
  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <Router>
      <div className="app-container">
        {!isLoggedIn ? (
          // Show LoginPage if the user is not logged in
          <LoginPage onLogin={handleLogin} />
        ) : (
          <>
          <div className="content-fix">
            {/* Left Navbar */}
            <Navbar />
          </div>
            

            {/* Right-Side Dynamic Content */}
            <div className="content">
              <Routes>
                <Route path="/users" element={<UsersPage />} />
                <Route path="/add-blog" element={<AddBlogPage />} />
                <Route path="/blog-list" element={<BlogListPage />} />
                <Route path="/contact" element={<ContactPage />} />
              </Routes>
            </div>
          </>
        )}
      </div>
    </Router>
  );
};

export default App;
