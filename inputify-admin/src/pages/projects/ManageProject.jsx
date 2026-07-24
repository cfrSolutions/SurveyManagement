// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { useNavigate } from "react-router-dom";

// import api from "../../services/api";

// import MainLayout from "../../components/layout/MainLayout";

// import "../../styles/project.css";
// import "../../styles/form.css";


// function ManageProject() {
//  const { id } = useParams();

// const navigate = useNavigate();
// const [vendorStats, setVendorStats] =
//   useState({});

// const [showLinkModal, setShowLinkModal] =
//   useState(false);

//   const [selectedRedirects, setSelectedRedirects] =
//   useState({
//     survey: "",
//     complete: "",
//     dq: "",
//     qf: ""
//   });

// // const [selectedLinks, setSelectedLinks] =
// //   useState({
// //     redirectUrl: "",
// //     completeUrl: "",
// //     dqUrl: "",
// //     qfUrl: ""
// //   });
// // const [links, setLinks] = useState({
// //   redirectUrl: "",
// //   completeUrl: "",
// //   dqUrl: "",
// //   qfUrl: ""
// // });

// const [stats, setStats] =
// useState({
//    totalRespondents: 0,
//   started: 0,
//   completed: 0,
//   disqualified: 0,
//   quotaFull: 0,
//   terminated: 0,
//   completionRate: 0,
//   incidenceRate: 0,
//   remaining: 0
// });

// const loadStats = async () => {

//   try {

//     const res =
//       await api.get(
//         `/survey/project-stats/${id}`
//       );

//     setStats(res.data);

//   } catch (err) {

//     console.log(err);

//   }

// };



// const loadLinks = async () => {
//   try {

//     const res = await api.get(
//       `/survey/redirect-links/${id}`
//     );

//     setSelectedRedirects({
//       survey: res.data.redirectLinks.capture.url,
//       complete: res.data.redirectLinks.complete.url,
//       dq: res.data.redirectLinks.disqualified.url,
//       qf: res.data.redirectLinks.quotaFull.url
//     });

//   } catch (err) {

//     console.log(err);

//   }
// };

// // const loadLinks = async () => {
// //   try {

// //     const res = await api.get(
// //       `/survey/links/${id}?vendorId=test`
// //     );

// //     setLinks(res.data);

// //   } catch (error) {
// //     console.log(error);
// //   }
// // };

//   const [project, setProject] = useState({

//     project_name: "",
//     friendly_name: "",
//     parent_project: "",

//     client_id: "",
//     client_contact_id: "",

//     project_manager: "",
//     sales_person: "",

//     country: "",

//     req_completes: "",
//     max_completes: "",

//     cpi: "",
//     ir: "",
//     loi: "",
//     award_points: "",

//     survey_link: "",
//     test_link: "",

//     notes: "",

//     status: "Testing",

//     use_test_link: false,
//     use_pixel_link: false,
//     use_prescreener: false

//   });
// const trackingParam = project.tracking_param || "PID";
//   const [clients, setClients] =
//   useState([]);

//   const [contacts, setContacts] =
//   useState([]);
// // const [internalVendorId, setInternalVendorId] =
// //   useState("");
  
// //   const [internalLink, setInternalLink] = useState("");
//   const [allocations,
// setAllocations] =
// useState([]);

//   useEffect(() => {

//   loadProject();
//   loadClients();
//   loadAllocations();
//   // loadInternalLink();
//   // Vendor redirect URLs are deterministic; no /survey/links request is needed.
 
//   loadStats();
//   loadLinks();

// }, []);

//   const loadProject = async () => {

//   try {

//     const res = await api.get(
//       `/projects/${id}`
//     );

//     setProject(res.data || {});
//     if (res.data?.client_id) {

//       loadClientContacts(
//         res.data.client_id
//       );

//     }

// //    setInternalLink(
// //   `${API_URL}/survey/internal/${id}`
// // );

//   } catch (error) {

//     console.log(error);

//   }

// };
// // const loadInternalLink = async () => {

// //   setInternalLink(
// //     `${API_URL}/api/survey/internal/${id}`
// //   );

// // };

// // const loadInternalVendor = async () => {
// //   try {

// //     const res = await api.get(
// //       `/survey/internal-links/${id}`
// //     );

// //     setInternalVendorId(
// //       res.data.vendorId
// //     );

// //   } catch (error) {

// //     console.log(error);

// //   }
// // };

//   const loadClients = async () => {

//     try {

//       const res =
//       await api.get(
//         "/clients"
//       );

//       setClients(
//         res.data || []
//       );

//     }
//     catch(error){

//       console.log(error);

//     }

//   };
//   const [showLogs,setShowLogs] =
// useState(false);

// const [respondents,
// setRespondents] =
// useState([]);

// const openRespondents =
// async (vendorId) => {

//   const res =
//     await api.get(
//       `/survey/respondents/${id}/${vendorId}`
//     );

//   setRespondents(
//     res.data
//   );

//   setShowLogs(true);
// };

//   const loadVendorStats =
// async () => {

//   const result = {};

//   for (const item of allocations) {

//     const res =
//       await api.get(
//         `/survey/stats/${id}/${item.vendor_id}`
//       );

//     result[item.vendor_id] =
//       res.data;
//   }

//   setVendorStats(result);
// };

// useEffect(() => {

//   if (allocations.length) {
//     loadVendorStats();
//   }

// }, [allocations]);

//   const loadClientContacts =
//   async(clientId)=>{

//     try {

//       const res =
//       await api.get(
//         `/client-contacts/${clientId}`
//       );

//       setContacts(
//         res.data || []
//       );

//     }
//     catch(error){

//       console.log(error);

//     }

//   };

//   const loadAllocations =
// async()=>{

//  try{

//   const res =
//   await api.get(
//    `/vendor-allocations/${id}`
//   );

//   setAllocations(
//    res.data || []
//   );

//  }
//  catch(error){

//   console.log(error);

//  }

// };

//   const handleChange = (e) => {

//     const {
//       name,
//       value,
//       type,
//       checked
//     } = e.target;

//     setProject({

//       ...project,

//       [name]:
//       type === "checkbox"
//       ? checked
//       : value

//     });

//   };

//  const saveProject = async () => {

//   try {

//     const payload = {
//       ...project,

//       live_survey_link: project.survey_link,
//       test_survey_link: project.test_link,
//     };

