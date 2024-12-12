import React, { useState } from "react";
import "./BlogDetails.scss";
import ContactForm from "../../components/Contact_Form/ContactForm";
import Comments from "../../components/Comments/Comments";
import BlogSubTitle from "../../components/BlogSubTitle/BlogSubTitle";

const BlogsDetails = () => {
  const [isShareOpen, setIsShareOpen] = useState(false);

  const toggleSharePopup = () => {
    setIsShareOpen(!isShareOpen);
  };

  return (
    <div className="blog-container">
      {/* Breadcrumb Navigation */}
      <nav className="breadcrumb-nav">
        <ul>
          <li>
            <a href="/about" className="breadcrumb-link">
              Home
            </a>
          </li>
          <li>/</li>
          <li>
            <a href="/blog" className="breadcrumb-link">
              Blogs
            </a>
          </li>
          <li>/</li>
          <li className="breadcrumb-title">What is Software Development?</li>
        </ul>
      </nav>

      {/* Title Section */}
      <div className="title-section">
        <h1 className="title">What is Software Development?</h1>
        <div className="title-info">
          <p className="description">
            A deep dive into the world of software development and how it works.
          </p>
        </div>
      </div>

      {/* Blog Content Section */}
      <div className="content-section">
        <div className="left-section">
          <img
            src="/img/blog/img1.jpeg"
            alt="Software Development"
            className="image"
          />
        </div>
      </div>

      {/* BlogSubtitleDetails */}
      <div>
        <BlogSubTitle />
      </div>

      {/* Comments Section */}
      <div>
        <Comments />
      </div>

      {/* Contact Form */}
      <div>
        <ContactForm />
      </div>
    </div>
  );
};

export default BlogsDetails;
