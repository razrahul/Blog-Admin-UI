import React from "react";
import "./BlogCard.scss";
import { useNavigate } from "react-router-dom";
import { formatDateOnly } from "../../Utils/formatDate ";
import Button from "../conformationButtom/Button";
import { useDispatch } from "react-redux";
import { deleteBlog } from "../../redux/action/blogs";
import { BsFillPeopleFill, BsPersonFillLock } from "react-icons/bs";

const BlogCard = ({ blog }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // All blogs send to blogpage
  const handleViewButton = (blogId) => {
    navigate(`/blog-list/${blogId}`, { state: blog });
  };

  // console.log(blogs)

  const handleAddSubtitle = (blogId) => {
    navigate(`/add-subtitle/${blogId}`, { state: blog });
  };

  //handle edit button 
  const handleEdit = (blog) => {
    navigate(`/add-blog`, { state: blog });
  };


  // Handle delete confirmation and dispatch the action
  const handleDelete = (blogId) => {
    // dispatch(deleteBlog(blogId)); // Dispatch the delete action
    console.log(blogId);
    dispatch(deleteBlog(blogId));
  };

  const handleEditblog = (blog) => {
    // console.log(blog)
    navigate("/add-blog", { state: {blog, isEditable: !!blog} });
  };

  return (
    <>
      {/* {blogs.map((blog) => ( */}
      <div className="blog-card">
        {/* Blog Image - Click to View Blog Detail */}
        <div
          className="image-container"
          onClick={() => handleViewButton(blog._id)}
        >
          <img
            src={blog.poster?.url || "https://via.placeholder.com/150"}
            alt={blog.title || "Default Image"}
          />
          <div className="hover-overlay">
            <span className="view-icon">👁️</span>{" "}
            {/* Eye icon or any other symbol */}
          </div>
        </div>

        {/* Blog Details */}
        <div className="blog-details">
          <h3 className="blog-title">{blog.title}</h3>
          <div className="blog-cat">
            <p className="blog-view">
              {blog.isview ? (
                <>
                  {" "}
                  <BsFillPeopleFill /> Public{" "}
                </>
              ) : (
                <>
                  {" "}
                  <BsPersonFillLock /> Private{" "}
                </>
              )}
            </p>

            <p className="blog-date">{formatDateOnly(blog.createdAt)}</p>
          </div>

          {/* Action Buttons */}
          <div className="actions">
            <button className="view" onClick={() => handleViewButton(blog._id)}>
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
            <button className="edit" onClick={() => handleEdit(blog)}>
              Edit
            </button>

            {/* <button className="visibility">
                {blog.isview ? "Public" : "Private"}
              </button> */}
            <button
              className="subtitle"
              onClick={() => handleAddSubtitle(blog._id)}
            >
              Add Subtitle
            </button>
          </div>
        </div>
      </div>
      {/* ))} */}
    </>
  );
};

export default BlogCard;