//     delete payload.survey_link;
//     delete payload.test_link;

//     await api.put(
//       `/projects/${id}`,
//       payload
//     );

//     alert("Project Updated Successfully");

//   } catch (error) {

//     console.log(error);
//     console.log(error.response?.data);

//     alert(
//       error.response?.data?.message ||
//       "Failed To Update Project"
//     );

//   }

// };

//   return (

//     <MainLayout>

//       <div className="project-page">

//         <div
//           style={{
//             display:"grid",
//             gridTemplateColumns:"3fr 1fr",
//             gap:"20px"
//           }}
//         >

//           {/* LEFT SIDE */}

//           <div>

//             {/* PROJECT IDENTIFICATION */}

//             <div className="project-card">

//               <h3>
//                 Project Identification
//               </h3>

//               <div className="project-grid">

//                 <div>

//                   <label>
//                     Project Full Name
//                   </label>

//                   <input
//                     name="project_name"
//                     value={project.project_name || ""}
//                     onChange={handleChange}
//                   />

//                 </div>

//                 <div>

//                   <label>
//                     Project Abbreviation
//                   </label>

//                   <input
//                     name="friendly_name"
//                     value={project.friendly_name || ""}
//                     onChange={handleChange}
//                   />

//                 </div>

//                 <div>

//                   <label>
//                     Parent Project
//                   </label>

//                   <input
//                     name="parent_project"
//                     value={project.parent_project || ""}
//                     onChange={handleChange}
//                   />

//                 </div>

//               </div>

//             </div>

//             {/* CONTACTS */}

//             <div className="project-card">

//               <h3>
//                 Contacts, Team & Region
//               </h3>

//               <div className="project-grid">

//                 <div>

//                   <label>
//                     Client
//                   </label>

//                   <select
//                     name="client_id"
//                     value={project.client_id || ""}
//                     onChange={(e)=>{

//                       handleChange(e);

//                       loadClientContacts(
//                         e.target.value
//                       );

//                     }}
//                   >

//                     <option value="">
//                       Select Client
//                     </option>

//                     {
//                       clients.map(
//                         (client)=>(
//                         <option
//                           key={client.id}
//                           value={client.id}
//                         >
//                           {client.company_name}
//                         </option>
//                       ))
//                     }

//                   </select>

//                 </div>

//                 <div>

//                   <label>
//                     Client Contact
//                   </label>

//                   <select
//                     name="client_contact_id"
//                     value={project.client_contact_id || ""}
//                     onChange={handleChange}
//                   >

//                     <option value="">
//                       Select Contact
//                     </option>

//                     {
//                       contacts.map(
//                         (contact)=>(
//                         <option
//                           key={contact.id}
//                           value={contact.id}
//                         >
//                           {contact.name}
//                         </option>
//                       ))
//                     }

//                   </select>

//                 </div>

//                 <div>

//                   <label>
//                     Project Manager
//                   </label>

//                   <input
//                     name="project_manager"
//                     value={project.project_manager || ""}
//                     onChange={handleChange}
//                   />

//                 </div>

//                 <div>

//                   <label>
//                     Sales Person
//                   </label>

//                   <input
//                     name="sales_person"
//                     value={project.sales_person || ""}
//                     onChange={handleChange}
//                   />

//                 </div>

//                 <div>

//                   <label>
//                     Country
//                   </label>

//                   <input
//                     name="country"
//                     value={project.country || ""}
//                     onChange={handleChange}
//                   />

//                 </div>

//               </div>

//             </div>

//             {/* SURVEY CONFIG */}

//             <div className="project-card">

//               <h3>
//                 Survey Configuration
//               </h3>

//               <div className="project-grid">

//                 <input
//                   placeholder="Req Completes"
//                   name="req_completes"
//                   value={project.req_completes || ""}
//                   onChange={handleChange}
//                 />

//                 <input
//                   placeholder="Max Completes"
//                   name="max_completes"
//                   value={project.max_completes || ""}
//                   onChange={handleChange}
//                 />

//                 <input
//                   placeholder="CPI"
//                   name="cpi"
//                   value={project.cpi || ""}
//                   onChange={handleChange}
//                 />

//                 <input
//                   placeholder="IR"
//                   name="ir"
//                   value={project.ir || ""}
//                   onChange={handleChange}
//                 />

//                 <input
//                   placeholder="LOI"
//                   name="loi"
//                   value={project.loi || ""}
//                   onChange={handleChange}
//                 />

//                 <input
//                   placeholder="Award Points"
//                   name="award_points"
//                   value={project.award_points || ""}
//                   onChange={handleChange}
//                 />

//               </div>

//             </div>

//             {/* LINKS */}

//             <div className="project-card">

//               <h3>
//                 Survey Links
//               </h3>

//               <div className="project-grid">

//                 <textarea
//                   rows="5"
//                   name="survey_link"
//                   placeholder="Live Survey Link"
//                   value={project.survey_link || ""}
//                   onChange={handleChange}
//                 />

//                 <textarea
//                   rows="5"
//                   name="test_link"
//                   placeholder="Test Survey Link"
//                   value={project.test_link || ""}
//                   onChange={handleChange}
//                 />

//               </div>

//             </div>

//             {/* NOTES */}

//             <div className="project-card">

//               <h3>
//                 Notes
//               </h3>

//               <textarea
//                 rows="5"
//                 name="notes"
//                 value={project.notes || ""}
//                 onChange={handleChange}
//               />

//             </div>

//             {/* STATUS */}

//             <div className="project-card">

//               <h3>
//                 Project Status
//               </h3>

//               <select
//                 name="status"
//                 value={project.status || ""}
//                 onChange={handleChange}
//               >

//                 <option>
//                   Testing
//                 </option>

//                 <option>
//                   Running
//                 </option>

//                 <option>
//                   Hold
//                 </option>

//                 <option>
//                   Completed
//                 </option>

//                 <option>
//                   Closed
//                 </option>

//               </select>

//               <div
//                 style={{
//                   marginTop:"20px",
//                   display:"flex",
//                   gap:"20px"
//                 }}
//               >

//                 <label>

//                   <input
//                     type="checkbox"
//                     name="use_test_link"
//                     checked={project.use_test_link || false}
//                     onChange={handleChange}
//                   />

//                   Use Test Link

//                 </label>

//                 <label>

