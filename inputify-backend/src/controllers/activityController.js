const supabase =
require("../config/supabase");

exports.getActivityLogs =
async (req, res) => {

  try {

    const { data, error } =
      await supabase
        .from("user_activity_logs")
        .select(`
          *,
          employees!user_activity_logs_user_id_fkey (
            id,
            name,
            email
          )
        `)
        .order(
          "created_at",
          { ascending: false }
        );

    if (error) throw error;

    res.json(data);

  } catch (err) {

    res.status(500).json({
      message: err.message
    });

  }

};