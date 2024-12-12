import React from "react";
import "./ContactForm.scss";

const ContactForm = () => {
  return (
    <div className="contact-form-container">
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
  );
};

export default ContactForm;
