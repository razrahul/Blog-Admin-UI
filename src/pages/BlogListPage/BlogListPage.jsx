import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import BlogCard from "../../components/blogCrad/BlogCard"; // keep your actual folder name
import "./BlogListPage.scss";
import { useDispatch, useSelector } from "react-redux";
import { getAllBlogs } from "../../redux/action/blogs";
import { getAllCategories } from "../../redux/action/categoryAction";
import { getAllCompanies } from "../../redux/action/companyAction";
import Pagination from "../../components/pagination/Pagination.jsx";

const LIMIT = 9;

const BlogListPage = ({ user }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Filters/UI state
  const [selectedCompany, setSelectedCompany] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedVisibility, setSelectedVisibility] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // Selectors (match your reducers)
  const {
    loading: blogLoading,
    error: blogError,
    blogs,
    total,
    totalPages: totalPagesFromStore,
    page: pageFromStore,
  } = useSelector((state) => state.blog);

  // console.log(blogs)

  const { loading: companyLoading, companies } = useSelector(
    (state) => state.company
  );
  const { loading: categoryLoading, categories } = useSelector(
    (state) => state.category
  );

  // Compute total pages safely
  const effectiveTotalPages =
    (typeof totalPagesFromStore === "number" && totalPagesFromStore) ||
    (typeof total === "number" && Math.max(1, Math.ceil(total / LIMIT))) ||
    1;

  // Fetch static filters once
  useEffect(() => {
    dispatch(getAllCompanies());
    dispatch(getAllCategories());
  }, [dispatch]);

  // Debounced search (350ms)
  const debouncedSearch = useMemo(() => {
    const obj = { value: searchTerm };
    let t;
    return (fn) => {
      clearTimeout(t);
      t = setTimeout(() => fn(obj.value), 350);
    };
  }, [searchTerm]);

  // Build query params for API
  const buildParams = (p, sTerm) => ({
    page: p,
    limit: LIMIT,
    companyId: selectedCompany || undefined,
    categoryId: selectedCategory !== "all" ? selectedCategory : undefined,
    visibility:
      selectedVisibility === "all" ? undefined : selectedVisibility,
    search: sTerm || undefined,
  });

  // Fetch blogs when page changes
  useEffect(() => {
    dispatch(getAllBlogs(buildParams(currentPage, searchTerm)));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, currentPage]);

  // Refetch on filter/search change (reset to page 1)
  useEffect(() => {
    setCurrentPage(1);
    debouncedSearch((latestSearch) => {
      dispatch(getAllBlogs(buildParams(1, latestSearch)));
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCompany, selectedCategory, selectedVisibility, searchTerm]);

  const handlePagination = (p) => setCurrentPage(p);

  return (
    <div className="blog-list-page">
      {/* Sidebar */}
      <div className="sidebar">
        <h2>Dashboard</h2>
        <div className="dropdown-container">
          <select
            value={selectedCompany}
            onChange={(e) => setSelectedCompany(e.target.value)}
            disabled={companyLoading}
          >
            <option value="">All Companies</option>
            {companies?.map((c) => (
              <option key={c._id} value={c._id}>
                {c.companyName}
              </option>
            ))}
          </select>

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            disabled={categoryLoading}
          >
            <option value="all">All Categories</option>
            {categories?.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.name}
              </option>
            ))}
          </select>

          <select
            value={selectedVisibility}
            onChange={(e) => setSelectedVisibility(e.target.value)}
            disabled={blogLoading}
          >
            <option value="all">All</option>
            <option value="public">Public</option>
            <option value="private">Private</option>
          </select>
        </div>
      </div>

      {/* Main content */}
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
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <button className="clear-btn" onClick={() => setSearchTerm("")}>
                ×
              </button>
            )}
          </div>
        </div>

        {/* Blog Cards */}
        <div className="blogs-container">
          {blogLoading ? (
            <p>Loading…</p>
          ) : blogs?.length ? (
            blogs.map((blog) => (
              <BlogCard user={user} key={blog._id} blog={blog} />
            ))
          ) : (
            <p>No blogs found.</p>
          )}
        </div>

        {/* Pagination */}
        <Pagination
          totalPages={effectiveTotalPages}
          currentPage={currentPage}
          onChange={handlePagination}
        />
      </div>
    </div>
  );
};

export default BlogListPage;
