import React, { useState, useEffect } from "react";
import "./BlogCard.scss";
import { useNavigate } from "react-router-dom";
import { formatDateOnly } from "../../Utils/formatDate ";
import Button from "../conformationButtom/Button";
import { useDispatch, useSelector } from "react-redux";
import { deleteBlog, changeVisibility } from "../../redux/action/blogs";
import {
  BsFillTrashFill,
  BsFillPencilFill,
  BsPlusCircle,
} from "react-icons/bs"; // Removed unused icons

const BlogCard = ({ blog, user }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Removed loading and error from useSelector since toggle is gone
  // const { loading = false, error = null } = useSelector((state) => state.blog || {});

  // Handle navigation and actions
  const handleViewButton = (blogId) => {
    navigate(`/blog-list/${blogId}`, { state: blog });
  };

  const handleAddSubtitle = (blogId) => {
    navigate(`/add-subtitle/${blogId}`, { state: blog });
  };

  const handleEdit = (blog) => {
    navigate(`/add-blog`, { state: blog });
  };

  const handleDelete = (blogId) => {
    dispatch(deleteBlog(blogId));
  };
  
  const handleispublic = (blogId) => {
    dispatch(changeVisibility(blogId));
    // dispatch(updateBlog(blogId, { ispublic: !blog.ispublic }));
    console.log(blogId)
  };
  // console.log(user.role.name); // Should log: "superAdmin"
  // console.log(blog);

  return (
    <div className="blog-card">
      <div
        className="image-container"
        onClick={() => handleViewButton(blog._id)}
      >
        <img
          src={blog.poster?.url || "https://via.placeholder.com/150"}
          alt={blog.title || "Default Image"}
        />
        <div className="hover-overlay">
          <span className="view-icon">👁️</span>
        </div>
      </div>

      <div className="blog-details">
        <h3 className="blog-title">{blog.title}</h3>
        <div className="blog-cat">
          {user.role.name === "SuperAdmin" && blog.numOfSubtitles >= 5 ? (
            <Button
              onConfirm={() => handleispublic(blog._id)}
              title="Change Visibility"
              description={`Are you sure you want to change the blog visibility to "${
                blog.ispublic ? "Private" : "Public"
              }"?`}
              className="blog-toggle-btn"
            >
              {blog.ispublic ? "Make Private" : "Make Public"}
            </Button>
          ) : (
            <p className="blog-view">{blog.ispublic ? "Public" : "Private"}</p>
          )}
          <p className="blog-date">{formatDateOnly(blog.createdAt)}</p>
        </div>

        <div className="actions">
          <Button
            onConfirm={() => handleDelete(blog._id)}
            title="Delete Blog"
            description={`Are you sure you want to delete the blog titled "${blog.title}"?`}
            buttonClass="delete"
          >
            <BsFillTrashFill />
          </Button>
          <button className="edit" onClick={() => handleEdit(blog)}>
            <BsFillPencilFill />
          </button>
          <button
            className="subtitle"
            onClick={() => handleAddSubtitle(blog._id)}
          >
            <BsPlusCircle />
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
