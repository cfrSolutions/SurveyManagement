// const { v4: uuidv4 } = require("uuid");
// const supabase = require("../config/supabase");
// const { generateGid, verifyGid } = require("../utils/gid");
// const { generateCada, verifyCada } = require("../utils/cada");

// exports.captureSurvey = async (req, res) => {

//     try {

//         const { gid, pid } = req.query;

//         //----------------------------------------------------
//         // Validate
//         //----------------------------------------------------

//         if (!gid) {

//             return res.status(400).json({
//                 success: false,
//                 message: "Missing GID"
//             });

//         }

//         //----------------------------------------------------
//         // Decode GID
//         //----------------------------------------------------

//         const gidPayload = verifyGid(gid);

//         //----------------------------------------------------
//         // Load Vendor Allocation
//         //----------------------------------------------------

//         const { data: allocation, error: allocationError } =
//             await supabase
//                 .from("vendor_allocations")
//                 .select("*")
//                 .eq("id", gidPayload.allocationId)
//                 .single();

//         if (allocationError || !allocation) {

//             return res.status(404).json({
//                 success: false,
//                 message: "Vendor Allocation not found"
//             });

//         }

//         //----------------------------------------------------
//         // Load Project
//         //----------------------------------------------------

//         const { data: project, error: projectError } =
//             await supabase
//                 .from("projects")
//                 .select("*")
//                 .eq("id", allocation.project_id)
//                 .single();

//         if (projectError || !project) {

//             return res.status(404).json({
//                 success: false,
//                 message: "Project not found"
//             });

//         }

//         //----------------------------------------------------
//         // Respondent ID
//         //----------------------------------------------------

//         const respondentId = uuidv4();

//         //----------------------------------------------------
//         // Save Respondent
//         //----------------------------------------------------

//         const { data: respondent, error: respondentError } =
//             await supabase
//                 .from("respondent_logs")
//                 .insert({

//                     respondent_id: respondentId,

//                     project_id: project.id,

//                     vendor_id: allocation.vendor_id,

//                     panel_id: pid || null,

//                     status: "STARTED",

//                     started_at: new Date(),

//                     cada: allocation.cada

//                 })
//                 .select()
//                 .single();

//         if (respondentError) {

//             return res.status(400).json(respondentError);

//         }

//         //----------------------------------------------------
//         // Save Session (PHP Style)
//         //----------------------------------------------------

//         req.session.respondentId = respondent.respondent_id;

//         req.session.projectId = project.id;

//         req.session.vendorId = allocation.vendor_id;

//         req.session.panelId = pid;

//         //----------------------------------------------------
//         // Client Survey Link
//         //----------------------------------------------------

//         let surveyLink =
//             project.live_survey_link ||
//             project.survey_link;

//         if (!surveyLink) {

//             return res.status(400).json({

//                 success: false,

//                 message: "Survey Link Missing"

//             });

//         }

//         //----------------------------------------------------
//         // Replace {{ID}}
//         //----------------------------------------------------

//        // {{ID}}
// surveyLink = surveyLink.replace(
//     /\{\{ID\}\}/gi,
//     respondent.respondent_id
// );

// // {ID}
// surveyLink = surveyLink.replace(
//     /\{ID\}/gi,
//     respondent.respondent_id
// );

// // [%ID%]
// surveyLink = surveyLink.replace(
//     /\[%ID%\]/gi,
//     respondent.respondent_id
// );


//         //----------------------------------------------------
//         // Replace Tracking Parameter
//         //----------------------------------------------------

//         const trackingValue = respondent.respondent_id;
// const trackingParam = project.tracking_param || "RID";

// // [%RID%]
// surveyLink = surveyLink.replace(
//     new RegExp(`\\[%${trackingParam}%\\]`, "gi"),
//     trackingValue
// );

// // {RID}
// surveyLink = surveyLink.replace(
//     new RegExp(`\\{${trackingParam}\\}`, "gi"),
//     trackingValue
// );

// // {{RID}}
// surveyLink = surveyLink.replace(
//     new RegExp(`\\{\\{${trackingParam}\\}\\}`, "gi"),
//     trackingValue
// );

// // @RID
// surveyLink = surveyLink.replace(
//     new RegExp(`@${trackingParam}`, "gi"),
//     trackingValue
// );

//         const regex = new RegExp(

//             `\\[%${trackingParam}%\\]`,

//             "gi"

//         );

//         surveyLink =
//             surveyLink.replace(
//                 regex,
//                 respondent.respondent_id
//             );

//         //----------------------------------------------------
//         // Replace CLIENTKEY
//         //----------------------------------------------------

//         surveyLink =
//             surveyLink.replace(

//                 /\{\{CLIENTKEY\}\}/gi,

//                 allocation.client_key || ""

//             );

//         //----------------------------------------------------
//         // Replace PANEL ID
//         //----------------------------------------------------

//         surveyLink =
//             surveyLink.replace(

//                 /\{\{PANELIST_IDENTIFIER\}\}/gi,

//                 pid || ""

//             );

//         surveyLink =
//             surveyLink.replace(

//                 /\[%PID%\]/gi,

//                 pid || ""

//             );

//         //----------------------------------------------------
//         // Logs
//         //----------------------------------------------------

//         console.log("--------------------------------");

//         console.log(
//             "RESPONDENT CREATED",
//             respondent.respondent_id
//         );

//         console.log(
//             "PANEL:",
//             pid
//         );

