const express = require("express");
const router = express.Router();

const {
  jotformWebhook
} = require("../controllers/webhookController");

router.post(
  "/jotform",
  jotformWebhook
);

module.exports = router;