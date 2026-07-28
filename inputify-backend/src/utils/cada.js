// const crypto = require("crypto");

// const SECRET = process.env.CADA_SECRET || "inputify_super_secret_key";

// function generateCada(payload) {
//   const data = JSON.stringify(payload);

//   const iv = crypto.randomBytes(16);

//   const key = crypto
//     .createHash("sha256")
//     .update(SECRET)
//     .digest();

//   const cipher = crypto.createCipheriv("aes-256-cbc", key, iv);

//   let encrypted = cipher.update(data, "utf8", "base64");
//   encrypted += cipher.final("base64");

//   return iv.toString("base64") + "." + encrypted;
// }

// function verifyCada(cada) {
//   const [iv64, encrypted] = cada.split(".");

//   const iv = Buffer.from(iv64, "base64");

//   const key = crypto
//     .createHash("sha256")
//     .update(SECRET)
//     .digest();

//   const decipher = crypto.createDecipheriv(
//     "aes-256-cbc",
//     key,
//     iv
//   );

//   let decrypted = decipher.update(
//     encrypted,
//     "base64",
//     "utf8"
//   );

//   decrypted += decipher.final("utf8");

//   return JSON.parse(decrypted);
// }

// module.exports = {
//   generateCada,
//   verifyCada,
// };


// const jwt = require("jsonwebtoken");

// //----------------------------------------------------------
// // generateCada — encodes PROJECT/VENDOR context only.
// // Deliberately does NOT include a respondent id, because this
// // cada is meant to be static and shared across every respondent
// // for a given project/vendor pair (matches the SBO URL pattern
// // you observed: same cada on every completion link).
// //----------------------------------------------------------
// function generateCada({ projectId, vendorId }) {
//   return jwt.sign(
//     { projectId, vendorId },
//     process.env.JWT_SECRET,
//     { expiresIn: "365d" } // long-lived, this is a config value not a session
//   );
// }

// function verifyCada(cada) {
//   return jwt.verify(cada, process.env.JWT_SECRET);
// }

// module.exports = { generateCada, verifyCada };

const jwt = require("jsonwebtoken");

const SECRET =
process.env.CADA_SECRET || "INPUTIFY_CADA_SECRET";

exports.generateCada = (payload) => {

    console.log("GENERATE SECRET:", SECRET);

const token = jwt.sign(payload, SECRET, {
    expiresIn: "10y"
});

console.log("TOKEN:", token);

return token;

};

exports.verifyCada = (cada) => {
console.log("VERIFY SECRET:", SECRET);
console.log("VERIFY TOKEN:", cada);

    return jwt.verify(
        cada,
        SECRET
    );

};