import React, { useState } from "react";
import { useParams } from "react-router-dom";
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
  const [faqNo, setFaqNo] = useState("");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

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

    // Reset form fields
    setTitleNo("");
    setSubtitle("");
    setDescription("");
    setImage(null);
    setImagePrev("");

    alert(`Subtitle added for Blog ID: ${blogId}`);
  };

  // Handle FAQ form submission
  const handleSubmitFAQ = (e) => {
    e.preventDefault();
    const faqData = {
      indexNo: faqNo,
      question,
      answer,
    };
    
    // console.log(faqNo, question, answer);
    console.log(faqData)
    dispatch(addFAQ(blogId, faqData));
    alert(`FAQ added at IndexNO: ${faqNo}`);

    // Reset FAQ form fields
    setFaqNo("");
    setQuestion("");
    setAnswer("");
  };

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
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter Description"
              required
            ></textarea>
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

      {/* FAQ Section */}
      <div className="add-faq">
        <h2>Add FAQ</h2>
        <form onSubmit={handleSubmitFAQ}>
          {/* Question No */}
          <div className="form-group">
            <label>Question No</label>
            <input
              type="number"
              value={faqNo}
              onChange={(e) => setFaqNo(e.target.value)}
              placeholder="Enter Question No"
              required
            />
            <small className="mandatory">*Question No must be unique.</small>
          </div>

          {/* Question */}
          <div className="form-group">
            <label>Question</label>
            <input
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Ask a Question"
              required
            />
          </div>

          {/* Answer */}
          <div className="form-group">
            <label>Answer</label>
            <textarea
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder="Enter Answer"
              required
            ></textarea>
          </div>

          <button type="submit" className="submit-button">
            Add Q&A
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddSubtitlePage;
