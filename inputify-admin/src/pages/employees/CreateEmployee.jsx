import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import api from "../../services/api";

import MainLayout from "../../components/layout/MainLayout";
import PageHeader from "../../components/common/PageHeader";
import FormInput from "../../components/common/FormInput";
import FormSelect from "../../components/common/FormSelect";

import "../../styles/form.css";

function CreateEmployee() {

  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = !!id;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "ADMIN",
    role_id:""
  });

  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //   if (isEditMode) {
  //     loadEmployee();
  //   }
  // }, [id]);


  useEffect(() => {
  loadRoles();

  if (isEditMode) {
    loadEmployee();
  }
}, []);

const loadRoles = async () => {
  try {
    const res = await api.get("/roles");

    console.log("ROLES =>", res.data);

    setRoles(res.data);
  } catch (err) {
    console.log(err);
  }
};

const handleRoleChange = (e) => {
  const selectedRoleId = e.target.value;

  const selectedRole = roles.find(
    (role) => role.id === selectedRoleId
  );

  setFormData((prev) => ({
    ...prev,
    role_id: selectedRoleId,
    role: selectedRole?.name || ""
  }));
};

  const loadEmployee = async () => {
    try {
      setLoading(true);
      const res = await api.get(`/employees/${id}`);
      console.log("EMPLOYEE LOADED =>", res.data);
      setFormData({
        name: res.data.name || "",
        email: res.data.email || "",
        password: "",
        role: res.data.role || "ADMIN",
        role_id: res.data.role_id || ""
      });
    } catch (error) {
      console.log("LOAD ERROR =>", error.response?.data);
      alert("Error loading employee data");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

  };

  const handleSubmit = async () => {

    try {

      let res;
      if (isEditMode) {
        const updateData = { ...formData };
        if (!updateData.password) {
          delete updateData.password;
        }
        res = await api.put(
          `/employees/${id}`,
          updateData
        );
        console.log(
          "EMPLOYEE UPDATED =>",
          res.data
        );
        alert(
          "Employee Updated Successfully"
        );
      } else {
        res = await api.post(
          "/employees",
          formData
        );
        console.log(
          "EMPLOYEE CREATED =>",
          res.data
        );
        alert(
          "Employee Created Successfully"
        );
      }

      navigate("/employees");

    }
    catch (err) {

      console.log(
        "EMPLOYEE ERROR =>",
        err.response?.data
      );

      alert(
        JSON.stringify(
          err.response?.data
        )
      );

    }

  };

  if (loading) {
    return <MainLayout><div>Loading...</div></MainLayout>;
  }

  return (

    <MainLayout>

      <PageHeader
        title={isEditMode ? "Edit Employee" : "Create Employee"}
      />

      <div className="form-container">

        <div className="form-grid">

          <FormInput
            label="Employee Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />

          <FormInput
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />

          <FormInput
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            placeholder={isEditMode ? "Leave empty to keep current password" : ""}
          />

          {/* <FormSelect
            label="Role"
            name="role"
            value={formData.role}
            onChange={handleChange}
            options={[
              {
                label: "Administrator",
                value: "ADMIN"
              },
              {
                label: "Project Manager",
                value: "PM"
              },
              {
                label: "Sales Executive",
                value: "SALES"
              },
              {
                label: "Finance",
                value: "FINANCE"
              }
            ]}
          /> */}
          <FormSelect
  label="Role"
  name="role_id"
  value={formData.role_id}
  onChange={handleRoleChange}
  options={roles.map((role) => ({
    label: role.name,
    value: role.id
  }))}
/>
        </div>

        <div className="form-actions">

          <button
            className="save-btn"
            onClick={handleSubmit}
          >
            {isEditMode ? "Update Employee" : "Create Employee"}
          </button>

        </div>

      </div>

    </MainLayout>

  );

}

export default CreateEmployee;