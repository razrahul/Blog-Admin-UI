import React from "react";
import "./Comments.scss";

const Comments = () => {
  return (
    <div>
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
    </div>
  );
};

export default Comments;
