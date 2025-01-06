import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BlogCard from "../../components/blogCrad/BlogCard";
import "./BlogListPage.scss";
import { useDispatch, useSelector } from "react-redux";
import { getAllBlogs } from "../../redux/action/blogs";

const BlogListPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [searchTerm, setSearchTerm] = useState(""); // State for search input
  const [currentPage, setCurrentPage] = useState(1); // State for pagination
  const [selectedCategory, setSelectetedCategory] = useState("All");

  const itemsPerPage = 9;

  useEffect(() => {
    dispatch(getAllBlogs());
  }, [dispatch]);

  const {
    loading: blogloading,
    error: blogerror,
    blogs,
  } = useSelector((state) => state.blog);

  // Filter blogs by search term
  const filteredBlogs = blogs.filter((blog) => {
    const matchesSearchTerm = blog.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory == "All" || blog.category == selectedCategory;
    return matchesSearchTerm && matchesCategory;
  });

  // Pagination Logic
  const paginatedBlogs = filteredBlogs.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  const totalPages = Math.ceil(filteredBlogs.length / itemsPerPage);

  const handlePagination = (page) => setCurrentPage(page);

  const handleCategoryChange = (category) => {
    setSelectetedCategory(category);
    setCurrentPage(1);
  };

  return (
    <div className="blog-list-page">
      <div className="sidebar">
        <h2>Categories</h2>
        <ul>
          <li onClick={()=>handleCategoryChange("All")}
          className={selectedCategory==='All' ? "active":""}
          >All Blogs</li>
          <li
            onClick={() => handleCategoryChange("Technology")}
            className={selectedCategory === "Technology" ? "active" : ""}
          >
            Technology
          </li>
          <li
            onClick={() => handleCategoryChange("LifeStyle")}
            className={selectedCategory === "LifeStyle" ? "active" : ""}
          >
            LifeStyle
          </li>
          <li
            onClick={() => handleCategoryChange("Education")}
            className={selectedCategory === "Education" ? "active" : ""}
          >
            Education
          </li>
          <li
            onClick={() => handleCategoryChange("Finance")}
            className={selectedCategory === "Finance" ? "active" : ""}
          >
            Finance
          </li>
          <li
           onClick={() => handleCategoryChange("Design")}
           className={selectedCategory === "Design" ? "active" : ""}
         >
           Design
         </li>
        </ul>
      </div>

      <div className="main-content">
        {/* Header with Search Bar */}
        <div className="header">
          <h1>Blog List</h1>
          <input
            type="text"
            placeholder="Search blogs by title..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1); // Reset to the first page on search
            }}
            className="search-bar"
          />
        </div>

        {/* Render BlogCard components */}
        <div className="blogs-container">
          {paginatedBlogs.length > 0 ? (
            <BlogCard blogs={paginatedBlogs} />
          ) : (
            <p>No blogs found.</p>
          )}
        </div>

        {/* Pagination */}
        {filteredBlogs.length > itemsPerPage && (
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
        )}
      </div>
    </div>
  );
};

export default BlogListPage;
