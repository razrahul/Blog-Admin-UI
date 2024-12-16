import React from "react";
import "./BlogSubTitle.scss";
import { FaUsers, FaEdit, FaTrash } from "react-icons/fa"; // Import icons

const BlogSubTitle = ({ subtitle, FAQ, onEdit, onDelete }) => {
  // Sort subtitles by indexNo
  const sortedSubtitles = [...subtitle].sort((a, b) => a.indexNo - b.indexNo);
  // console.log(sortedSubtitles)

  // Sort FAQs by indexNo
  const sortedFAQs = [...FAQ].sort((a, b) => a.indexNo - b.indexNo);

  return (
    <>
      {/* Table of Contents */}
      <div className="table-of-contents">
        <h3 className="toc-title">Table of Contents</h3>
        <ul className="toc-list">
          {sortedSubtitles.map((item, index) => (
            <li key={item._id}>{item.title}</li>
          ))}
          {sortedFAQs.length > 0 && <li>Frequently Asked Questions</li>}
        </ul>
      </div>

      {/* Detailed Content Section */}
      {sortedSubtitles.map((item) => (
        <div key={item._id} className="subtitle-content">
          <div className="subtitle-header">
            <h3 className="subtitle-title">{item.title}</h3>
            <div className="subtitle-actions">
              {/* Edit Icon */}
              <button
                className="edit-btn"
                onClick={() => onEdit(item._id)}
                title="Edit"
              >
                <FaEdit />
              </button>
              {/* Delete Icon */}
              <button
                className="delete-btn"
                onClick={() => onDelete(item._id)}
                title="Delete"
              >
                <FaTrash />
              </button>
            </div>
          </div>
          <p className="subtitle-dec">{item.description}</p>
          {item.poster && item.poster.public_id ? (
            <div className="subtitle-image">
              <img src={item.poster.url} alt={item.title} />
            </div>
          ) : null}
        </div>
      ))}

      {/* FAQ Section */}
      {sortedFAQs.length > 0 && (
        <div className="faq-section">
          <h3>Frequently Asked Questions</h3>
          <ul>
            {sortedFAQs.map((faq, index) => (
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
