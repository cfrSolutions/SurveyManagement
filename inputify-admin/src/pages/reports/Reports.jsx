import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../../services/api";

import MainLayout from "../../components/layout/MainLayout";
import PageHeader from "../../components/common/PageHeader";

import "../../styles/module.css";

function Reports() {

  const navigate = useNavigate();

  const [projects, setProjects] = useState([]);
  const [projectMetrics, setProjectMetrics] = useState({});
  const [selectedProject, setSelectedProject] = useState(null);
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [metricsLoading, setMetricsLoading] = useState(false);
  
  const [filters, setFilters] = useState({
    status: "",
    limit: 50,
    offset: 0
  });

  const [pagination, setPagination] = useState({
    total: 0,
    limit: 50,
    offset: 0
  });

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      setMetricsLoading(true);
      const res = await api.get("/projects");
      console.log("PROJECTS =>", res.data);
      setProjects(res.data || []);
      
      // Load metrics for all projects
      if (res.data && res.data.length > 0) {
        loadAllProjectMetrics(res.data);
      }
    } catch (error) {
      console.log("PROJECT ERROR =>", error.response?.data);
    } finally {
      setMetricsLoading(false);
    }
  };

  const loadAllProjectMetrics = async (projectList) => {
    try {
      const metrics = {};
      
      for (const project of projectList) {
        const res = await api.get(`/reports/project/${project.id}`);
        const activities = res.data.activities || [];
        
        metrics[project.id] = {
          totalActivities: activities.length,
          completed: activities.filter(a => a.status === "COMPLETED").length,
          pending: activities.filter(a => a.status === "PENDING").length,
          rejected: activities.filter(a => a.status === "REJECTED").length,
          inProgress: activities.filter(a => a.status === "IN_PROGRESS").length
        };
      }
      
      setProjectMetrics(metrics);
    } catch (error) {
      console.log("METRICS ERROR =>", error.response?.data);
    }
  };

  const loadProjectActivities = async () => {
    if (!selectedProject) return;
    
    try {
      setLoading(true);
      const params = new URLSearchParams();
      
      params.append("projectId", selectedProject.id);
      if (filters.status) params.append("status", filters.status);
      params.append("limit", filters.limit);
      params.append("offset", filters.offset);

      const res = await api.get(
        `/reports/activity-logs?${params.toString()}`
      );

      console.log("ACTIVITIES =>", res.data);
      setActivities(res.data.data || []);
      setPagination({
        total: res.data.total,
        limit: res.data.limit,
        offset: res.data.offset
      });
    } catch (error) {
      console.log("ACTIVITY ERROR =>", error.response?.data);
      alert("Error loading activities");
    } finally {
      setLoading(false);
    }
  };

  const handleSelectProject = (project) => {
    setSelectedProject(project);
    setFilters({
      status: "",
      limit: 50,
      offset: 0
    });
  };

  const handleBackToProjects = () => {
    setSelectedProject(null);
    setActivities([]);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value,
      offset: 0
    });
  };

  const handleApplyFilters = () => {
    loadProjectActivities();
  };

  const handleNextPage = () => {
    const newOffset = filters.offset + filters.limit;
    if (newOffset < pagination.total) {
      setFilters({
        ...filters,
        offset: newOffset
      });
    }
  };

  const handlePrevPage = () => {
    const newOffset = Math.max(0, filters.offset - filters.limit);
    setFilters({
      ...filters,
      offset: newOffset
    });
  };

  useEffect(() => {
    if (selectedProject) {
      loadProjectActivities();
    }
  }, [filters.offset, selectedProject]);

  const getStatusColor = (status) => {
    switch (status) {
      case "COMPLETED":
        return "#10b981";
      case "PENDING":
        return "#f59e0b";
      case "IN_PROGRESS":
        return "#3b82f6";
      case "REJECTED":
        return "#ef4444";
      default:
        return "#6b7280";
    }
  };

  const formatDate = (date) => {
    if (!date) return "-";
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  return (

    <MainLayout>

      <div className="module-page">

        <PageHeader title={selectedProject ? `${selectedProject.name} - Activity Report` : "Project Reports"} />

        {!selectedProject ? (
          // Projects Overview
          <>

            {metricsLoading && (
              <div style={{ textAlign: "center", padding: "20px", color: "#666" }}>
                Loading project metrics...
              </div>
            )}

            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
              gap: "20px",
              marginBottom: "24px"
            }}>
              {projects.length > 0 ? (
                projects.map((project) => {
                  const metrics = projectMetrics[project.id] || {
                    totalActivities: 0,
                    completed: 0,
                    pending: 0,
                    rejected: 0,
                    inProgress: 0
                  };

                  return (
                    <div
                      key={project.id}
                      style={{
                        background: "white",
                        padding: "20px",
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
                      onClick={() => handleSelectProject(project)}
                    >

                      <div style={{ marginBottom: "16px" }}>
                        <h3 style={{ margin: "0 0 4px 0", fontSize: "16px", fontWeight: "600" }}>
                          {project.name}
                        </h3>
                        <p style={{ margin: "0", fontSize: "12px", color: "#999" }}>
                          {project.company_name || project.client_id}
                        </p>
                      </div>

                      <div style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                        gap: "12px",
                        marginBottom: "16px"
                      }}>

                        <div style={{
                          background: "#f3f4f6",
                          padding: "12px",
                          borderRadius: "6px",
                          textAlign: "center"
                        }}>
                          <p style={{ margin: "0", fontSize: "12px", color: "#666" }}>
                            Total
                          </p>
                          <p style={{ margin: "0", fontSize: "20px", fontWeight: "bold", color: "#3b82f6" }}>
                            {metrics.totalActivities}
                          </p>
                        </div>

                        <div style={{
                          background: "#f3f4f6",
                          padding: "12px",
                          borderRadius: "6px",
                          textAlign: "center"
                        }}>
                          <p style={{ margin: "0", fontSize: "12px", color: "#666" }}>
                            Completed
                          </p>
                          <p style={{ margin: "0", fontSize: "20px", fontWeight: "bold", color: "#10b981" }}>
                            {metrics.completed}
                          </p>
                        </div>

                        <div style={{
                          background: "#f3f4f6",
                          padding: "12px",
                          borderRadius: "6px",
                          textAlign: "center"
                        }}>
                          <p style={{ margin: "0", fontSize: "12px", color: "#666" }}>
                            Pending
                          </p>
                          <p style={{ margin: "0", fontSize: "20px", fontWeight: "bold", color: "#f59e0b" }}>
                            {metrics.pending}
                          </p>
                        </div>

                        <div style={{
                          background: "#f3f4f6",
                          padding: "12px",
                          borderRadius: "6px",
                          textAlign: "center"
                        }}>
                          <p style={{ margin: "0", fontSize: "12px", color: "#666" }}>
                            Rejected
                          </p>
                          <p style={{ margin: "0", fontSize: "20px", fontWeight: "bold", color: "#ef4444" }}>
                            {metrics.rejected}
                          </p>
                        </div>

                      </div>

                      <div style={{
                        borderTop: "1px solid #e5e7eb",
                        paddingTop: "12px",
                        marginTop: "12px"
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
                            fontSize: "14px",
                            fontWeight: "500"
                          }}
                        >
                          View Details →
                        </button>
                      </div>

                    </div>
                  );
                })
              ) : (
                <div style={{ gridColumn: "1 / -1", textAlign: "center", padding: "40px", color: "#999" }}>
                  No projects found
                </div>
              )}
            </div>

          </>
        ) : (
          // Project Detail View
          <>

            <div style={{
              marginBottom: "20px",
              padding: "16px",
              background: "white",
              borderRadius: "8px",
              boxShadow: "0 1px 3px rgba(0,0,0,0.1)"
            }}>

              <button
                onClick={handleBackToProjects}
                style={{
                  padding: "8px 16px",
                  background: "#6b7280",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                  fontSize: "14px",
                  marginBottom: "12px"
                }}
              >
                ← Back to Projects
              </button>

              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
                gap: "12px"
              }}>

                <div style={{
                  borderLeft: `4px solid #3b82f6`,
                  paddingLeft: "12px"
                }}>
                  <p style={{ margin: "0", fontSize: "12px", color: "#666" }}>Total Activities</p>
                  <p style={{ margin: "0", fontSize: "20px", fontWeight: "bold" }}>
                    {projectMetrics[selectedProject.id]?.totalActivities || 0}
                  </p>
                </div>

                <div style={{
                  borderLeft: `4px solid #10b981`,
                  paddingLeft: "12px"
                }}>
                  <p style={{ margin: "0", fontSize: "12px", color: "#666" }}>Completed</p>
                  <p style={{ margin: "0", fontSize: "20px", fontWeight: "bold" }}>
                    {projectMetrics[selectedProject.id]?.completed || 0}
                  </p>
                </div>

                <div style={{
                  borderLeft: `4px solid #f59e0b`,
                  paddingLeft: "12px"
                }}>
                  <p style={{ margin: "0", fontSize: "12px", color: "#666" }}>Pending</p>
                  <p style={{ margin: "0", fontSize: "20px", fontWeight: "bold" }}>
                    {projectMetrics[selectedProject.id]?.pending || 0}
                  </p>
                </div>

                <div style={{
                  borderLeft: `4px solid #ef4444`,
                  paddingLeft: "12px"
                }}>
                  <p style={{ margin: "0", fontSize: "12px", color: "#666" }}>Rejected</p>
                  <p style={{ margin: "0", fontSize: "20px", fontWeight: "bold" }}>
                    {projectMetrics[selectedProject.id]?.rejected || 0}
                  </p>
                </div>

              </div>

            </div>

            {/* Filters */}
            <div style={{
              background: "white",
              padding: "16px",
              borderRadius: "8px",
              marginBottom: "24px",
              boxShadow: "0 1px 3px rgba(0,0,0,0.1)"
            }}>

              <h3 style={{ margin: "0 0 16px 0" }}>Filters</h3>

              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                gap: "12px",
                alignItems: "end"
              }}>

                <div>
                  <label style={{ display: "block", marginBottom: "6px", fontSize: "14px", fontWeight: "500" }}>
                    Status
                  </label>
                  <select
                    name="status"
                    value={filters.status}
                    onChange={handleFilterChange}
                    style={{
                      width: "100%",
                      padding: "8px",
                      borderRadius: "4px",
                      border: "1px solid #ddd",
                      fontSize: "14px"
                    }}
                  >
                    <option value="">All Status</option>
                    <option value="COMPLETED">Completed</option>
                    <option value="PENDING">Pending</option>
                    <option value="IN_PROGRESS">In Progress</option>
                    <option value="REJECTED">Rejected</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: "block", marginBottom: "6px", fontSize: "14px", fontWeight: "500" }}>
                    Records Per Page
                  </label>
                  <select
                    name="limit"
                    value={filters.limit}
                    onChange={handleFilterChange}
                    style={{
                      width: "100%",
                      padding: "8px",
                      borderRadius: "4px",
                      border: "1px solid #ddd",
                      fontSize: "14px"
                    }}
                  >
                    <option value="25">25</option>
                    <option value="50">50</option>
                    <option value="100">100</option>
                  </select>
                </div>

                <button
                  onClick={handleApplyFilters}
                  style={{
                    padding: "8px 16px",
                    background: "#3b82f6",
                    color: "white",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                    fontSize: "14px",
                    fontWeight: "500"
                  }}
                >
                  Apply Filters
                </button>

              </div>

            </div>

            {/* Activity Table */}
            <div className="table-card">

              <table className="enterprise-table">

                <thead>
                  <tr>
                    <th>Date/Time</th>
                    <th>Session ID</th>
                    <th>IP Address</th>
                    <th>Status</th>
                    <th>LOI</th>
                    <th>Duration</th>
                  </tr>
                </thead>

                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan="6" style={{ textAlign: "center", padding: "20px" }}>
                        Loading...
                      </td>
                    </tr>
                  ) : activities.length > 0 ? (
                    activities.map((activity) => {
                      const duration = activity.started_at && activity.completed_at
                        ? Math.round(
                            (new Date(activity.completed_at) - new Date(activity.started_at)) / 1000 / 60
                          )
                        : null;

                      return (
                        <tr key={activity.id}>
                          <td>{formatDate(activity.started_at)}</td>
                          <td style={{ fontSize: "12px", fontFamily: "monospace" }}>
                            {activity.session_id?.substring(0, 12)}...
                          </td>
                          <td style={{ fontSize: "12px" }}>{activity.ip_address || "-"}</td>
                          <td>
                            <span style={{
                              background: getStatusColor(activity.status),
                              color: "white",
                              padding: "4px 12px",
                              borderRadius: "20px",
                              fontSize: "12px",
                              fontWeight: "500"
                            }}>
                              {activity.status || "Unknown"}
                            </span>
                          </td>
                          <td>{activity.loi || "-"}</td>
                          <td>{duration ? `${duration} min` : "-"}</td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan="6" style={{ textAlign: "center", padding: "20px" }}>
                        No activities found
                      </td>
                    </tr>
                  )}
                </tbody>

              </table>

            </div>

            {/* Pagination */}
            <div style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: "20px",
              padding: "16px",
              background: "white",
              borderRadius: "8px",
              boxShadow: "0 1px 3px rgba(0,0,0,0.1)"
            }}>

              <p style={{ margin: "0", fontSize: "14px", color: "#666" }}>
                Showing {filters.offset + 1} to {Math.min(filters.offset + filters.limit, pagination.total)} of {pagination.total} activities
              </p>

              <div style={{ display: "flex", gap: "8px" }}>

                <button
                  onClick={handlePrevPage}
                  disabled={filters.offset === 0}
                  style={{
                    padding: "8px 16px",
                    background: filters.offset === 0 ? "#e5e7eb" : "#3b82f6",
                    color: filters.offset === 0 ? "#999" : "white",
                    border: "none",
                    borderRadius: "4px",
                    cursor: filters.offset === 0 ? "not-allowed" : "pointer",
                    fontSize: "14px"
                  }}
                >
                  Previous
                </button>

                <button
                  onClick={handleNextPage}
                  disabled={filters.offset + filters.limit >= pagination.total}
                  style={{
                    padding: "8px 16px",
                    background: filters.offset + filters.limit >= pagination.total ? "#e5e7eb" : "#3b82f6",
                    color: filters.offset + filters.limit >= pagination.total ? "#999" : "white",
                    border: "none",
                    borderRadius: "4px",
                    cursor: filters.offset + filters.limit >= pagination.total ? "not-allowed" : "pointer",
                    fontSize: "14px"
                  }}
                >
                  Next
                </button>

              </div>

            </div>

          </>
        )}

      </div>

    </MainLayout>

  );

}

export default Reports;
