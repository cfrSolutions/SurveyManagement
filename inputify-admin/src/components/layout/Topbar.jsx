import { Bell, Search } from "lucide-react";
import "../../styles/layout.css";
function Topbar() {

  return (

    <div className="topbar">

      <div>

        <h2 className="topbar-title">
          Dashboard
        </h2>

        <p className="topbar-subtitle">
          Welcome Back Admin
        </p>

      </div>

      <div className="topbar-right">

        <div className="topbar-search">

          <Search size={18} />

          <input
            type="text"
            placeholder="Search..."
          />

        </div>

        <button className="topbar-icon">

          <Bell size={20} />

        </button>

        <div className="topbar-avatar">
          A
        </div>

      </div>

    </div>

  );

}

export default Topbar;