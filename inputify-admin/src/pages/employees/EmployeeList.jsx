import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../../services/api";

import MainLayout from "../../components/layout/MainLayout";

import "../../styles/module.css";

function EmployeeList() {

  const navigate = useNavigate();

  const [employees, setEmployees] =
    useState([]);

  useEffect(() => {

    loadEmployees();

  }, []);

  const loadEmployees = async () => {

    try {

      const res =
        await api.get("/employees");

      console.log(
        "EMPLOYEES =>",
        res.data
      );

      setEmployees(
        res.data || []
      );

    } catch (error) {

      console.log(
        "EMPLOYEE ERROR =>",
        error.response?.data
      );

    }

  };

  return (

    <MainLayout>

      <div className="module-page">

        <div className="module-header">

          <h1 className="module-title">
            Employees
          </h1>

          <button
            className="primary-btn"
            onClick={() =>
              navigate("/employees/create")
            }
          >
            Create Employee
          </button>

        </div>

        <div className="table-card">

          <table
            className="enterprise-table"
          >

            <thead>

<tr>

<th>Actions</th>
<th>ID</th>
<th>Name</th>
<th>Email</th>
<th>Role</th>
<th>Status</th>

</tr>

</thead>

<tbody>

{employees.length > 0 ? (

employees.map((item)=>(

<tr key={item.id}>

<td>

<div style={{ display: "flex", gap: "8px", alignItems: "center" }}>

<button
className="table-edit-btn"
onClick={() =>
navigate(`/employees/${item.id}`)
}
style={{
  background: "#3b82f6",
  color: "white",
  padding: "6px 12px",
  borderRadius: "4px",
  border: "none",
  cursor: "pointer",
  fontSize: "12px"
}}
>
View
</button>

<button
className="table-edit-btn"
onClick={() =>
navigate(`/employees/edit/${item.id}`)
}
>
Edit
</button>

</div>

</td>

<td>{item.id}</td>

<td>{item.name}</td>

<td>{item.email}</td>

<td>{item.role}</td>

<td>

<span className="active-badge">
{item.status || "Active"}
</span>

</td>

</tr>

))

) : (

<tr>

<td colSpan="6">
No Employees Found
</td>

</tr>

)}

</tbody>

          </table>

        </div>

      </div>

    </MainLayout>

  );

}

export default EmployeeList;