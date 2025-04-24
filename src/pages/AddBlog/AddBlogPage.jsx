import React, { useEffect, useState } from "react";
import "./AddBlogPage.scss";
import ReactQuill from "react-quill";
import { useDispatch, useSelector } from "react-redux";
import { createBlog, updateBlog } from "../../redux/action/blogs";
import "react-quill/dist/quill.snow.css";
import { getAllCategories } from "../../redux/action/categoryAction.js";
import { getAllCompanies } from "../../redux/action/companyAction.js";
import { useLocation, useNavigate } from "react-router-dom";
import { getAllBlogs } from "../../redux/action/blogs";

const AddBlogPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const existingBlog = location.state || null;

  const [title, setTitle] = useState(existingBlog ? existingBlog.title : "");
  const [description, setDescription] = useState(
    existingBlog ? existingBlog.description : ""
  );
  const [categoryId, setCategoryId] = useState(
    existingBlog ? existingBlog.categoryId : ""
  );
  const [companyId, setCompanyId] = useState(
    existingBlog ? existingBlog.companyId : ""
  );
  const [isEditable, setIsEditable] = useState(Boolean(existingBlog));
  const [image, setImage] = useState("");
  const [imagePrev, setImagePrev] = useState(
    existingBlog ? existingBlog.poster?.url : ""
  );

  const dispatch = useDispatch();

  // Fetch categories and companies when the component mounts
  const { categories } = useSelector((state) => state.category);
  const { companies } = useSelector((state) => state.company);

  useEffect(() => {
    if (!categories.length) {
      dispatch(getAllCategories());
    }
    if (!companies.length) {
      dispatch(getAllCompanies());
    }
  }, [dispatch, categories.length, companies.length]);

  // Handle category selection change
  const handleCategoryChange = (e) => {
    setCategoryId(e.target.value);
  };

  // Handle company selection change
  const handleCompanyChange = (e) => {
    setCompanyId(e.target.value);
  };

  // Handle image upload and preview
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImagePrev(reader.result);
      reader.readAsDataURL(file);
    } else {
      setImagePrev("");
    }
  };

  // console.log(isEditable)

  // Handle form submission
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // Prepare FormData to send as API request
    const myBlog = new FormData();
    myBlog.append("title", title);
    myBlog.append("description", description);
    myBlog.append("categoryId", categoryId);
    myBlog.append("companyId", companyId);
    if (image) myBlog.append("file", image);

    // const blogData = {
    //   title,
    //   description,
    //   categoryId,
    //   companyId,
    //   image,
    // };

    

    if (isEditable) {
      await dispatch(updateBlog(myBlog, existingBlog._id)); // Update the blog
    } else {
      await dispatch(createBlog(myBlog)); // Create a new blog
    }

    // Reset form fields after successful submission
    setTitle("");
    setDescription("");
    setCategoryId("");
    setCompanyId("");
    setImage("");
    setImagePrev("");

    alert("Blog created/updated successfully!");

    navigate("/blog-list"); // Navigate back to BlogList after submitting
  };

  // Quill editor configurations
  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image"],
      ["clean"],
    ],
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
  ];

  return (
    <div className="create-blog-page">
      <h1>{isEditable ? "Edit Blog" : "Create Blog"}</h1>
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
          <label htmlFor="description">
            Description*(At least 20 characters)
          </label>
          <ReactQuill
            className="react-quill"
            value={description} // State for ReactQuill content
            onChange={(value) => setDescription(value)} // Update state directly
            modules={modules}
            formats={formats}
            placeholder="Enter blog description"
          />
        </div>

        {/* Category */}
        <div className="form-group">
          <label htmlFor="category">Category</label>
          <select
            value={categoryId || ""}
            onChange={handleCategoryChange}
            id="category"
            required
          >
            <option value="">Select a Category</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.name.charAt(0).toUpperCase() + cat.name.slice(1)}
              </option>
            ))}
          </select>
        </div>

        {/* Company */}
        <div className="form-group">
          <label htmlFor="company">Company(Website)</label>
          <select
            value={companyId || ""}
            onChange={handleCompanyChange}
            id="company"
            required
          >
            <option value="">Select For a Website</option>
            {companies.map((com) => (
              <option key={com._id} value={com._id}>
                {com.companyName.charAt(0).toUpperCase() +
                  com.companyName.slice(1)}
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

        {/* Submit Button */}
        <button type="submit" className="create-button">
          {isEditable ? "Update" : "Create"}
        </button>
      </form>
    </div>
  );
};

export default AddBlogPage;
