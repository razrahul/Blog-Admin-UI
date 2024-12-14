import React, { useState } from "react";
import "./AddBlogPage.scss";
import { useDispatch } from "react-redux";
import { createBlog } from "../../redux/action/blogs";

const AddBlogPage = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [createdBy, setCreatedBy] = useState("");
  const [category, setCategory] = useState("");
  const [isView, setIsView] = useState("");
  const [image, setImage] = useState("");
  const [imagePrev, setImagePrev] = useState("");

  const dispatch = useDispatch();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);

    // Generate a preview for the uploaded image
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImagePrev(reader.result);
      reader.readAsDataURL(file);
    } else {
      setImagePrev("");
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    // Prepare FormData
    const myBlog = new FormData();
    myBlog.append("title", title);
    myBlog.append("description", description);
    myBlog.append("createdBy", createdBy);
    myBlog.append("category", category);
    myBlog.append("file", image);
    myBlog.append("isview", isView);

    // Dispatch the action to create a blog
    dispatch(createBlog(myBlog));

    // Reset form fields
    setTitle("");
    setDescription("");
    setCreatedBy("");
    setCategory("");
    setImage("");
    setImagePrev("");
    setIsView(true);

    console.log(title, description, createdBy, category, image, isView);

    alert("Blog created successfully!");
  };

  const categories = [
    "technology",
    "lifestyle",
    "education",
    "marketing",
    "biotechnology",
  ];

  return (
    <div className="create-blog-page">
      <h1>Create Blog Page</h1>
      <form onSubmit={handleFormSubmit} className="blog-form">
        {/* Title */}
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            id="title"
            placeholder="Enter blog title"
            required
          />
        </div>

        {/* Description */}
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            id="description"
            placeholder="Enter blog description"
            rows="5"
            required
          ></textarea>
        </div>

        {/* Author */}
        <div className="form-group">
          <label htmlFor="createdBy">Author</label>
          <input
            value={createdBy}
            onChange={(e) => setCreatedBy(e.target.value)}
            type="text"
            id="createdBy"
            placeholder="Enter author name"
            required
          />
        </div>

        {/* Category */}
        <div className="form-group">
          <label htmlFor="category">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            id="category"
            required
          >
            <option value="">Select a category</option>
            {categories.map((cat, index) => (
              <option key={index} value={cat}>
                {cat.charAt(0).toUpperCase() + cat.slice(1)}{" "}
                {/* Capitalize first letter */}
              </option>
            ))}
          </select>
        </div>

        {/* Upload Image */}
        <div className="form-group">
          <label htmlFor="image">Upload Image</label>
          <input
            type="file"
            id="image"
            accept="image/*"
            onChange={handleImageChange}
            required
          />
          {imagePrev && (
            <div className="image-preview">
              <img src={imagePrev} alt="Preview" width="150" />
            </div>
          )}
          <small className="mandatory">*Uploading an image is mandatory.</small>
        </div>

        {/* Public/Private Visibility */}
        <div className="form-group">
          <label>Visibility</label>
          <div className="visibility-options">
            <label>
              <input
                type="radio"
                name="visibility"
                value="public"
                checked={isView === "public"}
                onChange={() => setIsView("public")}
              />
              Public
            </label>
            <label>
              <input
                type="radio"
                name="visibility"
                value="private"
                checked={isView === "private"}
                onChange={() => setIsView("private")}
              />
              Private
            </label>
          </div>
        </div>

        {/* Submit */}
        <button type="submit" className="create-button">
          Create Blog
        </button>
      </form>
    </div>
  );
};

export default AddBlogPage;
