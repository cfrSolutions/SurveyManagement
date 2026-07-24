import { useEffect, useState } from "react";
import {
  useParams,
  useNavigate
} from "react-router-dom";

import api from "../../services/api";

import MainLayout from "../../components/layout/MainLayout";

import "../../styles/form.css";
import "../../styles/module.css";

function VendorDetails() {

  const { id } = useParams();

  const navigate = useNavigate();

  const [vendor, setVendor] = useState({

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

    phone: "",
    secondary_phone: "",

    username: "",
    password: "",

    completion_url: "",
    disqualify_url: "",
    quota_url: "",

    notes: "",

    is_active: true

  });

  const [contacts, setContacts] =
  useState([]);

  useEffect(() => {

    loadVendor();
    loadContacts();

  }, []);

  const loadVendor = async () => {

    try {

      const res =
await api.get(
  `/vendors/${id}`
);

console.log(
  JSON.stringify(
    res.data,
    null,
    2
  )
);

setVendor(
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
        `/vendor-contacts/${id}`
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

    setVendor({

      ...vendor,

      [e.target.name]:
      e.target.value

    });

  };

  const saveVendor = async () => {

    try {

      await api.put(

        `/vendors/${id}`,

        vendor

      );

      alert(
        "Vendor Updated Successfully"
      );

    }
    catch(error){

      console.log(error);

      alert(
        "Failed To Update Vendor"
      );

    }

  };

  return (

    <MainLayout>

      <div className="form-container">

        <h2
          style={{
            marginBottom:"20px"
          }}
        >
          Manage Vendor
        </h2>

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
                value={vendor.company_name || ""}
                onChange={handleChange}
              />

            </div>

            <div>

              <label>
                Parent Company
              </label>

              <input
                name="parent_company"
                value={vendor.parent_company || ""}
                onChange={handleChange}
              />

            </div>

            <div>

              <label>
                Display Name
              </label>

              <input
                name="display_name"
                value={vendor.display_name || ""}
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
              value={vendor.address1 || ""}
              onChange={handleChange}
            />

            <input
              placeholder="Address 2"
              name="address2"
              value={vendor.address2 || ""}
              onChange={handleChange}
            />

            <input
              placeholder="Address 3"
              name="address3"
              value={vendor.address3 || ""}
              onChange={handleChange}
            />

            <input
              placeholder="Country"
              name="country"
              value={vendor.country || ""}
              onChange={handleChange}
            />

            <input
              placeholder="State"
              name="state"
              value={vendor.state || ""}
              onChange={handleChange}
            />

            <input
              placeholder="City"
              name="city"
              value={vendor.city || ""}
              onChange={handleChange}
            />

            <input
              placeholder="Zip Code"
              name="zipcode"
              value={vendor.zipcode || ""}
              onChange={handleChange}
            />

            <input
              placeholder="Primary Email"
              name="email"
              value={vendor.email || ""}
              onChange={handleChange}
            />

            <input
              placeholder="Secondary Email"
              name="secondary_email"
              value={vendor.secondary_email || ""}
              onChange={handleChange}
            />

            <input
              placeholder="Primary Phone"
              name="phone"
              value={vendor.phone || ""}
              onChange={handleChange}
            />

            <input
              placeholder="Secondary Phone"
              name="secondary_phone"
              value={vendor.secondary_phone || ""}
              onChange={handleChange}
            />

             <input
              placeholder="Username"
              name="username"
              value={vendor.username || ""}
              onChange={handleChange}
            />

            <input
              placeholder="Password"
              name="password"
              value={vendor.password || ""}
              onChange={handleChange}
            />

          </div>
          

        </div>

        {/* SURVEY DETAILS */}

        <div
          className="table-card"
          style={{
            marginTop:"20px"
          }}
        >

          <h3>
            Survey Redirect Details
          </h3>

          <div className="form-grid">

            <textarea
              rows="3"
              placeholder="Completion URL"
              name="completion_url"
              value={vendor.completion_url || ""}
              onChange={handleChange}
            />

            <textarea
              rows="3"
              placeholder="Disqualify URL"
              name="disqualify_url"
              value={vendor.disqualify_url || ""}
              onChange={handleChange}
            />

            <textarea
              rows="3"
              placeholder="Quota URL"
              name="quota_url"
              value={vendor.quota_url || ""}
              onChange={handleChange}
            />

            <textarea
              rows="3"
              placeholder="Notes"
              name="notes"
              value={vendor.notes || ""}
              onChange={handleChange}
            />

          </div>

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
                vendor.is_active || false
              }
              onChange={(e)=>
                setVendor({

                  ...vendor,

                  is_active:
                  e.target.checked

                })
              }
            />

            Active Vendor

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
            onClick={saveVendor}
          >
            Save Vendor
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
                  `/vendors/${id}/contacts`
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
                      `/vendors/${id}/contacts/${contact.id}`
                        )
                        }
                    >
                          Manage
                        </button>

                    </td>

                    <td>{contact.id}</td>

                    <td>{contact.name}</td>

                    <td>{contact.email}</td>

                    <td>{contact.phone}</td>

                    <td>{contact.title}</td>

                    <td>{contact.status}</td>

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

export default VendorDetails;