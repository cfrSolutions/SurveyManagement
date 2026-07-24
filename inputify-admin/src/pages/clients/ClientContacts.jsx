import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import api from "../../services/api";

import MainLayout from "../../components/layout/MainLayout";
import PageHeader from "../../components/common/PageHeader";
import ContactForm from "../../components/common/ContactForm";

function ClientContacts() {

  const { id } = useParams();

  const navigate = useNavigate();

  const [formData, setFormData] =
  useState({

    contact_name: "",
    email: "",
    phone: "",
    title: "",
    is_active: true

  });

  const saveContact = async () => {

    try {

      const payload = {

  client_id: id,

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
        "PAYLOAD =>",
        payload
      );

      await api.post(

        "/client-contacts",

        payload

      );

      alert(
        "Contact Saved Successfully"
      );

      navigate(
        `/clients/${id}`
      );

    }
    catch(error){

      console.log(
        "CONTACT ERROR =>",
        error
      );

      console.log(
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
        title="Add Client Contact"
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

export default ClientContacts;