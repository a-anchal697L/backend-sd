const express = require("express");
const app = express();
const cors = require("cors");
const authRoutes = require("./routes/auth.route.js");
const dealRoutes = require("./routes/deal.route.js");
const claimRoutes = require("./routes/claim.route.js");
const errorMiddleware = require("./middleware/error.js");

// app.use(
//   cors({
//     origin: "http://localhost:3000", 
//     credentials: true,
//   })
// );

app.use(cors({
  origin: true
}));

app.options("*", cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/deals", dealRoutes);
app.use("/api/claims", claimRoutes);


app.use(errorMiddleware);

module.exports = app;