//         console.log(
//             "PROJECT:",
//             project.project_name
//         );

//         console.log(
//             "SURVEY:",
//             surveyLink
//         );

//         console.log("--------------------------------");

//         //----------------------------------------------------
//         // Redirect
//         //----------------------------------------------------

//         return res.redirect(surveyLink);

//     }

//     catch (err) {

//         console.log(err);

//         return res.status(500).json({

//             success: false,

//             message: err.message

//         });

//     }

// };

// exports.endCapture = async (req, res) => {

//     try {

//         const { cada, st, sr } = req.query;

//         //------------------------------------------------
//         // Validate
//         //------------------------------------------------

//         if (!cada) {

//             return res.status(400).json({
//                 success: false,
//                 message: "Missing CADA"
//             });

//         }

//         if (!st) {

//             return res.status(400).json({
//                 success: false,
//                 message: "Missing Status"
//             });

//         }

//         //------------------------------------------------
//         // Decode CADA
//         //------------------------------------------------

//         const payload = verifyCada(cada);

//         //------------------------------------------------
//         // Vendor Allocation
//         //------------------------------------------------

//         const { data: allocation, error: allocationError } =
//             await supabase
//                 .from("vendor_allocations")
//                 .select("*")
//                 .eq("id", payload.allocationId)
//                 .single();

//         if (allocationError || !allocation) {

//             return res.status(404).json({
//                 success: false,
//                 message: "Vendor Allocation not found"
//             });

//         }

//         //------------------------------------------------
//         // Session
//         //------------------------------------------------

//         const respondentId =
//             req.session.respondentId;

//         if (!respondentId) {

//             return res.status(400).json({
//                 success: false,
//                 message: "Session Expired"
//             });

//         }

//         //------------------------------------------------
//         // Respondent
//         //------------------------------------------------

//         const { data: respondent, error: respondentError } =
//             await supabase
//                 .from("respondent_logs")
//                 .select("*")
//                 .eq("respondent_id", respondentId)
//                 .single();

//         if (respondentError || !respondent) {

//             return res.status(404).json({
//                 success: false,
//                 message: "Respondent not found"
//             });

//         }

//         //------------------------------------------------
//         // Already Captured
//         //------------------------------------------------

//         if (
//             respondent.status === "COMPLETED" ||
//             respondent.status === "DISQUALIFIED" ||
//             respondent.status === "QUOTA_FULL"
//         ) {

//             return res.send("Already Captured");

//         }

//         //------------------------------------------------
//         // Status Mapping
//         //------------------------------------------------

//         let status = "TERMINATED";

//         switch (st) {

//             case "111":
//                 status = "COMPLETED";
//                 break;

//             case "222":
//                 status = "DISQUALIFIED";
//                 break;

//             case "333":
//                 status = "QUOTA_FULL";
//                 break;

//         }

//         //------------------------------------------------
//         // Update Respondent
//         //------------------------------------------------

//         const updateData = {

//             status,

//             completed_at: new Date()

//         };

//         if (
//             status === "DISQUALIFIED" &&
//             sr
//         ) {

//             updateData.disqualify_reason =
//                 sr.substring(0, 25);

//         }

//         await supabase
//             .from("respondent_logs")
//             .update(updateData)
//             .eq("respondent_id", respondentId);

//         //------------------------------------------------
//         // Increment Project Counters
//         //------------------------------------------------

//         const counter = {

//             COMPLETED: "completes",

//             DISQUALIFIED: "disqualified",

//             QUOTA_FULL: "quota_full"

//         }[status];

//         if (counter) {

//             const { data: project } =
//                 await supabase
//                     .from("projects")
//                     .select(counter)
//                     .eq("id", allocation.project_id)
//                     .single();

//             await supabase
//                 .from("projects")
//                 .update({

//                     [counter]:
//                         (project[counter] || 0) + 1

//                 })
//                 .eq("id", allocation.project_id);

//         }

//         //------------------------------------------------
//         // Vendor Redirect URL
//         //------------------------------------------------

//         let redirectUrl = "";

//         switch (status) {

//             case "COMPLETED":

//                 redirectUrl =
//                     allocation.complete_url;

//                 break;

//             case "DISQUALIFIED":

//                 redirectUrl =
//                     allocation.disqualified_url;

//                 break;

//             case "QUOTA_FULL":

//                 redirectUrl =
//                     allocation.quota_full_url;

//                 break;

//         }

//         //------------------------------------------------
//         // Replace Variables
//         //------------------------------------------------

//         if (redirectUrl) {

//             redirectUrl = redirectUrl

//                 .replace(
//                     /\{\{panellist_id\}\}/gi,
//                     respondent.panel_id || ""
//                 )

//                 .replace(
//                     /\{\{ID\}\}/gi,
//                     respondent.respondent_id
//                 )

//                 .replace(
//                     /\{\{CLIENTKEY\}\}/gi,
//                     allocation.client_key || ""
//                 );

//         }

//         //------------------------------------------------
//         // Destroy Session
//         //------------------------------------------------

//         req.session.destroy(() => {});

//         res.clearCookie("INPUTIFYSESSID");

//         //------------------------------------------------
//         // Logs
//         //------------------------------------------------

//         console.log("--------------------------------");

//         console.log("RESPONDENT :", respondent.respondent_id);

//         console.log("STATUS :", status);

//         console.log("PANEL :", respondent.panel_id);

//         console.log("REDIRECT :", redirectUrl);

