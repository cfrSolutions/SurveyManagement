// const express = require("express");
// const router = express.Router();

// const {
//   captureSurvey,
//   endCapture,
//   getProjectLinks,
//   internalCapture,
//   getVendorStats,
//   getRespondents,
//   getInternalLinks, 
//   getProjectStats
// } = require(
//   "../controllers/surveyRedirectController"
// );

// router.get("/test", (req, res) => {
//   res.send("Survey Route Working");
// });

// // router.get(
// //   "/capture",
// //   captureSurvey
// // );

// router.get(
//   "/redirect/:projectId/:vendorId",
//   captureSurvey
// );

// // router.get(
// //   "/r/:projectId/:vendorId",
// //   captureSurvey
// // );

// // router.get(
// //   "/internal/:projectId",
// //   internalCapture
// // );

// router.get(
//   "/endcapture",
//   endCapture
// );

// router.get(
//   "/links/:projectId",
//   getProjectLinks
// );

// router.get(
//   "/stats/:projectId/:vendorId",
//   getVendorStats
// );

// router.get(
//   "/respondents/:projectId/:vendorId",
//   getRespondents
// );

// router.get(
//   "/internal/:projectId",
//   internalCapture
// );

// router.get(
//   "/internal-links/:projectId",
//   getInternalLinks
// );

// router.get(
//   "/project-stats/:projectId",
//   getProjectStats
// );
// // router.get("/complete", surveyComplete);
// // router.get("/dq", surveyDisqualify);
// // router.get("/qf", surveyQuotaFull);

// module.exports = router;


// const express = require("express");
// const router = express.Router();

// const {
//   captureSurvey,
//   endCapture,
//   getProjectLinks,
//   internalCapture,
//   getVendorStats,
//   getRespondents,
//   getInternalLinks,
//   getProjectStats,
//   getRedirectLinks
// } = require("../controllers/surveyRedirectController");

// // Test
// router.get("/test", (req, res) => {
//   res.send("Survey Route Working");
// });

// // =====================================
// // Survey Redirect
// // =====================================

// router.get(
//   "/redirect/:projectId/:vendorId",
//   captureSurvey
// );

// // =====================================
// // Internal Testing
// // =====================================

// router.get(
//   "/internal/:projectId",
//   internalCapture
// );

// // =====================================
// // End Capture
// // =====================================

// router.get(
//   "/endcapture",
//   endCapture
// );

// // =====================================
// // Survey Links
// // =====================================

// router.get(
//   "/links/:projectId",
//   (req, res, next) => {
//     console.log("LINKS ROUTE HIT");
//     next();
//   },
//   getProjectLinks
// );

// router.get(
//   "/internal-links/:projectId",
//   getInternalLinks
// );

// // =====================================
// // Statistics
// // =====================================

// router.get(
//   "/stats/:projectId/:vendorId",
//   getVendorStats
// );

// router.get(
//   "/project-stats/:projectId",
//   getProjectStats
// );

// // =====================================
// // Respondents
// // =====================================

// router.get(
//   "/respondents/:projectId/:vendorId",
//   getRespondents
// );

// router.get(
//   "/redirect-links/:projectId/:vendorId",
//   getRedirectLinks
// );

// module.exports = router;


// const express = require("express");
// const router = express.Router();

// const {
//   captureSurvey,
//   endCapture,
//   getRedirectLinks,
//   internalCapture,
//   getInternalRedirectLinks
// } = require("../controllers/surveyRedirectController");


// router.get("/test", (req, res) => {
//   res.send("Survey Route Working");
// });


// router.get(
//   "/redirect/:projectId/:vendorId",
//   captureSurvey
// );


// router.get(
//   "/internal/:projectId",
//   internalCapture
// );

// router.get(
//   "/endcapture",
//   endCapture
// );


// router.get(
//   "/redirect-links/:projectId/:vendorId",
//   getRedirectLinks
// );

// router.get(
//   "/internal-redirect-links/:projectId",
//   getInternalRedirectLinks
// );

// module.exports = router;


// const express = require("express");
// const router = express.Router();

// const {
//   captureSurvey,
//   endCapture,
//   s2sPostback,
//   getRedirectLinks,
//   internalCapture,
//   getInternalRedirectLinks,
//   allowlistIps
// } = require("../controllers/surveyRedirectController");

// router.get("/test", (req, res) => {
//   res.send("Survey Route Working");
// });

// //--------------------------------------------------
// // Entry point — vendor sends the panelist here.
// // e.g. GET /api/survey/redirect/:projectId/:vendorId?PID=12345
// //--------------------------------------------------
// router.get(
//   "/redirect/:projectId/:vendorId",
//   captureSurvey
// );

// router.get(
//   "/internal/:projectId",
//   internalCapture
// );

// //--------------------------------------------------
// // Exit point — survey platform redirects the respondent's
// // browser back here with cada/token/st.
// //--------------------------------------------------
// router.get(
//   "/endcapture",
//   endCapture
// );

// //--------------------------------------------------
// // True server-to-server postback (no browser involved).
// // Optionally lock this down with allowlistIps([...]) once you
// // have the survey platform's static egress IPs.
// // e.g. router.post("/s2s-postback", allowlistIps(["1.2.3.4"]), s2sPostback)
// //--------------------------------------------------
// router.post(
//   "/s2s-postback",
//   s2sPostback
// );

// router.get(
//   "/redirect-links/:projectId/:vendorId",
//   getRedirectLinks
// );

// router.get(
//   "/internal-redirect-links/:projectId",
//   getInternalRedirectLinks
// );

// module.exports = router;


// const express = require("express");
// const router = express.Router();

// const {
//   captureSurvey,
//   endCapture,
//   buildSurveyLinks,
//   getSurveyLinks,
//   getRedirectLinks,
//   getRespondentLogs,
//   getRespondentStatus,
//   getProjectStats,
//   getVendorStats
// } = require("../controllers/surveyRedirectController");

// // ==========================================
// // Survey Capture
// // ==========================================

// // Start Survey (Vendor -> Survey)
// router.get(
//   "/capture",
//   captureSurvey
// );

// // Survey Completion
// router.get(
//   "/endcapture",
//   endCapture
// );



// // Build Capture Link
// router.get(
//   "/build/:projectId",
//   buildSurveyLinks
// );


// // Get Survey Links
// router.get(
//   "/links/:projectId",
//   getSurveyLinks
// );

// // Get Redirect Links
// router.get(
//   "/redirect-links/:projectId",
//   getRedirectLinks
// );

// // ==========================================
// // Respondents
// // ==========================================

// // Respondent Logs
// router.get(
//   "/respondents/:projectId/:vendorId",
//   getRespondentLogs
// );


// // Respondent Status
// router.get(
//   "/status",
//   getRespondentStatus
// );


// router.get(
//   "/project-stats/:projectId",
//   getProjectStats
// );

// router.get(
//   "/stats/:projectId/:vendorId",
//   getVendorStats
// );

// module.exports = router;


// const express = require("express");
// const router = express.Router();

// const {
//   captureSurvey,
//   endCapture,
//   s2sPostback,
//   getRedirectLinks,
//   getProjectStats,
//   getVendorStats,
//   getRespondentLogs
// } = require("../controllers/surveyRedirectController");

// router.get("/test", (req, res) => {
//   res.send("Survey Route Working");
// });

// // Entry — panelist arrives from vendor
// // e.g. GET /api/survey/capture?tk=<project_token>&PID=12345
// router.get("/capture", captureSurvey);

// // Exit — browser redirect back from survey platform (static, cookie-matched)
// // e.g. GET /api/survey/endcapture?cada=<static_cada>&st=111
// router.get("/endcapture", endCapture);

// // Reliable path — survey platform calls this server-to-server
// router.post("/s2s-postback", s2sPostback);

// // Link builder — returns capture/complete/dq/qf/s2s URLs for a specific vendor on a project
// router.get("/redirect-links/:projectId/:vendorId", getRedirectLinks);

// // Stats — matches ManageProject.jsx's loadStats() and loadVendorStats()
// router.get("/project-stats/:id", getProjectStats);
// router.get("/stats/:projectId/:vendorId", getVendorStats);

// // Respondent log table — matches ManageProject.jsx's openRespondents()
// router.get("/respondents/:projectId/:vendorId", getRespondentLogs);

// module.exports = router;


const express = require("express");
const router = express.Router();

const {
    captureSurvey,
    endCapture,
    getRedirectLinks,
    getRespondentLogs,
    getRespondentStatus,
    getProjectStats,
    getVendorStats
} = require("../controllers/surveyRedirectController");

// ==========================================
// Survey Flow (SBO Style)
// ==========================================

// Vendor Capture Link
router.get(
    "/capture",
    captureSurvey
);

// Client End Capture
router.get(
    "/endcapture",
    endCapture
);

// ==========================================
// Integration Links
// ==========================================

// Vendor Integration Links
router.get(
    "/redirect-links/:allocationId",
    getRedirectLinks
);

// ==========================================
// Respondents
// ==========================================

// Respondent Logs
router.get(
    "/respondents/:allocationId",
    getRespondentLogs
);

// Current Respondent Status
router.get(
    "/status",
    getRespondentStatus
);

// ==========================================
// Statistics
// ==========================================

// Project Statistics
router.get(
    "/project-stats/:projectId",
    getProjectStats
);

// Vendor Statistics
router.get(
    "/stats/:projectId/:vendorId",
    getVendorStats
);

module.exports = router;