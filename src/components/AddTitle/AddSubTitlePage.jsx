import React, { useState } from "react";
import { useParams } from "react-router-dom";
import "./AddSubtitlePage.scss";

const AddSubtitlePage = () => {
  const { blogId } = useParams();
  const [subtitle, setSubtitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Subtitle:", subtitle);
    console.log("description:", description);
    console.log("Image", image);
    alert(`Subtitle added for Blog ID: ${blogId}`);
  };

  return (
    <div className="add-subtitle-page">
      <h1>Add Subtitle for Blog ID: {blogId}</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Subtitle</label>
          <input
            type="text"
            value={subtitle}
            onChange={(e) => setSubtitle(e.target.value)}
            placeholder="Enter subtitle"
            required
          />
        </div>
        <div className="form-group">
          <label>Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter description"
            required
          ></textarea>
        </div>
        <div className="form-group">
          <label>Upload Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            required
          />
        </div>
        <button type="submit" className="submit-button">
          Add Subtitle
        </button>
      </form>
    </div>
  );
};

export default AddSubtitlePage;