//         console.log("--------------------------------");

//         //------------------------------------------------
//         // Redirect Vendor
//         //------------------------------------------------

//         if (redirectUrl) {

//             return res.redirect(redirectUrl);

//         }

//         return res.send("Survey Updated");

//     }

//     catch (err) {

//         console.log(err);

//         return res.status(500).json({

//             success: false,

//             message: err.message

//         });

//     }

// };

// exports.getRedirectLinks = async (req, res) => {

//     try {

//         const { allocationId } = req.params;

//         //--------------------------------------------------
//         // Allocation
//         //--------------------------------------------------

//         const { data: allocation, error: allocationError } =
//             await supabase
//                 .from("vendor_allocations")
//                 .select("*")
//                 .eq("id", allocationId)
//                 .single();

//         if (allocationError || !allocation) {

//             return res.status(404).json({
//                 success: false,
//                 message: "Vendor Allocation not found"
//             });

//         }

//         //--------------------------------------------------
//         // Project
//         //--------------------------------------------------

//         const { data: project, error: projectError } =
//             await supabase
//                 .from("projects")
//                 .select("*")
//                 .eq("id", allocation.project_id)
//                 .single();

//         if (projectError || !project) {

//             return res.status(404).json({
//                 success: false,
//                 message: "Project not found"
//             });

//         }

//         //--------------------------------------------------
//         // Vendor
//         //--------------------------------------------------

//         const { data: vendor, error: vendorError } =
//             await supabase
//                 .from("vendors")
//                 .select("*")
//                 .eq("id", allocation.vendor_id)
//                 .single();

//         if (vendorError || !vendor) {

//             return res.status(404).json({
//                 success: false,
//                 message: "Vendor not found"
//             });

//         }

//         //--------------------------------------------------
//         // Links
//         //--------------------------------------------------

//         const BASE_URL = process.env.BASE_URL;

//        //--------------------------------------------------
// // Generate missing GID/CADA
// //--------------------------------------------------

// const gid = allocation.gid;
// const cada = allocation.cada;

// const links = {

//     capture:
// `${BASE_URL}/api/survey/capture?gid=${gid}&pid={{PANELIST_IDENTIFIER}}`,

//     complete:
// `${BASE_URL}/api/survey/endcapture?cada=${cada}&st=111`,

//     disqualified:
// `${BASE_URL}/api/survey/endcapture?cada=${cada}&st=222&sr=security`,

//     quotaFull:
// `${BASE_URL}/api/survey/endcapture?cada=${cada}&st=333`

// };

//         //--------------------------------------------------
//         // Response
//         //--------------------------------------------------

//         return res.json({

//             success: true,

//             vendor,

//             project,

//             links,

//             gid: allocation.gid,

//             cada: allocation.cada

//         });

//     }

//     catch (err) {

//         console.log(err);

//         return res.status(500).json({

//             success: false,

//             message: err.message

//         });

//     }

// };


// exports.getRespondentLogs = async (req, res) => {

//     try {

//         const { allocationId } = req.params;

//         //--------------------------------------------------
//         // Allocation
//         //--------------------------------------------------

//         const { data: allocation, error: allocationError } =
//             await supabase
//                 .from("vendor_allocations")
//                 .select("*")
//                 .eq("id", allocationId)
//                 .single();

//         if (allocationError || !allocation) {

//             return res.status(404).json({
//                 success: false,
//                 message: "Vendor Allocation not found"
//             });

//         }

//         //--------------------------------------------------
//         // Respondents
//         //--------------------------------------------------

//         const { data: respondents, error } =
//             await supabase
//                 .from("respondent_logs")
//                 .select("*")
//                 .eq("project_id", allocation.project_id)
//                 .eq("vendor_id", allocation.vendor_id)
//                 .order("started_at", {
//                     ascending: false
//                 });

//         if (error) {

//             return res.status(400).json(error);

//         }

//         //--------------------------------------------------
//         // Counts
//         //--------------------------------------------------

//         const stats = {

//             total: respondents.length,

//             started:
//                 respondents.filter(x =>
//                     x.status === "STARTED"
//                 ).length,

//             completed:
//                 respondents.filter(x =>
//                     x.status === "COMPLETED"
//                 ).length,

//             disqualified:
//                 respondents.filter(x =>
//                     x.status === "DISQUALIFIED"
//                 ).length,

//             quotaFull:
//                 respondents.filter(x =>
//                     x.status === "QUOTA_FULL"
//                 ).length,

//             terminated:
//                 respondents.filter(x =>
//                     x.status === "TERMINATED"
//                 ).length

//         };

//         //--------------------------------------------------
//         // Response
//         //--------------------------------------------------

//         return res.json({

//             success: true,

//             stats,

//             respondents

//         });

//     }

//     catch (err) {

//         console.log(err);

//         return res.status(500).json({

//             success: false,

//             message: err.message

//         });

//     }

// };

// exports.getRespondentStatus = async (req, res) => {

//     try {

//         const { cada } = req.query;

//         //--------------------------------------------------
//         // Validate
//         //--------------------------------------------------

//         if (!cada) {

//             return res.status(400).json({
//                 success: false,
//                 message: "Missing CADA"
//             });

//         }

//         //--------------------------------------------------
//         // Decode CADA
//         //--------------------------------------------------

//         const payload = verifyCada(cada);

//         //--------------------------------------------------
//         // Vendor Allocation
//         //--------------------------------------------------

