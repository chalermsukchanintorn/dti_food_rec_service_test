const express = require("express");
const cors = require("cors");
const userRoute = require("./routes/user.route");

require("dotenv").config();

const app = express();

const PORT = process.env.PORT || 4040;

app.use(cors());
app.use(express.json());

app.use("/user", userRoute);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

//Database free on cloud: https://console.aiven.io/account/a51b3676d565/project/sau-2025/services/mysql-sau/users