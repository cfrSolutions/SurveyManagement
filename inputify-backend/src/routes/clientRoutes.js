const express = require("express");

const router = express.Router();

const {
  getClients,
  createClient,
  getClientById,
  updateClient,
  getClientDashboard
} = require("../controllers/clientController");

router.get(
  "/",
  getClients
);

router.get(
  "/dashboard/:id",
  getClientDashboard
);

router.get(
  "/:id",
  getClientById
);

router.post(
  "/",
  createClient
);

router.put(
  "/:id",
  updateClient
);

module.exports = router;