//         const { data: allocation, error: allocationError } =
//             await supabase
//                 .from("vendor_allocations")
//                 .select("*")
//                 .eq("id", payload.allocationId)
//                 .single();

//         if (allocationError || !allocation) {

//             return res.status(404).json({
//                 success: false,
//                 message: "Vendor Allocation not found"
//             });

//         }

//         //--------------------------------------------------
//         // Current Session Respondent
//         //--------------------------------------------------

//         const respondentId = req.session.respondentId;

//         if (!respondentId) {

//             return res.status(404).json({
//                 success: false,
//                 message: "No Active Session"
//             });

//         }

//         //--------------------------------------------------
//         // Respondent
//         //--------------------------------------------------

//         const { data: respondent, error: respondentError } =
//             await supabase
//                 .from("respondent_logs")
//                 .select("*")
//                 .eq("respondent_id", respondentId)
//                 .single();

//         if (respondentError || !respondent) {

//             return res.status(404).json({
//                 success: false,
//                 message: "Respondent not found"
//             });

//         }

//         //--------------------------------------------------
//         // Response
//         //--------------------------------------------------

//         return res.json({

//             success: true,

//             respondent: {

//                 respondent_id: respondent.respondent_id,

//                 panel_id: respondent.panel_id,

//                 project_id: respondent.project_id,

//                 vendor_id: respondent.vendor_id,

//                 status: respondent.status,

//                 started_at: respondent.started_at,

//                 completed_at: respondent.completed_at

//             }

//         });

//     }

//     catch (err) {

//         console.log(err);

//         return res.status(500).json({

//             success: false,

//             message: err.message

//         });

//     }

// };


// exports.getProjectStats = async (req, res) => {

//     try {

//         const { projectId } = req.params;

//         //--------------------------------------------------
//         // Project
//         //--------------------------------------------------

//         const { data: project, error: projectError } =
//             await supabase
//                 .from("projects")
//                 .select("*")
//                 .eq("id", projectId)
//                 .single();

//         if (projectError || !project) {

//             return res.status(404).json({

//                 success: false,

//                 message: "Project not found"

//             });

//         }

//         //--------------------------------------------------
//         // Respondents
//         //--------------------------------------------------

//         const { data: respondents, error } =
//             await supabase
//                 .from("respondent_logs")
//                 .select("*")
//                 .eq("project_id", projectId);

//         if (error) {

//             return res.status(400).json(error);

//         }

//         //--------------------------------------------------
//         // Counts
//         //--------------------------------------------------

//         const started =
//             respondents.filter(x => x.status === "STARTED").length;

//         const completed =
//             respondents.filter(x => x.status === "COMPLETED").length;

//         const disqualified =
//             respondents.filter(x => x.status === "DISQUALIFIED").length;

//         const quotaFull =
//             respondents.filter(x => x.status === "QUOTA_FULL").length;

//         const terminated =
//             respondents.filter(x => x.status === "TERMINATED").length;

//         const total =
//             respondents.length;

//         //--------------------------------------------------
//         // Incidence Rate
//         //--------------------------------------------------

//         let incidenceRate = 0;

//         if (total > 0) {

//             incidenceRate =
//                 Number(
//                     ((completed / total) * 100).toFixed(2)
//                 );

//         }

//         //--------------------------------------------------
//         // Response
//         //--------------------------------------------------

//         return res.json({

//             success: true,

//             project: {

//                 id: project.id,

//                 project_name: project.project_name,

//                 req_completes: project.req_completes,

//                 max_completes: project.max_completes,

//                 status: project.status

//             },

//             stats: {

//                 total,

//                 started,

//                 completed,

//                 disqualified,

//                 quotaFull,

//                 terminated,

//                 incidenceRate

//             }

//         });

//     }

//     catch (err) {

//         console.log(err);

//         return res.status(500).json({

//             success: false,

//             message: err.message

//         });

//     }

// };


// exports.getVendorStats = async (req, res) => {

//     try {

//         const { projectId, vendorId } = req.params;

//         //--------------------------------------------------
//         // Vendor Allocation
//         //--------------------------------------------------

//         const { data: allocation, error: allocationError } =
//             await supabase
//                 .from("vendor_allocations")
//                 .select("*")
//                 .eq("project_id", projectId)
//                 .eq("vendor_id", vendorId)
//                 .single();

//         if (allocationError || !allocation) {

//             return res.status(404).json({

//                 success: false,

//                 message: "Vendor Allocation not found"

//             });

//         }

//         //--------------------------------------------------
//         // Respondent Logs
//         //--------------------------------------------------

//         const { data: respondents, error } =
//             await supabase
//                 .from("respondent_logs")
//                 .select("*")
//                 .eq("project_id", projectId)
//                 .eq("vendor_id", vendorId);

//         if (error) {

//             return res.status(400).json(error);

//         }

//         //--------------------------------------------------
//         // Counts
//         //--------------------------------------------------

//         const started =
//             respondents.filter(x => x.status === "STARTED").length;

//         const completed =
//             respondents.filter(x => x.status === "COMPLETED").length;

//         const disqualified =
//             respondents.filter(x => x.status === "DISQUALIFIED").length;

//         const quotaFull =
//             respondents.filter(x => x.status === "QUOTA_FULL").length;

//         const terminated =
//             respondents.filter(x => x.status === "TERMINATED").length;

//         const total =
//             respondents.length;

