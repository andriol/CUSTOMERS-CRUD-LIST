const express = require("express");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT || 8081;
const customerRoute = require("./routes/customer");

app.use("/", customerRoute);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
