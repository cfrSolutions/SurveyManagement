const supabase = require("../config/supabase");
const { generateGid } =
require("../utils/gid");

const { generateCada } =
require("../utils/cada");

exports.getVendors = async (req, res) => {

  try {

    const { data, error } =
      await supabase
        .from("vendors")
        .select("*");

    if (error) {

      console.log(error);

      return res
        .status(400)
        .json(error);

    }

    res.json(data);

  } catch (err) {

    console.log(err);

    res
      .status(500)
      .json(err);

  }

};

exports.createVendor = async (req, res) => {

  try {

    console.log(
      "VENDOR CREATE =>",
      req.body
    );

    const { data, error } =
      await supabase
        .from("vendors")
        .insert([req.body])
        .select();

    if (error) {

      console.log(error);

      return res
        .status(400)
        .json(error);

    }

    res.json(data);

  } catch (err) {

    console.log(err);

    res
      .status(500)
      .json(err);

  }

};

exports.getVendorById = async (req, res) => {

  try {

    const { data, error } =
      await supabase
        .from("vendors")
        .select("*")
        .eq(
          "id",
          req.params.id
        )
        .single();

    if (error) {

      console.log(error);

      return res
        .status(400)
        .json(error);

    }

    res.json(data);

  } catch (err) {

    console.log(err);

    res
      .status(500)
      .json(err);

  }

};

exports.getVendorDashboard = async (req, res) => {

  try {

    const vendorId = req.params.id;

    const { data: allocations, error: allocationError } =
      await supabase
        .from("vendor_allocations")
        .select("*")
        .eq("vendor_id", vendorId);

    if (allocationError) {
      console.log(allocationError);
      return res.status(400).json(allocationError);
    }

    const { data: logs, error: logsError } =
      await supabase
        .from("respondent_logs")
        .select("*")
        .eq("vendor_id", vendorId);

    if (logsError) {
      console.log(logsError);
      return res.status(400).json(logsError);
    }

    const totalResponses = logs.length;
    const completed = logs.filter((log) => log.status === "COMPLETED").length;
    const disqualified = logs.filter((log) => log.status === "DISQUALIFIED").length;
    const quotaFull = logs.filter((log) => log.status === "QUOTA_FULL").length;

    const assignmentIds = [
      ...new Set(allocations.map((allocation) => allocation.project_id)),
    ];

    const completesByProject = {};
    logs.forEach((log) => {
      if (log.status === "COMPLETED") {
        completesByProject[log.project_id] =
          (completesByProject[log.project_id] || 0) + 1;
      }
    });

    let revenueGenerated = 0;
    allocations.forEach((allocation) => {
      const cpi = parseFloat(allocation.cpi) || 0;
      const completedCount = completesByProject[allocation.project_id] || 0;
      revenueGenerated += cpi * completedCount;
    });

    const today = new Date();
    const graphLabels = [];
    const graphCompleted = [];
    const graphRevenue = [];

    for (let daysAgo = 6; daysAgo >= 0; daysAgo -= 1) {
      const date = new Date(today);
      date.setDate(today.getDate() - daysAgo);
      const dateKey = date.toISOString().slice(0, 10);
      graphLabels.push(dateKey);

      const dailyCompleted = logs.filter((log) => {
        const logDate = log.started_at
          ? new Date(log.started_at).toISOString().slice(0, 10)
          : null;
        return logDate === dateKey && log.status === "COMPLETED";
      });

      const completedCount = dailyCompleted.length;
      const dailyCountsByProject = dailyCompleted.reduce((acc, log) => {
        acc[log.project_id] = (acc[log.project_id] || 0) + 1;
        return acc;
      }, {});

      let dailyRevenue = 0;
      allocations.forEach((allocation) => {
        const count = dailyCountsByProject[allocation.project_id] || 0;
        const cpi = parseFloat(allocation.cpi) || 0;
        dailyRevenue += cpi * count;
      });

      graphCompleted.push(completedCount);
      graphRevenue.push(dailyRevenue);
    }

    res.json({
      assignedProjects: assignmentIds.length,
      allocationsAssigned: allocations.length,
      totalResponses,
      completed,
      disqualified,
      quotaFull,
      revenueGenerated,
      graph: {
        labels: graphLabels,
        completed: graphCompleted,
        revenue: graphRevenue,
      },
    });

  } catch (err) {

    console.log(err);

    res
      .status(500)
      .json(err);

  }

};

exports.updateVendor = async (req, res) => {

  try {

    const { data, error } =
      await supabase
        .from("vendors")
        .update(req.body)
        .eq(
          "id",
          req.params.id
        )
        .select();

    if (error) {

      console.log(error);

      return res
        .status(400)
        .json(error);

    }

    res.json(data);

  } catch (err) {

    console.log(err);

    res
      .status(500)
      .json(err);

  }

};

exports.deleteVendor = async (req, res) => {

  try {

    const { error } =
      await supabase
        .from("vendors")
        .delete()
        .eq(
          "id",
          req.params.id
        );

    if (error) {

      console.log(error);

      return res
        .status(400)
        .json(error);

    }

    res.json({
      success: true,
      message:
      "Vendor Deleted"
    });

  } catch (err) {

    console.log(err);

    res
      .status(500)
      .json(err);

  }

};