import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BlogCard from "../../components/blogCrad/BlogCard";
import "./BlogListPage.scss";
import { useDispatch, useSelector } from "react-redux";
import { getAllBlogs } from "../../redux/action/blogs";
import { getAllCategories } from "../../redux/action/categoryAction";
import { getAllCompanies } from "../../redux/action/companyAction";

const BlogListPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllBlogs());
    dispatch(getAllCompanies());
    dispatch(getAllCategories());
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

  const [selectedCompany, setSelectedCompany] = useState(""); // Default to empty string
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  // Remove the useEffect that defaults to the first company
  // useEffect(() => {
  //   if (companies && companies.length > 0 && !selectedCompany) {
  //     setSelectedCompany(companies[0]._id);
  //   } else if (!companies || companies.length === 0) {
  //     setSelectedCompany("");
  //   }
  // }, [companies, selectedCompany]);

  useEffect(() => {}, [categories]);

  useEffect(() => {}, [blogs]);

  const filteredBlogs = blogs.filter((blog) => {
    const companyMatch =
      !selectedCompany || (blog.company && blog.company._id === selectedCompany);
    const categoryMatch =
      selectedCategory === "all" ||
      (blog.category && blog.category._id === selectedCategory);
    const titleMatch =
      !searchTerm || blog.title.toLowerCase().includes(searchTerm.toLowerCase());
    return companyMatch && categoryMatch && titleMatch;
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
            <option value="" disabled>
              Select Company
            </option>
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
          {paginatedBlogs.map((blog) => (
            <BlogCard key={blog._id} blog={blog} />
          ))}
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