//         //--------------------------------------------------
//         // Conversion Rate
//         //--------------------------------------------------

//         let conversionRate = 0;

//         if (total > 0) {

//             conversionRate = Number(

//                 ((completed / total) * 100).toFixed(2)

//             );

//         }

//         //--------------------------------------------------
//         // Revenue
//         //--------------------------------------------------

//         const revenue =
//             completed * (Number(allocation.cpi) || 0);

//         //--------------------------------------------------
//         // Remaining Quota
//         //--------------------------------------------------

//         const remainingQuota =
//             Math.max(
//                 0,
//                 (allocation.quota || 0) - completed
//             );

//         //--------------------------------------------------
//         // Response
//         //--------------------------------------------------

//         return res.json({

//             success: true,

//             vendor: {

//                 vendor_id: allocation.vendor_id,

//                 project_id: allocation.project_id,

//                 quota: allocation.quota,

//                 cpi: allocation.cpi,

//                 status: allocation.status

//             },

//             stats: {

//                 total,

//                 started,

//                 completed,

//                 disqualified,

//                 quotaFull,

//                 terminated,

//                 conversionRate,

//                 revenue,

//                 remainingQuota

//             }

//         });

//     }

//     catch (err) {

//         console.log(err);

//         return res.status(500).json({

//             success: false,

//             message: err.message

//         });

//     }

// };




const { v4: uuidv4 } = require("uuid");
const supabase = require("../config/supabase");
const { generateGid, verifyGid } = require("../utils/gid");
const { generateCada, verifyCada } = require("../utils/cada");

exports.captureSurvey = async (req, res) => {

    try {

        const { gid, pid } = req.query;

        //----------------------------------------------------
        // Validate
        //----------------------------------------------------

        if (!gid) {

            return res.status(400).json({
                success: false,
                message: "Missing GID"
            });

        }

        //----------------------------------------------------
        // Decode GID
        //----------------------------------------------------

        const gidPayload = verifyGid(gid);

        //----------------------------------------------------
        // Load Vendor Allocation
        //----------------------------------------------------

        const { data: allocation, error: allocationError } =
            await supabase
                .from("vendor_allocations")
                .select("*")
                .eq("id", gidPayload.allocationId)
                .single();

        if (allocationError || !allocation) {

            return res.status(404).json({
                success: false,
                message: "Vendor Allocation not found"
            });

        }

        //----------------------------------------------------
        // Load Project
        //----------------------------------------------------

        const { data: project, error: projectError } =
            await supabase
                .from("projects")
                .select("*")
                .eq("id", allocation.project_id)
                .single();

        if (projectError || !project) {

            return res.status(404).json({
                success: false,
                message: "Project not found"
            });

        }

        //----------------------------------------------------
        // Respondent ID
        //----------------------------------------------------

        const respondentId = uuidv4();

        //----------------------------------------------------
        // Save Respondent
        //----------------------------------------------------

        const { data: respondent, error: respondentError } =
            await supabase
                .from("respondent_logs")
                .insert({

                    respondent_id: respondentId,

                    project_id: project.id,

                    vendor_id: allocation.vendor_id,

                    panel_id: pid || null,

                    status: "STARTED",

                    started_at: new Date(),

                    cada: allocation.cada

                })
                .select()
                .single();

        if (respondentError) {

            return res.status(400).json(respondentError);

        }

        //----------------------------------------------------
        // Save Session (PHP Style)
        //----------------------------------------------------

        req.session.respondentId = respondent.respondent_id;

        req.session.projectId = project.id;

        req.session.vendorId = allocation.vendor_id;

        req.session.panelId = pid;

        //----------------------------------------------------
        // Client Survey Link
        //----------------------------------------------------

        let surveyLink =
            project.live_survey_link ||
            project.survey_link;

        if (!surveyLink) {

            return res.status(400).json({

                success: false,

                message: "Survey Link Missing"

            });

        }

        //----------------------------------------------------
        // Replace {{ID}}
        //----------------------------------------------------

       // {{ID}}
surveyLink = surveyLink.replace(
    /\{\{ID\}\}/gi,
    respondent.respondent_id
);

// {ID}
surveyLink = surveyLink.replace(
    /\{ID\}/gi,
    respondent.respondent_id
);

// [%ID%]
surveyLink = surveyLink.replace(
    /\[%ID%\]/gi,
    respondent.respondent_id
);


        //----------------------------------------------------
        // Replace Tracking Parameter
        //----------------------------------------------------

        const trackingValue = respondent.respondent_id;
const trackingParam = project.tracking_param || "RID";

// [%RID%]
surveyLink = surveyLink.replace(
    new RegExp(`\\[%${trackingParam}%\\]`, "gi"),
    trackingValue
);

// {RID}
surveyLink = surveyLink.replace(
    new RegExp(`\\{${trackingParam}\\}`, "gi"),
    trackingValue
);

// {{RID}}
surveyLink = surveyLink.replace(
    new RegExp(`\\{\\{${trackingParam}\\}\\}`, "gi"),
    trackingValue
);

// @RID
surveyLink = surveyLink.replace(
    new RegExp(`@${trackingParam}`, "gi"),
    trackingValue
);

        const regex = new RegExp(

            `\\[%${trackingParam}%\\]`,

            "gi"

        );

        surveyLink =
            surveyLink.replace(
                regex,
                respondent.respondent_id
            );

        //----------------------------------------------------
        // Replace CLIENTKEY
        //----------------------------------------------------

        surveyLink =
            surveyLink.replace(

                /\{\{CLIENTKEY\}\}/gi,

                allocation.client_key || ""

            );

        //----------------------------------------------------
        // Replace PANEL ID
        //----------------------------------------------------

        surveyLink =
            surveyLink.replace(

                /\{\{PANELIST_IDENTIFIER\}\}/gi,

                pid || ""

            );

        surveyLink =
            surveyLink.replace(

                /\[%PID%\]/gi,

                pid || ""

            );

        //----------------------------------------------------
        // Logs
        //----------------------------------------------------

        console.log("--------------------------------");

        console.log(
            "RESPONDENT CREATED",
            respondent.respondent_id
        );

        console.log(
            "PANEL:",
            pid
        );

        console.log(
            "PROJECT:",
            project.project_name
        );

        console.log(
            "SURVEY:",
            surveyLink
        );

        console.log("--------------------------------");

        //----------------------------------------------------
        // Redirect
        //----------------------------------------------------

        return res.redirect(surveyLink);

    }

    catch (err) {

        console.log(err);

        return res.status(500).json({

            success: false,

            message: err.message

        });

    }

};

