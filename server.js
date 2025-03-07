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