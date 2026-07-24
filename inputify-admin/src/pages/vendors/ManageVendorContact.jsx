import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import api from "../../services/api";

import MainLayout from "../../components/layout/MainLayout";

import "../../styles/form.css";

function ManageVendorContact() {

  const { contactId } = useParams();

  const [contact, setContact] = useState({

    name: "",
    email: "",
    phone: "",
    title: "",
    status: "Active"

  });

  useEffect(() => {

    loadContact();

  }, []);

  const loadContact = async () => {

    try {

      const res =
      await api.get(
        `/vendor-contacts/contact/${contactId}`
      );

      console.log(
        "CONTACT =>",
        res.data
      );

      setContact(res.data);

    }
    catch(error){

      console.log(error);

    }

  };

  const handleChange = (e) => {

    setContact({

      ...contact,

      [e.target.name]:
      e.target.value

    });

  };

  const saveContact = async () => {

    try {

      await api.put(

        `/vendor-contacts/contact/${contactId}`,

        contact

      );

      alert(
        "Contact Updated Successfully"
      );

    }
    catch(error){

      console.log(error);

      alert(
        "Failed To Update Contact"
      );

    }

  };

  return (

    <MainLayout>

      <div className="form-container">

        <h2>
          Manage Vendor Contact
        </h2>

        <div className="table-card">

          <div className="form-grid">

            <div>

              <label>
                Contact Name
              </label>

              <input
                name="name"
                value={contact.name || ""}
                onChange={handleChange}
              />

            </div>

            <div>

              <label>
                Email
              </label>

              <input
                name="email"
                value={contact.email || ""}
                onChange={handleChange}
              />

            </div>

            <div>

              <label>
                Phone
              </label>

              <input
                name="phone"
                value={contact.phone || ""}
                onChange={handleChange}
              />

            </div>

            <div>

              <label>
                Contact Type
              </label>

              <input
                name="title"
                value={contact.title || ""}
                onChange={handleChange}
              />

            </div>

            <div>

              <label>
                Status
              </label>

              <select
                name="status"
                value={contact.status || "Active"}
                onChange={handleChange}
              >

                <option value="Active">
                  Active
                </option>

                <option value="Inactive">
                  Inactive
                </option>

              </select>

            </div>

          </div>

        </div>

        <div
          style={{
            marginTop:"20px"
          }}
        >

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

export default ManageVendorContact;