import { useContext, useEffect, useState } from "react";
import MainLayout from "../../components/layout/MainLayout";
import { AuthContext } from "../../context/AuthContext";
import api from "../../services/api";
import KpiCard from "../../components/common/KpiCard";
import "../../styles/dashboard.css";

function VendorDashboard() {
  const { user } = useContext(AuthContext);
  const [stats, setStats] = useState({
    assignedProjects: 0,
    allocationsAssigned: 0,
    totalResponses: 0,
    completed: 0,
    disqualified: 0,
    quotaFull: 0,
    revenueGenerated: 0,
    graph: {
      labels: [],
      completed: [],
      revenue: [],
    },
  });

  useEffect(() => {
    if (user?.id) {
      loadVendorDashboard();
    }
  }, [user?.id]);

  const loadVendorDashboard = async () => {
    try {
      const res = await api.get(`/vendors/dashboard/${user.id}`);
      setStats(res.data);
    } catch (error) {
      console.error("Vendor dashboard load failed:", error);
    }
  };

  const maxCompleted = Math.max(...stats.graph.completed, 1);
  const maxRevenue = Math.max(...stats.graph.revenue, 1);

  return (
    <MainLayout>
      <div className="dashboard-page">
        <div className="dashboard-header">
          <div>
            <h1 className="dashboard-title">Vendor Dashboard</h1>
            <p className="dashboard-subtitle">
              Welcome back, {user?.name || "Vendor"}. Here is your vendor workspace.
            </p>
          </div>
        </div>

        <div className="dashboard-kpis">
          <KpiCard
            title="Assigned Projects"
            value={stats.assignedProjects}
            trend="Project assignments"
          />
          <KpiCard
            title="Total Responses"
            value={stats.totalResponses}
            trend="Survey interactions"
          />
          <KpiCard
            title="Completes"
            value={stats.completed}
            trend="Completed surveys"
          />
          <KpiCard
            title="Revenue"
            value={`$${stats.revenueGenerated.toFixed(2)}`}
            trend="Estimated revenue"
          />
        </div>

        <div className="dashboard-grid">
          <div className="dashboard-card">
            <div className="card-header">
              <h3>Completion Trend</h3>
              <span>Last 7 days</span>
            </div>
            <div className="metric-chart">
              {stats.graph.labels.length ? (
                <div className="metric-chart-grid">
                  {stats.graph.labels.map((label, index) => {
                    const value = stats.graph.completed[index] || 0;
                    const height = Math.round((value / maxCompleted) * 100);
                    return (
                      <div className="metric-chart-item" key={label}>
                        <div className="metric-chart-track">
                          <div
                            className="metric-chart-fill"
                            style={{ height: `${height}%` }}
                          />
                        </div>
                        <span className="metric-chart-value">{value}</span>
                        <span className="metric-chart-label">
                          {label.slice(5)}
                        </span>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="chart-placeholder">No completion data available.</div>
              )}
            </div>
          </div>

          <div className="dashboard-card">
            <div className="card-header">
              <h3>Revenue Trend</h3>
              <span>Last 7 days</span>
            </div>
            <div className="metric-chart">
              {stats.graph.labels.length ? (
                <div className="metric-chart-grid">
                  {stats.graph.labels.map((label, index) => {
                    const value = stats.graph.revenue[index] || 0;
                    const height = Math.round((value / maxRevenue) * 100);
                    return (
                      <div className="metric-chart-item" key={label}>
                        <div className="metric-chart-track">
                          <div
                            className="metric-chart-fill revenue"
                            style={{ height: `${height}%` }}
                          />
                        </div>
                        <span className="metric-chart-value">${value.toFixed(0)}</span>
                        <span className="metric-chart-label">
                          {label.slice(5)}
                        </span>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="chart-placeholder">No revenue data available.</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

export default VendorDashboard;
