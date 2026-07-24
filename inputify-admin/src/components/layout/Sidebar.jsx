// import {
//   LayoutDashboard,
//   BriefcaseBusiness,
//   Building2,
//   Users,
//   UserCog,
//   BarChart3,
//   Settings,
//   LogOut
// } from "lucide-react";

// import { NavLink, useNavigate } from "react-router-dom";
// import { useContext } from "react";
// import { AuthContext } from "../../context/AuthContext";

// import "../../styles/sidebar.css";

// function Sidebar() {

//   const navigate = useNavigate();
//   const auth = useContext(AuthContext) || {};
//   const { user } = auth;
//   const storedUser = user || JSON.parse(localStorage.getItem("user") || "null");

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");

//     navigate("/login");
//   };

//   let menu = [
//     {
//       title: "Dashboard",
//       icon: <LayoutDashboard size={20} />,
//       path: "/"
//     },
//     {
//       title: "Projects",
//       icon: <BriefcaseBusiness size={20} />,
//       path: "/projects"
//     },
//     {
//       title: "Clients",
//       icon: <Building2 size={20} />,
//       path: "/clients"
//     },
//     {
//       title: "Vendors",
//       icon: <Users size={20} />,
//       path: "/vendors"
//     },
//     {
//   title: "Administration",
//   icon: <UserCog size={20} />,
//   path: "/administration"
// },
//     {
//       title: "Employees",
//       icon: <UserCog size={20} />,
//       path: "/employees"
//     },
//     {
//       title: "Reports",
//       icon: <BarChart3 size={20} />,
//       path: "/reports"
//     },
//     {
//       title: "Settings",
//       icon: <Settings size={20} />,
//       path: "/settings"
//     }
//   ];

//   if (storedUser?.userType === "CLIENT") {
//     menu = [
//       {
//         title: "Client Dashboard",
//         icon: <LayoutDashboard size={20} />,
//         path: "/client-dashboard"
//       },
//       {
//         title: "Projects",
//         icon: <BriefcaseBusiness size={20} />,
//         path: "/projects"
//       }
//     ];
//   } else if (storedUser?.userType === "VENDOR") {
//     menu = [
//       {
//         title: "Vendor Dashboard",
//         icon: <LayoutDashboard size={20} />,
//         path: "/vendor-dashboard"
//       },
//       {
//         title: "Projects",
//         icon: <BriefcaseBusiness size={20} />,
//         path: "/projects"
//       }
//     ];
//   }

//   return (
//     <aside className="sidebar">

//       <div>

//         <div className="sidebar-logo">

//           <h1>INPUTIFY</h1>

//           <p>Survey Management</p>

//         </div>

//         <div className="sidebar-menu">

//           {menu.map((item) => (

//             <NavLink
//               key={item.title}
//               to={item.path}
//               className={({ isActive }) =>
//                 isActive
//                   ? "menu-item active-menu"
//                   : "menu-item"
//               }
//             >

//               {item.icon}

//               <span>{item.title}</span>

//             </NavLink>

//           ))}

//         </div>

//       </div>

//       <button
//         className="logout-btn"
//         onClick={handleLogout}
//       >
//         <LogOut size={18} />
//         Logout
//       </button>

//     </aside>
//   );
// }

// export default Sidebar;


import {
  LayoutDashboard,
  BriefcaseBusiness,
  Building2,
  Users,
  UserCog,
  BarChart3,
  Settings,
  LogOut,
  ShieldCheck,
  ClipboardList,
  Palette
} from "lucide-react";

