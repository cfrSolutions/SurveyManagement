import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import api from "../../services/api";
import { AuthContext } from "../../context/AuthContext";

import MainLayout from "../../components/layout/MainLayout";

import "../../styles/module.css";

function ProjectList() {

  const navigate = useNavigate();

  const { user } = useContext(AuthContext);
  const isClient = user?.userType === "CLIENT";

  const [projects, setProjects] =
  useState([]);

  const [search, setSearch] =
  useState("");

  useEffect(() => {

    loadProjects();

  }, []);

  const loadProjects = async () => {

    try {

      const res =
      await api.get(
        "/projects"
      );

      setProjects(
        res.data || []
      );

    }
    catch(error){

      console.log(error);

    }

  };

  const filteredProjects =
  projects.filter((project)=>

    JSON.stringify(project)
    .toLowerCase()
    .includes(
      search.toLowerCase()
    )

  );

  return (

    <MainLayout>

      <div className="module-page">

        <div className="module-header">

          <h1 className="module-title">
            Projects
          </h1>

          {!isClient && (
          <button
            className="primary-btn"
            onClick={() =>
              navigate(
                "/projects/create"
              )
            }
          >
            Create Project
          </button>
          )}

        </div>

        {/* SEARCH */}

        <div
          className="table-card"
          style={{
            marginBottom:"20px"
          }}
        >

          <input
            type="text"
            placeholder="Type for any search..."
            value={search}
            onChange={(e)=>
              setSearch(
                e.target.value
              )
            }
            style={{
              width:"100%",
              padding:"10px"
            }}
          />

        </div>

        {/* TABLE */}

        <div className="table-card">

          <table
            className="enterprise-table"
          >

            <thead>

              <tr>

                {!isClient && <th>Edit</th>}
                {!isClient && <th>Delete</th>}

                <th>Project ID</th>

                <th>
                  Project Name
                </th>

                <th>
                  Parent
                </th>

                <th>
                  Client Name
                </th>

                <th>
                  Contact Name
                </th>

                <th>
                  Manager Name
                </th>

                <th>
                  Sales Name
                </th>

                <th>
                  Pre-Screener
                </th>

                <th>
                  Completed / Quota
                </th>

                <th>
                  Project Status
                </th>

              </tr>

            </thead>

            <tbody>

              {
                filteredProjects.length > 0
                ?
                filteredProjects.map(
                  (project)=>(
                  <tr
                    key={project.id}
                    onClick={() => {
                      navigate(
                        isClient
                          ? `/projects/view/${project.id}`
                          : `/projects/${project.id}`
                      );
                    }}
                    style={{ cursor: "pointer" }}
                  >

                    {!isClient && (
                    <td>
                      <button
                        className="table-edit-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/projects/${project.id}`);
                        }}
                      >
                        Manage
                      </button>
                    </td>
                    )}
                    {!isClient && (
                    <td>
                      <button
                        className="table-delete-btn"
                        onClick={(e) => e.stopPropagation()}
                      >
                        Delete
                      </button>
                    </td>
                    )}

                    <td>
                      {project.id}
                    </td>

                    <td>
                      {
                        project.project_name
                      }
                    </td>

                    <td>
                      {
                        project.parent_project ||
                        "-"
                      }
                    </td>

                    <td>
                      {
                        project.client_name ||
                        "-"
                      }
                    </td>

                    <td>
                      {
                        project.contact_name ||
                        "-"
                      }
                    </td>

                    <td>
                      {
                        project.manager_name ||
                        "-"
                      }
                    </td>

                    <td>
                      {
                        project.sales_name ||
                        "-"
                      }
                    </td>

                    <td>
                      {
                        project.use_prescreener
                        ? "Yes"
                        : "No"
                      }
                    </td>

                    <td>

                      0 /
                      {
                        project.req_completes ||
                        0
                      }

                    </td>

                    <td>

                      <span
                        className="active-badge"
                      >
                        {
                          project.status
                        }
                      </span>

                    </td>

                  </tr>

                ))
                :
                <tr>

                  <td
                    colSpan={isClient ? "10" : "12"}
                    style={{
                      textAlign:"center"
                    }}
                  >
                    No Projects Found
                  </td>

                </tr>
              }

            </tbody>

          </table>

        </div>

      </div>

    </MainLayout>

  );

}

export default ProjectList;