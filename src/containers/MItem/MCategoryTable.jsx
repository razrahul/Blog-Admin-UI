import React, { useEffect, useMemo, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import Table from "./Table";
import {
  getAllCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../../redux/action/categoryAction";
import { getAllUsers } from "../../redux/action/admin";

// icons
import { MdDelete } from "react-icons/md";
import { FaEdit, FaPlus } from "react-icons/fa";

// your confirm component + styles
import Button from "../../components/conformationButtom/Button.jsx";
import "./MScss/MCategoryTables.scss";

const MCategoryTable = () => {
  const dispatch = useDispatch();

  const { categories: data = [], loading: catLoading, error: catError } =
    useSelector((s) => s.category) || {};
  const { users = [], loading: userLoading } = useSelector((s) => s.admin) || {};

  // UI state
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [formName, setFormName] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    dispatch(getAllCategories());
    if (!users || users.length === 0) dispatch(getAllUsers());
  }, [dispatch]); // fetching once is fine here

  // helpers
  const getId = useCallback((row) => row?._id ?? row?.id, []);
  const getActive = useCallback((row) => {
    if (typeof row?.isActive === "boolean") return row.isActive;
    if (typeof row?.isactive === "boolean") return row.isactive;
    return null;
  }, []);

  const userMap = useMemo(() => {
    const map = new Map();
    (users || []).forEach((u) => map.set(u._id || u.id, u));
    return map;
  }, [users]);

  const userName = useCallback(
    (userId) => {
      if (!userId) return "—";
      const u = userMap.get(userId);
      return u?.name || "Unknown";
    },
    [userMap]
  );

  // handlers
  const openAdd = useCallback(() => {
    setEditingId(null);
    setFormName("");
    setIsPopupOpen(true);
  }, []);

  const handleEdit = useCallback(
    (row) => {
      setEditingId(getId(row));
      setFormName(row?.name ?? "");
      setIsPopupOpen(true);
    },
    [getId]
  );

  const closePopup = useCallback(() => {
    setIsPopupOpen(false);
    setEditingId(null);
    setFormName("");
  }, []);

  const handleSave = useCallback(async () => {
    const name = (formName || "").trim();
    if (!name) return alert("Name is required.");

    setSubmitting(true);
    try {
      if (editingId) {
        await dispatch(updateCategory(editingId, { name }));
      } else {
        await dispatch(createCategory({ name }));
      }
      await dispatch(getAllCategories());
      closePopup();
    } catch (e) {
      console.error(e);
      alert("Failed to save category.");
    } finally {
      setSubmitting(false);
    }
  }, [dispatch, editingId, formName, closePopup]);

  const handleDeleteDirect = useCallback(
    async (row) => {
      const id = getId(row);
      if (!id) return;

      setSubmitting(true);
      try {
        await dispatch(deleteCategory(id));
        await dispatch(getAllCategories());
      } catch (e) {
        console.error(e);
        alert("Failed to delete category.");
      } finally {
        setSubmitting(false);
      }
    },
    [dispatch, getId]
  );

  // columns
  const columns = useMemo(() => {
    const base = [
      {
        name: "Name",
        selector: (row) => row?.name ?? "",
        sortable: true,
      },
      {
        name: "Created By",
        selector: (row) => userName(row?.createdBy),
        sortable: true,
        grow: 2,
      },
    ];

    const hasActive = data?.some(
      (r) => typeof r?.isActive === "boolean" || typeof r?.isactive === "boolean"
    );
    if (hasActive) {
      base.push({
        name: "Active",
        selector: (row) => (getActive(row) ? "Active" : "Inactive"),
        sortable: true,
        // width: "120px",
      });
    }

    base.push({
      name: "Actions",
      // width: "140px",
      cell: (row) => (
        <div className="action-cell">
          <button
            type="button"
            onClick={() => handleEdit(row)}
            className="icon-btn edit-button"
            aria-label={`Edit ${row?.name || "category"}`}
            title="Edit"
          >
            <FaEdit className="edit-icon" />
          </button>

          {/* Your confirm Button wraps the delete trigger */}
          <Button
            onConfirm={() => handleDeleteDirect(row)}
            title="Permanently Delete Category"
            description={`Are you sure you want to delete "${row?.name}"? This cannot be undone.`}
            buttonClass="icon-btn delete-button"
            ariaLabel={`Delete ${row?.name || "category"}`}
          >
            <MdDelete className="delete-icon" />
          </Button>
        </div>
      ),
    });

    return base;
  }, [data, userName, getActive, handleEdit, handleDeleteDirect]);

  return (
    <div className="category-wrap">
      <div className="header">
        <h3>Category Management</h3>

        <div className="actions">
          <button
            type="button"
            onClick={openAdd}
            className="btn primary add-btn"
            aria-label="Add category"
            title="Add category"
          >
            <FaPlus className="add-icon" />
            <span>Add Category</span>
          </button>
        </div>
      </div>

      {(catLoading || userLoading) && <p>Loading…</p>}
      {catError && (
        <p style={{ color: "crimson" }}>
          Error loading categories: {String(catError)}
        </p>
      )}

      <Table data={data} columns={columns} />

      {/* Add/Edit Popup */}
      {isPopupOpen && (
        <div className="popup" role="dialog" aria-modal="true" aria-labelledby="popup-title">
          <div className="popup-content">
            <h4 id="popup-title">{editingId ? "Edit Category" : "Add Category"}</h4>

            <div className="form-row">
              <label htmlFor="cat-name">Name</label>
              <input
                id="cat-name"
                type="text"
                value={formName}
                onChange={(e) => setFormName(e.target.value)}
                placeholder="Enter category name"
                autoFocus
              />
            </div>

            <div className="popup-actions">
              <button
                type="button"
                onClick={handleSave}
                className="btn primary"
                disabled={submitting}
              >
                {submitting ? "Saving…" : editingId ? "Save" : "Add"}
              </button>
              <button type="button" onClick={closePopup} className="btn">
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MCategoryTable;
