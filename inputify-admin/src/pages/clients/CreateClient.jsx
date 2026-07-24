import { useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../../services/api";

import MainLayout from "../../components/layout/MainLayout";
import PageHeader from "../../components/common/PageHeader";
import FormInput from "../../components/common/FormInput";
import AddressSelector from "../../components/common/AddressSelector";

import "../../styles/form.css";

function CreateClient() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    company_name: "",
    parent_company: "",
    display_name: "",
    username: "",
    password: "",
    email: "",
    phone: "",
    country: "",
    state: "",
    city: ""
  });

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

  };

  const saveClient = async () => {

    try {

      await api.post(
        "/clients",
        formData
      );

      alert("Client Created Successfully");

      navigate("/clients");

    } catch (error) {

  console.log("FULL ERROR =>", error);

  console.log(
    "SERVER ERROR =>",
    error.response?.data
  );

  alert(
    JSON.stringify(
      error.response?.data
    )
  );

}

  };

  return (

    <MainLayout>

      <PageHeader
        title="Create Client"
      />

      <div className="form-container">

        <div className="form-grid">

          <FormInput
            label="Company Name"
            name="company_name"
            value={formData.company_name}
            onChange={handleChange}
          />

          <FormInput
            label="Parent Company"
            name="parent_company"
            value={formData.parent_company}
            onChange={handleChange}
          />

          <FormInput
            label="Display Name"
            name="display_name"
            value={formData.display_name}
            onChange={handleChange}
          />

          <FormInput
            label="Username"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />

          <FormInput
            label="Password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />

      

          <FormInput
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />

          <FormInput
            label="Phone Number"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />

        </div>

        <h3
          style={{
            marginTop: "20px",
            marginBottom: "20px"
          }}
        >
          Address
        </h3>

        <AddressSelector
          formData={formData}
          setFormData={setFormData}
        />

        <div className="form-actions">

          <button
            className="save-btn"
            onClick={saveClient}
          >
            Save Client
          </button>

        </div>

      </div>

    </MainLayout>

  );
}

export default CreateClient;