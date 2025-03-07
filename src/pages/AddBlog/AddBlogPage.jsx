import React, { useEffect, useState } from "react";
import "./AddBlogPage.scss";
import ReactQuill from "react-quill";
import { useDispatch, useSelector } from "react-redux";
import { createBlog, updateBlog } from "../../redux/action/blogs";
import "react-quill/dist/quill.snow.css";
import { getAllCategories } from "../../redux/action/categoryAction.js"
import { getAllCompanies } from "../../redux/action/companyAction.js"
import { useLocation } from "react-router-dom";

const AddBlogPage = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [companyId, setCompanyId] = useState("");

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
    myBlog.append("categoryId", categoryId);
    myBlog.append("companyId", companyId);
    myBlog.append("file", image);

    // Dispatch the action to create a blog
    dispatch(createBlog(myBlog));
    console.log(title, description, categoryId,companyId, image);

    // Reset form fields
    setTitle("");
    setDescription("");
    setCategoryId("");
    setCompanyId("");
    setImage("");
    setImagePrev("");

    alert("Blog created successfully!");
  };

  //for edit 
  const location = useLocation();
  
  const { blog = {}, isEditable = false } = location.state || {}; // Provide default values

  // console.log(blog, isEditable)

  //TODO:  update blog then isEditable : false and create Blog

  const handleFormEdit = (e) => {
    e.preventDefault();

    // console.log("edit ho rha")
    

    // Prepare FormData
    const myBlog = new FormData();
    myBlog.append("title", title);
    myBlog.append("description", description);
    myBlog.append("categoryId", categoryId);
    myBlog.append("companyId", companyId);
    myBlog.append("file", image);

    // Dispatch the action to create a blog
    dispatch(updateBlog( blog._id, myBlog));
    // console.log(myBlog, blog._id)
    console.log(title, description, categoryId, companyId, image);

    // isEditable = false

    // Reset form fields
    setTitle("");
    setDescription("");
    setCategoryId("");
    setCompanyId("");
    setImage("");
    setImagePrev("");

    alert("Blog Edited successfully!");
  };



  useEffect(() =>{
    //for Edit
    if(isEditable){
      setTitle(blog.title)
      setDescription(blog.description)
      setCategoryId(blog.category._id)
      setCompanyId(blog.company._id)
      if(blog?.poster){
        setImagePrev(blog?.poster?.url)
      }
    }
      //category & Company
    if(categories && categories.length === 0){
      dispatch(getAllCategories());
      // console.log("frathing category....")
    }
    if(companies && companies.length === 0){
      dispatch(getAllCompanies());
      // console.log("frathing company....")
    }
  },[dispatch, isEditable])

  const { categories } = useSelector((state) => state.category)

  const {companies }= useSelector((state) => state.company)

  // console.log(categories)

  // const categories = [
  //   "technology",
  //   "lifestyle",
  //   "education",
  //   "marketing",
  //   "biotechnology",
  // ];

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
      ["clean"], // Remove formatting
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
      <h1>Create Blog Page</h1>
      <form onSubmit={isEditable ? handleFormEdit : handleFormSubmit} className="blog-form">
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
          <label htmlFor="description">Description*(At least 20 characters)</label>
          <ReactQuill
            className="react-quill"
            value={description} // State for ReactQuill content
            onChange={setDescription} // Update state directly
            modules={modules}
            formats={formats}
            placeholder="Enter blog description"
          />
        </div>

        {/* Category */}
        <div className="form-group">
          <label htmlFor="category">Category</label>
          <select
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            id="category"
            required
          >
            <option value="">Select a Company</option>
            {categories.map((cat, index) => (
              <option key={cat._id} value={cat._id}>
                {cat.name.charAt(0).toUpperCase() + cat.name.slice(1)}{" "}
                {/* Capitalize first letter */}
              </option>
            ))}
          </select>
        </div>

        {/* Company */}
        <div className="form-group">
          <label htmlFor="company">Company(Website)</label>
          <select
            value={companyId}
            onChange={(e) => setCompanyId(e.target.value)}
            id="company"
            required
          >
            <option value="">Select For a Website</option>
            {companies.map((com, index) => (
              <option key={com._id} value={com._id}>
                {com.companyName.charAt(0).toUpperCase() + com.companyName.slice(1)}{" "}
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
            required={!isEditable} 
          />
          {imagePrev && (
            <div className="image-preview">
              <img src={imagePrev} alt="Preview" width="150" />
            </div>
          )}
          <small className="mandatory">*Uploading an image is mandatory.</small>
        </div>

        {/* Public/Private Visibility */}

        {/* Submit */}
        <button type="submit" className="create-button">
        {isEditable ? "Update Blog" : "Create Blog"}
        </button>
      </form>
    </div>
  );
};

export default AddBlogPage;
