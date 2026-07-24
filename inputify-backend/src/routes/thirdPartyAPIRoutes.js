const express = require("express");

const router = express.Router();

const {
  getAllAPIs,
  getAPIById,
  createAPI,
  updateAPI,
  toggleAPI,
  deleteAPI,
  testAPI,
  syncAPI
} = require("../controllers/thirdPartyAPIController");

router.get(
  "/",
  getAllAPIs
);

router.get(
  "/:id",
  getAPIById
);

router.post(
  "/",
  createAPI
);

router.put(
  "/:id",
  updateAPI
);

router.patch(
  "/:id/toggle",
  toggleAPI
);

router.delete(
  "/:id",
  deleteAPI
);

router.post(
  "/:id/test",
  testAPI
);
router.post(
  "/:id/sync",
  syncAPI
);
module.exports = router;
