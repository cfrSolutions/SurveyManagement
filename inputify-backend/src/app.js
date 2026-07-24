const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const session = require("express-session");

const app = express();

app.use(cors({
    origin: process.env.FRONTEND_URL, // your frontend
    credentials: true
}));

app.use(express.json());

app.use(cookieParser());

app.use(
    session({
        name: "INPUTIFYSESSID",

        secret:
            process.env.SESSION_SECRET ||
            "inputify_super_secret",

        resave: false,

        saveUninitialized: false,

        cookie: {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
            maxAge: 1000 * 60 * 60 * 2
        }
    })
);
app.use(express.json());

app.use(
 "/api/auth",
 require("./routes/authRoutes")
);

app.use(
 "/api/employees",
 require("./routes/employeeRoutes")
);

app.use(
 "/api/clients",
 require("./routes/clientRoutes")
);

app.use(
 "/api/client-contacts",
 require(
  "./routes/clientContactRoutes"
 )
);

app.use(
 "/api/vendors",
 require("./routes/vendorRoutes")
);

app.use(
 "/api/projects",
 require("./routes/projectRoutes")
);

app.use(
 "/api/vendor-allocations",
 require(
  "./routes/vendorAllocationRoutes"
 )
);

app.use(
 "/api/client-contacts",
 require(
  "./routes/clientContactRoutes"
 )
);

app.use(
 "/api/vendor-contacts",
 require(
  "./routes/vendorContactRoutes"
 )
);

app.use(
  "/api/survey",
  require("./routes/surveyRedirectRoutes")
);

app.use(
  "/api/third-party-apis",
  require("./routes/thirdPartyAPIRoutes")
);

app.use(
  "/api/reports",
  require("./routes/reportRoutes")
);

app.use(
  "/api",
  require("./routes/mangeDashboard")
);

app.use(
  "/api/users",
  require("./routes/userRoutes")
);

app.use(
  "/api/roles",
  require("./routes/roleRoutes")
);

app.use(
  "/api/activity-logs",
  require("./routes/activityRouter")
);

app.use("/api/thank-you", require("./routes/thankYou.routes"));

module.exports = app;