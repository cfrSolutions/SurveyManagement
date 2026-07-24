import MainLayout from "../../components/layout/MainLayout";
import "../../styles/dashboard.css";
import KpiCard from "../../components/common/KpiCard";
import { useEffect, useState } from "react";
import api from "../../services/api";

function Dashboard() {
const [stats, setStats] =
useState({

  totalProjects: 0,
  totalClients: 0,
  totalVendors: 0,
  totalCompletes: 0,

  runningProjects: []

});
useEffect(() => {

  loadDashboard();

}, []);

const loadDashboard = async () => {

  try {

    const res =
      await api.get(
        "/dashboard"
      );

    setStats(res.data);

  } catch (error) {

    console.log(error);

  }

};
  return (

    <MainLayout>

      <div className="dashboard-page">

        <div className="dashboard-header">

          <div>

            <h1 className="dashboard-title">
              Dashboard
            </h1>

            <p className="dashboard-subtitle">
              Welcome back, here's your business overview.
            </p>

          </div>

          <button className="primary-btn">
            + Create Project
          </button>

        </div>

        <div className="dashboard-kpis">

          <KpiCard
  title="Projects"
  value={stats.totalProjects}
  trend="Active Projects"
/>

<KpiCard
  title="Clients"
  value={stats.totalClients}
  trend="Registered Clients"
/>

<KpiCard
  title="Vendors"
  value={stats.totalVendors}
  trend="Panel Partners"
/>

<KpiCard
  title="Completes"
  value={stats.totalCompletes}
  trend="Survey Completes"
/>

        </div>
        
        <div className="dashboard-grid">

          <div className="dashboard-card">

            <div className="card-header">

              <h3>
                Revenue Overview
              </h3>

              <span>
                Last 30 Days
              </span>

            </div>

            <div className="chart-placeholder">

              Revenue Chart

            </div>

          </div>

          <div className="dashboard-card">

            <h3>
              Recent Activities
            </h3>

            <div className="activity-list">

              <div className="activity-item">

                <div className="activity-dot"></div>

                <div>

                  <p>
                    New Project Created
                  </p>

                  <span>
                    2 hours ago
                  </span>

                </div>

              </div>

              <div className="activity-item">

                <div className="activity-dot"></div>

                <div>

                  <p>
                    Vendor Assigned
                  </p>

                  <span>
                    5 hours ago
                  </span>

                </div>

              </div>

              <div className="activity-item">

                <div className="activity-dot"></div>

                <div>

                  <p>
                    Client Added
                  </p>

                  <span>
                    Yesterday
                  </span>

                </div>

              </div>

            </div>

          </div>

        </div>

        <div className="running-projects">

          <div className="card-header">

            <h3>
              Running Projects
            </h3>

            <button className="view-all-btn">
              View All
            </button>

          </div>

          <div className="table-wrapper">

            <table className="enterprise-table">

              <thead>

                <tr>

                  <th>Project</th>
                  <th>Client</th>
                  <th>Status</th>
                  <th>Country</th>

                </tr>

              </thead>


              <tbody>

{
  stats.runningProjects?.length > 0 ? (

    stats.runningProjects.map(
      (project) => (

        <tr key={project.id}>

          <td>
            {project.project_name ||
             project.name}
          </td>

          <td>
            {project.company_name ||
             "-"}
          </td>

          <td>

            <span
              className={
                project.status === "LIVE"
                ? "status active"
                : "status pending"
              }
            >
              {project.status}
            </span>

          </td>

          <td>
            {project.country ||
             project.market ||
             "-"}
          </td>

        </tr>

      )
    )

  ) : (

    <tr>

      <td
        colSpan="4"
        style={{
          textAlign: "center"
        }}
      >
        No Running Projects
      </td>

    </tr>

  )
}

</tbody>
            </table>

          </div>

        </div>

      </div>

    </MainLayout>

  );

}

export default Dashboard;