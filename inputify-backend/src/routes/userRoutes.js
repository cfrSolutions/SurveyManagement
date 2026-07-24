const express = require("express");

const router = express.Router();

const {
  getUsers,
  createUser,
  updateUser,
  toggleUserStatus,
  deleteUser
} = require("../controllers/userController");

const authMiddleware =
require("../middleware/authMiddleware");

const checkPermission =
require("../middleware/permissionMiddleware");

router.get(
  "/",
  authMiddleware,
  checkPermission("users", "view"),
  getUsers
);

router.post(
  "/",
  authMiddleware,
  checkPermission("users", "create"),
  createUser
);

router.put(
  "/:id",
  authMiddleware,
  checkPermission("users", "edit"),
  updateUser
);

router.patch(
  "/:id/status",
  authMiddleware,
  checkPermission("users", "edit"),
  toggleUserStatus
);

router.delete(
  "/:id",
  authMiddleware,
  checkPermission("users", "delete"),
  deleteUser
);

module.exports = router;