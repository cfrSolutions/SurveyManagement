import { useEffect, useState } from "react";
import {
  useParams,
  useNavigate
} from "react-router-dom";

import api from "../../services/api";

import MainLayout from "../../components/layout/MainLayout";

import "../../styles/form.css";
import "../../styles/module.css";

function ClientDetails() {

  const { id } = useParams();

  const navigate = useNavigate();

  const [client, setClient] =
  useState({

    company_name:"",
    parent_company:"",
    display_name:"",

    username: "",
    password: "",

    address1:"",
    address2:"",
    address3:"",

    country:"",
    state:"",
    city:"",
    zipcode:"",

    email:"",
    secondary_email:"",

    phone:"",
    secondary_phone:"",

    notes:"",

    is_active:true

  });

  const [contacts, setContacts] =
  useState([]);

  useEffect(() => {

    loadClient();
    loadContacts();

  }, []);

  const loadClient = async () => {

    try {

      const res =
      await api.get(
        `/clients/${id}`
      );

      setClient(
        res.data || {}
      );

    }
    catch(error){

      console.log(error);

    }

  };

  const loadContacts = async () => {

    try {

      const res =
      await api.get(
        `/client-contacts/${id}`
      );

      setContacts(
        res.data || []
      );

    }
    catch(error){

      console.log(error);

    }

  };

  const handleChange = (e) => {

    setClient({

      ...client,

      [e.target.name]:
      e.target.value

    });

  };

  const saveClient = async () => {

    try {

      await api.put(

        `/clients/${id}`,

        client

      );

      alert(
        "Client Updated Successfully"
      );

    }
    catch(error){

      console.log(error);

      alert(
        "Failed To Update Client"
      );

    }

  };

  return (

    <MainLayout>

      <div className="form-container">

        <h1
          style={{
            marginBottom:"20px"
          }}
        >
          Manage Client
        </h1>

        {/* COMPANY DETAILS */}

        <div className="table-card">

          <h3>
            Company Details
          </h3>

          <div className="form-grid">

            <div>

              <label>
                Company Name
              </label>

              <input
                name="company_name"
                value={client.company_name || ""}
                onChange={handleChange}
              />

            </div>

            <div>

              <label>
                Parent Company
              </label>

              <input
                name="parent_company"
                value={client.parent_company || ""}
                onChange={handleChange}
              />

            </div>

            <div>

              <label>
                Display Name
              </label>

              <input
                name="display_name"
                value={client.display_name || ""}
                onChange={handleChange}
              />

            </div>

          </div>

        </div>

        {/* REGION DETAILS */}

        <div
          className="table-card"
          style={{
            marginTop:"20px"
          }}
        >

          <h3>
            Region & Contact Details
          </h3>

          <div className="form-grid">

            <input
              placeholder="Address 1"
              name="address1"
              value={client.address1 || ""}
              onChange={handleChange}
            />

            <input
              placeholder="Address 2"
              name="address2"
              value={client.address2 || ""}
              onChange={handleChange}
            />

            <input
              placeholder="Address 3"
              name="address3"
              value={client.address3 || ""}
              onChange={handleChange}
            />

            <input
              placeholder="Country"
              name="country"
              value={client.country || ""}
              onChange={handleChange}
            />

            <input
              placeholder="State"
              name="state"
              value={client.state || ""}
              onChange={handleChange}
            />

            <input
              placeholder="City"
              name="city"
              value={client.city || ""}
              onChange={handleChange}
            />

            <input
              placeholder="Zip Code"
              name="zipcode"
              value={client.zipcode || ""}
              onChange={handleChange}
            />

            <input
              placeholder="Primary Email"
              name="email"
              value={client.email || ""}
              onChange={handleChange}
            />

            <input
              placeholder="Secondary Email"
              name="secondary_email"
              value={client.secondary_email || ""}
              onChange={handleChange}
            />

            <input
              placeholder="Primary Phone"
              name="phone"
              value={client.phone || ""}
              onChange={handleChange}
            />

            <input
              placeholder="Secondary Phone"
              name="secondary_phone"
              value={client.secondary_phone || ""}
              onChange={handleChange}
            />

          </div>
          <div>

  <label>
    Username
  </label>

  <input
    name="username"
    value={client.username || ""}
    onChange={handleChange}
  />

</div>

<div>

  <label>
    Password
  </label>

  <input
    type="password"
    name="password"
    value={client.password || ""}
    onChange={handleChange}
  />

</div>

        </div>

        {/* NOTES */}

        <div
          className="table-card"
          style={{
            marginTop:"20px"
          }}
        >

          <h3>
            Notes
          </h3>

          <textarea
            rows="4"
            name="notes"
            value={client.notes || ""}
            onChange={handleChange}
          />

        </div>

        {/* ACTIVE */}

        <div
          className="table-card"
          style={{
            marginTop:"20px"
          }}
        >

          <label>

            <input
              type="checkbox"
              checked={
                client.is_active || false
              }
              onChange={(e)=>
                setClient({

                  ...client,

                  is_active:
                  e.target.checked

                })
              }
            />

            Active Client

          </label>

        </div>

        {/* SAVE */}

        <div
          style={{
            marginTop:"20px"
          }}
        >

          <button
            className="save-btn"
            onClick={saveClient}
          >
            Save Client
          </button>

        </div>

        {/* CONTACTS */}

        <div
          className="table-card"
          style={{
            marginTop:"30px"
          }}
        >

          <div
            style={{
              display:"flex",
              justifyContent:"space-between",
              alignItems:"center"
            }}
          >

            <h3>
              Manage Contact(s)
            </h3>

            <button
              className="primary-btn"
              onClick={() =>
                navigate(
                  `/clients/${id}/contacts`
                )
              }
            >
              Add New Contact
            </button>

          </div>

          <table
            className="enterprise-table"
          >

            <thead>

              <tr>

                <th>Manage</th>
                <th>ID</th>
                <th>Contact Name</th>
                <th>Contact Email ID</th>
                <th>Contact No</th>
                <th>Contact Type</th>
                <th>Is Active</th>

              </tr>

            </thead>

            <tbody>

              {
                contacts.length > 0
                ? contacts.map((contact)=>(

                  <tr key={contact.id}>

                    <td>

                      <button
  className="table-edit-btn"
  onClick={() =>
    navigate(
      `/clients/${id}/contacts/${contact.id}`
    )
  }
>
  Manage
</button>

                    </td>

                    <td>{contact.id}</td>

                    <td>{contact.contact_name}</td>

                    <td>{contact.email}</td>

                    <td>{contact.phone}</td>

                    <td>{contact.title}</td>

                    <td>
                      {
                        contact.is_active
                        ? "True"
                        : "False"
                      }
                    </td>

                  </tr>

                ))
                :
                <tr>

                  <td
                    colSpan="7"
                    style={{
                      textAlign:"center"
                    }}
                  >
                    No Contacts Found
                  </td>

                </tr>
              }

            </tbody>

          </table>

        </div>

      </div>

    </MainLayout>

  );

}

export default ClientDetails;