const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const verifyRoute = require("./routes/verifyRoutes");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT_NO || 3000;

app.use(
  cors({
    credentials: true,
    origin: "https://fullstack-verification.vercel.app" // No trailing slash

  })
);
app.use(bodyParser.json());

app.use("/api", verifyRoute);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
