
import React, { lazy, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
const Navbar = lazy(() => import('./containers/Nav/Navbar'));
// import Navbar from './containers/Nav/Navbar';
const UsersPage = lazy(() => import('./pages/userPage/UsersPage'))
const AddBlogPage = lazy(() => import('./pages/AddBlog/AddBlogPage'))
const BlogListPage = lazy(() => import('./pages/BlogListPage/BlogListPage'))
const ContactPage = lazy(() => import('./pages/Contact/ContactPage'))
const LoginPage = lazy(() => import('./components/Login/Login'))

import AddSubtitlePage from "./components/AddTitle/AddSubTitlePage";
import "./App.scss";



const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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
              <Navbar /> {/* Left Navbar */}
            </div>

            {/* Right-Side Dynamic Content */}
            <div className="content">
              <Routes>
                <Route path="/users" element={<UsersPage />} />
                <Route path="/add-blog" element={<AddBlogPage />} />
                <Route path="/blog-list" element={<BlogListPage />} />
                <Route
                  path="/add-subtitle/:blogId"
                  element={<AddSubtitlePage />}
                />
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
