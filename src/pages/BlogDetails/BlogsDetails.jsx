import React, { useState } from "react";
import {
  FaShareAlt,
  FaBookmark,
  FaRegUserCircle,
  FaWhatsapp,
  FaFacebook,
  FaTwitter,
} from "react-icons/fa";
import BlogCards from "../../components/BlogDetailCards/BlogDetailCards";
import "./BlogDetails.scss";
import BlogDetailCards from "../../components/BlogDetailCards/BlogDetailCards";

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

          {/* <div className="share-save"> */}
          {/* Share Button */}
          {/* <span className="share-button" onClick={toggleSharePopup}>
              <FaShareAlt className="icon" />
              Share
            </span> */}

          {/* Save Button */}
          {/* <span className="save-button">
              <FaBookmark className="icon" />
              Save
            </span> */}

          {/* Share Popup */}
          {/* {isShareOpen && (
              <div className="share-popup">
                <a
                  href="https://wa.me/?text=Check%20this%20out!"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="share-link whatsapp"
                >
                  <FaWhatsapp className="icon" /> WhatsApp
                </a>
                <a
                  href="https://facebook.com/sharer/sharer.php?u=your-link-here"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="share-link facebook"
                >
                  <FaFacebook className="icon" /> Facebook
                </a>
                <a
                  href="https://twitter.com/intent/tweet?text=Check%20this%20out!&url=your-link-here"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="share-link twitter"
                >
                  <FaTwitter className="icon" /> Twitter
                </a>
              </div>
            )} */}
          {/* </div> */}
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

        {/* <div className="right-section">
          <img
            src="/img/blog/img2.jpeg"
            alt="Development Process 1"
            className="image"
          />
          <img
            src="/img/blog/img3.jpeg"
            alt="Development Process 2"
            className="image"
          />
          <img
            src="/img/blog/img2.jpeg"
            alt="Development Process 3"
            className="image"
          />
          <img
            src="/img/blog/img5.jpeg"
            alt="Development Process 4"
            className="image"
          />
        </div> */}

        <div className="content-text">
          <h2 className="section-title">What is Software Development?</h2>
          <p className="paragraph">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa
            tempora provident sint earum sunt deserunt magni. Ea, culpa sequi
            perferendis quae natus iste esse vero praesentium saepe consectetur,
            beatae unde.
          </p>
          {/* Table of Contents */}
          <div className="table-of-contents">
            <h3 className="toc-title">Table of Contents</h3>
            <ul className="toc-list">
              <li>Introduction to Software Development</li>
              <li>How It Works</li>
              <li>Benefits of Software Development</li>
              <li>Conclusion</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Detailed Content Section */}
      <div className="detailed-content">
        <h3 className="section-title">Introduction to Software Development</h3>
        <p className="paragraph">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Facere ut
          eaque eius fugiat. Iusto necessitatibus nesciunt neque ipsa quidem
          explicabo illo provident eaque, rem perferendis exercitationem
          doloribus, aspernatur earum sapiente?
        </p>
        <img src="/img/blog/img6.png" alt="Introduction" className="image" />
        <h3 className="section-title">How It Works</h3>
        <p className="paragraph">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nam sequi
          earum asperiores commodi tempore deserunt recusandae iste, aut ex
          molestias tenetur ratione fuga dignissimos ducimus nemo possimus!
          Repellendus, ipsum tempora.
        </p>
        <p className="paragraph">
          More details can be added here to elaborate on the workflow and
          processes involved.
        </p>
      </div>

      {/* Conclusion Section */}
      <div className="conclusion">
        <h2 className="section-title">Conclusion</h2>
        <p className="paragraph">
          Software development is a constantly evolving field that blends
          creativity and technical expertise. From understanding the
          requirements to deploying the solution, every phase plays a critical
          role. As technology advances, so do the opportunities in software
          development.
        </p>
      </div>

      {/* Comments Section */}
      <div className="comments-section">
        <h2 className="comments-title">
          Comments <span className="comment-count">99</span>
        </h2>

        <div className="comments-list">
          {/* Comment Box 1 */}
          <div className="comment">
            <img
              src="/img/blog/avatar1.png"
              alt="User One"
              className="comment-avatar"
            />
            <div className="comment-content">
              <div className="comment-header">
                <h3 className="comment-author">Jay Rutherford</h3>
                <span className="comment-time">3d ago</span>
              </div>
              <p className="comment-text">
                Nulla laboris fugiat fugiat minim minim excepteur eiusmod quis.
                Laborum est minim id cillum nostrud cillum consectetur.
              </p>
            </div>
          </div>

          {/* Comment Box 2 */}
          <div className="comment">
            <img
              src="/img/blog/avatar2.png"
              alt="User Two"
              className="comment-avatar"
            />
            <div className="comment-content">
              <div className="comment-header">
                <h3 className="comment-author">Nicole Chung</h3>
                <span className="comment-time">4d ago</span>
              </div>
              <p className="comment-text">Great article! Thanks for sharing.</p>
            </div>
          </div>

          {/* Comment Box 3 */}
          <div className="comment">
            <img
              src="/img/blog/avatar3.png"
              alt="User Three"
              className="comment-avatar"
            />
            <div className="comment-content">
              <div className="comment-header">
                <h3 className="comment-author">Wei Arnold</h3>
                <span className="comment-time">5d ago</span>
              </div>
              <p className="comment-text">
                Ut commodo quis sit in consequat sit nisi dolor adipisicing
                officia tempor do duis consequat dolore dolore ipsum.
              </p>
            </div>
          </div>

          {/* Comment Box 4 */}
          <div className="comment">
            <img
              src="/img/blog/avatar1.png"
              alt="User Four"
              className="comment-avatar"
            />
            <div className="comment-content">
              <div className="comment-header">
                <h3 className="comment-author">Rocky</h3>
                <span className="comment-time">1w ago</span>
              </div>
              <p className="comment-text">Looking forward to more content!</p>
            </div>
          </div>
        </div>
      </div>

      {/* Popular Blog Views */}
      {/* <div className="popular-blogs">
        <h2 className="section-title">Most Popular Blogs</h2>
        <div className="blog-cards">
          <BlogDetailCards />
        </div>
      </div> */}

      {/* Contact Form */}
      <div className="contact-form-container">
        {/* Main container */}
        <div className="contact-form-inner-container">
          {/* Left Section - Form */}
          <div className="form-section">
            <h1 className="contact-form-title">Contact Us</h1>
            <form className="contact-form">
              <div className="input-group">
                <label htmlFor="name" className="input-label">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  placeholder="Enter your name"
                  className="input-field"
                />
              </div>

              <div className="input-group">
                <label htmlFor="email" className="input-label">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="Enter your email"
                  className="input-field"
                />
              </div>

              <div className="input-group">
                <label htmlFor="questions" className="input-label">
                  Questions
                </label>
                <textarea
                  id="questions"
                  placeholder="Write your questions here"
                  className="textarea-field"
                ></textarea>
              </div>

              <button type="submit" className="submit-button">
                Submit
              </button>
            </form>
          </div>

          {/* Right Section - Image */}
          <div className="image-section">
            <img
              src="/img/blog/img7.jpg"
              alt="Contact Us"
              className="contact-image"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogsDetails;
