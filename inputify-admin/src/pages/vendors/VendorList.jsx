import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../../services/api";

import MainLayout from "../../components/layout/MainLayout";

import "../../styles/module.css";

function VendorList() {

  const navigate = useNavigate();

  const [vendors, setVendors] = useState([]);

  useEffect(() => {

    loadVendors();

  }, []);

  const loadVendors = async () => {

    try {

      const res =
        await api.get("/vendors");

      setVendors(
        res.data || []
      );

    } catch (error) {

      console.log(error);

    }

  };

  return (

    <MainLayout>

      <div className="module-page">

        <div className="module-header">

          <h1 className="module-title">
            Vendors
          </h1>

          <button
            className="primary-btn"
            onClick={() =>
              navigate("/vendors/create")
            }
          >
            Create Vendor
          </button>

        </div>

        <div className="table-card">

          <table className="enterprise-table">

            <thead>

              <tr>

                <th>Manage</th>
                <th>ID</th>
                <th>Company Name</th>
                <th>Company Email ID</th>
                <th>Phone Number</th>
                <th>Country</th>
                <th>Contact Name</th>
                <th>Company Type</th>
                <th>Is Active</th>

              </tr>

            </thead>

            <tbody>

              {vendors.length > 0 ? (

                vendors.map((vendor) => (

                  <tr key={vendor.id}>

                    <td>

                      <button
                        className="table-edit-btn"
                        onClick={() =>
                          navigate(`/vendors/${vendor.id}`)
                        }
                      >
                        Manage
                      </button>

                    </td>

                    <td>{vendor.id}</td>

                    <td>
                      {vendor.company_name}
                    </td>

                    <td>
                      {vendor.email}
                    </td>

                    <td>
                      {vendor.phone}
                    </td>

                    <td>
                      {vendor.country}
                    </td>

                    <td>
                      {vendor.primary_contact_name || "-"}
                    </td>

                    <td>
                      Vendor
                    </td>

                    <td>
                      {vendor.is_active
                        ? "True"
                        : "False"}
                    </td>

                  </tr>

                ))

              ) : (

                <tr>

                  <td
                    colSpan="9"
                    style={{
                      textAlign:"center"
                    }}
                  >
                    No Vendors Found
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

export default VendorList;