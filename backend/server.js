const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const dotenv = require("dotenv");

const { connectDB } = require("./config/db");
const { seedAdminAndServices } = require("./utils/seed");

dotenv.config();

const app = express();

/* ================== MIDDLEWARE ================== */

app.set("trust proxy", 1);
app.use(helmet());

// ✅ FIXED CORS (THIS IS THE MAIN FIX)
app.use(
  cors({
    origin: [
      "http://localhost:5173",
     "https://beauty-kgjp.onrender.com"
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
  })
);

app.use(express.json({ limit: "1mb" }));
app.use(morgan("dev"));

/* ================== ROUTES ================== */

app.get("/api/health", (_req, res) => {
  res.json({ ok: true });
});

app.use("/api/auth", require("./routes/auth"));
app.use("/api/services", require("./routes/services"));
app.use("/api/appointments", require("./routes/appointments"));
app.use("/api/messages", require("./routes/messages"));
app.use("/api/users", require("./routes/users"));

/* ================== ERROR HANDLING ================== */

app.use((_req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ message: "Server error" });
});

/* ================== START SERVER ================== */

const PORT = process.env.PORT || 5000;

(async () => {
  await connectDB();
  await seedAdminAndServices();

  app.listen(PORT, () => {
    console.log(`✅ API running on http://localhost:${PORT}`);
  });
})();
 
