const supabase = require("../config/supabase");
const bcrypt = require("bcryptjs");
const logActivity = require("../utils/activityLogger");

exports.getUsers = async (req, res) => {

  try {
console.log("GET USERS CALLED");

    const { data, error } = await supabase
      .from("employees")
      .select("*")
      .order("created_at", {
        ascending: false
      });
   console.log("DATA:", data);
    console.log("ERROR:", error);
    if (error) throw error;

    res.json(data);

  } catch (err) {
 console.log("GET USERS ERROR:");
    console.log(err);
    res.status(500).json({
      message: err.message
    });

  }

};



// exports.createUser = async (req, res) => {
//   console.log("CREATE USER BODY:", req.body);

//   try {

//     const {
//       name,
//       email,
//       password,
//       role_id,
//       manager_id
//     } = req.body;
// // const name = `${first_name} ${last_name}`.trim();
//     const hashedPassword =
//       await bcrypt.hash(password, 10);
// const { data: role, error: roleError } = await supabase
//   .from("roles")
//   .select("name")
//   .eq("id", role_id)
//   .single();

// if (roleError) {
//   return res.status(400).json(roleError);
// }
//     const { data, error } = await supabase
//   .from("employees")
//   .insert([
//     {
//       name,
//       email,
//       password: hashedPassword,
//       role: role.name,
//       role_id,
//       manager_id,
//       is_active: true
//     }
//   ])
//   .select();

// console.log("SUPABASE ERROR:", error);
// console.log("INSERTED USER:", data);

// if (error) {
//   throw error;
// }

// await logActivity({
//   userId: req.user.id,
//   action: "CREATE",
//   module: "USERS",
//   recordId: data.id,
//   details: {
//     email: data.email
//   }
// });

// res.json(data);
//   } catch (err) {
//      console.log("CREATE USER ERROR:");
//     console.log(err);

//     res.status(500).json({
//       message: err.message
//     });

//   }

// };

exports.createUser = async (req, res) => {
  console.log("CREATE USER BODY:", req.body);

  try {
    const {
      name,
      email,
      password,
      role_id,
      manager_id
    } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const { data: role, error: roleError } = await supabase
      .from("roles")
      .select("name")
      .eq("id", role_id)
      .single();

    if (roleError) {
      return res.status(400).json(roleError);
    }

    const employee = {
      name,
      email,
      password: hashedPassword,
      role: role.name,
      role_id,
      status: "ACTIVE",
      is_active: true
    };

    // Only add manager_id if it exists
    if (manager_id) {
      employee.manager_id = manager_id;
    }

    const { data, error } = await supabase
      .from("employees")
      .insert([employee])
      .select()
      .single();

    console.log("SUPABASE ERROR:", error);
    console.log("INSERTED USER:", data);

    if (error) {
      return res.status(400).json(error);
    }

    await logActivity({
      userId: req.user.id,
      action: "CREATE",
      module: "USERS",
      recordId: data.id,
      details: {
        email: data.email
      }
    });

    res.json(data);

  } catch (err) {
    console.log("CREATE USER ERROR:", err);

    res.status(500).json({
      message: err.message
    });
  }
};

exports.updateUser = async (req, res) => {

  try {

    const { id } = req.params;

    const {
      first_name,
      last_name,
      email,
      role_id,
      manager_id
    } = req.body;

    const { data, error } = await supabase
      .from("employees")
      .update({
        first_name,
        last_name,
        email,
        role_id,
        manager_id
      })
      .eq("id", id)
      .select()
      .single();

      await logActivity({
  userId: req.user.id,
  action: "UPDATE",
  module: "USERS",
  recordId: id
});
    if (error) throw error;

    res.json(data);

  } catch (err) {

    res.status(500).json({
      message: err.message
    });

  }

};

exports.toggleUserStatus = async (req, res) => {

  try {

    const { id } = req.params;

    const { is_active } = req.body;

    const { data, error } = await supabase
      .from("employees")
      .update({
        is_active
      })
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;

    res.json(data);

  } catch (err) {

    res.status(500).json({
      message: err.message
    });

  }

};

exports.deleteUser = async (req, res) => {

  try {

    const { id } = req.params;

    await supabase
      .from("employees")
      .delete()
      .eq("id", id);

    res.json({
      success: true
    });
await logActivity({
  userId: req.user.id,
  action: "DELETE",
  module: "USERS",
  recordId: id
});
  } catch (err) {

    res.status(500).json({
      message: err.message
    });

  }

};