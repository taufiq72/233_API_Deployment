const express = require("express");
const connectDatabase = require("./config/db");

const app = express();

// Middleware parsing body request
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Variabel status koneksi database
let databaseReady = false;
let databasePromise = null;

// Middleware untuk memastikan koneksi database siap sebelum memproses route
app.use(async (req, res, next) => {
  try {
    if (!databaseReady) {
      if (!databasePromise) {
        databasePromise = connectDatabase();
      }
      await databasePromise;
      databaseReady = true;
    }
    next();
  } catch (error) {
    console.error("Database initialization failed:", error.message);
    databasePromise = null; // Reset promise agar bisa dicoba ulang pada request berikutnya
    return res.status(500).json({
      message: "Database initialization failed.",
      error: error.message
    });
  }
});

// Routing API
app.use("/api", require("./routes/api"));

// Fallback untuk route utama (Home / Health Check)
app.get("/", (req, res) => {
  res.status(200).json({
    message: "API Deployment is running successfully!",
    status: "OK"
  });
});

// Jalankan server lokal jika TIDAK berada di lingkungan Vercel
if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server running locally on port ${PORT}`);
  });
}

// Export app untuk Vercel Serverless Function
module.exports = app;