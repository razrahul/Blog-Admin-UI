import React, { useEffect } from 'react'
import DataTable from 'react-data-table-component'
import { useDispatch, useSelector } from 'react-redux'
import { getAllDeletedRoles} from "../../redux/action/rolesActions.js"
import  Button from "../../components/conformationButtom/Button.jsx"
import "./recycle.scss"

function RolesTable() {
    const { deletedRoles } = useSelector((state) => state.role)

    const dispatch = useDispatch()

    useEffect(() => {
      dispatch(getAllDeletedRoles());
    //   console.log("Fetching deleted roles...");
    }, [dispatch])

    // console.log("deleted Roles",deletedRoles)

    //restore role function
    const handleRestore = (role) => {
        console.log("Restoring Role ID:", role._id);
        dispatch(restoreRole(role._id)); 
    };

    //permanent delete role function
    const handleDelete = (role) => {
        console.log("Deleting Role ID:", role._id)
    }

    const columns = [
        { name: "Role", selector: (row) => row.name, sortable: true },
        { name: "CreatedBy", selector: (row) => row.createdBy, sortable: true },
        { name: "DeletedBy", selector: (row) => row.deletedBy, sortable: true },
        {
          name: "Actions",
          cell: (row) => (
            <div>
              <Button
              onConfirm={() => handleRestore(row)}
              title="Restore Role"
              description={`Are You Sure You want to Restore "${row.name}"`}
              buttonClass="restore-button" 
              >
                Restore
              </Button>
              <Button
              onConfirm={() => handleDelete(row)}
              title="Permanently Delete Role"
              description={`Are You Sure You want to Permanently Delete "${row.name}"`}
              buttonClass="delete-button" 
              >
                Delete
              </Button>
              {/* <button onClick={() => handleRestore(row)}>Restore</button> */}
              {/* <button onClick={() => handleDelete(row)}>Delete</button> */}
            </div>
          ),
        },
      ]
    
  return (
    <DataTable
        title="Deleted Roles"
        columns={columns}
        data={deletedRoles || []} // Ensure no crash if deletedRoles is undefined
        pagination
    />
  )
}

export default RolesTable
