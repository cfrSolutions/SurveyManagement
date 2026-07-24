import { useNavigate } from "react-router-dom";

import MainLayout from "../../components/layout/MainLayout";
import PageHeader from "../../components/common/PageHeader";

import "../../styles/module.css";

function Settings() {

  const navigate = useNavigate();

  const settingsOptions = [
    {
      title: "3rd Party APIs",
      description: "Manage API credentials for external services",
      icon: "🔌",
      path: "/settings/third-party-apis"
    },
    {
      title: "Email Templates",
      description: "Configure email templates and settings",
      icon: "📧",
      path: "/settings/email-templates"
    },
    {
      title: "General Settings",
      description: "General application settings",
      icon: "⚙️",
      path: "/settings/general"
    }
  ];

  return (

    <MainLayout>

      <div className="module-page">

        <PageHeader title="Settings" />

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: "20px"
        }}>

          {settingsOptions.map((option, index) => (
            <div
              key={index}
              onClick={() => navigate(option.path)}
              style={{
                background: "white",
                padding: "24px",
                borderRadius: "8px",
                boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                cursor: "pointer",
                transition: "all 0.3s ease",
                border: "2px solid transparent"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.15)";
                e.currentTarget.style.borderColor = "#3b82f6";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = "0 1px 3px rgba(0,0,0,0.1)";
                e.currentTarget.style.borderColor = "transparent";
              }}
            >

              <div style={{ fontSize: "32px", marginBottom: "12px" }}>
                {option.icon}
              </div>

              <h3 style={{ margin: "0 0 8px 0", fontSize: "16px", fontWeight: "600" }}>
                {option.title}
              </h3>

              <p style={{ margin: "0", fontSize: "13px", color: "#999" }}>
                {option.description}
              </p>

              <div style={{
                marginTop: "16px",
                paddingTop: "16px",
                borderTop: "1px solid #e5e7eb"
              }}>
                <button
                  style={{
                    width: "100%",
                    padding: "8px 12px",
                    background: "#3b82f6",
                    color: "white",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                    fontSize: "13px",
                    fontWeight: "500"
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(option.path);
                  }}
                >
                  Configure →
                </button>
              </div>

            </div>
          ))}

        </div>

      </div>

    </MainLayout>

  );

}

export default Settings;
