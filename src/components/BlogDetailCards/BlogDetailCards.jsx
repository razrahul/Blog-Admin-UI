import React from "react";
import { FaUser } from "react-icons/fa";
// import "./BlogDetailCards.scss";

const BlogDetailCards = () => {
  return (
    <>
      <div className="blog-card">
        <img
          src="/img/blog/Popularblog1.png"
          alt="Blog Post"
          className="image-section"
        />
        <div className="content">
          <p className="author-info">
            <FaUser className="author-icon" />
            Alec Whitten • 1 Jan 2023
          </p>
          <h3 className="title">Bill Walsh leadership lessons</h3>
          <p className="description">
            Like to know the secrets of transforming a 2-14 team into a 3x Super
            Bowl winning Dynasty?
          </p>
          <div className="tags">
            <button className="tag">Leadership</button>
            <button className="tag green">Management</button>
          </div>
        </div>
      </div>
      <div className="blog-card">
        <img
          src="/img/blog/Popularblog2.png"
          alt="Blog Post"
          className="image-section"
        />
        <div className="content">
          <p className="author-info">
            <FaUser className="author-icon" />
            Demi WIlkinson • 12 Feb 2023
          </p>
          <h3 className="title">PM mental models</h3>
          <p className="description">
            Mental models are simple expressions of complex processes or
            relationships.
          </p>
          <div className="tags">
            <button className="tag">Product</button>
            <button className="tag green">Research</button>
            <button className="tag purple">Frameworks</button>
          </div>
        </div>
      </div>
      <div className="blog-card">
        <img
          src="/img/blog/Popularblog6.jpeg"
          alt="Blog Post"
          className="image-section"
        />
        <div className="content">
          <p className="author-info">
            <FaUser className="author-icon" />
            Candice Wu • 20 Mar 2023
          </p>
          <h3 className="title">What is Wireframing?</h3>
          <p className="description">
            Introduction to Wireframing and its Principles. Learn from the best
            in the industry.
          </p>
          <div className="tags">
            <button className="tag">Design</button>
            <button className="tag green">UI/UX</button>
            <button className="tag purple">Research</button>
          </div>
        </div>
      </div>
      <div className="blog-card">
        <img
          src="/img/blog/Popularblog4.jpeg"
          alt="Blog Post"
          className="image-section"
        />
        <div className="content">
          <p className="author-info">
            <FaUser className="author-icon" />
            Liam Smith • 15 Apr 2023
          </p>
          <h3 className="title">How collaboration makes us better designers</h3>
          <p className="description">
            Collaboration can make our teams stronger, and our individual
            designs better.
          </p>
          <div className="tags">
            <button className="tag">Design</button>
            <button className="tag green">Research</button>
            <button className="tag purple">Scalability</button>
          </div>
        </div>
      </div>
      <div className="blog-card">
        <img
          src="/img/blog/Popularblog5.jpeg"
          alt="Blog Post"
          className="image-section"
        />
        <div className="content">
          <p className="author-info">
            <FaUser className="author-icon" />
            Sophia Williams • 10 May 2023
          </p>
          <h3 className="title">Our top 10 Javascript frameworks to use</h3>
          <p className="description">
            JavaScript frameworks make development easy with extensive features
            and functionalities.
          </p>
          <div className="tags">
            <button className="tag">Design</button>
            <button className="tag green">Software development</button>
            <button className="tag purple">SaaS</button>
          </div>
        </div>
      </div>
      <div className="blog-card">
        <img
          src="/img/blog/Popularblog6.jpeg"
          alt="Blog Post"
          className="image-section"
        />
        <div className="content">
          <p className="author-info">
            <FaUser className="author-icon" />
            Olivia Rhye • 1 Jan 2023
          </p>
          <h3 className="title">Podcast: Creating a better CX Community</h3>
          <p className="description">
            Starting a community doesn’t need to be complicated, but how do you
            get started?
          </p>
          <div className="tags">
            <button className="tag">Podcast</button>
            <button className="tag green">Customer Service</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogDetailCards;
