const express = require("express");

const router = express.Router();

const {
  getActivityLogs,
  getActivityLogsSummary,
  getProjectActivityReport
} = require("../controllers/reportController");

router.get(
  "/activity-logs",
  getActivityLogs
);

router.get(
  "/activity-summary",
  getActivityLogsSummary
);

router.get(
  "/project/:projectId",
  getProjectActivityReport
);

module.exports = router;
