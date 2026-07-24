import { useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../../services/api";

import MainLayout from "../../components/layout/MainLayout";
import PageHeader from "../../components/common/PageHeader";
import FormInput from "../../components/common/FormInput";
import FormTextarea from "../../components/common/FormTextarea";
import AddressSelector from "../../components/common/AddressSelector";

import "../../styles/form.css";

function CreateVendor() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({

    company_name: "",
    parent_company: "",
    display_name: "",

    address1: "",
    address2: "",
    address3: "",

    country: "",
    state: "",
    city: "",
    zipcode: "",

    email: "",
    secondary_email: "",

    username: "",
    password: "",
    
    phone: "",
    secondary_phone: "",

    completion_url: "",
    disqualify_url: "",
    quota_url: "",

    notes: "",

    is_active: true

  });

  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]:
      e.target.value

    });

  };

  const handleSubmit = async () => {

    try {

      await api.post(
        "/vendors",
        formData
      );

      alert(
        "Vendor Created Successfully"
      );

      navigate("/vendors");

    } catch (error) {

  console.log(
    "FULL ERROR =>",
    error
  );

  console.log(
    "ERROR DATA =>",
    error.response?.data
  );

  console.log(
    "FORM DATA =>",
    formData
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
        title="Create Vendor"
      />

      <div className="form-container">

        {/* COMPANY DETAILS */}

        <h3
          style={{
            marginBottom:"20px"
          }}
        >
          Company Details
        </h3>

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

        

        </div>

        {/* CONTACT DETAILS */}

        <h3
          style={{
            marginTop:"30px",
            marginBottom:"20px"
          }}
        >
          Region & Contact Details
        </h3>

        <div className="form-grid">

          <FormInput
            label="Primary Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />

          <FormInput
            label="Secondary Email"
            name="secondary_email"
            value={formData.secondary_email}
            onChange={handleChange}
          />

          <FormInput
            label="Primary Phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />

          <FormInput
            label="Secondary Phone"
            name="secondary_phone"
            value={formData.secondary_phone}
            onChange={handleChange}
          />

        </div>

        {/* ADDRESS */}

        <h3
          style={{
            marginTop:"30px",
            marginBottom:"20px"
          }}
        >
          Address Details
        </h3>

        <AddressSelector
          formData={formData}
          setFormData={setFormData}
        />

        {/* SURVEY REDIRECT DETAILS */}

        <h3
          style={{
            marginTop:"30px",
            marginBottom:"20px"
          }}
        >
          Survey Redirect Details
        </h3>

        <div className="form-grid">

          <FormInput
            label="Completion URL"
            name="completion_url"
            value={formData.completion_url}
            onChange={handleChange}
          />

          <FormInput
            label="Disqualify URL"
            name="disqualify_url"
            value={formData.disqualify_url}
            onChange={handleChange}
          />

          <FormInput
            label="Quota Full URL"
            name="quota_url"
            value={formData.quota_url}
            onChange={handleChange}
          />

        </div>

        {/* NOTES */}

        <div
          style={{
            marginTop:"25px"
          }}
        >

          <FormTextarea
            label="Notes"
            name="notes"
            value={formData.notes}
            onChange={handleChange}
          />

        </div>

        {/* ACTIVE */}

        <div
          style={{
            marginTop:"20px"
          }}
        >

          <label
            style={{
              display:"flex",
              alignItems:"center",
              gap:"10px",
              fontWeight:"600"
            }}
          >

            <input
              type="checkbox"
              checked={formData.is_active}
              onChange={(e)=>
                setFormData({

                  ...formData,

                  is_active:
                  e.target.checked

                })
              }
            />

            Active Vendor

          </label>

        </div>

        {/* SAVE */}

        <div className="form-actions">

          <button
            className="save-btn"
            onClick={handleSubmit}
          >
            Save Vendor
          </button>

        </div>

      </div>

    </MainLayout>

  );

}

export default CreateVendor;