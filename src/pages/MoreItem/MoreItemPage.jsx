// import React, { useState } from "react";
// import MCategoryTable from "../../containers/MItem/MCategoryTable";
// import MRoleTable from "../../containers/MItem/MRoleTable";
// import MCompanyTable from "../../containers/MItem/MCompanyTable";


// const MoreItemPage = () => {
//   const [selectedItem, setSelectedItem] = useState(null);

//   // Handle selection from dropdown
//   const handleItemClick = (item) => {
//     setSelectedItem(item); // Set the selected item (category, role, or company)
//   };

//   return (
//     <div>
//       <Navbar selectedItem={selectedItem} />
//       <div className="more-item-container">
//         <button className="more-button">
//           {selectedItem ? `Selected: ${selectedItem}` : "More Item"}
//         </button>
//         <ul className="drop-down-menu">
//           <li onClick={() => handleItemClick("category")}>Category</li>
//           <li onClick={() => handleItemClick("role")}>Role</li>
//           <li onClick={() => handleItemClick("company")}>Company</li>
//         </ul>
//       </div>

//       {/* Render the selected table */}
//       {selectedItem === "category" && <MCategoryTable />}
//       {selectedItem === "role" && <MRoleTable />}
//       {selectedItem === "company" && <MCompanyTable />}
//     </div>
//   );
// };

// export default MoreItemPage;
