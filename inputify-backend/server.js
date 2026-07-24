require("dotenv").config();

const app = require("./src/app");

const PORT = process.env.PORT || 6001;

app.listen(PORT, () => {
  console.log(`Server Running on Port ${PORT}`);
});