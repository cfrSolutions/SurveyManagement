const supabase = require("../config/supabase");
const { generateGid } = require("../utils/gid");
const { generateCada } = require("../utils/cada");


/* GET PROJECT VENDORS */

exports.getProjectVendors =
async(req,res)=>{

 try{

  const { projectId } =
  req.params;

  const { data,error } =
  await supabase
   .from("vendor_allocations")
   .select(`
     *,
     vendors(
       company_name,
       email,
       phone
     )
   `)
   .eq(
    "project_id",
    projectId
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

/* ADD VENDOR */

exports.addVendor = async (req, res) => {

  try {

    const {
      project_id,
      vendor_id,
      cpi,
      quota,
      max_completes,
      max_redirects,
      vendor_contact_id,
      notes,
      complete_url,
      disqualified_url,
      quota_full_url,
      client_key
    } = req.body;

    //----------------------------------------------------
    // Create Allocation
    //----------------------------------------------------
    // console.log("Vendor:", vendor);

    const { data: vendor } = await supabase
  .from("vendors")
  .select("completion_url, disqualify_url, quota_url")
  .eq("id", vendor_id)
  .single();

    const { data: allocation, error } =
      await supabase
        .from("vendor_allocations")
        .insert({

          project_id,

          vendor_id,

          cpi,

          quota,

          max_completes,

          max_redirects,

          vendor_contact_id,

          notes,

          complete_url: vendor.completion_url,
          disqualified_url: vendor.disqualify_url,
          quota_full_url: vendor.quota_url,

          client_key,

          status: "Testing"

        })
        .select()
        .single();

    if (error) {

      return res.status(400).json(error);

    }

    //----------------------------------------------------
    // Generate GID
    //----------------------------------------------------

    const gid = generateGid({

      allocationId: allocation.id,

      projectId: allocation.project_id,

      vendorId: allocation.vendor_id

    });

    //----------------------------------------------------
    // Generate Static CADA
    //----------------------------------------------------

    const cada = generateCada({

      allocationId: allocation.id,

      projectId: allocation.project_id,

      vendorId: allocation.vendor_id

    });

    console.log("NEW CADA:", cada);

    //----------------------------------------------------
    // Save Tokens
    //----------------------------------------------------

    await supabase
      .from("vendor_allocations")
      .update({

        gid,

        cada

      })
      .eq("id", allocation.id);

      const { data: check } = await supabase
  .from("vendor_allocations")
  .select("cada")
  .eq("id", allocation.id)
  .single();

console.log("DB CADA:", check.cada);

    //----------------------------------------------------
    // Return Updated Allocation
    //----------------------------------------------------

    const { data: updated } =
      await supabase
        .from("vendor_allocations")
        .select("*")
        .eq("id", allocation.id)
        .single();

    return res.json(updated);

  }

  catch (err) {

    console.log(err);

    return res.status(500).json(err);

  }

};