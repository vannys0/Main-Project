const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

app.listen(8081, () => {
  console.log("Server is running on port 8081");
});

const user = require("./routes/user");
app.use("/api", user);

const rabbit = require("./routes/rabbit");
app.use("/api", rabbit);

const adoption = require("./routes/adoption");
app.use("/api", adoption);

const delivery = require("./routes/delivery");
app.use("/api", delivery);

const breeding = require("./routes/breeding");
app.use("/api", breeding);

//most of the api of the frontend project.
const client = require("./routes/client");
app.use("", client);

const dashbard = require("./routes/dashboard");
app.use("/api", dashbard);

const chartutil = require("./routes/chartutil");
app.use("/api", chartutil);

const config = require("./routes/config");
app.use("/api", config);



