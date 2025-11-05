import React, { useEffect, useState } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Quill from "quill";
import "./AddSubtitlePage.scss";
import { useDispatch, useSelector } from "react-redux";
import { addSubtitle } from "../../redux/action/blogs";
import { createSubtitle, updateSubtitle } from "../../redux/action/subtitleAction"
import { getAllBlogs } from "../../redux/action/blogs";

const AddSubtitlePage = () => {
  const { blogId } = useParams();
  const [subtitle, setSubtitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [imagePrev, setImagePrev] = useState("");

  // Filter to find the specific blog
  // const {
  //   loading: blogLoading,
  //   error: blogError,
  //   blogs,
  // } = useSelector((state) => state.blog);

  // const blog = blogs.find((blog) => blog._id === blogId);
  const location = useLocation();

  const navigate = useNavigate();

  const blog = location.state;   // use Navigate For Blog

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
    mySubtitle.append("title", subtitle);
    mySubtitle.append("description", description);
    mySubtitle.append("file", image);

    // dispatch(addSubtitle(blogId, mySubtitle));
    dispatch(createSubtitle(blogId, mySubtitle));

    console.log( subtitle, description, image);

    // Reset form fields
    setSubtitle("");
    setDescription("");
    setImage(null);
    setImagePrev("");

    alert(`Subtitle added for Blog ID: ${blogId}`);
  };

  //for Edit Subtitle

  const {Subtitle = {} , newBlogId ={} , isEditable = false} = location.state || {};
  // console.log(Subtitle, newBlogId, isEditable)

  const handleUpdate = async(e) => {
    e.preventDefault();
    const mySubtitle = new FormData();
    mySubtitle.append("title", subtitle);
    mySubtitle.append("description", description);
    if(image) mySubtitle.append("file", image);

    await dispatch(updateSubtitle(newBlogId, Subtitle._id, mySubtitle));
    // console.log(newBlogId, Subtitle._id)

    // console.log(subtitle, description, image);


      // 2️⃣ Refetch all blogs (to refresh Redux state)
    // await dispatch(getAllBlogs());


    // Reset form fields
    setSubtitle("");
    setDescription("");
    setImage(null);
    setImagePrev("");

    alert(`Subtitle Updated for Blog ID: ${newBlogId}`);
    // setTimeout(() => {
    //   navigate(`/blog-list`);
    // }, 3000);
  };

  useEffect(() => {
    if (isEditable) {
      setSubtitle(Subtitle.title);
      setDescription(Subtitle.description);
      if(Subtitle?.poster){
        setImagePrev(Subtitle.poster.url);
      }
    }
   
  }, [isEditable]);


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
        <h1>{isEditable? "Edit Subtitle" : "Add Subtitle"}</h1>
        {/* <h2>Blog ID: {blogId}</h2> */}
        {blog && <h2>Blog: {blog.title}</h2>}

        <form onSubmit={isEditable? handleUpdate: handleSubmit}>

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
              className="react-quill"
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
            {isEditable? "Update Subtitle" : "Add Subtitle"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddSubtitlePage;
