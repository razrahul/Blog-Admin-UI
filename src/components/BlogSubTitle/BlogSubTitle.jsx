import React from "react";
import "./BlogSubTitle.scss";

const BlogSubTitle = ({ subtitle }) => {
  // console.log(subtitle);
  return (
    <>
      {/* Table of Contents */}
      <div className="table-of-contents">
        <h3 className="toc-title">Table of Contents</h3>
        {subtitle.map((item, index) => (
          <ul key={index} className="toc-list">
            <li>{item.title}</li>
          </ul>
        ))}
      </div>

      {/* Detailed Content Section */}
      {subtitle.map((item, index) => (
        <div key={index} className="subtitle-content">
          <h3 className="subtitle-title">{item.title}</h3>
          <p className="subtitle-dec">{item.description}</p>
          {item.poster && item.poster.public_id ? (
            <div className="subtitle-image">
              <img src={item.poster.url} alt={item.title} />
            </div>
          ) : null}
        </div>
      ))}
    </>
  );
};

export default BlogSubTitle;
