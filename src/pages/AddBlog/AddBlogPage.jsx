import React, { useState } from "react";
import "./AddBlogPage.scss";

const AddBlogPage = () => {
  const [isPublic, setIsPublic] = useState(true);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    alert("Blog created successfully!");
  };

  return (
    <div className="create-blog-page">
      <h1>Create Blog Page</h1>
      <form onSubmit={handleFormSubmit} className="blog-form">
        {/* Title */}
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
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
            id="description"
            placeholder="Enter blog description"
            rows="5"
            required
          ></textarea>
        </div>

        {/* Author */}
        <div className="form-group">
          <label htmlFor="author">Author</label>
          <input
            type="text"
            id="author"
            placeholder="Enter author name"
            required
          />
        </div>

        {/* Category */}
        <div className="form-group">
          <label htmlFor="category">Category</label>
          <select id="category" required>
            <option value="">Select a category</option>
            <option value="technology">Technology</option>
            <option value="lifestyle">Lifestyle</option>
            <option value="education">Education</option>
            <option value="marketing">Marketing</option>
            <option value="biotechnology">BioTechnology</option>
          </select>
        </div>

        {/* Upload Image */}
        <div className="form-group">
          <label htmlFor="image">Upload Image</label>
          <input type="file" id="image" accept="image/*" required />
          <small className="mandatory">*Uploading an image is mandatory.</small>
        </div>

        {/* Public/Private */}
        <div className="form-group">
          <label>Visibility</label>
          <div className="visibility-options">
            <label>
              <input
                type="radio"
                name="visibility"
                checked={isPublic}
                onChange={() => setIsPublic(true)}
              />
              Public
            </label>
            <label>
              <input
                type="radio"
                name="visibility"
                checked={!isPublic}
                onChange={() => setIsPublic(false)}
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
