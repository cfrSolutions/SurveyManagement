// // test.js

// require("dotenv").config();
// const mongoose = require("mongoose");

// console.log(process.env.MONGO_URI);

// mongoose
//   .connect(process.env.MONGO_URI)
//   .then(() => {
//     console.log("MongoDB Connected Successfully");
//     process.exit(0);
//   })
//   .catch((err) => {
//     console.error("Mongo Error:");
//     console.error(err);
//     process.exit(1);
//   });


import { createClient } from '@supabase/supabase-js'
import 'dotenv/config'

console.log(process.env.SUPABASE_URL)
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
)

// Replace 'users' with one of your old table names
const { data, error } = await supabase
  .from('vendors')
  .select('*')
  .limit(5)

console.log('Data:', data)
console.log('Error:', error)