import React, { lazy, useEffect, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loadUser } from "./redux/action/userAction";
import "react-quill/dist/quill.snow.css";
import "./App.scss";

/* Lazy Imports */
const Navbar = lazy(() => import("./containers/Nav/Navbar"));
const UsersPage = lazy(() => import("./pages/userPage/UsersPage"));
const AddBlogPage = lazy(() => import("./pages/AddBlog/AddBlogPage"));
const BlogListPage = lazy(() => import("./pages/BlogListPage/BlogListPage"));
const ContactPage = lazy(() => import("./pages/Contact/ContactPage"));
const LoginPage = lazy(() => import("./components/Login/Login"));
const AddSubtitlePage = lazy(() => import("./pages/AddTitle/AddSubTitlePage"));
const UserRegister = lazy(() =>
  import("./containers/UserRegister/UserRegister")
);
const RecycleBinPage = lazy(() => import("./pages/RecycleBin/RecycleBinPage"));
const Profile = lazy(() => import("./pages/Profile/Profile"));
const ChangePassword = lazy(() =>
  import("./components/ChangePassword/ChangePassword")
);
const MCategoryTable = lazy(() => import("./containers/MItem/MCategoryTable"));
const MRoleTable = lazy(() => import("./containers/MItem/MRoleTable"));
const MCompanyTable = lazy(() => import("./containers/MItem/MCompanyTable"));
const BlogsDetails = lazy(() => import("./pages/BlogView/BlogsDetails"));
const TransBlog = lazy(() => import("./containers/DeltedBlog/DeltedBlog"));

/* App Component */
const App = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  return (
    <Router>
      <div className="app-container">
        {!isAuthenticated ? (
          /* Fullscreen loader while login page mounts */
          <Suspense fallback={<div className="suspense-fallback">Loading...</div>}>
            <LoginPage />
          </Suspense>
        ) : (
          <>
            {/* Fixed Navbar Section */}
            <div className="content-fix">
              <Suspense
                fallback={
                  <div className="suspense-fallback --topbar">Loading Navbar...</div>
                }
              >
                <Navbar user={user} />
              </Suspense>
            </div>

            {/* Main Content Area */}
            <div className="content">
              <Suspense
                fallback={
                  <div className="suspense-fallback --content">Loading Content...</div>
                }
              >
                <Routes>
                  <Route path="/users" element={<UsersPage />} />
                  <Route path="/recycle-bin" element={<RecycleBinPage />} />
                  <Route path="/register" element={<UserRegister />} />
                  <Route path="/profile" element={<Profile user={user} />} />
                  <Route path="/change-password" element={<ChangePassword />} />
                  <Route path="/add-blog" element={<AddBlogPage />} />
                  <Route
                    path="/blog-list"
                    element={<BlogListPage user={user} />}
                  />
                  <Route path="/blog-list/:blogId" element={<BlogsDetails />} />
                  <Route
                    path="/add-subtitle/:blogId"
                    element={<AddSubtitlePage />}
                  />
                  <Route path="/contact" element={<ContactPage />} />
                  <Route
                    path="/recycle-bin/transBlog"
                    element={<TransBlog />}
                  />
                  <Route path="/category" element={<MCategoryTable />} />
                  <Route path="/role" element={<MRoleTable />} />
                  <Route path="/company" element={<MCompanyTable />} />
                </Routes>
              </Suspense>
            </div>
          </>
        )}
      </div>
    </Router>
  );
};

export default App;
