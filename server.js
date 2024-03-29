const express = require("express");
const connectDB = require("./config/db");
const path = require("path");
var cors = require("cors");
const app = express();
connectDB();

app.use(express.json({ extended: false }));
app.use(cors({ origin: "http://localhost:3000" }));
//cesty
app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/questions", require("./routes/api/questions"));
app.use("/api/answers", require("./routes/api/answers"));
//static assets

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
