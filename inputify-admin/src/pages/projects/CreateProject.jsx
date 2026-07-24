import { useEffect, useState } from "react";

import api from "../../services/api";

import { useNavigate } from "react-router-dom";

import MainLayout from "../../components/layout/MainLayout";
import PageHeader from "../../components/common/PageHeader";

import "../../styles/project.css";

function CreateProject() {

  const navigate = useNavigate();

  const [clients, setClients] =
useState([]);

const [contacts, setContacts] =
useState([]);

const [employees, setEmployees] =
useState([]);

  const [formData, setFormData] = useState({

    projectName: "",
    friendlyName: "",
    parentProject: "",

    client: "",
    clientContact: "",

    projectManager: "",
    salesPerson: "",

    country: "India",

    reqCompletes: "",
    maxCompletes: "",

    cpi: "",
    loi: "",
    ir: "",

    awardPoints: "",

    surveyLink: "",
    testSurveyLink: "",

    notes: "",

    status: "Testing",

    useTestLink: false,
    useFirstLink: false,
    usePrescreener: false,
    useSecureSBO: false

  });

  const handleChange = (e) => {

    const {
      name,
      value,
      type,
      checked
    } = e.target;

    setFormData({

      ...formData,

      [name]:
        type === "checkbox"
          ? checked
          : value

    });

  };

  useEffect(() => {

  loadClients();
  loadEmployees();

}, []);

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
  catch(error){

    console.log(error);

  }

};

const loadEmployees = async () => {

  try {

    const res =
    await api.get(
      "/employees"
    );

    setEmployees(
      res.data || []
    );

  }
  catch(error){

    console.log(error);

  }

};

