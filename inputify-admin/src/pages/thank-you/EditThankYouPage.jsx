import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import MainLayout from "../../components/layout/MainLayout";
import PageHeader from "../../components/common/PageHeader";
import { supabase } from "../../services/supabase";
import api from "../../services/api";

import "../../styles/thankyou.css";

export default function EditThankYouPage() {

    const { projectId } = useParams();

    const [tab, setTab] = useState("completed");
    const [projectName, setProjectName] = useState("");

const [completionMode, setCompletionMode] = useState("vendor");

    const [config, setConfig] = useState({

        company_name: "",

        logo_url: "",

        primary_color: "#6D28D9",

        background_color: "#FFFFFF",

        text_color: "#111827",

        completed: {},

        disqualified: {},

        quota_full: {},

        footer: {}

    });

    useEffect(() => {

        loadConfig();

    }, []);

    const loadConfig = async () => {

        // const res =
        //     await api.get(
        //         `/thank-you/config/${projectId}`
        //     );

        // setConfig(res.data);
        const res = await api.get(
    `/thank-you/config/${projectId}`
);

setConfig(res.data.page);

setProjectName(
    res.data.project.project_name
);

setCompletionMode(
    res.data.project.completion_mode
);

    };

    // const save = async () => {

    //     await api.put(

    //         `/thank-you/config/${projectId}`,

    //         config

    //     );

    //     alert("Saved Successfully");

    // };

    const save = async () => {

    try {

        await api.put(

            `/thank-you/config/${projectId}`,

            config

        );

        await api.put(
    `/projects/${projectId}`,
    {
        completion_mode: completionMode
    }
);

        alert("Configuration Saved");

    }

    catch(err){

        console.log(err);

        alert("Unable to save");

    }

};

const uploadLogo = async (e) => {

    const file = e.target.files[0];

    if (!file) return;

    //----------------------------------
    // File Type Validation
    //----------------------------------

    const allowed = [
        "image/png",
        "image/jpeg",
        "image/jpg",
        "image/svg+xml",
        "image/webp"
    ];

    if (!allowed.includes(file.type)) {

        alert("Only PNG, JPG, JPEG, SVG and WEBP are allowed.");

        return;

    }

    //----------------------------------
    // File Size Validation
    //----------------------------------

    if (file.size > 1024 * 1024) {

        alert("Maximum size is 1 MB");

        return;

    }

    //----------------------------------
    // Upload
    //----------------------------------

    const extension = file.name.split(".").pop();

    const fileName = `${projectId}/logo.${extension}`;

    const { error } = await supabase.storage
        .from("logos")
        .upload(fileName, file, {
            upsert: true
        });

    if (error) {

       console.log(JSON.stringify(error, null, 2));

        alert("Upload Failed");

        return;

    }

    const { data } = supabase.storage
        .from("logos")
        .getPublicUrl(fileName);

    setConfig(prev => ({
        ...prev,
        logo_url: data.publicUrl
    }));

};
    const page =
        config[tab];

    return (

        <MainLayout>

            <PageHeader
                title="Configure Thank You Page"
            />
            <div className="thankyou-editor">

    <div className="editor-left">
        <div className="project-card">

    <h2>{projectName}</h2>

    <h3 style={{ marginTop: "20px" }}>
        Completion Experience
    </h3>

    <div className="completion-mode">

        <label>

            <input
                type="radio"
                checked={completionMode === "vendor"}
                onChange={() =>
                    setCompletionMode("vendor")
                }
            />

            Vendor Redirect

        </label>

        <label>

            <input
                type="radio"
                checked={completionMode === "inputify"}
                onChange={() =>
                    setCompletionMode("inputify")
                }
            />

            Inputify Thank You Page

        </label>

    </div>

</div>

        <div className="project-card">

            <h3>Branding</h3>

            <label>Company Name</label>

            <input

                value={config.company_name}

                onChange={(e)=>

                    setConfig({

                        ...config,

                        company_name:e.target.value

                    })

                }

            />

            <label>Company Logo</label>

<input
    type="file"
    accept="image/png,image/jpeg,image/jpg,image/svg+xml,image/webp"
    onChange={uploadLogo}
/>

{config.logo_url && (

    <img
        src={config.logo_url}
        style={{
            width:70,
            marginTop:15,
            borderRadius:8
        }}
    />

)}

            <label>Primary Color</label>

            <input

                type="color"

                value={config.primary_color}

                onChange={(e)=>

                    setConfig({

                        ...config,

                        primary_color:e.target.value

                    })

                }

            />

            <label>Background Color</label>

            <input

                type="color"

                value={config.background_color}

                onChange={(e)=>

                    setConfig({

                        ...config,

                        background_color:e.target.value

                    })

                }

            />

            <label>Text Color</label>

            <input

                type="color"

                value={config.text_color}

                onChange={(e)=>

                    setConfig({

                        ...config,

                        text_color:e.target.value

                    })

                }

            />

        </div>
            <div className="project-card">

    <div className="tabs">

    <button
        className={tab === "completed" ? "tab active" : "tab"}
        onClick={() => setTab("completed")}
    >
        Completed
    </button>

    <button
        className={tab === "disqualified" ? "tab active" : "tab"}
        onClick={() => setTab("disqualified")}
    >
        Disqualified
    </button>

    <button
        className={tab === "quota_full" ? "tab active" : "tab"}
         onClick={() => setTab("quota_full")}
    >
        Quota Full
    </button>

</div>

    <label>Heading</label>

    <input

        value={page.heading || ""}

        onChange={(e)=>{

            setConfig({

                ...config,

                [tab]:{

                    ...page,

                    heading:e.target.value

                }

            });

        }}

    />

    <label>Description</label>

    <textarea

        rows="5"

        value={page.description || ""}

        onChange={(e)=>{

            setConfig({

                ...config,

                [tab]:{

                    ...page,

                    description:e.target.value

                }

            });

        }}

    />

    {/* <label>Button Text</label>

    <input

        value={page.buttonText || ""}

        onChange={(e)=>{

            setConfig({

                ...config,

                [tab]:{

                    ...page,

                    buttonText:e.target.value

                }

            });

        }}

    /> */}
    <label>Footer Text</label>

<input
    value={config.footer?.text || ""}
    onChange={(e) =>
        setConfig({
            ...config,
            footer: {
                ...config.footer,
                text: e.target.value
            }
        })
    }
/>

</div>

<button
    className="save-btn"
    onClick={save}
>
    Save Configuration
</button>

</div>
<div
    className="preview-card"
    style={{
        background: "#eef4fb"
    }}
>

    <div className="preview-window">

        <div
            className="preview-top"
            style={{
                background: config.primary_color
            }}
        />

        <div className="preview-content">

            <div className="preview-brand">

    {config.logo_url ? (

        <img
            src={config.logo_url}
            className="preview-logo"
            alt="Company Logo"
        />

    ) : (

        <div className="preview-company-name">

            {config.company_name || "Your Company"}

        </div>

    )}

    {config.logo_url && config.company_name && (

        <h2 className="preview-company-name-text">

            {config.company_name}

        </h2>

    )}

</div>

            <div
                className="preview-icon"
                style={{
                    background:
                        tab === "completed"
                            ? "#DCFCE7"
                            : tab === "disqualified"
                            ? "#FEE2E2"
                            : "#FEF3C7"
                }}
            >
                {tab === "completed" ? "✓" : tab === "disqualified" ? "!" : "⏸"}
            </div>

            <span
                className={`preview-badge ${tab}`}
            >
                {tab === "completed"
                    ? "Completed"
                    : tab === "disqualified"
                    ? "Screened Out"
                    : "Quota Full"}
            </span>

            <h1>{page.heading}</h1>

            {/* <p>{page.description}</p> */}

            <div className="preview-info">

                <h4>
                    Additional Information
                </h4>

                <p>
                    {page.description}
                </p>

            </div>

          <div className="preview-footer">
    {config.footer?.text || "Powered by Inputify"}
</div>

        </div>

    </div>

</div>

</div>

        </MainLayout>

    );

}