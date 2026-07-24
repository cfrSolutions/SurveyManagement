import { useEffect, useState } from "react";

import api from "../../services/api";

import MainLayout from "../../components/layout/MainLayout";
import PageHeader from "../../components/common/PageHeader";
import FormInput from "../../components/common/FormInput";
import FormTextarea from "../../components/common/FormTextarea";

import "../../styles/form.css";

function ThirdPartyAPIs() {

  const [apis, setAPIs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingAPI, setEditingAPI] = useState(null);
  const [formData, setFormData] = useState({
    api_name: "",
    description: "",
    base_url: "",
  test_url: "",
  auth_type: "bearer",
  request_method: "GET",
  projects_endpoint: "",
  responses_endpoint: "",
  response_path: "",
  id_field: "",
  name_field: "",
  auth_header: "",
  auth_query_param: "",
    credentials: [
      { credential_key: "", credential_value: "", is_secret: false }
    ]
  });

  useEffect(() => {
    loadAPIs();
  }, []);

  const loadAPIs = async () => {
    try {
      setLoading(true);
      const res = await api.get("/third-party-apis");
      console.log("APIS =>", res.data);
      setAPIs(res.data || []);
    } catch (error) {
      console.log("LOAD ERROR =>", error.response?.data);
    } finally {
      setLoading(false);
    }
  };

  const handleAddAPI = () => {
    setEditingAPI(null);
    setFormData({
      api_name: "",
      description: "",
      credentials: [
        { credential_key: "", credential_value: "", is_secret: false }
      ]
    });
    setShowForm(true);
  };

  const handleEditAPI = (apiData) => {
    setEditingAPI(apiData);
    setFormData({
      api_name: apiData.api_name,
      description: apiData.description,
      credentials: apiData.credentials && apiData.credentials.length > 0
        ? apiData.credentials
        : [{ credential_key: "", credential_value: "", is_secret: false }]
    });
    setShowForm(true);
  };

const handleSync = async (apiId) => {
  try {
    const res = await api.post(
      `/third-party-apis/${apiId}/sync`
    );

    // alert(res.data.message);
    console.log(res.data);

    loadAPIs();
  } catch (err) {
    alert(err.response?.data?.message);
  }
};

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleCredentialChange = (index, field, value) => {
    const updatedCredentials = [...formData.credentials];
    updatedCredentials[index] = {
      ...updatedCredentials[index],
      [field]: value
    };
    setFormData({
      ...formData,
      credentials: updatedCredentials
    });
  };

  const handleAddCredential = () => {
    setFormData({
      ...formData,
      credentials: [
        ...formData.credentials,
        { credential_key: "", credential_value: "", is_secret: false }
      ]
    });
  };

  const handleRemoveCredential = (index) => {
    const updatedCredentials = formData.credentials.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      credentials: updatedCredentials
    });
  };

  const handleSubmitForm = async () => {
    try {
      if (!formData.api_name.trim()) {
        alert("API name is required");
        return;
      }

      if (editingAPI) {
        const res = await api.put(
          `/third-party-apis/${editingAPI.id}`,
          formData
        );
        console.log("API UPDATED =>", res.data);
        alert("API configuration updated successfully");
      } else {
        const res = await api.post(
          "/third-party-apis",
          formData
        );
        console.log("API CREATED =>", res.data);
        alert("API configuration created successfully");
      }

      setShowForm(false);
      loadAPIs();
    } catch (error) {
      console.log("SUBMIT ERROR =>", error.response?.data);
      alert(JSON.stringify(error.response?.data || error.message));
    }
  };

  const handleToggleAPI = async (apiId, currentStatus) => {
    try {
      const res = await api.patch(
        `/third-party-apis/${apiId}/toggle`,
        { is_enabled: !currentStatus }
      );
      console.log("API TOGGLED =>", res.data);
      loadAPIs();
    } catch (error) {
      console.log("TOGGLE ERROR =>", error.response?.data);
      alert("Error toggling API status");
    }
  };

  const handleTestAPI = async (apiId) => {
    try {
      const res = await api.post(
        `/third-party-apis/${apiId}/test`,
        {}
      );
      console.log("TEST RESULT =>", res.data);
      alert(`✓ ${res.data.message}`);
    } catch (error) {
      console.log("TEST ERROR =>", error.response?.data);
      alert(`✗ ${error.response?.data?.message || "Connection failed"}`);
    }
  };

  const handleDeleteAPI = async (apiId) => {
    if (!window.confirm("Are you sure you want to delete this API configuration?")) {
      return;
    }

    try {
      const res = await api.delete(`/third-party-apis/${apiId}`);
      console.log("API DELETED =>", res.data);
      alert("API configuration deleted successfully");
      loadAPIs();
    } catch (error) {
      console.log("DELETE ERROR =>", error.response?.data);
      alert("Error deleting API");
    }
  };

  return (

    <MainLayout>

      <div className="module-page">

        <div className="module-header">
          <h1 className="module-title">3rd Party APIs</h1>
          {!showForm && (
            <button
              className="primary-btn"
              onClick={handleAddAPI}
            >
              Add New API
            </button>
          )}
        </div>

        {showForm ? (
          // Form View
          <div style={{ background: "white", padding: "24px", borderRadius: "8px", boxShadow: "0 1px 3px rgba(0,0,0,0.1)" }}>

            <h2 style={{ marginTop: "0" }}>
              {editingAPI ? "Edit API Configuration" : "Add New API Configuration"}
            </h2>

            <div className="form-grid">

              <FormInput
                label="API Name"
                name="api_name"
                value={formData.api_name}
                onChange={handleFormChange}
                placeholder="e.g., CINT API, Imperium API"
              />

              <FormTextarea
                label="Description"
                name="description"
                value={formData.description}
                onChange={handleFormChange}
                placeholder="Brief description of this API"
                rows="3"
              />

            

            </div>

            <div style={{ marginTop: "24px" }}>
              <h3 style={{ marginBottom: "16px" }}>API Credentials</h3>

              {formData.credentials.map((cred, index) => (
                <div
                  key={index}
                  style={{
                    marginBottom: "20px",
                    padding: "16px",
                    background: "#f9fafb",
                    borderRadius: "8px",
                    border: "1px solid #e5e7eb"
                  }}
                >

                  <div className="form-grid">

                    <FormInput
                      label="Credential Key"
                      value={cred.credential_key}
                      onChange={(e) => handleCredentialChange(index, "credential_key", e.target.value)}
                      placeholder="e.g., API_KEY, SECRET_KEY, ACCESS_TOKEN"
                    />

                    <FormInput
                      label="Credential Value"
                      type="password"
                      value={cred.credential_value}
                      onChange={(e) => handleCredentialChange(index, "credential_value", e.target.value)}
                      placeholder="Enter credential value"
                    />
                    <FormInput
  label="Base URL"
  name="base_url"
  value={formData.base_url}
  onChange={handleFormChange}
  placeholder="https://api.cint.com"
/>

<FormInput
  label="Test URL"
  name="test_url"
  value={formData.test_url}
  onChange={handleFormChange}
  placeholder="https://api.cint.com/identity/v1/me"
/>

<FormInput
  label="Auth Type"
  name="auth_type"
  value={formData.auth_type}
  onChange={handleFormChange}
  placeholder="bearer"
/>

<FormInput
  label="Request Method"
  name="request_method"
  value={formData.request_method}
  onChange={handleFormChange}
  placeholder="GET"
/>

<FormInput
  label="Projects Endpoint"
  name="projects_endpoint"
  value={formData.projects_endpoint || ""}
  onChange={handleFormChange}
  placeholder="/user/forms"
/>

<FormInput
  label="Responses Endpoint"
  name="responses_endpoint"
  value={formData.responses_endpoint || ""}
  onChange={handleFormChange}
  placeholder="/form/{formId}/submissions"
/>

<FormInput
  label="Response Path"
  name="response_path"
  value={formData.response_path || ""}
  onChange={handleFormChange}
  placeholder="content"
/>

<FormInput
  label="ID Field"
  name="id_field"
  value={formData.id_field || ""}
  onChange={handleFormChange}
  placeholder="id"
/>

<FormInput
  label="Name Field"
  name="name_field"
  value={formData.name_field || ""}
  onChange={handleFormChange}
  placeholder="title"
/>

<FormInput
  label="Auth Header (Optional)"
  name="auth_header"
  value={formData.auth_header || ""}
  onChange={handleFormChange}
  placeholder="APIKEY"
/>

<FormInput
  label="Auth Query Parameter"
  name="auth_query_param"
  value={formData.auth_query_param || ""}
  onChange={handleFormChange}
  placeholder="apiKey"
/>

                  </div>

                  <div style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    marginTop: "12px"
                  }}>

                    <label style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }}>
                      <input
                        type="checkbox"
                        checked={cred.is_secret || false}
                        onChange={(e) => handleCredentialChange(index, "is_secret", e.target.checked)}
                      />
                      <span style={{ fontSize: "14px" }}>Mark as Secret</span>
                    </label>

                    {formData.credentials.length > 1 && (
                      <button
                        onClick={() => handleRemoveCredential(index)}
                        style={{
                          marginLeft: "auto",
                          padding: "6px 12px",
                          background: "#ef4444",
                          color: "white",
                          border: "none",
                          borderRadius: "4px",
                          cursor: "pointer",
                          fontSize: "12px"
                        }}
                      >
                        Remove
                      </button>
                    )}

                  </div>

                </div>
              ))}

              <button
                onClick={handleAddCredential}
                style={{
                  padding: "8px 16px",
                  background: "#6b7280",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                  fontSize: "14px",
                  marginBottom: "24px"
                }}
              >
                + Add Another Credential
              </button>

            </div>

            <div className="form-actions">

              <button
                onClick={handleSubmitForm}
                className="save-btn"
              >
                {editingAPI ? "Update Configuration" : "Create Configuration"}
              </button>

              <button
                onClick={() => setShowForm(false)}
                style={{
                  padding: "10px 20px",
                  background: "#e5e7eb",
                  color: "#374151",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                  fontSize: "14px",
                  fontWeight: "500"
                }}
              >
                Cancel
              </button>

            </div>

          </div>
        ) : (
          // List View
          <div>

            {loading ? (
              <div style={{ textAlign: "center", padding: "40px", color: "#999" }}>
                Loading API configurations...
              </div>
            ) : apis.length > 0 ? (
              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))",
                gap: "20px"
              }}>

                {apis.map((apiConfig) => (
                  <div
                    key={apiConfig.id}
                    style={{
                      background: "white",
                      padding: "20px",
                      borderRadius: "8px",
                      boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                      border: `2px solid ${apiConfig.is_enabled ? "#10b981" : "#e5e7eb"}`
                    }}
                  >
  <div className="mt-3 text-sm">

  <p>
    <strong>Projects:</strong>{" "}
    {apiConfig.projects ?? 0}
  </p>

  <p>
    <strong>Respondents:</strong>{" "}
    {apiConfig.respondents ?? 0}
  </p>

  <p>
    <strong>Last Sync:</strong>{" "}
    {apiConfig.last_sync
      ? new Date(apiConfig.last_sync).toLocaleString()
      : "Never"}
  </p>

</div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", marginBottom: "12px" }}>

                      <div>
                        <h3 style={{ margin: "0 0 4px 0", fontSize: "16px", fontWeight: "600" }}>
                          {apiConfig.api_name}
                        </h3>
                        <p style={{ margin: "0", fontSize: "12px", color: "#999" }}>
                          {apiConfig.description || "No description"}
                        </p>
                      </div>

                      <div style={{
                        display: "inline-block",
                        padding: "4px 12px",
                        background: apiConfig.is_enabled ? "#dcfce7" : "#f3f4f6",
                        color: apiConfig.is_enabled ? "#166534" : "#6b7280",
                        borderRadius: "20px",
                        fontSize: "12px",
                        fontWeight: "500"
                      }}>
                        {apiConfig.is_enabled ? "Active" : "Inactive"}
                      </div>

                    </div>

                    <div style={{
                      background: "#f9fafb",
                      padding: "12px",
                      borderRadius: "6px",
                      marginBottom: "12px"
                    }}>
                      <p style={{ margin: "0 0 8px 0", fontSize: "12px", fontWeight: "500", color: "#374151" }}>
                        Credentials ({apiConfig.credentials?.length || 0}):
                      </p>
                      {apiConfig.credentials && apiConfig.credentials.length > 0 ? (
                        <ul style={{ margin: "0", padding: "0 0 0 20px", fontSize: "12px", color: "#666" }}>
                          {apiConfig.credentials.map((cred, idx) => (
                            <li key={idx}>
                              {cred.credential_key} {cred.is_secret && "🔒"}
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p style={{ margin: "0", fontSize: "12px", color: "#999" }}>No credentials</p>
                      )}
                    </div>

                    <div style={{
                      display: "flex",
                      gap: "8px",
                      flexWrap: "wrap"
                    }}>

                      <button
                        onClick={() => handleEditAPI(apiConfig)}
                        style={{
                          flex: 1,
                          minWidth: "80px",
                          padding: "8px 12px",
                          background: "#3b82f6",
                          color: "white",
                          border: "none",
                          borderRadius: "4px",
                          cursor: "pointer",
                          fontSize: "12px",
                          fontWeight: "500"
                        }}
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => handleToggleAPI(apiConfig.id, apiConfig.is_enabled)}
                        style={{
                          flex: 1,
                          minWidth: "80px",
                          padding: "8px 12px",
                          background: apiConfig.is_enabled ? "#f59e0b" : "#10b981",
                          color: "white",
                          border: "none",
                          borderRadius: "4px",
                          cursor: "pointer",
                          fontSize: "12px",
                          fontWeight: "500"
                        }}
                      >
                        {apiConfig.is_enabled ? "Disable" : "Enable"}
                      </button>

                      <button
                        onClick={() => handleTestAPI(apiConfig.id)}
                        style={{
                          flex: 1,
                          minWidth: "80px",
                          padding: "8px 12px",
                          background: "#8b5cf6",
                          color: "white",
                          border: "none",
                          borderRadius: "4px",
                          cursor: "pointer",
                          fontSize: "12px",
                          fontWeight: "500"
                        }}
                      >
                        Test
                      </button>
<button
  onClick={() => handleSync(apiConfig.id)}
  style={{
    flex: 1,
    minWidth: "80px",
    padding: "8px 12px",
    background: "#059669",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer"
  }}
>
  Sync
</button>
                      <button
                        onClick={() => handleDeleteAPI(apiConfig.id)}
                        style={{
                          flex: 1,
                          minWidth: "80px",
                          padding: "8px 12px",
                          background: "#ef4444",
                          color: "white",
                          border: "none",
                          borderRadius: "4px",
                          cursor: "pointer",
                          fontSize: "12px",
                          fontWeight: "500"
                        }}
                      >
                        Delete
                      </button>

                    </div>

                  </div>
                ))}

              </div>
            ) : (
              <div style={{
                textAlign: "center",
                padding: "40px",
                background: "white",
                borderRadius: "8px",
                color: "#999"
              }}>
                No API configurations yet. Click "Add New API" to get started.
              </div>
            )}

          </div>
        )}

      </div>

    </MainLayout>

  );

}

export default ThirdPartyAPIs;
