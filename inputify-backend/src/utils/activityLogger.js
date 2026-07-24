const supabase =
require("../config/supabase");

const logActivity = async ({
  userId,
  action,
  module,
  recordId,
  details
}) => {

  try {

    console.log("===== LOG ACTIVITY =====");
  console.log({
    userId,
    action,
    module,
    recordId,
    details
  });


   const { data, error } = await supabase
    .from("user_activity_logs")
    .insert([{
      user_id: userId,
      action,
      module,
      record_id: recordId,
      details
    }])
    .select();

  console.log("INSERT DATA:", data);
  console.log("INSERT ERROR:", error);

  } catch (err) {

    console.log(
      "Activity Log Error:",
      err.message
    );

  }

};

module.exports = logActivity;