exports.endCapture = async (req, res) => {

    try {

        const { cada, st, sr } = req.query;

        //------------------------------------------------
        // Validate
        //------------------------------------------------

        if (!cada) {

            return res.status(400).json({
                success: false,
                message: "Missing CADA"
            });

        }

        if (!st) {

            return res.status(400).json({
                success: false,
                message: "Missing Status"
            });

        }

        //------------------------------------------------
        // Decode CADA
        //------------------------------------------------

        const payload = verifyCada(cada);

        //------------------------------------------------
        // Vendor Allocation
        //------------------------------------------------

        const { data: allocation, error: allocationError } =
            await supabase
                .from("vendor_allocations")
                .select("*")
                .eq("id", payload.allocationId)
                .single();

        if (allocationError || !allocation) {

            return res.status(404).json({
                success: false,
                message: "Vendor Allocation not found"
            });

        }

        //------------------------------------------------
        // Session
        //------------------------------------------------

        const respondentId =
            req.session.respondentId;

        if (!respondentId) {

            return res.status(400).json({
                success: false,
                message: "Session Expired"
            });

        }

        //------------------------------------------------
        // Respondent
        //------------------------------------------------

        const { data: respondent, error: respondentError } =
            await supabase
                .from("respondent_logs")
                .select("*")
                .eq("respondent_id", respondentId)
                .single();

        if (respondentError || !respondent) {

            return res.status(404).json({
                success: false,
                message: "Respondent not found"
            });

        }

        //------------------------------------------------
        // Already Captured
        //------------------------------------------------

        if (
            respondent.status === "COMPLETED" ||
            respondent.status === "DISQUALIFIED" ||
            respondent.status === "QUOTA_FULL"
        ) {

            return res.send("Already Captured");

        }

        //------------------------------------------------
        // Status Mapping
        //------------------------------------------------

        let status = "TERMINATED";

        switch (st) {

            case "111":
                status = "COMPLETED";
                break;

            case "222":
                status = "DISQUALIFIED";
                break;

            case "333":
                status = "QUOTA_FULL";
                break;

        }

        //------------------------------------------------
        // Update Respondent
        //------------------------------------------------

        const updateData = {

            status,

            completed_at: new Date()

        };

        if (
            status === "DISQUALIFIED" &&
            sr
        ) {

            updateData.disqualify_reason =
                sr.substring(0, 25);

        }

        await supabase
            .from("respondent_logs")
            .update(updateData)
            .eq("respondent_id", respondentId);

        //------------------------------------------------
        // Increment Project Counters
        //------------------------------------------------

        const counter = {

            COMPLETED: "completes",

            DISQUALIFIED: "disqualified",

            QUOTA_FULL: "quota_full"

        }[status];

        if (counter) {

            const { data: project } =
                await supabase
                    .from("projects")
                    .select(counter)
                    .eq("id", allocation.project_id)
                    .single();

            await supabase
                .from("projects")
                .update({

                    [counter]:
                        (project[counter] || 0) + 1

                })
                .eq("id", allocation.project_id);

        }

        //------------------------------------------------
        // Vendor Redirect URL
        //------------------------------------------------

        let redirectUrl = "";

        switch (status) {

            case "COMPLETED":

                redirectUrl =
                    allocation.complete_url;

                break;

            case "DISQUALIFIED":

                redirectUrl =
                    allocation.disqualified_url;

                break;

            case "QUOTA_FULL":

                redirectUrl =
                    allocation.quota_full_url;

                break;

        }

        //------------------------------------------------
        // Replace Variables
        //------------------------------------------------

        if (redirectUrl) {

            redirectUrl = redirectUrl

                .replace(
                    /\{\{panellist_id\}\}/gi,
                    respondent.panel_id || ""
                )

                .replace(
                    /\{\{ID\}\}/gi,
                    respondent.respondent_id
                )

                .replace(
                    /\{\{CLIENTKEY\}\}/gi,
                    allocation.client_key || ""
                );

        }

        //------------------------------------------------
        // Destroy Session
        //------------------------------------------------

        req.session.destroy(() => {});

        res.clearCookie("INPUTIFYSESSID");

        //------------------------------------------------
        // Logs
        //------------------------------------------------

        console.log("--------------------------------");

        console.log("RESPONDENT :", respondent.respondent_id);

        console.log("STATUS :", status);

        console.log("PANEL :", respondent.panel_id);

        console.log("REDIRECT :", redirectUrl);

        console.log("--------------------------------");

        //------------------------------------------------
        // Redirect Vendor
        //------------------------------------------------

       let pageStatus = "completed";

switch (status) {

    case "COMPLETED":
        pageStatus = "completed";
        break;

    case "DISQUALIFIED":
        pageStatus = "disqualified";
        break;

    case "QUOTA_FULL":
        pageStatus = "quota";
        break;

}

// http://localhost:5173
const FRONTEND_URL = process.env.FRONTEND_URL;  

return res.redirect(
    `${FRONTEND_URL}/thank-you/${allocation.project_id}/${pageStatus}`
);

// return res.redirect(
//     `${FRONTEND_URL}/thank-you/${respondent.respondent_id}/${pageStatus}`
// );

    }

    catch (err) {

        console.log(err);

        return res.status(500).json({

            success: false,

            message: err.message

        });

    }

};

