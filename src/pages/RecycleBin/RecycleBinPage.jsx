import React, { useState } from "react";
import BlogTable from "../../containers/Recycle/BlogTable";
import UsersTable from "../../containers/Recycle/UsersTable";
import ContactTable from "../../containers/Recycle/ContactTable";
import RolesTable from "../../containers/Recycle/RolesTable";
import CategoryTable from "../../containers/Recycle/CategoryTable";
import CompanyTable from "../../containers/Recycle/CompanyTable";
import "./RecycleBin.scss";

const TABS = [
  { key: "Blog", label: "Blogs" },
  { key: "Users", label: "Users" },
  { key: "Contact", label: "Contacts" },
  { key: "Roles", label: "Roles" },
  { key: "Category", label: "Categories" },
  { key: "Company", label: "Companies" },
];

const RecycleBinPage = () => {
  const [selectedTab, setSelectedTab] = useState("Blog");

  const handleRestore = (row) => console.log(`Restoring: ${row.title}`);
  const handleDelete = (row) => console.log(`Deleting: ${row.title}`);

  return (
    <div className="recycle-bin-page">
      {/* Top Horizontal Nav */}
      <nav className="recycle-nav">
        <h2 className="recycle-nav__title">♻️ Recycle Bin</h2>

        <ul className="recycle-nav__list">
          {TABS.map(({ key, label }) => (
            <li key={key} className="recycle-nav__li">
              <button
                type="button"
                className={`recycle-nav__item ${
                  selectedTab === key ? "active" : ""
                }`}
                onClick={() => setSelectedTab(key)}
              >
                {label}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Content */}
      <main className="recycle-content">
        {selectedTab === "Blog" && (
          <BlogTable handleRestore={handleRestore} handleDelete={handleDelete} />
        )}
        {selectedTab === "Users" && <UsersTable />}
        {selectedTab === "Contact" && (
          <ContactTable handleRestore={handleRestore} handleDelete={handleDelete} />
        )}
        {selectedTab === "Roles" && <RolesTable />}
        {selectedTab === "Category" && <CategoryTable />}
        {selectedTab === "Company" && <CompanyTable />}
      </main>
    </div>
  );
};

export default RecycleBinPage;
