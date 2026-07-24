const supabase = require("../config/supabase");

// Get all roles
exports.getRoles = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("roles")
      .select("*")
      .order("name");

    if (error) throw error;

    res.json(data);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

// Create role
exports.createRole = async (req, res) => {
  try {
    const {
      name,
      description,
      permissions,
    } = req.body;

    const { data, error } = await supabase
      .from("roles")
      .insert([
        {
          name,
          description,
          permissions,
        },
      ])
      .select()
      .single();

    if (error) throw error;

    res.json(data);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

// Update role
exports.updateRole = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      name,
      description,
      permissions,
    } = req.body;

    const { data, error } = await supabase
      .from("roles")
      .update({
        name,
        description,
        permissions,
      })
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;

    res.json(data);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

// Delete role
exports.deleteRole = async (req, res) => {
  try {
    const { id } = req.params;

    const { error } = await supabase
      .from("roles")
      .delete()
      .eq("id", id);

    if (error) throw error;

    res.json({
      success: true,
      message: "Role deleted successfully",
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};