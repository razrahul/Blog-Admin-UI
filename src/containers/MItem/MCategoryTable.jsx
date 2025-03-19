import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import React, { useState } from "react";
import Table from "./Table";
import { useEffect } from "react";
import { getAllCategories } from "../../redux/action/categoryAction";
import { getAllUsers } from '../../redux/action/admin';

const MCategoryTable = () => {
  const [categories, setCategories] = useState();
  const [newCategory, setNewCategory] = useState({ title: "", description: "" });
  const [editCategory, setEditCategory] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false); // New state for delete confirmation
  const [categoryToDelete, setCategoryToDelete] = useState(null); // Store the category to be deleted

  const { categories: data } = useSelector((state) => state.category);
  // console.log(categories)
  const { users } = useSelector((state) => state.admin);
  // console.log(users)

  const dispatch = useDispatch();

  useEffect(() => {
    // Fetch categories from the API
    dispatch(getAllCategories());
    if(users && users.length === 0){
      dispatch(getAllUsers());
    }
  }, [dispatch])

  //find creadte to user Name

  const superAdmin = users && users.filter((user) => user.role.name === "SuperAdmin");

  const userName = (userId) => {
    if (!userId) return "N/A"; // Handle undefined/null IDs
    const user = superAdmin.find((user) => user._id === userId);
    return user ? user.name : "Unknown";
  };


  const columns = [
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "CreatedBy",
      selector: (row) =>userName( row.createdBy),
      sortable: true,
    },
    {
      name: "Active",
      selector: (row) => row.isactive? "Active": "DeAcive",
      sortable: true,
    },
    {
      name: "Actions",
      cell: (row) => (
        <div>
          <button onClick={() => handleEdit(row)}>Edit</button>
          <button onClick={() => handleDeleteConfirmation(row)}>Delete</button>
        </div>
      ),
    },
  ];

  const handleEdit = (row) => {
    setIsEditing(true);
    setEditCategory(row);
    setNewCategory({ title: row.title, description: row.description });
    setIsPopupOpen(true);
  };

  const handleDeleteConfirmation = (row) => {
    setCategoryToDelete(row); // Store the category to delete
    setIsDeletePopupOpen(true); // Open the delete confirmation modal
  };

  const handleDelete = () => {
    if (categoryToDelete) {
      setCategories(categories.filter((item) => item.id !== categoryToDelete.id));
    }
    setIsDeletePopupOpen(false); // Close the delete confirmation modal
  };

  const handleCancelDelete = () => {
    setIsDeletePopupOpen(false); // Close the delete confirmation modal
    setCategoryToDelete(null); // Reset the category to delete
  };

  const handleAddCategory = () => {
    const newId = categories.length ? categories[categories.length - 1].id + 1 : 1;
    const newCategoryObject = { ...newCategory, id: newId };
    setCategories([...categories, newCategoryObject]);
    setNewCategory({ title: "", description: "" });
  };

  const handleSaveCategory = () => {
    if (isEditing) {
      setCategories(categories.map((item) =>
        item.id === editCategory.id ? { ...item, ...newCategory } : item
      ));
      setIsEditing(false);
    } else {
      handleAddCategory();
    }
    setIsPopupOpen(false);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
    setIsEditing(false);
    setNewCategory({ title: "", description: "" });
  };

  return (
    <div>
      <h3>Category Management</h3>
      <button onClick={() => setIsPopupOpen(true)}>Add Category</button>
      <Table data={data} columns={columns} />

      {/* Edit/Add Popup */}
      {isPopupOpen && (
        <div className="popup">
          <div className="popup-content">
            <h4>{isEditing ? "Edit Category" : "Add Category"}</h4>
            <div>
              <label>Name:</label>
              <input
                type="text"
                value={newCategory.title}
                onChange={(e) => setNewCategory({ ...newCategory, title: e.target.value })}
              />
            </div>
            <div>
              <label>Description:</label>
              <input
                type="text"
                value={newCategory.description}
                onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
              />
            </div>
            <button onClick={handleSaveCategory}>{isEditing ? "Save" : "Add"}</button>
            <button onClick={handleClosePopup}>Close</button>
          </div>
        </div>
      )}

      {/* Delete Confirmation Popup */}
      {isDeletePopupOpen && (
        <div className="popup">
          <div className="popup-content">
            <h4>Are you sure you want to delete this category?</h4>
            <p>{categoryToDelete ? categoryToDelete.title : ""}</p>
            <button onClick={handleDelete}>Delete</button>
            <button onClick={handleCancelDelete}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MCategoryTable;
