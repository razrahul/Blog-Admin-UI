import React, { useEffect } from "react";
import "./BlogSubTitle.scss";
import { Link, useLocation } from "react-router-dom"; // Import Link
import { FaEdit, FaTrash } from "react-icons/fa";
import Button from "../conformationButtom/Button";

const BlogSubTitle = ({ subtitle, FAQ, onEdit, onDelete }) => {
  // Sort subtitles by indexNo
  const sortedSubtitles = [...subtitle].sort((a, b) => a.indexNo - b.indexNo);
  const sortedFAQs = [...FAQ].sort((a, b) => a.indexNo - b.indexNo);

  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const element = document.getElementById(location.hash.slice(1));
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location]);

  return (
    <>
      {/* Table of Contents */}
      <div className="table-of-contents">
        <h3 className="toc-title">Table of Contents</h3>
        <ul className="toc-list">
          {sortedSubtitles.map((item) => (
            <li key={item._id}>
              {/* Link to the section */}
              <Link to={`#subtitle-${item._id}`} className="toc-link">
                {item.title}
              </Link>
            </li>
          ))}
          {sortedFAQs.length > 0 && (
            <li>
              <Link to="#faq-section" className="toc-link">
                Frequently Asked Questions
              </Link>
            </li>
          )}
        </ul>
      </div>

      {/* Detailed Content Section */}
      {sortedSubtitles.map((item) => (
        <div
          key={item._id}
          id={`subtitle-${item._id}`}
          className="subtitle-content"
        >
          <div className="subtitle-header">
            <h3 className="subtitle-title">{item.title}</h3>
            <div className="subtitle-actions">
              {/* Edit Icon */}
              {/* <button
                className="edit-btn"
                onClick={() => onEdit(item._id)}
                title="Edit"
              >
                <FaEdit />
              </button> */}
              <Button
                onConfirm={() => onEdit(item._id)}
                title="Edit Subtitle"
                description={`Are you sure you want to Edit the subtitle titled "${item.title}"?`}
                buttonClass="edit-btn"
              >
                <FaEdit  />
              </Button>
              {/* Delete Icon */}
              {/* <button
                className="delete-btn"
                onClick={() => onDelete(item._id)}
                title="Delete"
              >
                <FaTrash />
              </button> */}
              {/* Delete Button with Confirmation */}
              <Button
                onConfirm={() => onDelete(item._id)}
                title="Delete Subtitle"
                description={`Are you sure you want to delete the subtitle titled "${item.title}"?`}
                buttonClass="delete-Btn"
              >
                <FaTrash  />
              </Button>
            </div>
          </div>
          {/* Render HTML content */}
          <div
            className="subtitle-dec"
            dangerouslySetInnerHTML={{ __html: item.description }}
          ></div>
          {item.poster && item.poster.public_id ? (
            <div className="subtitle-image">
              <img src={item.poster.url} alt={item.title} />
            </div>
          ) : null}
        </div>
      ))}

      {/* FAQ Section */}
      {sortedFAQs.length > 0 && (
        <div id="faq-section" className="faq-section">
          <h3>Frequently Asked Questions</h3>
          <ul>
            {sortedFAQs.map((faq) => (
              <li key={faq._id}>
                <strong>
                  Q{faq.indexNo}: {faq.question}
                </strong>
                <p>A: {faq.answer}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default BlogSubTitle;