//                   <input
//                     type="checkbox"
//                     name="use_pixel_link"
//                     checked={project.use_pixel_link || false}
//                     onChange={handleChange}
//                   />

//                   Use Pixel Link

//                 </label>

//                 <label>

//                   <input
//                     type="checkbox"
//                     name="use_prescreener"
//                     checked={project.use_prescreener || false}
//                     onChange={handleChange}
//                   />

//                   Use Prescreener

//                 </label>

//               </div>

//             </div>

//             <button
//               className="save-btn"
//               onClick={saveProject}
//             >
//               Save Project
//             </button>

//           </div>

//           {/* RIGHT SIDE */}

// <div>
// <div className="project-card">
//   <div
//     style={{
//       display: "flex",
//       justifyContent: "space-between",
//       alignItems: "center",
//       marginBottom: 20,
//     }}
//   >
//     <h3>Manage Vendor(s)</h3>

//     <button
//       className="primary-btn"
//       onClick={() => navigate(`/projects/${id}/vendors/add`)}
//     >
//       Add Vendor
//     </button>
//   </div>

//   <div className="vendor-allocation-list">

//     {/* INTERNAL COMPANY */}

//     <div className="vendor-allocation-card internal-card">

//       <div className="vendor-top">

//         <div className="vendor-left">

//           <button
//             className="vendor-manage-btn"
//             onClick={() => navigate(`/vendors/${internalVendorId}`)}
//           >
//             ✎
//           </button>

//           <strong>Internal Company</strong>

//         </div>

//         <div className="vendor-right">

//           <button
//             className="vendor-icon-btn"
//             onClick={() => {
//               navigator.clipboard.writeText(
//                 selectedRedirects.survey || ""
//               );
//               alert("Survey Link Copied");
//             }}
//           >
//             📋
//           </button>

//           <button
//             className="vendor-icon-btn"
//             onClick={() => {
//               setShowLinkModal(true);
//             }}
//           >
//             📄
//           </button>

//         </div>

//       </div>

//       <textarea
//         rows={4}
//         readOnly
//         value={selectedRedirects.survey || ""}
//       />

//       <div className="vendor-stats">
//         <span>Redirects 0</span>
//         <span className="blue">Completed 0</span>
//         <span>DQ 0</span>
//         <span className="orange">QF 0</span>
//       </div>

//     </div>

//     {/* VENDORS */}

//     {allocations.length > 0 ? (

//       allocations.map((item, index) => (

//         <div
//           key={item.id || `${item.vendor_id}-${index}`}
//           className="vendor-allocation-card"
//         >

//           <div className="vendor-top">

//             <div className="vendor-left">

//               <button
//                 className="vendor-manage-btn"
//                 onClick={() =>
//                   navigate(`/vendors/${item.vendor_id}`)
//                 }
//               >
//                 ✎
//               </button>

//               <strong>
//                 {index + 1}.{" "}
//                 {item.vendors?.company_name ||
//                   item.vendor_name ||
//                   "Vendor"}
//               </strong>

//             </div>

//             <div className="vendor-right">

//   <button
//     className="vendor-icon-btn"
//     onClick={() => {
//       navigator.clipboard.writeText(
//         selectedRedirects.survey || ""
//       );
//       alert("Survey Link Copied");
//     }}
//   >
//     📋
//   </button>

//   <button
//     className="vendor-icon-btn"
//     onClick={() => {
//       setShowLinkModal(true);
//     }}
//   >
//     📄
//   </button>

// </div>
//           </div>

//           <textarea
//             rows={4}
//             readOnly
//             value={
//               selectedRedirects.survey || ""
//             }
//           />

//           <div className="vendor-stats">

//             <span>
//               Redirects{" "}
//               {vendorStats[item.vendor_id]?.started || 0}
//               /
//               {item.quota || 0}
//             </span>

//             <span
//               className="blue"
//               style={{ cursor: "pointer" }}
//               onClick={() =>
//                 openRespondents(item.vendor_id)
//               }
//             >
//               Completed{" "}
//               {vendorStats[item.vendor_id]?.completed || 0}
//               /
//               {item.quota || 0}
//             </span>

//             <span>
//               DQ{" "}
//               {vendorStats[item.vendor_id]?.disqualified || 0}
//             </span>

//             <span className="orange">
//               QF{" "}
//               {vendorStats[item.vendor_id]?.quotaFull || 0}
//             </span>

//           </div>

//           <div className="vendor-stats">

//             <span>
//               IR {item.ir || 0}%
//             </span>

//             <span>
//               CPC {item.cpi || 0}
//             </span>

//             <span>
//               Status{" "}
//               <strong>{item.status}</strong>
//             </span>

//           </div>

//         </div>

//       ))

//     ) : (

//       <p>No Vendors Allocated</p>

//     )}

//   </div>

//   <button
//     className="primary-btn"
//     style={{ marginTop: 20 }}
//     onClick={() =>
//       navigate(`/projects/${id}/vendors/add`)
//     }
//   >
//     Add Vendor To Current Project
//   </button>

// </div>
 


//   {showLogs && (
//   <div
//     style={{
//       position: "fixed",
//       top: 0,
//       left: 0,
//       width: "100vw",
//       height: "100vh",
//       background: "rgba(0,0,0,0.6)",
//       display: "flex",
//       justifyContent: "center",
//       alignItems: "center",
//       zIndex: 999999,
//       backdropFilter: "blur(4px)"
//     }}
//   >
//     <div
//       style={{
//         width: "1100px",
//         maxWidth: "95%",
//         maxHeight: "90vh",
//         overflowY: "auto",
//         background: "#fff",
//         borderRadius: "16px",
//         padding: "24px",
//         boxShadow:
//           "0 20px 60px rgba(0,0,0,0.25)"
//       }}
//     >

//       <div
//         style={{
//           display: "flex",
//           justifyContent: "space-between",
//           alignItems: "center",
//           marginBottom: "20px"
//         }}
//       >
//         <h2
//           style={{
//             margin: 0,
//             fontSize: "28px"
//           }}
//         >
//           Respondent Logs
//         </h2>

//         <button
//           onClick={() =>
//             setShowLogs(false)
//           }
//           style={{
//             border: "none",
//             background: "none",
//             fontSize: "28px",
//             cursor: "pointer"
//           }}
//         >
//           ✕
//         </button>
//       </div>

