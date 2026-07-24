const supabase = require("../config/supabase");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.login = async (req, res) => {
    console.log("LOGIN BODY:", req.body);
    try {
        const { identifier, password, userType } = req.body;

        let table = "employees";
        if (userType === "CLIENT") table = "clients";
        if (userType === "VENDOR") table = "vendors";

        // Try to find by common identifier fields (email or username)
        // const { data: user, error } = await supabase
        //     .from(table)
        //     .select("*")
        //    .eq("email", identifier)
        //     .limit(1)
        //     .single();

        let user, error;

if (userType === "EMPLOYEE") {

    const result = await supabase
        .from("employees")
        .select("*")
        .eq("email", identifier)
        .single();

    user = result.data;
    error = result.error;

} else {

    const result = await supabase
        .from(table)
        .select("*")
        .eq("username", identifier)
        .single();

    user = result.data;
    error = result.error;

}

console.log("TABLE =>", table);
console.log("USER =>", user);
console.log("ERROR =>", error);

        if (error || !user) {
            return res.status(401).json({
                success: false,
                message: "Invalid credentials",
            });
        }

        // Password handling: support bcrypt-hashed passwords and plaintext
        let valid = false;
        try {
            if (
  typeof user.password === "string" &&
  (
    user.password.startsWith("$2a$") ||
    user.password.startsWith("$2b$")
  )
) {
                valid = await bcrypt.compare(password, user.password);
            } else {
                // fallback for plaintext-stored passwords (temporary)
                valid = user.password === password;
            }
        } catch (e) {
            valid = false;
        }

        if (!valid) {
            return res.status(401).json({
                success: false,
                message: "Invalid credentials",
            });
        }
console.log("USER FOUND =>", user);
await supabase
  .from("employees")
  .update({
    last_login: new Date().toISOString()
  })
  .eq("id", user.id);
// console.log("JWT SECRET =>", process.env.JWT_SECRET);
        const token = jwt.sign(
            {
                id: user.id,
                userType: userType || "EMPLOYEE",
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "7d",
            }
        );

        // Normalize user object to include a `userType` property frontend expects
        const responseUser = {
            ...user,
            userType: userType || "EMPLOYEE",
        };

        res.json({
            success: true,
            token,
            user: responseUser,
        });
    } catch (err) {
        console.log("LOGIN ERROR =>", err);

  res.status(500).json({
    message: err.message,
    stack: err.stack
  });

    }
};