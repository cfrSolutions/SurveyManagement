const express =
require("express");

const router =
express.Router();

const {

 getProjectVendors,
 addVendor

}
=
require(
 "../controllers/vendorAllocationController"
);

router.get(
 "/:projectId",
 getProjectVendors
);

router.post(
 "/",
 addVendor
);

module.exports =
router;