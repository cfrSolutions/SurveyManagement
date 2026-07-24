import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import "../../styles/layout.css";

function MainLayout({ children }) {

  return (
    <div>

      <Sidebar />

      <div
        style={{
          marginLeft: "280px",
          padding: "24px"
        }}
      >

        <Topbar />

        <div style={{ marginTop: "24px" }}>
          {children}
        </div>

      </div>

    </div>
  );
}

export default MainLayout;