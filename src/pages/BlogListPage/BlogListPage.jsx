import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BlogCard from "../../components/blogCrad/BlogCard";
import "./BlogListPage.scss";
import { useDispatch, useSelector } from "react-redux";
import { getAllBlogs } from "../../redux/action/blogs";
import { getAllCategories } from "../../redux/action/categoryAction";
import { getAllCompanies } from "../../redux/action/companyAction";

const BlogListPage = ({user}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllBlogs());
    dispatch(getAllCompanies());
    dispatch(getAllCategories());
    console.log("Fetched Blogs:", blogs); // Debug fetched blogs
  }, [dispatch]);

  const { loading: blogLoading, error: blogError, blogs } = useSelector(
    (state) => state.blog
  );
  const { loading: companyLoading, error: companyError, companies } = useSelector(
    (state) => state.company
  );
  const {
    loading: categoryLoading,
    error: categoryError,
    categories,
  } = useSelector((state) => state.category);

  const [selectedCompany, setSelectedCompany] = useState(""); // Default to "All Companies"
  const [selectedCategory, setSelectedCategory] = useState("all"); // Default to "All Categories"
  const [selectedVisibility, setSelectedVisibility] = useState("all"); // Default to "All"
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    console.log("Selected Visibility changed to:", selectedVisibility); // Debug visibility change
  }, [selectedVisibility]);

  useEffect(() => {}, [categories]);
  useEffect(() => {}, [blogs]);

  const filteredBlogs = blogs.filter((blog) => {
    const companyMatch =
      !selectedCompany || (blog.company && blog.company._id === selectedCompany);
    const categoryMatch =
      selectedCategory === "all" ||
      (blog.category && blog.category._id === selectedCategory);
    const visibilityMatch =
      selectedVisibility === "all" || // Show all when "All" is selected
      (selectedVisibility === "public" && blog.ispublic === true) || // Use ispublic
      (selectedVisibility === "private" && blog.ispublic === false); // Use ispublic
    const titleMatch =
      !searchTerm || blog.title.toLowerCase().includes(searchTerm.toLowerCase());
    return companyMatch && categoryMatch && visibilityMatch && titleMatch;
  });

  const itemsPerPage = 9;
  const [currentPage, setCurrentPage] = useState(1);

  const paginatedBlogs = filteredBlogs.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(filteredBlogs.length / itemsPerPage);

  const handlePagination = (page) => setCurrentPage(page);

  const handleCompanyChange = (e) => {
    setSelectedCompany(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const handleVisibilityChange = (e) => {
    setSelectedVisibility(e.target.value);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleClearSearch = () => {
    setSearchTerm("");
  };

  return (
    <div className="blog-list-page">
      <div className="sidebar">
        <h2>Dashboard</h2>
        <div className="dropdown-container">
          <select
            value={selectedCompany}
            onChange={handleCompanyChange}
            disabled={companyLoading}
          >
            <option value="">All Companies</option>
            {companies &&
              companies.map((company) => (
                <option key={company._id} value={company._id}>
                  {company.companyName}
                </option>
              ))}
          </select>
          <select
            value={selectedCategory}
            onChange={handleCategoryChange}
            disabled={categoryLoading}
          >
            <option value="all">All Categories</option>
            {categories &&
              categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
          </select>
          <select
            value={selectedVisibility}
            onChange={handleVisibilityChange}
            disabled={blogLoading}
          >
            <option value="all">All</option>
            <option value="public">Public</option>
            <option value="private">Private</option>
          </select>
        </div>
      </div>
      <div className="main-content">
        <div className="header">
          <h1>Blog List</h1>
          <div className="search-container">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              placeholder="Search blogs..."
              className="search-bar"
              value={searchTerm}
              onChange={handleSearchChange}
            />
            {searchTerm && (
              <button className="clear-btn" onClick={handleClearSearch}>
                ×
              </button>
            )}
          </div>
        </div>
        <div className="blogs-container">
          {paginatedBlogs.length > 0 ? (
            paginatedBlogs.map((blog) => (
              <BlogCard user={user} key={blog._id} blog={blog} />
            ))
          ) : (
            <p>No blogs found matching the filters.</p>
          )}
        </div>
        <div className="pagination">
          {Array.from({ length: totalPages }).map((_, index) => (
            <button
              key={index}
              className={currentPage === index + 1 ? "active" : ""}
              onClick={() => handlePagination(index + 1)}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogListPage;