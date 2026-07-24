// const express = require("express");
// const router = express.Router();

// const {
//     getThankYouPage,
//     getAllThankYouPages,
//     getThankYouConfig,
//     updateThankYouConfig
    
// } = require("../controllers/thankYou.controller");

// router.get("/:projectId/:status", getThankYouPage);
// router.get("/", getAllThankYouPages);
// router.get(
//     "/config/:projectId",
//     getThankYouConfig
// );

// router.put(
//     "/config/:projectId",
//     updateThankYouConfig
// );

// module.exports = router;


const express = require("express");
const router = express.Router();

const {
    getThankYouPage,
    getAllThankYouPages,
    getThankYouConfig,
    updateThankYouConfig
} = require("../controllers/thankYou.controller");

// Specific routes FIRST
router.get("/", getAllThankYouPages);

router.get(
    "/config/:projectId",
    getThankYouConfig
);

router.put(
    "/config/:projectId",
    updateThankYouConfig
);

// Generic route LAST
router.get(
    "/:projectId/:status",
    getThankYouPage
);

module.exports = router;