//       <table
//         style={{
//           width: "100%",
//           borderCollapse: "collapse"
//         }}
//       >
//         <thead>
//           <tr
//             style={{
//               background: "#f8fafc"
//             }}
//           >
//             <th
//               style={{
//                 padding: "12px",
//                 textAlign: "left",
//                 borderBottom: "1px solid #e5e7eb"
//               }}
//             >
//               Status
//             </th>

//             <th
//               style={{
//                 padding: "12px",
//                 textAlign: "left",
//                 borderBottom: "1px solid #e5e7eb"
//               }}
//             >
//               Respondent ID
//             </th>

//             <th
//               style={{
//                 padding: "12px",
//                 textAlign: "left",
//                 borderBottom: "1px solid #e5e7eb"
//               }}
//             >
//               Session ID
//             </th>

//             <th
//               style={{
//                 padding: "12px",
//                 textAlign: "left",
//                 borderBottom: "1px solid #e5e7eb"
//               }}
//             >
//               Started At
//             </th>
//           </tr>
//         </thead>

//         <tbody>

//           {respondents.length > 0 ? (

//             respondents.map((row) => (

//               <tr key={row.id}>

//                 <td
//                   style={{
//                     padding: "12px",
//                     borderBottom: "1px solid #f1f5f9"
//                   }}
//                 >
//                   {row.status}
//                 </td>

//                 <td
//                   style={{
//                     padding: "12px",
//                     borderBottom: "1px solid #f1f5f9"
//                   }}
//                 >
//                   {row.respondentId}
//                 </td>

//                 <td
//                   style={{
//                     padding: "12px",
//                     borderBottom: "1px solid #f1f5f9",
//                     wordBreak: "break-all"
//                   }}
//                 >
//                   {row.projectId}
//                 </td>

//                 <td
//                   style={{
//                     padding: "12px",
//                     borderBottom: "1px solid #f1f5f9"
//                   }}
//                 >
//                   {new Date(
//                     row.startedAt
//                   ).toLocaleString()}
//                 </td>

//               </tr>

//             ))

//           ) : (

//             <tr>
//               <td
//                 colSpan="4"
//                 style={{
//                   textAlign: "center",
//                   padding: "30px"
//                 }}
//               >
//                 No Respondents Found
//               </td>
//             </tr>

//           )}

//         </tbody>
//       </table>

//     </div>
//   </div>
// )}
//   <button
//     className="primary-btn"
//     onClick={() =>
//       navigate(
//         `/projects/${id}/vendors/add`
//       )
//     }
//   >
//     Add Vendor To Current Project
//   </button>

// </div>

// </div>

//             <div className="project-card">

//               <h3>
//                 Links & Variables
//               </h3>

//               <div className="project-links">
//                 <h4>Vendor Redirect URL</h4>

// {/* <input
//   readOnly
//   value={links.redirectUrl}
// />

//   <h4>Complete Link</h4>

//   <input
//     readOnly
//     value={links.completeUrl || ""}
//   />

//   <h4>Disqualified Link</h4>

//   <input
//     readOnly
//     value={links.dqUrl}
//   />

//   <h4>Quota Full Link</h4>

//   <input
//     readOnly
//     value={links.qfUrl}
//   /> */}

// </div>
//               <p>
//                 Advanced Redirect Links
//               </p>

//               <p>
//                 Link Variables
//               </p>

//               <p>
//                 Link Parameters
//               </p>

//             </div>

//             <div className="project-card">

//               <h3>
//                 Guides
//               </h3>

//               <p>
//                 How To Test Project
//               </p>

//               <p>
//                 Link Setup Guide
//               </p>

//               <p>
//                 Redirect Guide
//               </p>

//               <p>
//                 Consent Guide
//               </p>

//             </div>

//           </div>

      

//         {/* STATISTICS */}

//         <div
//           className="project-card"
//           style={{
//             marginTop:"20px"
//           }}
//         >

//           <h3>
//             Project Statistics
//           </h3>

//           <table
//             className="enterprise-table"
//           >

//             <thead>

//               <tr>

//                <th>Total</th>
// <th>Started</th>
// <th>Completed</th>
// <th>Disqualified</th>
// <th>Quota Full</th>
// <th>Terminated</th>
// <th>Remaining</th>
// <th>Completion %</th>

//               </tr>

//             </thead>

//             <tbody>

//               <tr>

//                 <td>{stats.totalRespondents}</td>

// <td>{stats.started}</td>

// <td>{stats.completed}</td>

// <td>{stats.disqualified}</td>

// <td>{stats.quotaFull}</td>

// <td>{stats.terminated}</td>

// <td>{stats.remaining}</td>

// <td>{stats.completionRate}%</td>

//               </tr>

//             </tbody>

//           </table>

//         </div>
// {
// showLinkModal && (

// <div
// style={{
// position:"fixed",
// top:0,
// left:0,
// width:"100%",
// height:"100%",
// background:"rgba(0,0,0,.5)",
// display:"flex",
// justifyContent:"center",
// alignItems:"center",
// zIndex:999999
// }}
// >

// <div
// style={{
// width:"700px",
// background:"#fff",
// borderRadius:"12px",
// padding:"25px"
// }}
// >

// <h2>
// Survey Redirects
// </h2>

// <label>Survey Link</label>

// <textarea
// rows={3}
// readOnly
// value={selectedRedirects.survey}
// />

// <button
// className="primary-btn"
// onClick={()=>{
// navigator.clipboard.writeText(
// selectedRedirects.survey
// );
// }}
// >
// Copy Survey Link
// </button>

// <hr/>

// <label>Complete Redirect</label>

// <textarea
// rows={2}
// readOnly
// value={selectedRedirects.complete}
// />
// <button
// onClick={()=>{
// navigator.clipboard.writeText(
// selectedRedirects.complete
// );
// }}
// >
// Copy
// </button>
// <label>Disqualified Redirect</label>

// <textarea
// rows={2}
// readOnly
// value={selectedRedirects.dq}
// />
// <button
// onClick={()=>{
// navigator.clipboard.writeText(
// selectedRedirects.dq
// );
// }}
// >
// Copy
// </button>
// <button
// onClick={()=>{
// navigator.clipboard.writeText(
// selectedRedirects.dq
// );
// }}
// >
// Copy
// </button>

// <label>Quota Full Redirect</label>

