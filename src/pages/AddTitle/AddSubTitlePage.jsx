import React, { useState } from "react";
import { useParams } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Quill from "quill";
import "./AddSubtitlePage.scss";
import { useDispatch, useSelector } from "react-redux";
import { addSubtitle, addFAQ } from "../../redux/action/blogs";

const AddSubtitlePage = () => {
  const { blogId } = useParams();
  const [titleNo, setTitleNo] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [imagePrev, setImagePrev] = useState("");
  

  // Filter to find the specific blog
  const {
    loading: blogLoading,
    error: blogError,
    blogs,
  } = useSelector((state) => state.blog);

  const blog = blogs.find((blog) => blog._id === blogId);

  // Handle image upload
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

  const dispatch = useDispatch();

  // Handle Subtitle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const mySubtitle = new FormData();
    mySubtitle.append("indexNo", titleNo);
    mySubtitle.append("title", subtitle);
    mySubtitle.append("description", description);
    mySubtitle.append("file", image);

    dispatch(addSubtitle(blogId, mySubtitle));

    console.log(titleNo,subtitle,description,image)

    // Reset form fields
    setTitleNo("");
    setSubtitle("");
    setDescription("");
    setImage(null);
    setImagePrev("");

    alert(`Subtitle added for Blog ID: ${blogId}`);
  };

  

  //ReactQuill
  // Overwrite the default link behavior
const Link = Quill.import("formats/link");

class CustomLink extends Link {
  static create(value) {
    const node = super.create(value);
    node.setAttribute("target", "_blank"); // Ensure links open in a new tab
    return node;
  }
}

Quill.register(CustomLink, true);

const modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike"],
    [{ list: "ordered" }, { list: "bullet" }],
    ["link", "image", "video"],
    ["clean"], // Clear formatting
  ],
};

const formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "list",
  "bullet",
  "link",
  "image",
  "video",
];

  
  return (
    <div className="add-main">
      <div className="add-subtitle-page">
        <h1>Add Subtitle</h1>
        <h2>Blog ID: {blogId}</h2>
        {blog && <h2>Title: {blog.title}</h2>}

        <form onSubmit={handleSubmit}>
          {/* Index No */}
          <div className="form-group">
            <label>Index No</label>
            <input
              type="number"
              value={titleNo}
              onChange={(e) => setTitleNo(e.target.value)}
              placeholder="Enter Title No"
              required
            />
            <small className="mandatory">*Index No must be unique.</small>
          </div>

          {/* Subtitle */}
          <div className="form-group">
            <label>Subtitle</label>
            <input
              type="text"
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
              placeholder="Enter Subtitle"
              required
            />
          </div>

          {/* Description */}
          <div className="form-group">
            <label>Description</label>
            <ReactQuill
              theme="snow"
              value={description}
              onChange={setDescription}
              modules={modules}
              formats={formats}
              placeholder="Enter blog description"
              required
            />
          </div>

          {/* Upload Image */}
          <div className="form-group">
            <label htmlFor="image">Upload Image (Optional)</label>
            <input
              type="file"
              id="image"
              accept="image/*"
              onChange={handleImageChange}
            />
            {imagePrev && (
              <div className="image-preview">
                <img src={imagePrev} alt="Preview" width="150" />
              </div>
            )}
          </div>

          <button type="submit" className="submit-button">
            Add Subtitle
          </button>
        </form>
      </div>

      
    </div>
  );
};

export default AddSubtitlePage;
