const supabase = require("../config/supabase");

// exports.jotformWebhook = async (req, res) => {
//   try {

//     console.log("Webhook Received");
//     console.log(req.body);

//     // Save raw payload
//     await supabase
//       .from("respondent_logs")
//       .insert({
//         source_api: "Jotform",
//         status: "COMPLETED",
//         raw_data: req.body
//       });

//     return res.status(200).send("OK");

//   } catch (err) {

//     console.log(err);

//     return res.status(500).json({
//       message: err.message
//     });

//   }
// };

exports.syncAPI = async (req, res) => {

    const { id } = req.params;

    const { data: api } = await supabase
        .from("third_party_apis")
        .select("*")
        .eq("id", id)
        .single();

    switch(api.api_name.toLowerCase()){

        case "jotform":
            return syncJotform(api,res);

        case "cint":
            return syncCint(api,res);

        case "typeform":
            return syncTypeform(api,res);

        default:

            return res.status(400).json({
                message:"Provider not supported"
            });

    }

}