// <textarea
// rows={2}
// readOnly
// value={selectedRedirects.qf}
// />

// <button
// onClick={()=>{
// navigator.clipboard.writeText(
// selectedRedirects.qf
// );
// }}
// >
// Copy
// </button>
// <p
// style={{
// marginTop:"15px",
// color:"#888",
// fontSize:"14px"
// }}
// >
// Redirect URLs are generated dynamically when a respondent starts the survey.
// </p>

// <div
// style={{
// display:"flex",
// justifyContent:"flex-end",
// marginTop:"20px"
// }}
// >

// <button
// className="primary-btn"
// onClick={()=>
// setShowLinkModal(false)
// }
// >
// Close
// </button>

// </div>

// </div>

// </div>

// )
// }
      
//     </MainLayout>

//   );

// }

// export default ManageProject;



import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import api from "../../services/api";

import MainLayout from "../../components/layout/MainLayout";

import "../../styles/project.css";
import "../../styles/form.css";


function ManageProject() {
  const { id } = useParams();

  const navigate = useNavigate();
  const [vendorStats, setVendorStats] =
    useState({});

  const [showLinkModal, setShowLinkModal] =
    useState(false);

  const [selectedRedirects, setSelectedRedirects] =
    useState({
      survey: "",
      complete: "",
      dq: "",
      qf: ""
    });

  const [stats, setStats] =
    useState({
      totalRespondents: 0,
      started: 0,
      completed: 0,
      disqualified: 0,
      quotaFull: 0,
      terminated: 0,
      completionRate: 0,
      incidenceRate: 0,
      remaining: 0
    });

  const loadStats = async () => {

    try {

      // Backend returns the flat stats object directly
      // (totalRespondents, started, completed, disqualified,
      // quotaFull, terminated, completionRate, incidenceRate,
      // remaining) — no wrapper, so res.data maps 1:1.
      const res =
        await api.get(
          `/survey/project-stats/${id}`
        );

      setStats(res.data.stats);

    } catch (err) {

      console.log(err);

    }

  };



  // Links are per-vendor now (each vendor has its own capture URL
  // with &vid=<vendor_id>, and its own cada). There's no single
  // project-wide link anymore, so this fetches on demand for
  // whichever vendor card the person is interacting with, and
  // tracks which vendor the currently-open modal belongs to.
  const [activeVendorId, setActiveVendorId] = useState(null);

  const loadLinksForVendor = async (allocationId) => {

  try {

    const res = await api.get(
      `/survey/redirect-links/${allocationId}`
    );

    const links = {
      survey: res.data.links.capture,
      complete: res.data.links.complete,
      dq: res.data.links.disqualified,
      qf: res.data.links.quotaFull
    };

    setSelectedRedirects(links);

    setActiveVendorId(allocationId);

    return links;

  } catch (err) {

    console.log(err);

    alert("Failed to load links for this vendor");

    return null;

  }

};

  const [project, setProject] = useState({

    project_name: "",
    friendly_name: "",
    parent_project: "",

    client_id: "",
    client_contact_id: "",

    project_manager: "",
    sales_person: "",

    country: "",

    req_completes: "",
    max_completes: "",

    cpi: "",
    ir: "",
    loi: "",
    award_points: "",

    live_survey_link: "",
    test_survey_link: "",

    notes: "",

    status: "Testing",

    use_test_link: false,
    use_pixel_link: false,
    use_prescreener: false

  });

  const [clients, setClients] =
    useState([]);

  const [contacts, setContacts] =
    useState([]);

  const [allocations,
    setAllocations] =
    useState([]);

  useEffect(() => {

    loadProject();
    loadClients();
    loadAllocations();
    loadStats();

  }, []);

  const loadProject = async () => {

    try {

      const res = await api.get(
        `/projects/${id}`
      );

      setProject(res.data || {});
      if (res.data?.client_id) {

        loadClientContacts(
          res.data.client_id
        );

      }

    } catch (error) {

      console.log(error);

    }

  };

  const loadClients = async () => {

    try {

      const res =
        await api.get(
          "/clients"
        );

      setClients(
        res.data || []
      );

    }
    catch (error) {

      console.log(error);

    }

  };
  const [showLogs, setShowLogs] =
    useState(false);

  const [respondents,
    setRespondents] =
    useState([]);

  const openRespondents =
    async (allocationId) => {

      try {

        const res =
          await api.get(
            `/survey/respondents/${allocationId}`
          );

        // Backend now returns a plain array directly, camelCased,
        // with respondentId/panelId/status/startedAt fields —
        // no {success, respondents} wrapper.
        setRespondents(
          res.data.respondents || []
        );

        setShowLogs(true);

      } catch (error) {

        console.log(error);

      }

    };

  const loadVendorStats =
    async () => {

      const result = {};

      for (const item of allocations) {

        try {

          const res =
            await api.get(
              `/survey/stats/${id}/${item.vendor_id}`
            );

          // Backend returns the flat stats object directly
          // (started, completed, disqualified, quotaFull, ir) —
          // no {success, stats} wrapper, so this maps straight in.
          result[item.vendor_id] = res.data.stats;

        } catch (error) {

          console.log(error);

        }

      }

      setVendorStats(result);
    };

  useEffect(() => {

    if (allocations.length) {
      loadVendorStats();
    }

  }, [allocations]);

  const loadClientContacts =
    async (clientId) => {

      try {

        const res =
          await api.get(
            `/client-contacts/${clientId}`
          );

        setContacts(
          res.data || []
        );

      }
      catch (error) {

        console.log(error);

      }

    };

  const loadAllocations =
    async () => {

      try {

        const res =
          await api.get(
            `/vendor-allocations/${id}`
          );

        setAllocations(
          res.data || []
        );

      }
      catch (error) {

        console.log(error);

      }

    };

  const handleChange = (e) => {

    const {
      name,
      value,
      type,
      checked
    } = e.target;

    setProject({

      ...project,

      [name]:
        type === "checkbox"
          ? checked
          : value

    });

  };

  const saveProject = async () => {

    try {

      const payload = {
        ...project,

        // live_survey_link: project.survey_link,
        // test_survey_link: project.test_link,
      };

      // delete payload.survey_link;
      // delete payload.test_link;
// console.log("PAYLOAD", payload);
      await api.put(
        `/projects/${id}`,
        payload
      );
//       const res = await api.put(`/projects/${id}`, payload);

// console.log("UPDATE RESPONSE", res.data);

      alert("Project Updated Successfully");

    } catch (error) {

      console.log(error);
      console.log(error.response?.data);

      alert(
        error.response?.data?.message ||
        "Failed To Update Project"
      );

    }

  };

  return (

    <MainLayout>

      <div className="project-page">

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "3fr 1fr",
            gap: "20px"
          }}
        >

          {/* LEFT SIDE */}

          <div>

            {/* PROJECT IDENTIFICATION */}

            <div className="project-card">

              <h3>
                Project Identification
              </h3>

              <div className="project-grid">

                <div>

                  <label>
                    Project Full Name
                  </label>

                  <input
                    name="project_name"
                    value={project.project_name || ""}
                    onChange={handleChange}
                  />

                </div>

                <div>

                  <label>
                    Project Abbreviation
                  </label>

                  <input
                    name="friendly_name"
                    value={project.friendly_name || ""}
                    onChange={handleChange}
                  />

                </div>

                <div>

                  <label>
                    Parent Project
                  </label>

                  <input
                    name="parent_project"
                    value={project.parent_project || ""}
                    onChange={handleChange}
                  />

                </div>

              </div>

            </div>

            {/* CONTACTS */}

            <div className="project-card">

              <h3>
                Contacts, Team & Region
              </h3>

              <div className="project-grid">

                <div>

                  <label>
                    Client
                  </label>

                  <select
                    name="client_id"
                    value={project.client_id || ""}
                    onChange={(e) => {

                      handleChange(e);

                      loadClientContacts(
                        e.target.value
                      );

                    }}
                  >

                    <option value="">
                      Select Client
                    </option>

                    {
                      clients.map(
                        (client) => (
                          <option
                            key={client.id}
                            value={client.id}
                          >
                            {client.company_name}
                          </option>
                        ))
                    }

                  </select>

                </div>

                <div>

                  <label>
                    Client Contact
                  </label>

                  <select
                    name="client_contact_id"
                    value={project.client_contact_id || ""}
                    onChange={handleChange}
                  >

                    <option value="">
                      Select Contact
                    </option>

                    {
                      contacts.map(
                        (contact) => (
                          <option
                            key={contact.id}
                            value={contact.id}
                          >
                            {contact.name}
                          </option>
                        ))
                    }

                  </select>

                </div>

                <div>

                  <label>
                    Project Manager
                  </label>

                  <input
                    name="project_manager"
                    value={project.project_manager || ""}
                    onChange={handleChange}
                  />

                </div>

                <div>

                  <label>
                    Sales Person
                  </label>

                  <input
                    name="sales_person"
                    value={project.sales_person || ""}
                    onChange={handleChange}
                  />

                </div>

                <div>

                  <label>
                    Country
                  </label>

                  <input
                    name="country"
                    value={project.country || ""}
                    onChange={handleChange}
                  />

                </div>

              </div>

            </div>

            {/* SURVEY CONFIG */}

            <div className="project-card">

              <h3>
                Survey Configuration
              </h3>

              <div className="project-grid">
                <div>
                 <label>
                   Req Completes
                  </label>
                <input
                  placeholder="Req Completes"
                  name="req_completes"
                  value={project.req_completes || ""}
                  onChange={handleChange}
                />
                </div>
                <div>
                 <label>
                  Max Completes
                  </label>
                <input
                  placeholder="Max Completes"
                  name="max_completes"
                  value={project.max_completes || ""}
                  onChange={handleChange}
                />
                </div>
                <div>
                   <label>
                  CPI
                  </label>
                <input
                  placeholder="CPI"
                  name="cpi"
                  value={project.cpi || ""}
                  onChange={handleChange}
                />
                </div>
                <div>
                   <label>
                  IR
                  </label>
                <input
                  placeholder="IR"
                  name="ir"
                  value={project.ir || ""}
                  onChange={handleChange}
                />
                </div>
                 <div>
                    <label>
                  LOI
                  </label>
                <input
                  placeholder="LOI"
                  name="loi"
                  value={project.loi || ""}
                  onChange={handleChange}
                />
                </div>
                 <div>
                  <label>
                 Award Points
                  </label>
                <input
                  placeholder="Award Points"
                  name="award_points"
                  value={project.award_points || ""}
                  onChange={handleChange}
                />
                </div>
              </div>

            </div>

            {/* LINKS */}

            <div className="project-card">

              <h3>
                Survey Links
              </h3>

              <div className="project-grid">

                <textarea
                  rows="5"
                  name="survey_link"
                  placeholder="Live Survey Link"
                  value={project.live_survey_link || ""}
                  onChange={handleChange}
                />

                <textarea
                  rows="5"
                  name="test_link"
                  placeholder="Test Survey Link"
                  value={project.test_survey_link || ""}
                  onChange={handleChange}
                />

              </div>

            </div>

            {/* NOTES */}

            <div className="project-card">

              <h3>
                Notes
              </h3>

              <textarea
                rows="5"
                name="notes"
                value={project.notes || ""}
                onChange={handleChange}
              />

            </div>

            {/* STATUS */}

            <div className="project-card">

              <h3>
                Project Status
              </h3>

              <select
                name="status"
                value={project.status || ""}
                onChange={handleChange}
              >

                <option>
                  Testing
                </option>

                <option>
                  Running
                </option>

                <option>
                  Hold
                </option>

                <option>
                  Completed
                </option>

                <option>
                  Closed
                </option>

              </select>

              <div
                style={{
                  marginTop: "20px",
                  display: "flex",
                  gap: "20px"
                }}
              >

                <label>

                  <input
                    type="checkbox"
                    name="use_test_link"
                    checked={project.use_test_link || false}
                    onChange={handleChange}
                  />

                  Use Test Link

                </label>

                <label>

                  <input
                    type="checkbox"
                    name="use_pixel_link"
                    checked={project.use_pixel_link || false}
                    onChange={handleChange}
                  />

                  Use Pixel Link

                </label>

                <label>

                  <input
                    type="checkbox"
                    name="use_prescreener"
                    checked={project.use_prescreener || false}
                    onChange={handleChange}
                  />

                  Use Prescreener

                </label>

                {/* <label>
    <input
        type="radio"
        name="completion_mode"
        value="vendor"
        checked={project.completion_mode === "vendor"}
        onChange={handleChange}
    />
    Vendor Redirect
</label>

<label>
    <input
        type="radio"
        name="completion_mode"
        value="inputify"
        checked={project.completion_mode === "inputify"}
        onChange={handleChange}
    />
    Inputify Thank You Page
</label> */}

              </div>

            </div>

            <button
              className="save-btn"
              onClick={saveProject}
            >
              Save Project
            </button>

          </div>

          {/* RIGHT SIDE */}

          <div>
            <div className="project-card">
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 20,
                }}
              >
                <h3>Manage Vendor(s)</h3>

                <button
                  className="primary-btn"
                  onClick={() => navigate(`/projects/${id}/vendors/add`)}
                >
                  Add Vendor
                </button>
              </div>

              <div className="vendor-allocation-list">

                {/* INTERNAL COMPANY */}
                {/*
                  NOTE: previously this card linked to
                  `/vendors/${internalVendorId}` where internalVendorId
                  was never defined anywhere in this component — that
                  was a guaranteed runtime crash on click. The internal
                  vendor concept isn't wired into the current backend
                  (there's no dedicated internal vendor record), so
                  this button is disabled with a tooltip until that's
                  built. Swap in a real ID once an internal vendor
                  record exists.
                */}

                <div className="vendor-allocation-card internal-card">

                  <div className="vendor-top">

                    <div className="vendor-left">

                      <button
                        className="vendor-manage-btn"
                        disabled
                        title="Internal vendor management not yet available"
                      >
                        ✎
                      </button>

                      <strong>Internal Company</strong>

                    </div>

                    <div className="vendor-right">

                      <button
                        className="vendor-icon-btn"
                        onClick={() => {
                          navigator.clipboard.writeText(
                            selectedRedirects.survey || ""
                          );
                          alert("Survey Link Copied");
                        }}
                      >
                        📋
                      </button>

                      <button
                        className="vendor-icon-btn"
                        onClick={() => {
                          setShowLinkModal(true);
                        }}
                      >
                        📄
                      </button>

                    </div>

                  </div>

                  <textarea
                    rows={4}
                    readOnly
                    value={selectedRedirects.survey || ""}
                  />

                  <div className="vendor-stats">
                    <span>Redirects 0</span>
                    <span className="blue">Completed 0</span>
                    <span>DQ 0</span>
                    <span className="orange">QF 0</span>
                  </div>

                </div>

                {/* VENDORS */}

                {allocations.length > 0 ? (

                  allocations.map((item, index) => (

                    <div
                      key={item.id || `${item.vendor_id}-${index}`}
                      className="vendor-allocation-card"
                    >

                      <div className="vendor-top">

                        <div className="vendor-left">

                          <button
                            className="vendor-manage-btn"
                            onClick={() =>
                              navigate(`/vendors/${item.vendor_id}`)
                            }
                          >
                            ✎
                          </button>

                          <strong>
                            {index + 1}.{" "}
                            {item.vendors?.company_name ||
                              item.vendor_name ||
                              "Vendor"}
                          </strong>

                        </div>

                        <div className="vendor-right">

                          <button
                            className="vendor-icon-btn"
                            onClick={async () => {
                              const links = await loadLinksForVendor(item.id);
                              if (links) {
                                navigator.clipboard.writeText(links.survey || "");
                                alert("Survey Link Copied");
                              }
                            }}
                          >
                            📋
                          </button>

                          <button
                            className="vendor-icon-btn"
                            onClick={async () => {
                              await loadLinksForVendor(item.id);
                              setShowLinkModal(true);
                            }}
                          >
                            📄
                          </button>

                        </div>
                      </div>

                      <textarea
                        rows={4}
                        readOnly
                        value={
                          activeVendorId === item.id
                            ? (selectedRedirects.survey || "")
                            : ""
                        }
                        placeholder="Click 📄 to load this vendor's link"
                      />

                      <div className="vendor-stats">

                        <span>
                          Redirects{" "}
                          {vendorStats[item.vendor_id]?.started || 0}
                          /
                          {item.quota || 0}
                        </span>

                        <span
                          className="blue"
                          style={{ cursor: "pointer" }}
                          onClick={() =>
                            openRespondents(item.id)
                          }
                        >
                          Completed{" "}
                          {vendorStats[item.vendor_id]?.completed || 0}
                          /
                          {item.quota || 0}
                        </span>

                        <span>
                          DQ{" "}
                          {vendorStats[item.vendor_id]?.disqualified || 0}
                        </span>

                        <span className="orange">
                          QF{" "}
                          {vendorStats[item.vendor_id]?.quotaFull || 0}
                        </span>

                      </div>

                      <div className="vendor-stats">

                        <span>
                          IR {vendorStats[item.vendor_id]?.ir ?? item.ir ?? 0}%
                        </span>

                        <span>
                          CPC {item.cpi || 0}
                        </span>

                        <span>
                          Status{" "}
                          <strong>{item.status}</strong>
                        </span>

                      </div>

                    </div>

                  ))

                ) : (

                  <p>No Vendors Allocated</p>

                )}

              </div>

              <button
                className="primary-btn"
                style={{ marginTop: 20 }}
                onClick={() =>
                  navigate(`/projects/${id}/vendors/add`)
                }
              >
                Add Vendor To Current Project
              </button>

            </div>


            {showLogs && (
              <div
                style={{
                  position: "fixed",
                  top: 0,
                  left: 0,
                  width: "100vw",
                  height: "100vh",
                  background: "rgba(0,0,0,0.6)",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  zIndex: 999999,
                  backdropFilter: "blur(4px)"
                }}
              >
                <div
                  style={{
                    width: "1100px",
                    maxWidth: "95%",
                    maxHeight: "90vh",
                    overflowY: "auto",
                    background: "#fff",
                    borderRadius: "16px",
                    padding: "24px",
                    boxShadow:
                      "0 20px 60px rgba(0,0,0,0.25)"
                  }}
                >

                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: "20px"
                    }}
                  >
                    <h2
                      style={{
                        margin: 0,
                        fontSize: "28px"
                      }}
                    >
                      Respondent Logs
                    </h2>

                    <button
                      onClick={() =>
                        setShowLogs(false)
                      }
                      style={{
                        border: "none",
                        background: "none",
                        fontSize: "28px",
                        cursor: "pointer"
                      }}
                    >
                      ✕
                    </button>
                  </div>

                  <table
                    style={{
                      width: "100%",
                      borderCollapse: "collapse"
                    }}
                  >
                    <thead>
                      <tr
                        style={{
                          background: "#f8fafc"
                        }}
                      >
                        <th
                          style={{
                            padding: "12px",
                            textAlign: "left",
                            borderBottom: "1px solid #e5e7eb"
                          }}
                        >
                          Status
                        </th>

                        <th
                          style={{
                            padding: "12px",
                            textAlign: "left",
                            borderBottom: "1px solid #e5e7eb"
                          }}
                        >
                          Respondent ID
                        </th>

                        {/*
                          Previously labeled "Session ID" but rendered
                          row.projectId — same value on every row,
                          which was a display bug (every respondent
                          belongs to the same project, so it told you
                          nothing useful). Backend no longer tracks a
                          separate session_id at all, so this column
                          now shows the vendor's own Panel ID instead,
                          which is actually distinguishing information.
                        */}
                        <th
                          style={{
                            padding: "12px",
                            textAlign: "left",
                            borderBottom: "1px solid #e5e7eb"
                          }}
                        >
                          Panel ID
                        </th>

                        <th
                          style={{
                            padding: "12px",
                            textAlign: "left",
                            borderBottom: "1px solid #e5e7eb"
                          }}
                        >
                          Started At
                        </th>
                      </tr>
                    </thead>

                    <tbody>

                      {respondents.length > 0 ? (

                        respondents.map((row) => (

                          <tr key={row.id}>

                            <td
                              style={{
                                padding: "12px",
                                borderBottom: "1px solid #f1f5f9"
                              }}
                            >
                              {row.status}
                            </td>

                            <td
                              style={{
                                padding: "12px",
                                borderBottom: "1px solid #f1f5f9",
                                wordBreak: "break-all"
                              }}
                            >
                              {row.respondent_id}
                            </td>

                            <td
                              style={{
                                padding: "12px",
                                borderBottom: "1px solid #f1f5f9"
                              }}
                            >
                              {row.panel_id  || "—"}
                            </td>

                            <td
                              style={{
                                padding: "12px",
                                borderBottom: "1px solid #f1f5f9"
                              }}
                            >
                              {row.started_at
                                ? new Date(row.started_at).toLocaleString()
                                : "—"}
                            </td>

                          </tr>

                        ))

                      ) : (

                        <tr>
                          <td
                            colSpan="4"
                            style={{
                              textAlign: "center",
                              padding: "30px"
                            }}
                          >
                            No Respondents Found
                          </td>
                        </tr>

                      )}

                    </tbody>
                  </table>

                </div>
              </div>
            )}

          </div>

          <div className="project-card">

            <h3>
              Links & Variables
            </h3>

            <div className="project-links">
              <h4>Vendor Redirect URL</h4>
            </div>
            <p>
              Advanced Redirect Links
            </p>

            <p>
              Link Variables
            </p>

            <p>
              Link Parameters
            </p>

          </div>

          <div className="project-card">

            <h3>
              Guides
            </h3>

            <p>
              How To Test Project
            </p>

            <p>
              Link Setup Guide
            </p>

            <p>
              Redirect Guide
            </p>

            <p>
              Consent Guide
            </p>

          </div>

        </div>



        {/* STATISTICS */}

        <div
          className="project-card"
          style={{
            marginTop: "20px"
          }}
        >

          <h3>
            Project Statistics
          </h3>

          <table
            className="enterprise-table"
          >

            <thead>

              <tr>

                <th>Total</th>
                <th>Started</th>
                <th>Completed</th>
                <th>Disqualified</th>
                <th>Quota Full</th>
                <th>Terminated</th>
                <th>Remaining</th>
                <th>Completion %</th>

              </tr>

            </thead>

            <tbody>

              <tr>

                <td>{stats.totalRespondents}</td>

                <td>{stats.started}</td>

                <td>{stats.completed}</td>

                <td>{stats.disqualified}</td>

                <td>{stats.quotaFull}</td>

                <td>{stats.terminated}</td>

                <td>{stats.remaining}</td>

                <td>{stats.completionRate}%</td>

              </tr>

            </tbody>

          </table>

        </div>
        {
          showLinkModal && (

            <div
              style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                background: "rgba(0,0,0,.5)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                zIndex: 999999
              }}
            >

              <div
                style={{
                  width: "700px",
                  background: "#fff",
                  borderRadius: "12px",
                  padding: "25px"
                }}
              >

                <h2>
                  Survey Redirects
                </h2>

                <label>Survey Link</label>

                <textarea
                  rows={3}
                  readOnly
                  value={selectedRedirects.survey}
                />

                <button
                  className="primary-btn"
                  onClick={() => {
                    navigator.clipboard.writeText(
                      selectedRedirects.survey
                    );
                  }}
                >
                  Copy Survey Link
                </button>

                <hr />

                <label>Complete Redirect</label>

                <textarea
                  rows={2}
                  readOnly
                  value={selectedRedirects.complete}
                />
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(
                      selectedRedirects.complete
                    );
                  }}
                >
                  Copy
                </button>
                <label>Disqualified Redirect</label>

                <textarea
                  rows={2}
                  readOnly
                  value={selectedRedirects.dq}
                />
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(
                      selectedRedirects.dq
                    );
                  }}
                >
                  Copy
                </button>

                <label>Quota Full Redirect</label>

                <textarea
                  rows={2}
                  readOnly
                  value={selectedRedirects.qf}
                />

                <button
                  onClick={() => {
                    navigator.clipboard.writeText(
                      selectedRedirects.qf
                    );
                  }}
                >
                  Copy
                </button>
                <p
                  style={{
                    marginTop: "15px",
                    color: "#888",
                    fontSize: "14px"
                  }}
                >
                  Complete/Disqualified/Quota Full redirects are now
                  static — the same link works for every respondent on
                  this project. Respondent identity is tracked via
                  session cookie (or server-to-server postback, where
                  supported) rather than a per-respondent token in the URL.
                </p>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    marginTop: "20px"
                  }}
                >

                  <button
                    className="primary-btn"
                    onClick={() =>
                      setShowLinkModal(false)
                    }
                  >
                    Close
                  </button>

                </div>

              </div>

            </div>

          )
        }

      </div>

    </MainLayout>

  );

}

export default ManageProject;
