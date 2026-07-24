const supabase = require("../config/supabase");

exports.getThankYouPage = async (req, res) => {
    try {

        const { projectId, status } = req.params;

        const { data, error } = await supabase
            .from("thank_you_pages")
            .select("*")
            .eq("project_id", projectId)
            .single();

        if (error || !data) {
            return res.status(404).json({
                success: false,
                message: "Thank You Page not found"
            });
        }

        let page = {};

        switch (status) {

            case "completed":
                page = data.completed || {};
                break;

            case "disqualified":
                page = data.disqualified || {};
                break;

            case "quota":
                page = data.quota_full || {};
                break;

            default:
                page = data.completed || {};
        }

        return res.json({

            success: true,

            branding: {

                logo: data.logo_url,

                companyName: data.company_name,

                primaryColor: data.primary_color,

                backgroundColor: data.background_color,

                textColor: data.text_color,

                footer: data.footer

            },

            page

        });

    } catch (err) {

        return res.status(500).json({
            success: false,
            message: err.message
        });

    }
};


exports.getAllThankYouPages = async (req, res) => {

    try {

        const { data, error } = await supabase

            .from("projects")

            .select(`
                id,
                project_name,
                completion_mode,
                clients(
                    company_name
                )
            `)

            .order("created_at", {
                ascending: false
            });

        if (error) {

            return res.status(400).json(error);

        }

        return res.json(data);

    }

    catch (err) {

        return res.status(500).json({

            success: false,

            message: err.message

        });

    }

};

exports.getThankYouConfig = async (req, res) => {

    try {

        const { projectId } = req.params;

        console.log("PROJECT ID:", projectId);

        // Get Thank You Page
        const { data: page, error: pageError } = await supabase
            .from("thank_you_pages")
            .select("*")
            .eq("project_id", projectId)
            .single();

         console.log("PAGE:", page);
        console.log("PAGE ERROR:", pageError);

        if (pageError || !page) {

            return res.status(404).json({
                success: false,
                message: "Thank You configuration not found"
            });

        }

        // Get Project
        const { data: project, error: projectError } = await supabase
            .from("projects")
            .select("project_name, completion_mode")
            .eq("id", projectId)
            .single();

             console.log("PROJECT:", project);
        console.log("PROJECT ERROR:", projectError);
        if (projectError || !project) {

            return res.status(404).json({
                success: false,
                message: "Project not found"
            });

        }

        return res.json({

            page,

            project

        });

    }

    catch (err) {

        return res.status(500).json({

            success: false,

            message: err.message

        });

    }

};

// exports.updateThankYouConfig = async (req, res) => {

//     try {

//         const { projectId } = req.params;

//         console.log("BODY:", req.body);

//         const payload = {

//             project_id: projectId,

//             ...req.body

//         };

//         const { data, error } = await supabase

//             .from("thank_you_pages")

//             .upsert(payload, {
//                 onConflict: "project_id"
//             })

//             .select()

//             .single();

//         console.log("DATA:", data);
//         console.log("ERROR:", error);

//         if (error) {

//             return res.status(400).json(error);

//         }

//         return res.json(data);

//     }

//     catch (err) {

//         return res.status(500).json({

//             success: false,

//             message: err.message

//         });

//     }

// };

exports.updateThankYouConfig = async (req, res) => {

    try {

        const { projectId } = req.params;

        console.log("BODY:", req.body);

        // Check if configuration already exists
        const { data: existing, error: findError } = await supabase
            .from("thank_you_pages")
            .select("id")
            .eq("project_id", projectId)
            .maybeSingle();

        if (findError) {

            return res.status(400).json(findError);

        }

        let result;

        if (existing) {

            // Update existing configuration
            result = await supabase
                .from("thank_you_pages")
                .update(req.body)
                .eq("project_id", projectId)
                .select()
                .single();

        } else {

            // Create new configuration
            result = await supabase
                .from("thank_you_pages")
                .insert({

                    project_id: projectId,

                    ...req.body

                })
                .select()
                .single();

        }

        console.log("DATA:", result.data);
        console.log("ERROR:", result.error);

        if (result.error) {

            return res.status(400).json(result.error);

        }

        return res.json({

            success: true,

            data: result.data

        });

    }

    catch (err) {

        console.log(err);

        return res.status(500).json({

            success: false,

            message: err.message

        });

    }

};