const handleClientChange =
async(e)=>{

  const clientId =
  e.target.value;

  setFormData({

    ...formData,

    client: clientId,

    clientContact: ""

  });

  try {

    const res =
    await api.get(
      `/client-contacts/${clientId}`
    );

    setContacts(
      res.data || []
    );

  }
  catch(error){

    console.log(error);

  }

};

  const revenue =
    Number(formData.reqCompletes || 0) *
    Number(formData.cpi || 0);

  const handleSave = async () => {

  try {

    const payload = {

  project_name:
  formData.projectName,

  friendly_name:
  formData.friendlyName,

  client_id:
  formData.client,

  project_manager:
  formData.projectManager,

  sales_person:
  formData.salesPerson,

  country:
  formData.country,

  cpi:
  formData.cpi,

  ir:
  formData.ir,

  loi:
  formData.loi,

  award_points:
  formData.awardPoints,

  survey_link:
  formData.surveyLink,

  test_link:
  formData.testSurveyLink,

  status:
  formData.status

};

    console.log(
      "PROJECT =>",
      payload
    );

    await api.post(
      "/projects",
      payload
    );

    alert(
      "Project Created Successfully"
    );

    navigate(
      "/projects"
    );

  }
  catch(error){

    console.log(error);

    console.log(
      error.response?.data
    );

    alert(
      JSON.stringify(
        error.response?.data
      )
    );

  }

};

  return (

    <MainLayout>

      <PageHeader
        title="Add New Project"
      />

      <div className="project-page">

        {/* PROJECT DETAILS */}

        <div className="project-card">

          <h3>
            Project Details
          </h3>

          <div className="project-grid">

            <div>

              <label>
                Project Name *
              </label>

              <input
                name="projectName"
                value={formData.projectName}
                onChange={handleChange}
              />

            </div>

            <div>

              <label>
                Project Friendly Name
              </label>

              <input
                name="friendlyName"
                value={formData.friendlyName}
                onChange={handleChange}
              />

            </div>

            <div>

              <label>
                Parent Project
              </label>

              <select
                name="parentProject"
                value={formData.parentProject}
                onChange={handleChange}
              >

                <option value="">
                  No Parent Project
                </option>

              </select>

            </div>

          </div>

        </div>

        {/* CONTACT & REGION */}

        <div className="project-card">

          <h3>
            Contact & Region
          </h3>

          <div className="project-grid">

            <div>

              <label>
                Client
              </label>

              <select
 value={formData.client}
 onChange={handleClientChange}
>

 <option value="">
  Select Client
 </option>

 {
  clients.map(
   (client)=>(
    <option
     key={client.id}
     value={client.id}
    >
     {client.company_name}
    </option>
   )
  )
 }

</select>

            </div>

            <div>

              <label>
                Client Contact
              </label>

              <select
 name="clientContact"
 value={formData.clientContact}
 onChange={handleChange}
>

 <option value="">
  Select Contact
 </option>

 {
  contacts.map(
   (contact)=>(
    <option
     key={contact.id}
     value={contact.id}
    >
     {
      contact.name ||
      contact.contact_name
     }
    </option>
   )
  )
 }

</select>

            </div>

            <div>

              <label>
                Country
              </label>

              <select
                name="country"
                value={formData.country}
                onChange={handleChange}
              >

                <option>
                  India
                </option>

                <option>
                  USA
                </option>

                <option>
                  Australia
                </option>

                <option>
                  Canada
                </option>

                <option>
                  UK
                </option>

              </select>

            </div>

            <div>

              <label>
                Project Manager
              </label>

            <select
    name="projectManager"
    value={formData.projectManager}
    onChange={handleChange}
>
    <option value="">
        Select Project Manager
    </option>

    {employees.map(emp => (
        <option
            key={emp.id}
            value={emp.id}
        >
            {emp.name}
        </option>
    ))}
</select>
            </div>

            <div>

              <label>
                Sales Person
              </label>

              <select
                name="salesPerson"
                value={formData.salesPerson}
                onChange={handleChange}
              >

                <option value="">
 Select Sales Person
</option>

{
 employees.map(
  (emp)=>(
   <option
    key={emp.id}
    value={emp.id}
   >
    {
     emp.name ||
     emp.employee_name
    }
   </option>
  )
 )
}

              </select>

            </div>

          </div>

        </div>

        {/* OTHERS */}

        <div className="project-card">

          <h3>
            Others
          </h3>

          <div className="project-grid">

            <div>

              <label>
                Req. Completes
              </label>

              <input
                type="number"
                name="reqCompletes"
                value={formData.reqCompletes}
                onChange={handleChange}
              />

            </div>

            <div>

              <label>
                Max. Completes
              </label>

              <input
                type="number"
                name="maxCompletes"
                value={formData.maxCompletes}
                onChange={handleChange}
              />

            </div>

            <div>

              <label>
                CPI ($)
              </label>

              <input
                type="number"
                name="cpi"
                value={formData.cpi}
                onChange={handleChange}
              />

            </div>

            <div>

              <label>
                LOI
              </label>

              <input
                type="number"
                name="loi"
                value={formData.loi}
                onChange={handleChange}
              />

            </div>

            <div>

              <label>
                IR %
              </label>

              <input
                type="number"
                name="ir"
                value={formData.ir}
                onChange={handleChange}
              />

            </div>

            <div>

              <label>
                Award Points
              </label>

              <input
                type="number"
                name="awardPoints"
                value={formData.awardPoints}
                onChange={handleChange}
              />

            </div>

          </div>

        </div>

        {/* REVENUE */}

        <div className="project-card">

          <h3>
            Revenue Preview
          </h3>

          <div
            style={{
              fontSize: "24px",
              fontWeight: "700",
              color: "#7c3aed"
            }}
          >

            ${revenue}

          </div>

        </div>

        {/* SURVEY LINKS */}

        <div className="project-card">

          <h3>
            Survey Links
          </h3>

          <div className="project-grid">

            <div>

              <label>
                Survey Link
              </label>

              <textarea
                rows="5"
                name="surveyLink"
                value={formData.surveyLink}
                onChange={handleChange}
              />

            </div>

            <div>

              <label>
                Test Survey Link
              </label>

              <textarea
                rows="5"
                name="testSurveyLink"
                value={formData.testSurveyLink}
                onChange={handleChange}
              />

            </div>

          </div>

        </div>

        {/* OPTIONS */}

        <div className="project-card">

          <h3>
            Project Options
          </h3>

          <div className="switch-grid">

            <label>

              <input
                type="checkbox"
                name="useTestLink"
                checked={formData.useTestLink}
                onChange={handleChange}
              />

              Use Test Link

            </label>

            <label>

              <input
                type="checkbox"
                name="useFirstLink"
                checked={formData.useFirstLink}
                onChange={handleChange}
              />

              Use First Link

            </label>

            <label>

              <input
                type="checkbox"
                name="usePrescreener"
                checked={formData.usePrescreener}
                onChange={handleChange}
              />

              Use Prescreener

            </label>

            <label>

              <input
                type="checkbox"
                name="useSecureSBO"
                checked={formData.useSecureSBO}
                onChange={handleChange}
              />

              Use Secure SBO

            </label>

          </div>

        </div>

        {/* STATUS */}

        <div className="project-card">

          <h3>
            Status & Notes
          </h3>

          <div className="project-grid">

            <div>

              <label>
                Status
              </label>

              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
              >

                <option>
                  Testing
                </option>

                <option>
                  Live
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

            </div>

          </div>

          <div
            style={{
              marginTop: "20px"
            }}
          >

            <label>
              Notes
            </label>

            <textarea
              rows="5"
              name="notes"
              value={formData.notes}
              onChange={handleChange}
            />

          </div>

        </div>

        {/* ACTIONS */}

        <div className="project-actions">

          <button
            className="save-btn"
            onClick={handleSave}
          >
            Save
          </button>

          <button
            className="cancel-btn"
            onClick={() =>
              navigate("/projects")
            }
          >
            Back
          </button>

        </div>

      </div>

    </MainLayout>

  );

}

export default CreateProject;