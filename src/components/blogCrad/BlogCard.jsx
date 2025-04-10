import React ,{useState, useEffect} from "react";
import "./BlogCard.scss";
import { useNavigate } from "react-router-dom";
import { formatDateOnly } from "../../Utils/formatDate ";
import Button from "../conformationButtom/Button";
import { useDispatch, useSelector } from "react-redux";
import { deleteBlog, updateBlog } from "../../redux/action/blogs";
import { BsFillGearFill, BsFillPeopleFill, BsFillTrashFill, BsPersonFillLock, BsFillPencilFill, BsPlusCircle } from "react-icons/bs"; // Import pencil and plus circle icons

const BlogCard = ({ blog }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Use the correct state path: state.blog (not state.blogs)
  const { loading = false, error = null } = useSelector((state) => state.blog || {});

  // Local state for optimistic UI update
  const [localIsView, setLocalIsView] = useState(blog.isview);

  // Sync local state with props when blog changes
  useEffect(() => {
    setLocalIsView(blog.isview);
  }, [blog.isview]);

  // Handle navigation and actions
  const handleViewButton = (blogId) => {
    navigate(`/blog-list/${blogId}`, { state: blog });
  };

  const handleAddSubtitle = (blogId) => {
    navigate(`/add-subtitle/${blogId}`, { state: blog });
  };

  const handleEdit = (blog) => {
    navigate(`/add-blog`, { state: blog });
  };

  const handleDelete = (blogId) => {
    dispatch(deleteBlog(blogId));
  };

  const handleToggleVisibility = () => {
    const newIsView = !localIsView;
    setLocalIsView(newIsView); // Optimistic update
    console.log("Toggling visibility for blog ID:", blog._id, "New isView:", newIsView);

    dispatch(updateBlog(blog._id, { isview: newIsView }))
      .then(() => {
        console.log("Update successful");
      })
      .catch((err) => {
        console.error("Update failed:", err.message);
        setLocalIsView(!newIsView); // Revert on failure
      });
  };

  return (
    <div className="blog-card">
      <div className="image-container" onClick={() => handleViewButton(blog._id)}>
        <img
          src={blog.poster?.url || "https://via.placeholder.com/150"}
          alt={blog.title || "Default Image"}
        />
        <div className="hover-overlay">
          <span className="view-icon">👁️</span>
        </div>
      </div>

      <div className="blog-details">
        <h3 className="blog-title">{blog.title}</h3>
        <div className="blog-cat">
          <p className="blog-view">
            {localIsView ? (
              <>
                <BsFillPeopleFill /> Public
              </>
            ) : (
              <>
                <BsPersonFillLock /> Private
              </>
            )}
          </p>
          <p className="blog-date">{formatDateOnly(blog.createdAt)}</p>
        </div>

        <div className="actions">
          <Button
            onConfirm={() => handleDelete(blog._id)}
            title="Delete Blog"
            description={`Are you sure you want to delete the blog titled "${blog.title}"?`}
            buttonClass="delete"
          >
            <BsFillTrashFill />
          </Button>
          <button className="edit" onClick={() => handleEdit(blog)}>
            <BsFillPencilFill />
          </button>
          <button
            className={`visibility ${localIsView ? "public" : "private"}`}
            onClick={handleToggleVisibility}
            disabled={loading}
          >
            {localIsView ? <BsFillPeopleFill /> : <BsPersonFillLock />}
            {loading && <span className="loading">...</span>}
          </button>
          <button className="subtitle" onClick={() => handleAddSubtitle(blog._id)}>
            <BsPlusCircle />
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
