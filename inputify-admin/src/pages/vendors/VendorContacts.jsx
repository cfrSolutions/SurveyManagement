import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import api from "../../services/api";

import MainLayout from "../../components/layout/MainLayout";
import PageHeader from "../../components/common/PageHeader";
import ContactForm from "../../components/common/ContactForm";

function VendorContacts() {

  const { id } = useParams();

  const navigate = useNavigate();

  const [formData, setFormData] =
  useState({

    contact_name: "",
    email: "",
    phone: "",
    title: ""

  });

  const saveContact = async () => {

    try {

      const payload = {

        vendor_id: id,

        name:
        formData.contact_name,

        email:
        formData.email,

        phone:
        formData.phone,

        title:
        formData.title,

        status:
        "Active"

      };

      console.log(
        "VENDOR CONTACT =>",
        payload
      );

      const res =
      await api.post(

        "/vendor-contacts",

        payload

      );

      console.log(
        "SUCCESS =>",
        res.data
      );

      alert(
        "Contact Saved Successfully"
      );

      navigate(
        `/vendors/${id}`
      );

    }
    catch(error){

      console.log(
        "ERROR =>",
        error
      );

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
        title="Add Vendor Contact"
      />

      <div className="form-container">

        <ContactForm
          formData={formData}
          setFormData={setFormData}
        />

        <div className="form-actions">

          <button
            className="save-btn"
            onClick={saveContact}
          >
            Save Contact
          </button>

        </div>

      </div>

    </MainLayout>

  );

}

export default VendorContacts;