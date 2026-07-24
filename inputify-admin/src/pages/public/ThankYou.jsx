import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../../styles/thankyou.css";
import api from "../../services/api";

export default function ThankYou() {

    const { projectId, status } = useParams();

    const [data, setData] = useState(null);

    useEffect(() => {

        api
            .get(`/thank-you/${projectId}/${status}`)
            .then(res => setData(res.data))
            .catch(console.error);

    }, [projectId, status]);

    if (!data) {

        return <h2>Loading...</h2>;

    }

    return (

    <div className="preview-page">

        <div className="preview-window">

            <div
                className="preview-top"
                style={{
                    background: data.branding.primaryColor
                }}
            />

            <div className="preview-content">

                <div className="preview-brand">

                    {data.branding.logo ? (

                        <img
                            src={data.branding.logo}
                            className="preview-logo"
                            alt="Company Logo"
                        />

                    ) : (

                        <div className="preview-company-name">

                            {data.branding.companyName || "Your Company"}

                        </div>

                    )}

                    {data.branding.logo && data.branding.companyName && (

                        <h2 className="preview-company-name-text">

                            {data.branding.companyName}

                        </h2>

                    )}

                </div>

                <div
                    className="preview-icon"
                    style={{
                        background:
                            status === "completed"
                                ? "#DCFCE7"
                                : status === "disqualified"
                                ? "#FEE2E2"
                                : "#FEF3C7"
                    }}
                >
                    {status === "completed"
                        ? "✓"
                        : status === "disqualified"
                        ? "!"
                        : "⏸"}
                </div>

                <span
                    className={`preview-badge ${
                        status === "completed"
                            ? "completed"
                            : status === "disqualified"
                            ? "disqualified"
                            : "quota_full"
                    }`}
                >

                    {status === "completed"
                        ? "Completed"
                        : status === "disqualified"
                        ? "Screened Out"
                        : "Quota Full"}

                </span>

                <h1>{data.page.heading}</h1>

                <div className="preview-info">

                    <h4>Additional Information</h4>

                    <p>{data.page.description}</p>

                </div>

                <div className="preview-footer">

                    {data.branding.footer?.text || "Powered by Inputify"}

                </div>

            </div>

        </div>

    </div>

);

}