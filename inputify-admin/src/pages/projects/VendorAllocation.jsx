import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import api from "../../services/api";
import MainLayout from "../../components/layout/MainLayout";

import "../../styles/form.css";

function VendorAllocation() {

  const { projectId } = useParams();

  const navigate = useNavigate();

  const [vendors, setVendors] = useState([]);
  const [contacts, setContacts] = useState([]);

  const [formData, setFormData] = useState({

    vendor_id: "",
    vendor_contact_id: "",

    cpi: "",
    quota: "",
    max_completes: "",
    max_redirects: "",

    completion_url: "",
    disqualify_url: "",
    quota_url: "",

    status: "Testing",
    notes: ""

  });

  useEffect(() => {

    loadVendors();

  }, []);

  const loadVendors = async () => {

    try {

      const res =
      await api.get("/vendors");

      setVendors(res.data || []);

    }
    catch(error){

      console.log(error);

    }

  };

  const loadVendorContacts =
  async(vendorId)=>{

    try {

      const res =
      await api.get(
        `/vendor-contacts/${vendorId}`
      );

      setContacts(
        res.data || []
      );

    }
    catch(error){

      console.log(error);

    }

  };

  const handleVendorChange =
  async(e)=>{

    const vendorId =
    e.target.value;

    const selectedVendor =
    vendors.find(
      v => v.id === vendorId
    );

    setFormData({

      ...formData,

      vendor_id: vendorId,

      completion_url:
      selectedVendor?.completion_url || "",

      disqualify_url:
      selectedVendor?.disqualify_url || "",

      quota_url:
      selectedVendor?.quota_url || ""

    });

    loadVendorContacts(
      vendorId
    );

  };

  const saveAllocation =
  async()=>{

    try {

      await api.post(

        "/vendor-allocations",

        {

          project_id: projectId,

          vendor_id:
          formData.vendor_id,

          vendor_contact_id:
          formData.vendor_contact_id,

          cpi:
          formData.cpi,

          quota:
          formData.quota,

          max_completes:
          formData.max_completes,

          max_redirects:
          formData.max_redirects,

          completion_url:
          formData.completion_url,

          disqualify_url:
          formData.disqualify_url,

          quota_url:
          formData.quota_url,

          notes:
          formData.notes,

          status:
          formData.status,

          completes: 0

        }

      );

      alert(
        "Vendor Added Successfully"
      );

      navigate(
        `/projects/${projectId}`
      );

    }
    catch(error){

      console.log(error);

      alert(
        "Failed To Add Vendor"
      );

    }

  };

  return (

    <MainLayout>

      <div className="form-container">

        <h2>
          Project Vendor Details
        </h2>

        <div className="form-grid">

          <div>

            <label>
              Project Vendor
            </label>

            <select
              value={formData.vendor_id}
              onChange={
                handleVendorChange
              }
            >

              <option value="">
                Select Vendor
              </option>

              {
                vendors.map(
                  vendor => (

                  <option
                    key={vendor.id}
                    value={vendor.id}
                  >
                    {vendor.company_name}
                  </option>

                ))
              }

            </select>

          </div>

          <div>

            <label>
              Vendor Contact
            </label>

            <select
              value={
                formData.vendor_contact_id
              }
              onChange={(e)=>
                setFormData({

                  ...formData,

                  vendor_contact_id:
                  e.target.value

                })
              }
            >

              <option value="">
                Select Contact
              </option>

              {
                contacts.map(
                  contact => (

                  <option
                    key={contact.id}
                    value={contact.id}
                  >
                    {
                      contact.name ||
                      contact.contact_name
                    }
                  </option>

                ))
              }

            </select>

          </div>

        </div>

        <h2>
          Cost & Completes
        </h2>

        <div className="form-grid">

          <input
            placeholder="Cost Per Complete"
            value={formData.cpi}
            onChange={(e)=>
              setFormData({

                ...formData,

                cpi:e.target.value

              })
            }
          />

          <input
            placeholder="Required Completes"
            value={formData.quota}
            onChange={(e)=>
              setFormData({

                ...formData,

                quota:e.target.value

              })
            }
          />

          <input
            placeholder="Max Completes"
            value={formData.max_completes}
            onChange={(e)=>
              setFormData({

                ...formData,

                max_completes:
                e.target.value

              })
            }
          />

          <input
            placeholder="Max Redirects"
            value={formData.max_redirects}
            onChange={(e)=>
              setFormData({

                ...formData,

                max_redirects:
                e.target.value

              })
            }
          />

        </div>

        <h2>
          Vendor Redirect Details
        </h2>

        <div className="form-grid">

          <textarea
            rows="4"
            placeholder="Completion URL"
            value={
              formData.completion_url
            }
            onChange={(e)=>
              setFormData({

                ...formData,

                completion_url:
                e.target.value

              })
            }
          />

          <textarea
            rows="4"
            placeholder="Disqualify URL"
            value={
              formData.disqualify_url
            }
            onChange={(e)=>
              setFormData({

                ...formData,

                disqualify_url:
                e.target.value

              })
            }
          />

          <textarea
            rows="4"
            placeholder="Quota Full URL"
            value={
              formData.quota_url
            }
            onChange={(e)=>
              setFormData({

                ...formData,

                quota_url:
                e.target.value

              })
            }
          />

        </div>

        <h2>
          Vendor Status & Notes
        </h2>

        <div className="form-grid">

          <select
            value={formData.status}
            onChange={(e)=>
              setFormData({

                ...formData,

                status:e.target.value

              })
            }
          >

            <option>Testing</option>
            <option>Running</option>
            <option>Paused</option>
            <option>Hold</option>
            <option>Completed</option>
            <option>Closed</option>

          </select>

          <textarea
            rows="4"
            placeholder="Notes"
            value={formData.notes}
            onChange={(e)=>
              setFormData({

                ...formData,

                notes:e.target.value

              })
            }
          />

        </div>

        <div className="form-actions">

          <button
            className="save-btn"
            onClick={saveAllocation}
          >
            Save Vendor
          </button>

        </div>

      </div>

    </MainLayout>

  );

}

export default VendorAllocation;