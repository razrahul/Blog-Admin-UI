import React, { lazy, useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
const Navbar = lazy(() => import("./containers/Nav/Navbar"));
// import Navbar from './containers/Nav/Navbar';
const UsersPage = lazy(() => import("./pages/userPage/UsersPage"));
const AddBlogPage = lazy(() => import("./pages/AddBlog/AddBlogPage"));
const BlogListPage = lazy(() => import("./pages/BlogListPage/BlogListPage"));
const ContactPage = lazy(() => import("./pages/Contact/ContactPage"));
const LoginPage = lazy(() => import("./components/Login/Login"));
import "react-quill/dist/quill.snow.css"; // import styles

const AddSubtitlePage = lazy(() => import("./pages/AddTitle/AddSubTitlePage"));
import "./App.scss";

import { useDispatch, useSelector } from "react-redux";
import { loadUser } from "./redux/action/userAction";
import { getAllBlogs } from "./redux/action/blogs";
// import UserRegister from "./containers/UserRegister/UserRegister";
const UserRegister = lazy(() => import("./containers/UserRegister/UserRegister"));
// import RecycleBinPage from "./pages/RecycleBin/RecycleBinPage";
const RecycleBinPage = lazy(() => import("./pages/RecycleBin/RecycleBinPage"));
// import MoreItemPage from "./pages/MoreItem/MoreItemPage";
const MoreItemPage = lazy(() => import("./pages/MoreItem/MoreItemPage"));
// import Profile from "./pages/Profile/Profile";
const Profile = lazy(() => import("./pages/Profile/Profile"));
// import ChangePassword from "./components/ChangePassword/ChangePassword";
const ChangePassword = lazy(() => import("./components/ChangePassword/ChangePassword"));
// const BlogsDetails = lazy(() => import("./pages/BlogView/BlogsDetails"));
const BlogsDetails = lazy(() => import("./pages/BlogView/BlogsDetails"));
// const TransBlog = lazy(() => import("./containers/DeltedBlog/DeltedBlog"))
const TransBlog = lazy(() => import("./containers/DeltedBlog/DeltedBlog"))

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const { loading, error, isAuthenticated, user } = useSelector(
    (state) => state.user
  );

  // const { loading : blogloading, error: blogerror , blogs } = useSelector(
  //   (state) => state.blog
  // );
  // console.log(blogs)

  // console.log(user)

  const dispatch = useDispatch();

  useEffect(() => {
    if(!user){
      dispatch(loadUser());
      // console.log("load User called")
    }
    
  }, [dispatch]);

  // console.log(user);

  // const handleLogin = () => {
  //   setIsLoggedIn(true);
  // };

  return (
    <Router>
      <div className="app-container">
        {!isAuthenticated ? (
          // Show LoginPage if the user is not logged in
          <LoginPage />
        ) : (
          <>
            <div className="content-fix">
              <Navbar user={user} /> {/* Left Navbar */}
            </div>

            {/* Right-Side Dynamic Content */}
            <div className="content">
              <Routes>
                <Route path="/users" element={<UsersPage />} />
                <Route path="/recycle-bin" element={<RecycleBinPage />} />
                <Route path="/more" element={<MoreItemPage />}></Route>
                <Route path="/register" element={<UserRegister />} />
                <Route path="/profile" element={<Profile user={user} />} />
                <Route path="/change-password" element={<ChangePassword />} />
                <Route path="/add-blog" element={<AddBlogPage />} />
                <Route path="/blog-list" element={<BlogListPage />} />
                <Route path="/blog-list/:blogId" element={<BlogsDetails />} />
                <Route
                  path="/add-subtitle/:blogId"
                  element={<AddSubtitlePage />}
                />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/recycle-bin/transBlog" element={<TransBlog />} />
              </Routes>
            </div>
          </>
        )}
      </div>
    </Router>
  );
};

export default App;