import { NavLink, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

import "../../styles/sidebar.css";

export default function Sidebar() {

  const navigate = useNavigate();

  const auth = useContext(AuthContext) || {};

  const { user } = auth;

  const storedUser =
    user ||
    JSON.parse(localStorage.getItem("user") || "null");

  const handleLogout = () => {

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");

  };

  if (storedUser?.userType === "CLIENT") {

    return (
      <aside className="sidebar">

        <div>

          <div className="sidebar-logo">
            <h1>INPUTIFY</h1>
            <p>Survey Management</p>
          </div>

          <div className="sidebar-section">
            <p className="sidebar-title">
              Overview
            </p>

            <NavLink
              to="/client-dashboard"
              className={({ isActive }) =>
                isActive
                  ? "menu-item active-menu"
                  : "menu-item"
              }
            >
              <LayoutDashboard size={20} />
              <span>Dashboard</span>
            </NavLink>

            <NavLink
              to="/projects"
              className={({ isActive }) =>
                isActive
                  ? "menu-item active-menu"
                  : "menu-item"
              }
            >
              <BriefcaseBusiness size={20} />
              <span>Projects</span>
            </NavLink>

          </div>

        </div>

        <button
          className="logout-btn"
          onClick={handleLogout}
        >
          <LogOut size={18} />
          Logout
        </button>

      </aside>
    );

  }

  if (storedUser?.userType === "VENDOR") {

    return (
      <aside className="sidebar">

        <div>

          <div className="sidebar-logo">
            <h1>INPUTIFY</h1>
            <p>Survey Management</p>
          </div>

          <div className="sidebar-section">

            <p className="sidebar-title">
              Overview
            </p>

            <NavLink
              to="/vendor-dashboard"
              className={({ isActive }) =>
                isActive
                  ? "menu-item active-menu"
                  : "menu-item"
              }
            >
              <LayoutDashboard size={20} />
              <span>Dashboard</span>
            </NavLink>

            <NavLink
              to="/projects"
              className={({ isActive }) =>
                isActive
                  ? "menu-item active-menu"
                  : "menu-item"
              }
            >
              <BriefcaseBusiness size={20} />
              <span>Projects</span>
            </NavLink>

          </div>

        </div>

        <button
          className="logout-btn"
          onClick={handleLogout}
        >
          <LogOut size={18} />
          Logout
        </button>

      </aside>
    );

  }

  return (

    <aside className="sidebar">

      <div>

        <div className="sidebar-logo">

          <h1>INPUTIFY</h1>

          <p>Survey Management</p>

        </div>

        {/* Overview */}

        <div className="sidebar-section">

          <p className="sidebar-title">
            Overview
          </p>

          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              isActive
                ? "menu-item active-menu"
                : "menu-item"
            }
          >
            <LayoutDashboard size={20} />
            <span>Dashboard</span>
          </NavLink>

        </div>

        {/* Management */}

        <div className="sidebar-section">

          <p className="sidebar-title">
            Management
          </p>

          <NavLink
            to="/projects"
            className={({ isActive }) =>
              isActive
                ? "menu-item active-menu"
                : "menu-item"
            }
          >
            <BriefcaseBusiness size={20} />
            <span>Projects</span>
          </NavLink>

          <NavLink
            to="/clients"
            className={({ isActive }) =>
              isActive
                ? "menu-item active-menu"
                : "menu-item"
            }
          >
            <Building2 size={20} />
            <span>Clients</span>
          </NavLink>

          <NavLink
            to="/vendors"
            className={({ isActive }) =>
              isActive
                ? "menu-item active-menu"
                : "menu-item"
            }
          >
            <Users size={20} />
            <span>Vendors</span>
          </NavLink>

        </div>

        {/* Administration */}

        <div className="sidebar-section">

          <p className="sidebar-title">
            Administration
          </p>

          <NavLink
            to="/administration/users"
            className={({ isActive }) =>
              isActive
                ? "menu-item active-menu"
                : "menu-item"
            }
          >
            <UserCog size={20} />
            <span>Users</span>
          </NavLink>

          <NavLink
            to="/administration/roles"
            className={({ isActive }) =>
              isActive
                ? "menu-item active-menu"
                : "menu-item"
            }
          >
            <ShieldCheck size={20} />
            <span>Roles</span>
          </NavLink>

          <NavLink
           to="/administration/activity-logs"
            className={({ isActive }) =>
              isActive
                ? "menu-item active-menu"
                : "menu-item"
            }
          >
            <ClipboardList size={20} />
            <span>Activity Logs</span>
          </NavLink>

        </div>

        {/* Reports */}

        <div className="sidebar-section">

          <p className="sidebar-title">
            Analytics
          </p>

          <NavLink
            to="/reports"
            className={({ isActive }) =>
              isActive
                ? "menu-item active-menu"
                : "menu-item"
            }
          >
            <BarChart3 size={20} />
            <span>Reports</span>
          </NavLink>

          <NavLink
            to="/settings"
            className={({ isActive }) =>
              isActive
                ? "menu-item active-menu"
                : "menu-item"
            }
          >
            <Settings size={20} />
            <span>Settings</span>
          </NavLink>
<NavLink
    to="/thank-you-pages"
    className={({ isActive }) =>
        isActive
            ? "menu-item active-menu"
            : "menu-item"
    }
>
    <Palette size={20} />
    <span>Thank You Pages</span>
</NavLink>
        </div>

      </div>

      <button
        className="logout-btn"
        onClick={handleLogout}
      >
        <LogOut size={18} />
        Logout
      </button>

    </aside>

  );

}