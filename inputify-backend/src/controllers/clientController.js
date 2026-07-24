const supabase = require("../config/supabase");

exports.getClients = async (req, res) => {

  try {

    const { data, error } =
      await supabase
        .from("clients")
        .select("*")
        .order("created_at", { ascending: false });

    if (error) {
      return res.status(400).json(error);
    }

    res.json(data);

  } catch (err) {

    res.status(500).json(err);

  }

};

exports.createClient = async (req, res) => {

  try {

    const { data, error } =
      await supabase
        .from("clients")
        .insert([req.body])
        .select();

    if (error) {
      return res.status(400).json(error);
    }

    res.json(data);

  } catch (err) {

    res.status(500).json(err);

  }

};

exports.getClientById = async (req, res) => {

  try {

    const { data, error } =
      await supabase
        .from("clients")
        .select("*")
        .eq("id", req.params.id)
        .single();

    if (error) {
      return res.status(400).json(error);
    }

    res.json(data);

  } catch (err) {

    res.status(500).json(err);

  }

};

exports.getClientDashboard = async (req, res) => {
  try {
    const clientId = req.params.id;

    const { data: projects, error: projectError } =
      await supabase
        .from("projects")
        .select("*")
        .eq("client_id", clientId);

    if (projectError) {
      console.log(projectError);
      return res.status(400).json(projectError);
    }

    const projectIds = projects.map((project) => project.id);
    let logs = [];

    if (projectIds.length) {
      const { data: logData, error: logsError } =
        await supabase
          .from("respondent_logs")
          .select("*")
          .in("project_id", projectIds);

      if (logsError) {
        console.log(logsError);
        return res.status(400).json(logsError);
      }

      logs = logData || [];
    }

    const totalResponses = logs.length;
    const completed = logs.filter((log) => log.status === "COMPLETED").length;

    const projectCpi = projects.reduce((acc, project) => {
      acc[project.id] = parseFloat(project.cpi) || 0;
      return acc;
    }, {});

    const revenueGenerated = logs.reduce((sum, log) => {
      if (log.status !== "COMPLETED") {
        return sum;
      }
      return sum + (projectCpi[log.project_id] || 0);
    }, 0);

    const today = new Date();
    const graphLabels = [];
    const graphCompleted = [];
    const graphRevenue = [];

    for (let daysAgo = 6; daysAgo >= 0; daysAgo -= 1) {
      const date = new Date(today);
      date.setDate(today.getDate() - daysAgo);
      const dateKey = date.toISOString().slice(0, 10);
      graphLabels.push(dateKey);

      const dailyLogs = logs.filter((log) => {
        if (!log.started_at) return false;
        const logDate = new Date(log.started_at).toISOString().slice(0, 10);
        return logDate === dateKey && log.status === "COMPLETED";
      });

      graphCompleted.push(dailyLogs.length);
      graphRevenue.push(
        dailyLogs.reduce((dailySum, log) => {
          return dailySum + (projectCpi[log.project_id] || 0);
        }, 0)
      );
    }

    res.json({
      assignedProjects: projects.length,
      totalResponses,
      completed,
      revenueGenerated,
      graph: {
        labels: graphLabels,
        completed: graphCompleted,
        revenue: graphRevenue,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

exports.updateClient = async (req, res) => {

  try {

    const { data, error } =
      await supabase
        .from("clients")
        .update(req.body)
        .eq("id", req.params.id)
        .select();

    if (error) {
      return res.status(400).json(error);
    }

    res.json(data);

  } catch (err) {

    res.status(500).json(err);

  }

};