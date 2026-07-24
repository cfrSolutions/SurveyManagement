const supabase =
require("../config/supabase");
const crypto = require("crypto");
const token = crypto.randomBytes(24).toString("hex");

/* GET ALL */

exports.getProjects =
async(req,res)=>{

 try{

  const { data,error } =
  await supabase
   .from("projects")
   .select("*")
   .order(
    "created_at",
    { ascending:false }
   );

  if(error){

   return res
   .status(400)
   .json(error);

  }

  res.json(data);

 }
 catch(err){

  res
  .status(500)
  .json(err);

 }

};

/* GET ONE */

exports.getProjectById =
async(req,res)=>{

 try{

  const { data,error } =
  await supabase
   .from("projects")
   .select("*")
   .eq(
    "id",
    req.params.id
   )
   .single();

  if(error){

   return res
   .status(400)
   .json(error);

  }

  res.json(data);

 }
 catch(err){

  res
  .status(500)
  .json(err);

 }

};

/* CREATE */

exports.createProject =
async(req,res)=>{

 try{

  const crypto = require("crypto");

const payload = {
  ...req.body,
  token: crypto.randomBytes(24).toString("hex"),
};

const { data, error } = await supabase
  .from("projects")
  .insert([payload])
  .select()
  .single();

  if(error){

   return res
   .status(400)
   .json(error);

  }
  const project = data;

  await supabase
.from("thank_you_pages")
.insert({
    project_id: project.id,

    completed: {
        heading: "Thank You!",
        description:
            "Your response has been recorded successfully.",
        buttonText: "Close Window"
    },

    disqualified: {
        heading: "Sorry!",
        description:
            "Unfortunately you did not qualify for this survey.",
        buttonText: "Close Window"
    },

    quota_full: {
        heading: "Survey Closed",
        description:
            "This survey has already reached the required number of responses.",
        buttonText: "Close Window"
    },

    footer: {
        showPoweredBy: true,
        text: "Powered by Inputify"
    }
});

    const { data: internalVendor } =
      await supabase
        .from("vendors")
        .select("*")
        .eq(
          "company_name",
          "Internal Company"
        )
        .single();

    if (internalVendor) {

      await supabase
        .from("vendor_allocations")
        .insert([
          {
            project_id: project.id,
            vendor_id: internalVendor.id,
            status: "testing",
            quota:
              project.req_completes || 0
          }
        ]);

    }
  res.json(data);

 }
 catch(err){

  res
  .status(500)
  .json(err);

 }

};

/* UPDATE */

exports.updateProject =
async(req,res)=>{

 try{

  const payload = {
  ...req.body,
};

if (!payload.token) {
  payload.token = crypto.randomBytes(24).toString("hex");
}

const { data, error } = await supabase
  .from("projects")
  .update(payload)
  .eq("id", req.params.id)
  .select()
  .single();

  if(error){

   return res
   .status(400)
   .json(error);

  }

  res.json(data);

 }
 catch(err){

  res
  .status(500)
  .json(err);

 }

};

/* DELETE */

exports.deleteProject =
async(req,res)=>{

 try{

  const { error } =
  await supabase
   .from("projects")
   .delete()
   .eq(
    "id",
    req.params.id
   );

  if(error){

   return res
   .status(400)
   .json(error);

  }

  res.json({
   success:true,
   message:
   "Project Deleted"
  });

 }
 catch(err){

  res
  .status(500)
  .json(err);

 }

};

// exports.updateCompletionMode = async (req, res) => {

//     try {

//         const { projectId } = req.params;

//         const { completion_mode } = req.body;

//         const { error } = await supabase

//             .from("projects")

//             .update({

//                 completion_mode

//             })

//             .eq("id", projectId);

//         if (error) {

//             return res.status(400).json(error);

//         }

//         res.json({

//             success: true

//         });

//     }

//     catch (err) {

//         res.status(500).json({

//             success: false,

//             message: err.message

//         });

//     }

// };