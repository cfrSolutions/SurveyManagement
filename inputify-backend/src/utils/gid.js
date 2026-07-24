// const crypto = require("crypto");

// const SECRET = process.env.GID_SECRET;

// function generateGid(data) {

//     const iv = crypto.randomBytes(16);

//     const cipher = crypto.createCipheriv(
//         "aes-256-cbc",
//         Buffer.from(SECRET, "hex"),
//         iv
//     );

//     let encrypted = cipher.update(
//         JSON.stringify(data),
//         "utf8",
//         "base64"
//     );

//     encrypted += cipher.final("base64");

//     return Buffer.from(
//         JSON.stringify({
//             iv: iv.toString("base64"),
//             data: encrypted
//         })
//     ).toString("base64url");
// }

// function verifyGid(token) {

//     const payload = JSON.parse(
//         Buffer.from(token, "base64url").toString()
//     );

//     const decipher = crypto.createDecipheriv(
//         "aes-256-cbc",
//         Buffer.from(SECRET, "hex"),
//         Buffer.from(payload.iv, "base64")
//     );

//     let decrypted = decipher.update(
//         payload.data,
//         "base64",
//         "utf8"
//     );

//     decrypted += decipher.final("utf8");

//     return JSON.parse(decrypted);
// }

// module.exports = {
//     generateGid,
//     verifyGid
// };


const jwt = require("jsonwebtoken");

const SECRET =
process.env.GID_SECRET || "INPUTIFY_GID_SECRET";

exports.generateGid = (payload) => {

    return jwt.sign(
        payload,
        SECRET,
        {
            expiresIn: "10y"
        }
    );

};

exports.verifyGid = (gid) => {

    return jwt.verify(
        gid,
        SECRET
    );

};