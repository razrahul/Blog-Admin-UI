import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./DeltedBlog.scss";
import BlogSubTitle from "../../components/BlogSubTitle/BlogSubTitle";
import {formatDateOnly, formatDate } from "../../Utils/formatDate "
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../../redux/action/admin";

const TransBlog = () => {
  const location = useLocation();
  

  const {users } = useSelector((state) => state.admin)

  const dispatch = useDispatch();

  useEffect(() => {
    if(users && users.length === 0) {
      dispatch(getAllUsers());
      // console.log("feathing UseEffect ...")
    }
  }, [dispatch]);


  const superAdmin = users.filter((user) => user.role.name === "SuperAdmin");

  // console.log(superAdmin)

  const userName = (userId) => {
    const user = superAdmin.find((user) => user._id === userId);
    return user ? user.name : "Unknown";
  };


  const blog = location.state;
  // console.log(blogs)

  const handleEdit = (subtitleId) => {
    console.log("Edit item with ID:", subtitleId);
    alert("You Can't Edit Here...");
  };

  // delete Subtitle
  const handleDelete = (subtitleId) => {
    console.log("Delete item with ID:", subtitleId);
    alert("You Can't Delete Here...");
  };

  return (
    <div className="blog-container">
      {/* Title Section */}
      <div className="title-section">
        <h1 className="title">{blog.title}</h1>
        <div className="title-info">
          <p className="description">{blog.subdescription}</p>
        </div>
      </div>

      {/* Blog Content image */}
      <div className="content-img">
        <img
          src={blog.poster?.url || "/placeholder.jpg"} // Fallback image
          alt={blog.title}
          className="image"
        />
      </div>

      {/* Note Section */}
      <div className="note">
        <p className="note-text">
          <span>Note:</span> This blog deleted is Extra Information Here...
        </p>
        <h2>Category: {blog.category.name || "N/A"}</h2>
        <h2>Company: {blog.company.companyName || "N/A"}</h2>
        <h2>CreateBy: {blog?.createdBy?.name || "N/A"}</h2>
        <h2>Created Date: {formatDate(blog.createdAt)}</h2>
        //Error Aa rha h Backend se data bhajne ke Badd v deketedBy And UpdatedBy me Name nahi aa rha user se filter krna prega
        <h2>UpdatedBy: {userName(blog?.updatedBy) || "N/A"}</h2>
        <h2>DeletddBy: {userName(blog?.deletedBy) || "N/A"}</h2>  
        <h2>Deleted Date: {formatDate(blog.updatedAt)}</h2>
        <h3>View: {blog.views || "N/A"}</h3>
      </div>

      {/* contant Section */}
      <div className="content-text">
        <h2 className="section-title">{blog.title}</h2>
        <div
          className="paragraph"
          dangerouslySetInnerHTML={{ __html: blog.description }}
        ></div>
      </div>

      {/* BlogSubtitleDetails */}
      <div>
        <BlogSubTitle
          subtitle={blog.Subtitle}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
};

export default TransBlog;
