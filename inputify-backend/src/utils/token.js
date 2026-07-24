const jwt = require("jsonwebtoken");

const SECRET = process.env.SURVEY_TOKEN_SECRET || "inputify_super_secret";

const generateSurveyToken = (payload) => {
  return jwt.sign(payload, SECRET, {
    expiresIn: "7d",
  });
};

const verifySurveyToken = (token) => {
  return jwt.verify(token, SECRET);
};

module.exports = {
  generateSurveyToken,
  verifySurveyToken,
};