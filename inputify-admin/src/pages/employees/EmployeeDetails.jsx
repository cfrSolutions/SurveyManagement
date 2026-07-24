import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import api from "../../services/api";

import MainLayout from "../../components/layout/MainLayout";
import PageHeader from "../../components/common/PageHeader";

import "../../styles/form.css";

function EmployeeDetails() {

  const navigate = useNavigate();
  const { id } = useParams();

  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadEmployee();
  }, [id]);

  const loadEmployee = async () => {
    try {
      setLoading(true);
      const res = await api.get(`/employees/${id}`);
      console.log("EMPLOYEE DETAILS =>", res.data);
      setEmployee(res.data);
    } catch (error) {
      console.log("LOAD ERROR =>", error.response?.data);
      alert("Error loading employee details");
      navigate("/employees");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <MainLayout>
        <div className="form-container">
          <p>Loading...</p>
        </div>
      </MainLayout>
    );
  }

  if (!employee) {
    return (
      <MainLayout>
        <div className="form-container">
          <p>Employee not found</p>
        </div>
      </MainLayout>
    );
  }

  return (

    <MainLayout>

      <PageHeader
        title="Employee Details"
      />

      <div className="form-container">

        <div className="form-grid">

          <div className="form-field">
            <label>Employee ID</label>
            <p className="detail-value">{employee.id}</p>
          </div>

          <div className="form-field">
            <label>Employee Name</label>
            <p className="detail-value">{employee.name}</p>
          </div>

          <div className="form-field">
            <label>Email</label>
            <p className="detail-value">{employee.email}</p>
          </div>

          <div className="form-field">
            <label>Role</label>
            <p className="detail-value">
              {employee.role === "ADMIN" && "Administrator"}
              {employee.role === "PM" && "Project Manager"}
              {employee.role === "SALES" && "Sales Executive"}
              {employee.role === "FINANCE" && "Finance"}
            </p>
          </div>

          <div className="form-field">
            <label>Status</label>
            <p className="detail-value">
              <span className="active-badge">
                {employee.status || "ACTIVE"}
              </span>
            </p>
          </div>

        </div>

        <div className="form-actions">

          <button
            className="save-btn"
            onClick={() =>
              navigate(`/employees/edit/${employee.id}`)
            }
          >
            Edit Employee
          </button>

          <button
            className="cancel-btn"
            onClick={() => navigate("/employees")}
          >
            Back to List
          </button>

        </div>

      </div>

    </MainLayout>

  );

}

export default EmployeeDetails;