exports.getRedirectLinks = async (req, res) => {

    try {

        const { allocationId } = req.params;

        //--------------------------------------------------
        // Allocation
        //--------------------------------------------------

        const { data: allocation, error: allocationError } =
            await supabase
                .from("vendor_allocations")
                .select("*")
                .eq("id", allocationId)
                .single();

        if (allocationError || !allocation) {

            return res.status(404).json({
                success: false,
                message: "Vendor Allocation not found"
            });

        }

        //--------------------------------------------------
        // Project
        //--------------------------------------------------

        const { data: project, error: projectError } =
            await supabase
                .from("projects")
                .select("*")
                .eq("id", allocation.project_id)
                .single();

        if (projectError || !project) {

            return res.status(404).json({
                success: false,
                message: "Project not found"
            });

        }

        //--------------------------------------------------
        // Vendor
        //--------------------------------------------------

        const { data: vendor, error: vendorError } =
            await supabase
                .from("vendors")
                .select("*")
                .eq("id", allocation.vendor_id)
                .single();

        if (vendorError || !vendor) {

            return res.status(404).json({
                success: false,
                message: "Vendor not found"
            });

        }

        //--------------------------------------------------
        // Links
        //--------------------------------------------------

        const BASE_URL = process.env.BASE_URL;

       //--------------------------------------------------
// Generate missing GID/CADA
//--------------------------------------------------

const gid = allocation.gid;
const cada = allocation.cada;

const links = {

    capture:
`${BASE_URL}/api/survey/capture?gid=${gid}&pid={{PANELIST_IDENTIFIER}}`,

    complete:
`${BASE_URL}/api/survey/endcapture?cada=${cada}&st=111`,

    disqualified:
`${BASE_URL}/api/survey/endcapture?cada=${cada}&st=222&sr=security`,

    quotaFull:
`${BASE_URL}/api/survey/endcapture?cada=${cada}&st=333`

};

console.log("LINK CADA:", allocation.cada);

        //--------------------------------------------------
        // Response
        //--------------------------------------------------

        return res.json({

            success: true,

            vendor,

            project,

            links,

            gid: allocation.gid,

            cada: allocation.cada

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


exports.getRespondentLogs = async (req, res) => {

    try {

        const { allocationId } = req.params;

        //--------------------------------------------------
        // Allocation
        //--------------------------------------------------

        const { data: allocation, error: allocationError } =
            await supabase
                .from("vendor_allocations")
                .select("*")
                .eq("id", allocationId)
                .single();

        if (allocationError || !allocation) {

            return res.status(404).json({
                success: false,
                message: "Vendor Allocation not found"
            });

        }

        //--------------------------------------------------
        // Respondents
        //--------------------------------------------------

        const { data: respondents, error } =
            await supabase
                .from("respondent_logs")
                .select("*")
                .eq("project_id", allocation.project_id)
                .eq("vendor_id", allocation.vendor_id)
                .order("started_at", {
                    ascending: false
                });

        if (error) {

            return res.status(400).json(error);

        }

        //--------------------------------------------------
        // Counts
        //--------------------------------------------------

        const stats = {

            total: respondents.length,

            started:
                respondents.filter(x =>
                    x.status === "STARTED"
                ).length,

            completed:
                respondents.filter(x =>
                    x.status === "COMPLETED"
                ).length,

            disqualified:
                respondents.filter(x =>
                    x.status === "DISQUALIFIED"
                ).length,

            quotaFull:
                respondents.filter(x =>
                    x.status === "QUOTA_FULL"
                ).length,

            terminated:
                respondents.filter(x =>
                    x.status === "TERMINATED"
                ).length

        };

        //--------------------------------------------------
        // Response
        //--------------------------------------------------

        return res.json({

            success: true,

            stats,

            respondents

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

exports.getRespondentStatus = async (req, res) => {

    try {

        const { cada } = req.query;

        //--------------------------------------------------
        // Validate
        //--------------------------------------------------

        if (!cada) {

            return res.status(400).json({
                success: false,
                message: "Missing CADA"
            });

        }

        //--------------------------------------------------
        // Decode CADA
        //--------------------------------------------------

        const payload = verifyCada(cada);

        //--------------------------------------------------
        // Vendor Allocation
        //--------------------------------------------------

        const { data: allocation, error: allocationError } =
            await supabase
                .from("vendor_allocations")
                .select("*")
                .eq("id", payload.allocationId)
                .single();

        if (allocationError || !allocation) {

            return res.status(404).json({
                success: false,
                message: "Vendor Allocation not found"
            });

        }

        //--------------------------------------------------
        // Current Session Respondent
        //--------------------------------------------------

        const respondentId = req.session.respondentId;

        if (!respondentId) {

            return res.status(404).json({
                success: false,
                message: "No Active Session"
            });

        }

        //--------------------------------------------------
        // Respondent
        //--------------------------------------------------

        const { data: respondent, error: respondentError } =
            await supabase
                .from("respondent_logs")
                .select("*")
                .eq("respondent_id", respondentId)
                .single();

        if (respondentError || !respondent) {

            return res.status(404).json({
                success: false,
                message: "Respondent not found"
            });

        }

        //--------------------------------------------------
        // Response
        //--------------------------------------------------

        return res.json({

            success: true,

            respondent: {

                respondent_id: respondent.respondent_id,

                panel_id: respondent.panel_id,

                project_id: respondent.project_id,

                vendor_id: respondent.vendor_id,

                status: respondent.status,

                started_at: respondent.started_at,

                completed_at: respondent.completed_at

            }

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


exports.getProjectStats = async (req, res) => {

    try {

        const { projectId } = req.params;

        //--------------------------------------------------
        // Project
        //--------------------------------------------------

        const { data: project, error: projectError } =
            await supabase
                .from("projects")
                .select("*")
                .eq("id", projectId)
                .single();

        if (projectError || !project) {

            return res.status(404).json({

                success: false,

                message: "Project not found"

            });

        }

        //--------------------------------------------------
        // Respondents
        //--------------------------------------------------

        const { data: respondents, error } =
            await supabase
                .from("respondent_logs")
                .select("*")
                .eq("project_id", projectId);

        if (error) {

            return res.status(400).json(error);

        }

        //--------------------------------------------------
        // Counts
        //--------------------------------------------------

        const started =
            respondents.filter(x => x.status === "STARTED").length;

        const completed =
            respondents.filter(x => x.status === "COMPLETED").length;

        const disqualified =
            respondents.filter(x => x.status === "DISQUALIFIED").length;

        const quotaFull =
            respondents.filter(x => x.status === "QUOTA_FULL").length;

        const terminated =
            respondents.filter(x => x.status === "TERMINATED").length;

        const total =
            respondents.length;

        //--------------------------------------------------
        // Incidence Rate
        //--------------------------------------------------

        let incidenceRate = 0;

        if (total > 0) {

            incidenceRate =
                Number(
                    ((completed / total) * 100).toFixed(2)
                );

        }

        //--------------------------------------------------
        // Response
        //--------------------------------------------------

        return res.json({

            success: true,

            project: {

                id: project.id,

                project_name: project.project_name,

                req_completes: project.req_completes,

                max_completes: project.max_completes,

                status: project.status

            },

            stats: {

                total,

                started,

                completed,

                disqualified,

                quotaFull,

                terminated,

                incidenceRate

            }

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


exports.getVendorStats = async (req, res) => {

    try {

        const { projectId, vendorId } = req.params;

        //--------------------------------------------------
        // Vendor Allocation
        //--------------------------------------------------

        const { data: allocation, error: allocationError } =
            await supabase
                .from("vendor_allocations")
                .select("*")
                .eq("project_id", projectId)
                .eq("vendor_id", vendorId)
                .single();

        if (allocationError || !allocation) {

            return res.status(404).json({

                success: false,

                message: "Vendor Allocation not found"

            });

        }

        //--------------------------------------------------
        // Respondent Logs
        //--------------------------------------------------

        const { data: respondents, error } =
            await supabase
                .from("respondent_logs")
                .select("*")
                .eq("project_id", projectId)
                .eq("vendor_id", vendorId);

        if (error) {

            return res.status(400).json(error);

        }

        //--------------------------------------------------
        // Counts
        //--------------------------------------------------

        const started =
            respondents.filter(x => x.status === "STARTED").length;

        const completed =
            respondents.filter(x => x.status === "COMPLETED").length;

        const disqualified =
            respondents.filter(x => x.status === "DISQUALIFIED").length;

        const quotaFull =
            respondents.filter(x => x.status === "QUOTA_FULL").length;

        const terminated =
            respondents.filter(x => x.status === "TERMINATED").length;

        const total =
            respondents.length;

        //--------------------------------------------------
        // Conversion Rate
        //--------------------------------------------------

        let conversionRate = 0;

        if (total > 0) {

            conversionRate = Number(

                ((completed / total) * 100).toFixed(2)

            );

        }

        //--------------------------------------------------
        // Revenue
        //--------------------------------------------------

        const revenue =
            completed * (Number(allocation.cpi) || 0);

        //--------------------------------------------------
        // Remaining Quota
        //--------------------------------------------------

        const remainingQuota =
            Math.max(
                0,
                (allocation.quota || 0) - completed
            );

        //--------------------------------------------------
        // Response
        //--------------------------------------------------

        return res.json({

            success: true,

            vendor: {

                vendor_id: allocation.vendor_id,

                project_id: allocation.project_id,

                quota: allocation.quota,

                cpi: allocation.cpi,

                status: allocation.status

            },

            stats: {

                total,

                started,

                completed,

                disqualified,

                quotaFull,

                terminated,

                conversionRate,

                revenue,

                remainingQuota

            }

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