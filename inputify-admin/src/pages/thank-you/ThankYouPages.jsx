import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import MainLayout from "../../components/layout/MainLayout";
import PageHeader from "../../components/common/PageHeader";

import api from "../../services/api";

import "../../styles/thankyou.css";

export default function ThankYouPages() {

    const navigate = useNavigate();

    const [projects, setProjects] = useState([]);

    useEffect(() => {

        loadProjects();

    }, []);

    const loadProjects = async () => {

        try {

            const res =
                await api.get("/thank-you");

            setProjects(res.data);

        }

        catch (err) {

            console.log(err);

        }

    };

    return (

        <MainLayout>

            <PageHeader
                title="Thank You Pages"
            />

            <div className="thankyou-card">

                <table className="thankyou-table">

                    <thead>

                        <tr>

                            <th>Project</th>

                            <th>Client</th>

                            <th>Mode</th>

                            <th></th>

                        </tr>

                    </thead>

                    <tbody>

                        {

                            projects.map(project => (

                                <tr
                                    key={project.id}
                                >

                                    <td>

                                        {project.project_name}

                                    </td>

                                    <td>

                                        {
                                            project.clients
                                                ?.company_name
                                        }

                                    </td>

                                    <td>

                                        <span
                                            className={
                                                project.completion_mode === "vendor"
                                                    ? "badge vendor"
                                                    : "badge inputify"
                                            }
                                        >

                                            {
                                                project.completion_mode
                                            }

                                        </span>

                                    </td>

                                    <td>

                                        <button

                                            className="edit-btn"

                                            onClick={() =>

                                                navigate(
                                                    `/thank-you-pages/${project.id}`
                                                )

                                            }

                                        >

                                            Configure

                                        </button>

                                    </td>

                                </tr>

                            ))

                        }

                    </tbody>

                </table>

            </div>

        </MainLayout>

    );

}