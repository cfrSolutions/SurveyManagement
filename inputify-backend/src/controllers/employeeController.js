const supabase =
require("../config/supabase");

const bcrypt =
require("bcryptjs");

exports.getEmployees =
async(req,res)=>{

 const { data,error } =
 await supabase
  .from("employees")
  .select("*");

 res.json(data);

};

exports.getEmployeeById =
async(req,res)=>{

 const { id } = req.params;

 const { data,error } =
 await supabase
  .from("employees")
  .select("*")
  .eq("id",id)
  .single();

 if(error){
  return res.status(400)
  .json(error);
 }

 res.json(data);

};

exports.createEmployee =
async(req,res)=>{

 const body = req.body;

 const hash =
 await bcrypt.hash(
  body.password,
  10
 );

 const { data,error } =
 await supabase
  .from("employees")
  .insert([
   {
    name:body.name,
    email:body.email,
    password:hash,
    role:body.role,
    role_id: body.role_id,
    status:"ACTIVE"
   }
  ])
  .select();

 if(error){

  return res.status(400)
  .json(error);

 }

 res.json(data);

};

exports.updateEmployee =
async(req,res)=>{

 const { id } = req.params;

 const { data,error } =
 await supabase
  .from("employees")
  .update(req.body)
  .eq("id",id)
  .select();

 res.json(data);

};

exports.deleteEmployee =
async(req,res)=>{

 const { id } = req.params;

 await supabase
  .from("employees")
  .delete()
  .eq("id",id);

 res.json({
  success:true
 });

};