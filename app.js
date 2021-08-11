const express = require("express"),
  path = require("path"),
  morgan = require("morgan");
const app = express();
const cors = require("cors");
const customerRoute = require("./routes/customer");
require("dotenv").config();

//app.set("views", path.join(__dirname, "views"));

const PORT = process.env.PORT || 8081;

app.use(cors());

app.use(morgan("dev"));

app.use(express.json());
app.use("/customer", customerRoute);
//app.use(express.static(path.join(__dirname, "public")));
//app.set("view engine", "ejs");
// app.get("/", (req, res) => {
//   res.render("customers");
// });

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
