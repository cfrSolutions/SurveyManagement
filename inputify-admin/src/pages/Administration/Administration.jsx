// import { useState } from "react";

// import UserManagement from "./UserManagement";
// import Roles from "../admin/Roles";
// import ActivityLogs from "./ActivityLogs";

// export default function Administration() {

//   const [activeTab, setActiveTab] =
//     useState("users");

//   return (
//     <div className="p-6">

//       <div className="mb-6">

//         <h1 className="text-2xl font-bold">
//           Administration
//         </h1>

//         <p className="text-gray-500">
//           Manage users, roles and activity logs
//         </p>

//       </div>

//       <div className="flex gap-3 mb-6">

//         <button
//           onClick={() =>
//             setActiveTab("users")
//           }
//           className={`px-4 py-2 rounded-lg ${
//             activeTab === "users"
//               ? "bg-blue-600 text-white"
//               : "bg-gray-100"
//           }`}
//         >
//           Users
//         </button>

//         <button
//           onClick={() =>
//             setActiveTab("roles")
//           }
//           className={`px-4 py-2 rounded-lg ${
//             activeTab === "roles"
//               ? "bg-blue-600 text-white"
//               : "bg-gray-100"
//           }`}
//         >
//           Roles
//         </button>

//         <button
//           onClick={() =>
//             setActiveTab("logs")
//           }
//           className={`px-4 py-2 rounded-lg ${
//             activeTab === "logs"
//               ? "bg-blue-600 text-white"
//               : "bg-gray-100"
//           }`}
//         >
//           Activity Logs
//         </button>

//       </div>

//       <div>

//         {activeTab === "users" && (
//           <UserManagement />
//         )}

//         {activeTab === "roles" && (
//           <Roles />
//         )}

//         {activeTab === "logs" && (
//           <ActivityLogs />
//         )}

//       </div>

//     </div>
//   );
// }


// import { Outlet } from "react-router-dom";

// import {
//   Users,
//   ShieldCheck,
//   ClipboardList
// } from "lucide-react";

// import { NavLink } from "react-router-dom";

// export default function Administration() {

//   return (

//     <div className="flex h-full">

//       <div className="w-64 bg-white border-r">

//         <div className="p-6">

//           <h2 className="text-xl font-bold">
//             Administration
//           </h2>

//           <p className="text-gray-500 text-sm mt-1">
//             Manage platform settings
//           </p>

//         </div>

//         <div className="px-3 space-y-2">

//           <NavLink
//             to="/administration/users"
//             className={({isActive}) =>
//               isActive
//                 ? "flex items-center gap-3 px-4 py-3 rounded-xl bg-blue-50 text-blue-600 font-semibold"
//                 : "flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-100"
//             }
//           >
//             <Users size={18}/>
//             Users
//           </NavLink>

//           <NavLink
//             to="/administration/roles"
//             className={({isActive}) =>
//               isActive
//                 ? "flex items-center gap-3 px-4 py-3 rounded-xl bg-blue-50 text-blue-600 font-semibold"
//                 : "flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-100"
//             }
//           >
//             <ShieldCheck size={18}/>
//             Roles
//           </NavLink>

//           <NavLink
//             to="/administration/activity-logs"
//             className={({isActive}) =>
//               isActive
//                 ? "flex items-center gap-3 px-4 py-3 rounded-xl bg-blue-50 text-blue-600 font-semibold"
//                 : "flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-100"
//             }
//           >
//             <ClipboardList size={18}/>
//             Activity Logs
//           </NavLink>

//         </div>

//       </div>

//       <div className="flex-1 bg-gray-50">

//         <Outlet />

//       </div>

//     </div>

//   );

// }