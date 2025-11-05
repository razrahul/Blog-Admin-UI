// src/containers/Recycle/BlogTable.jsx
import React, { useEffect, useMemo } from "react";
import DataTable from "react-data-table-component";
import { useDispatch, useSelector } from "react-redux";
import { getAllDeltedBlogs, restoreBlog } from "../../redux/action/blogs.js";
import Button from "../../components/conformationButtom/Button.jsx";
import { getAllUsers } from "../../redux/action/admin.js";
import { GrView } from "react-icons/gr";
import { FaTrashRestoreAlt } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import "./Blogtable.scss"; // keep but we'll scope styles with a wrapper

const BlogTable = () => {
  const { deletedBlogs } = useSelector((state) => state.blog);
  const { users = [] } = useSelector((state) => state.admin || {});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getAllDeltedBlogs());
  }, [dispatch]);

  useEffect(() => {
    if (!users || users.length === 0) {
      dispatch(getAllUsers());
    }
  }, [dispatch, users]);

  // id -> name map
  const userNameById = useMemo(() => {
    const map = {};
    (users || []).forEach((u) => {
      if (u && u._id) map[u._id] = u.name || u.fullName || u.email || "User";
    });
    return map;
  }, [users]);

  const resolveUserName = (id) =>
    userNameById[id] || (id ? `${id.slice(0, 6)}…` : "-");

  const handleRestore = (blog) => dispatch(restoreBlog(blog._id));
  const handleDelete = (blog) => console.log("Deleting Blog ID:", blog._id);
  const handleViewBlog = (blog) =>
    navigate("/recycle-bin/transBlog", { state: blog });

  // ...imports stay the same

  const columns = [
    {
      name: "Title",
      selector: (row) => row.title,
      sortable: true,
      width: "280px", // fixed
      wrap: false,
      cell: (row) => <div className="cell-1line">{row.title}</div>,
    },
    {
      name: "Description",
      selector: (row) => row.description,
      sortable: true,
      width: "520px", // fixed (adjust as you like)
      cell: (row) => <div className="cell-2lines">{row.description}</div>,
    },
    {
      name: "Category",
      selector: (row) => row.category?.name,
      sortable: true,
      width: "180px", // fixed
      cell: (row) => (
        <div className="cell-1line">{row.category?.name || "-"}</div>
      ),
    },
    {
      name: "Deleted By",
      selector: (row) => row?.deletedBy,
      sortable: true,
      width: "120px", // fixed
      cell: (row) => (
        <div className="cell-1line">{resolveUserName(row?.deletedBy)}</div>
      ),
    },
    {
      name: "Blog",
      width: "80px", // fixed
      // button: true,
      // allowOverflow: true,
      cell: (row) => (
        <div className="view-cell nowrap">
          <button
            className="icon-btn"
            onClick={() => handleViewBlog(row)}
            title="View"
          >
            <GrView style={{ fontSize: "20px", color: "#1e3a8a" }} />
          </button>
        </div>
      ),
    },
    {
      name: "Actions",
      width: "100px", // fixed (enough for 2 buttons)
      // button: true,
      // allowOverflow: true,
      cell: (row) => (
        <div className="actions-cell nowrap">
          <Button
            onConfirm={() => handleRestore(row)}
            title="Restore Blog"
            description={`Are you sure you want to restore "${row.title}"?`}
            buttonClass="restore-button"
          >
            <FaTrashRestoreAlt  style={{width:"240px", fontSize: "200px", color: "#1e3a8a" }}/>
          </Button>
          <Button
            onConfirm={() => handleDelete(row)}
            title="Permanently Delete Blog"
            description={`Are you sure you want to permanently delete "${row.title}"?`}
            buttonClass="delete-button"
          >
            <MdDelete />
          </Button>
        </div>
      ),
    },
  ];

  const customStyles = {
    tableWrapper: {
      style: {
        overflowX: "auto", // allow horizontal scroll when needed
      },
    },
    headCells: {
      style: {
        whiteSpace: "nowrap",
      },
    },
    cells: {
      style: {
        minWidth: 0,
        overflow: "visible",
      },
    },
    rows: { style: { minHeight: "56px" } },
  };

  return (
    <div className="recycle-table-scope">
      <DataTable
        title="Blog Items"
        columns={columns}
        data={deletedBlogs || []}
        customStyles={customStyles}
        pagination
        responsive
        highlightOnHover
        pointerOnHover={false}
        dense={false}
      />
    </div>
  );
};

export default BlogTable;
