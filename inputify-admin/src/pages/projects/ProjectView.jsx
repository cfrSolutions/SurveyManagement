import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import api from "../../services/api";
import MainLayout from "../../components/layout/MainLayout";

import "../../styles/module.css";

function ProjectView() {
  const { id } = useParams();
  const [project, setProject] = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await api.get(`/projects/${id}`);
        setProject(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    load();
  }, [id]);

  if (!project) {
    return (
      <MainLayout>
        <div style={{ padding: 20 }}>Loading project...</div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="module-page">
        <div className="module-header">
          <h1 className="module-title">Project Details</h1>
        </div>

        <div className="table-card">
          <h3>{project.project_name}</h3>

          <div style={{ marginTop: 12 }}>
            <p><strong>Project ID:</strong> {project.id}</p>
            <p><strong>Client:</strong> {project.client_name || project.client_id}</p>
            <p><strong>Required Completes:</strong> {project.req_completes || 0}</p>
            <p><strong>Status:</strong> {project.status}</p>
            <p><strong>Country:</strong> {project.country || '-'}</p>
            <p><strong>Notes:</strong> {project.notes || '-'}</p>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

export default ProjectView;
