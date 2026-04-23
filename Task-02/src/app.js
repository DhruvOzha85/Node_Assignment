const express = require("express");
const noteRoutes = require("./routes/note.routes");

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use("/api/notes", noteRoutes);

// Error Handling Middleware (Basic)
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    success: false,
    message: err.message || "Internal Server Error",
    data: null,
  });
});

module.exports = app;
