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

  //upadte
  const [categoryId, setCategoryId] = useState(
    existingBlog ? existingBlog.category?.map((c) => c._id) || [] : []
  );

  const [companyId, setCompanyId] = useState(
    existingBlog ? existingBlog.company?._id || "" : ""
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
    const selected = Array.from(e.target.selectedOptions, (opt) => opt.value);
    setCategoryId(selected);
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

     // 🔴 CATEGORY REQUIRED VALIDATION (HERE)
    if (categoryId.length === 0) {
      alert("Please select at least one category");
      return;
    }

    // Prepare FormData to send as API request
    const myBlog = new FormData();
    myBlog.append("title", title);
    myBlog.append("description", description);
    myBlog.append("companyId", companyId);
    // ✅ MULTIPLE CATEGORY
    categoryId.forEach((id) => {
      myBlog.append("categoryId[]", id);
    });

    if (image) myBlog.append("file", image);

    // const blogData = {
    //   title,
    //   description,
    //   categoryId,
    //   companyId,
    //   image,
    // };

    if (isEditable) {
      // Update the blog
      // console.log(existingBlog._id, myBlog);
      await dispatch(updateBlog(existingBlog._id, myBlog));
    } else {
      await dispatch(createBlog(myBlog)); // Create a new blog
    }

    // Reset form fields after successful submission
    setTitle("");
    setDescription("");
    setCategoryId([]);
    setCompanyId("");
    setImage("");
    setImagePrev("");

    alert(isEditable ? "Blog updated successfully!" : "Blog created successfully!");

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
            required={isEditable}
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
            required={!isEditable}
          />
        </div>

        {/* Category */}
        <div className="form-group">
          <label>Category</label>

          {/* Selected categories */}
          <div className="chip-container">
            {categoryId.map((id) => {
              const cat = categories.find((c) => c._id === id);
              if (!cat) return null;

              return (
                <span className="chip" key={id}>
                  {cat.name}
                  <button
                    type="button"
                    className="chip-remove"
                    onClick={() =>
                      setCategoryId((prev) => prev.filter((c) => c !== id))
                    }
                  >
                    ×
                  </button>
                </span>
              );
            })}
          </div>

          {/* Dropdown to add */}
          <select
            onChange={(e) => {
              const value = e.target.value;
              if (value && !categoryId.includes(value)) {
                setCategoryId([...categoryId, value]);
              }
              e.target.value = "";
            }}
          >
            <option value="">+ Add category</option>
            {categories
              .filter((cat) => !categoryId.includes(cat._id))
              .map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.name}
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
            required={!isEditable}
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
            required={!isEditable}
          />
          {imagePrev && (
            <div className="image-preview">
              <img src={imagePrev} alt="Preview" width="150" />
            </div>
          )}
          <small className="mandatory">
            {isEditable
              ? "*Upload image only if you want to change it"
              : "*Uploading an image is mandatory"}
          </small>
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
