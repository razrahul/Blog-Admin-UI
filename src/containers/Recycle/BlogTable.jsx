import React, { useEffect } from "react";
import DataTable from "react-data-table-component";
import { useDispatch, useSelector } from "react-redux";
import { getAllDeltedBlogs, restoreBlog } from "../../redux/action/blogs.js";
import Button from "../../components/conformationButtom/Button.jsx"
import "./recycle.scss";
import { GrView } from "react-icons/gr";
import { FaTrashRestoreAlt } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const BlogTable = () => {
  const { deletedBlogs } = useSelector((state) => state.blog);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getAllDeltedBlogs());
    // console.log("Fetching deleted Blogs....");
  }, [dispatch]);

  // console.log(deletedBlogs);

  // Restore user function
  const handleRestore = (blog) => {
    dispatch(restoreBlog(blog._id));
    // console.log("Restore Blog Id",blog._id)
  };

  // Permanently delete user function
  const handleDelete = (blog) => {
    console.log("Deleting Blog ID:", blog._id);
  };

  //view trans Blog
  const handleViewBlog = (blog) => {
    navigate("/recycle-bin/transBlog", { state: blog});
  };

  const columns = [
    { name: "Title", selector: (row) => row.title, sortable: true },
    { name: "Description", selector: (row) => row.description, sortable: true },
    // {
    //   name: "Contant",
    //   selector: (row) => row.numOfSubtitles,
    //   sortable: true,
    // },
    // { name: "Views", selector: (row) => row.views, sortable: true },
    { name: "Category", selector: (row) => row.category?.name, sortable: true },
    // {
    //   name: "Company",
    //   selector: (row) => row.company?.companyName,
    //   sortable: true,
    // },
    // {
    //   name: "CreateBy",
    //   selector: (row) => row.createdBy?.name,
    //   sortable: true,
    // },
    { name: "DeletedBy", selector: (row) => row?.deletedBy, sortable: true },
    {
      name: "Blog",
      cell: (row) => (
        <div>
          <button onClick={() => handleViewBlog(row)}><GrView /></button>
        </div>
      ),
    },
    {
      name: "Actions",
      cell: (row) => (
        <div>
          <Button
            onConfirm={() => handleRestore(row)}
            title="Restore User"
            description={`Are You Sure You want to Restore "${row.title}"`}
            buttonClass="restore-button"
          >
            <FaTrashRestoreAlt />
          </Button>
          <Button
            onConfirm={() => handleDelete(row)}
            title="Permanently Delete User"
            description={`Are You Sure You want to Permanently Delete "${row.title}"`}
            buttonClass="delete-button"
          >
            <MdDelete />
          </Button>
          {/* <button onClick={() => handleRestore(row)}>Restore</button> */}
          {/* <button onClick={() => handleDelete(row)}>Delete</button> */}
        </div>
      ),
    },
    
  ];

  return (
    <DataTable
      title="Blog Items"
      columns={columns}
      data={deletedBlogs || []} // Ensure no crash if deletedBlogs is undefined
      pagination
    />
  );
};

export default BlogTable;
