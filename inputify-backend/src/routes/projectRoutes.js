const express =
require("express");

const router =
express.Router();

const {

  getProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
 
} =
require(
  "../controllers/projectController"
);



/* GET ALL PROJECTS */

router.get(
  "/",
  getProjects
);

/* GET PROJECT BY ID */

router.get(
  "/:id",
  getProjectById
);

/* CREATE PROJECT */

router.post(
  "/",
  createProject
);

/* UPDATE PROJECT */

router.put(
  "/:id",
  updateProject
);

/* DELETE PROJECT */

router.delete(
  "/:id",
  deleteProject
);

// router.put(
//     "/:projectId/completion-mode",
//     updateCompletionMode
// );

module.exports =
router;