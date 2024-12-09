import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./BlogListPage.scss";

const BlogListPage = () => {
  const navigate = useNavigate();

  const [blogs] = useState(
    new Array(12).fill(null).map((_, index) => ({
      id: index + 1,
      title: `Blog Title ${index + 1}`,
      date: `2024-12-0${(index % 9) + 1}`,
      image: "https://via.placeholder.com/150",
      isPrivate: Math.random() > 0.5,
    }))
  );

  const itemsPerPage = 8;
  const [currentPage, setCurrentPage] = useState(1);

  const handlePagination = (page) => {
    setCurrentPage(page);
  };

  const handleAddSubtitle = (blogId) => {
    navigate(`/add-subtitle/${blogId}`);
  };

  const paginatedBlogs = blogs.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(blogs.length / itemsPerPage);

  return (
    <div className="blog-list-page">
      <div className="sidebar">
        <h1>Categories</h1>
        <ul>
          <li>All Blogs</li>
          <li>Marketing</li>
          <li>IT</li>
          <li>Finance</li>
          <li>Design</li>
        </ul>
      </div>

      <div className="main-content">
        <div className="header">
          <h1>Blog List</h1>
          <input
            type="text"
            placeholder="Search blogs..."
            className="search-bar"
          />
        </div>

        <div className="blogs-container">
          {paginatedBlogs.map((blog) => (
            <div key={blog.id} className="blog-card">
              <img src={blog.image} alt={blog.title} />
              <div className="blog-details">
                <h3>{blog.title}</h3>
                <p>{blog.date}</p>
                <div className="actions">
                  <button className="view">View</button>
                  <button className="edit">Edit</button>
                  <button className="visibility">
                    {blog.isPrivate ? "Private" : "Public"}
                  </button>
                  <button className="delete">Delete</button>
                  <button
                    className="subtitle"
                    onClick={() => handleAddSubtitle(blog.id)}
                  >
                    Add Subtitle
                  </button>
                </div>
              </div>
            </div>
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
