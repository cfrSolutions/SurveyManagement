const express = require("express");

const router = express.Router();

const {
  getVendors,
  createVendor,
  getVendorById,
  updateVendor,
  deleteVendor,
  getVendorDashboard
} = require("../controllers/vendorController");

router.get(
  "/",
  getVendors
);

router.get(
  "/dashboard/:id",
  getVendorDashboard
);

router.get(
  "/:id",
  getVendorById
);

router.post(
  "/",
  createVendor
);

router.put(
  "/:id",
  updateVendor
);

router.delete(
  "/:id",
  deleteVendor
);

module.exports = router;