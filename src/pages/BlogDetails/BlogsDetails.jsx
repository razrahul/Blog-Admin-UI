import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "./BlogDetails.scss";
import ContactForm from "../../components/Contact_Form/ContactForm";
import Comments from "../../components/Comments/Comments";
import BlogSubTitle from "../../components/BlogSubTitle/BlogSubTitle";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllBlogs } from "../../redux/action/blogs";

const BlogsDetails = () => {
  const { blogId } = useParams();
  const dispatch = useDispatch();

  
  const { loading, error, blogs } = useSelector((state) => state.blog);

  useEffect(() => {
    // Fetch blogs if they aren't already loaded
    if (!(blogs && blogs.length > 0)) {
      dispatch(getAllBlogs());
      console.log("useEffect called")
    }
  }, [dispatch, blogs]);

  
  const blog = blogs && blogs.find((b) => b._id === blogId);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading blog details: {error}</div>;
  }

  if (!blog) {
    return <div>Blog not found or still loading...</div>;
  }

  return (
    <div className="blog-container">
      {/* Breadcrumb Navigation */}
      <nav className="breadcrumb-nav">
        <ul>
          <li>
            <Link to="/about" className="breadcrumb-link">
              Home
            </Link>
          </li>
          <li>/</li>
          <li>
            <Link to="/blog-list" className="breadcrumb-link">
              Blogs
            </Link>
          </li>
          <li>/</li>
          <li className="breadcrumb-title">{blog.title}</li>
        </ul>
      </nav>

      {/* Title Section */}
      <div className="title-section">
        <h1 className="title">{blog.title}</h1>
        <div className="title-info">
          <p className="description">{blog.subdescription}</p>
        </div>
      </div>

      {/* Blog Content image */}
      <div className="content-img">
        <img
          src={blog.poster?.url || "/placeholder.jpg"} // Fallback image
          alt={blog.title}
          className="image"
        />
      </div>

      <div className="content-text">
        <h2 className="section-title">{blog.title}</h2>
        <p className="paragraph">{blog.description}</p>
      </div>

      {/* BlogSubtitleDetails */}
      <div>
        <BlogSubTitle subtitle={blog.Subtitle} FAQ={blog.FAQ} />
      </div>

      {/* Comments Section */}
      {/* <div>
        <Comments />
      </div> */}

      {/* Contact Form */}
      <div>
        <ContactForm />
      </div>
    </div>
  );
};

export default BlogsDetails;
