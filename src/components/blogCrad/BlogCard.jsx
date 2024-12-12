import React from "react";
import "./BlogCard.scss";
import { useNavigate } from "react-router-dom";
import {formatDateOnly} from "../../Utils/formatDate "
import Button from "../conformationButtom/Button";
import { useDispatch } from "react-redux";
import { deleteBlog } from "../../redux/action/blogs";

const BlogCard = ({ blogs }) => {
  const navigate = useNavigate();

  const handleViewButton = (blogId) => {
    navigate(`/blog-details/${blogId}`);
  };

  const handleAddSubtitle = (blogId) => {
    navigate(`/add-subtitle/${blogId}`);
  };

  const dispatch = useDispatch();
   // Handle delete confirmation and dispatch the action
   const handleDelete = (blogId) => {
    // dispatch(deleteBlog(blogId)); // Dispatch the delete action
    console.log(blogId)
    dispatch(deleteBlog(blogId));
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
             {/* Delete Button with Confirmation */}
             <Button
                onConfirm={() => handleDelete(blog._id)} 
                title="Delete Blog"
                description={`Are you sure you want to delete the blog titled "${blog.title}"?`}
                buttonClass="delete"
              >
                Delete
              </Button>
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
