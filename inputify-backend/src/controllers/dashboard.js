const supabase = require("../config/supabase");

exports.getDashboardStats = async (req, res) => {

  try {

    const [
      projectsRes,
      clientsRes,
      vendorsRes,
      respondentsRes
    ] = await Promise.all([

      supabase
        .from("projects")
        .select("*"),

      supabase
        .from("clients")
        .select("*"),

      supabase
        .from("vendors")
        .select("*"),

      supabase
        .from("respondent_logs")
        .select("*")

    ]);

    const projects =
      projectsRes.data || [];

    const clients =
      clientsRes.data || [];

    const vendors =
      vendorsRes.data || [];

    const respondents =
      respondentsRes.data || [];

    const completed =
      respondents.filter(
        r => r.status === "COMPLETED"
      ).length;

    const runningProjects =
  projects
    .filter(
      p =>
        p.status === "Running" ||
        p.status === "LIVE"
    )
    .map(project => {

      const client =
        clients.find(
          c => c.id === project.client_id
        );

      return {
        ...project,
        company_name:
          client?.company_name || "-"
      };

    });

    res.json({

      totalProjects:
        projects.length,

      totalClients:
        clients.length,

      totalVendors:
        vendors.length,

      totalCompletes:
        completed,

      runningProjects

    });

  } catch (err) {

    console.log(err);

    res.status(500).json({
      message: err.message
    });

  }

};