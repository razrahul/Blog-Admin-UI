import React from "react";
import "./BlogCard.scss";
import { useNavigate } from "react-router-dom";
import { formatDateOnly } from "../../Utils/formatDate ";

const BlogCard = ({ blogs }) => {
  const navigate = useNavigate();

  const handleViewButton = (blogId) => {
    navigate(`/blog-details/${blogId}`);
  };

  const handleAddSubtitle = (blogId) => {
    navigate(`/add-subtitle/${blogId}`);
  };

  return (
    <>
      {blogs.map((blog) => (
        <div key={blog._id} className="blog-card">
          {/* Blog Image */}
          <div className="image-container">
            <img src={blog.poster.url} alt={blog.title} />
          </div>

          {/* Blog Details */}
          <div className="blog-details">
            <h3 className="blog-title">{blog.title}</h3>
            <p className="blog-date">{formatDateOnly(blog.createdAt)}</p>

            {/* Action Buttons */}
            <div className="actions">
              <button
                className="view"
                onClick={() => handleViewButton(blog._id)}
              >
                View
              </button>
              {/* <button className="edit">Edit</button> */}
              <button className="visibility">{blog.isview}</button>
              <button className="delete">Delete</button>
              <button
                className="subtitle"
                onClick={() => handleAddSubtitle(blog._id)}
              >
                Add Subtitle
              </button>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default BlogCard;
