import React, { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BlogCard from "../../components/blogCrad/BlogCard";
import "./BlogListPage.scss";
import { useDispatch, useSelector } from "react-redux";
import {getAllBlogs } from "../../redux/action/blogs";

const BlogListPage = () => {
  const navigate = useNavigate();

  // Dummy blog data
 

// const [blogs] = useState(
//   Array.from({ length: 12 }, (_, index) => ({
//     _id: index + 1,
//     title: `Blog Title ${index + 1}`,
//     createdAt: `2024-12-${String((index % 9) + 1).padStart(2, "0")}`, // Ensures two-digit days
//     image: "https://via.placeholder.com/300x200", // Fixed and clearer placeholder size
//     isview: Math.random() > 0.5, // Random boolean for isPrivate
//   }))
// );


  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(getAllBlogs());
    
  }, [dispatch])

  const { loading : blogloading, error: blogerror , blogs } = useSelector(
    (state) => state.blog
  );
  console.log(blogs)
  

  const itemsPerPage = 9;
  const [currentPage, setCurrentPage] = useState(1);

  // Pagination Logic
  const paginatedBlogs = blogs.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  const totalPages = Math.ceil(blogs.length / itemsPerPage);

  const handlePagination = (page) => setCurrentPage(page);

 

  return (
    <div className="blog-list-page">
      <div className="sidebar">
        <h2>Categories</h2>
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

        {/* Render BlogCard components */}
        <div className="blogs-container">
          {/* {paginatedBlogs.map((blog) => (
            <BlogCard
              key={blog.id}
              blog={blog}
            />
          ))} */}
          <BlogCard blogs={blogs}/>
        </div>

        {/* Pagination */}
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
