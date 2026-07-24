const supabase =
require("../config/supabase");

exports.getActivityLogs =
async(req,res)=>{

  try {

    const { status, projectId, vendorId, limit = 100, offset = 0 } = req.query;

    let query = supabase
      .from("respondent_logs")
      .select("*", { count: "exact" });

    if (status) {
      query = query.eq("status", status);
    }

    if (projectId) {
      query = query.eq("project_id", projectId);
    }

    if (vendorId) {
      query = query.eq("vendor_id", vendorId);
    }

    query = query
      .order("started_at", { ascending: false })
      .range(offset, offset + limit - 1);

    const { data, error, count } = await query;

    if (error) {
      return res.status(400).json(error);
    }

    res.json({
      data: data || [],
      total: count || 0,
      limit: parseInt(limit),
      offset: parseInt(offset)
    });

  } catch (err) {

    console.log(err);

    res.status(500).json({
      message: err.message
    });

  }

};

exports.getActivityLogsSummary =
async(req,res)=>{

  try {

    const { 
      startDate, 
      endDate, 
      projectId 
    } = req.query;

    let query = supabase
      .from("respondent_logs")
      .select("status, count(*)", { head: false });

    if (startDate) {
      query = query.gte("started_at", startDate);
    }

    if (endDate) {
      query = query.lte("started_at", endDate);
    }

    if (projectId) {
      query = query.eq("project_id", projectId);
    }

    // Get all logs for summary
    const { data: allLogs, error } = await supabase
      .from("respondent_logs")
      .select("*");

    if (error) {
      return res.status(400).json(error);
    }

    const completed = allLogs.filter(l => l.status === "COMPLETED").length;
    const pending = allLogs.filter(l => l.status === "PENDING").length;
    const rejected = allLogs.filter(l => l.status === "REJECTED").length;
    const inProgress = allLogs.filter(l => l.status === "IN_PROGRESS").length;

    res.json({
      totalActivities: allLogs.length,
      completed,
      pending,
      rejected,
      inProgress,
      summary: [
        { status: "COMPLETED", count: completed },
        { status: "PENDING", count: pending },
        { status: "REJECTED", count: rejected },
        { status: "IN_PROGRESS", count: inProgress }
      ]
    });

  } catch (err) {

    console.log(err);

    res.status(500).json({
      message: err.message
    });

  }

};

exports.getProjectActivityReport =
async(req,res)=>{

  try {

    const { projectId } = req.params;

    const { data: respondents, error } = await supabase
      .from("respondent_logs")
      .select("*")
      .eq("project_id", projectId)
      .order("started_at", { ascending: false });

    if (error) {
      return res.status(400).json(error);
    }

    const { data: project } = await supabase
      .from("projects")
      .select("*")
      .eq("id", projectId)
      .single();

    res.json({
      project,
      activities: respondents || [],
      totalActivities: respondents?.length || 0
    });

  } catch (err) {

    console.log(err);

    res.status(500).json({
      message: err.message
    });

  }

};
