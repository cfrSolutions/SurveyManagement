const express =
require("express");

const router =
express.Router();

const {

 getContacts,
 getContactById,
 createContact,
 updateContact

}
=
require(
 "../controllers/clientContactController"
);

/* ALL CONTACTS OF CLIENT */

router.get(
 "/:clientId",
 getContacts
);

/* SINGLE CONTACT */

router.get(
 "/contact/:id",
 getContactById
);

/* CREATE */

router.post(
 "/",
 createContact
);

/* UPDATE */

router.put(
 "/contact/:id",
 updateContact
);

module.exports =
router;