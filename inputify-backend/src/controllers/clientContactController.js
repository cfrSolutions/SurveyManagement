const supabase =
require("../config/supabase");

/* GET ALL CLIENT CONTACTS */

exports.getContacts =
async(req,res)=>{

 try{

  const { clientId } =
  req.params;

  const { data,error } =
  await supabase
   .from("client_contacts")
   .select("*")
   .eq(
    "client_id",
    clientId
   );

  if(error){

   return res.status(400)
   .json(error);

  }

  res.json(data);

 }
 catch(err){

  res.status(500)
  .json(err);

 }

};

/* GET SINGLE CONTACT */

exports.getContactById =
async(req,res)=>{

 try{

  const { data,error } =
  await supabase
   .from("client_contacts")
   .select("*")
   .eq(
    "id",
    req.params.id
   )
   .single();

  if(error){

   return res.status(400)
   .json(error);

  }

  res.json(data);

 }
 catch(err){

  res.status(500)
  .json(err);

 }

};

/* CREATE CONTACT */

exports.createContact =
async(req,res)=>{

 try{

  const { data,error } =
  await supabase
   .from("client_contacts")
   .insert([req.body])
   .select();

  if(error){

   return res.status(400)
   .json(error);

  }

  res.json(data);

 }
 catch(err){

  res.status(500)
  .json(err);

 }

};

/* UPDATE CONTACT */

exports.updateContact =
async(req,res)=>{

 try{

  const { data,error } =
  await supabase
   .from("client_contacts")
   .update(req.body)
   .eq(
    "id",
    req.params.id
   )
   .select();

  if(error){

   return res.status(400)
   .json(error);

  }

  res.json(data);

 }
 catch(err){

  res.status(500)
  .json(err);

 }

};