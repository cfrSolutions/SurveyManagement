const supabase = require("../config/supabase");

const checkPermission = (module, action) => {
  return async (req, res, next) => {
    try {

      const employeeId = req.user.id;

      const { data: employee } = await supabase
        .from("employees")
        .select(`
          *,
          roles (
            permissions
          )
        `)
        .eq("id", employeeId)
        .single();

      if (!employee) {
        return res.status(403).json({
          message: "Access denied"
        });
      }

      const permissions =
        employee.roles?.permissions ||
        employee.permissions ||
        {};

      const allowed =
        permissions?.[module]?.[action];

      if (!allowed) {
        return res.status(403).json({
          message: "Permission denied"
        });
      }

      next();

    } catch (err) {

      console.log(err);

      return res.status(500).json({
        message: err.message
      });

    }
  };
};

module.exports = checkPermission;