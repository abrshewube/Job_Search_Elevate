// ES6 syntax (for import .js extension required)
// Setup package.json -> "type":"module" or file extension.mjs
import dotenv from "dotenv";
import express from "express";
import "express-async-errors";
import morgan from "morgan";
import connectDB from "./db/connect.js";
import authenticateUser from "./middleware/auth.js";
import errorHandlerMiddleware from "./middleware/error-handler.js";
import notFoundMiddleware from "./middleware/not-found.js";
// With ES& modules, dirname is not accessible by default
import path, { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

import mongoSanitize from "express-mongo-sanitize";
import helmet from "helmet";
import xss from "xss-clean";

// Option for entire application
// const limiter = rateLimit({
//   windowMs: 15 * 60 * 1000, // 15 minutes
//   max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
//   message: 'Too many requests were send, please try again in 15 minutes',
//   standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
//   legacyHeaders: false, // Disable the `X-RateLimit-*` headers
// })

dotenv.config();
const app = express();

// Routers
import authRouter from "./routes/authRoutes.js";
import jobsRouter from "./routes/jobsRoutes.js";

if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev")); // POST /api/v1/auth/register 400 56.925 ms - 62
}

// Makes json data available in the controllers
app.use(express.json());
app.use(mongoSanitize());
app.use(helmet());
app.use(xss());
// Option for entire application
// app.use(limiter)

// For deployment, we serve the production ready build folder
app.use(express.static(path.resolve(__dirname, "./client/build")));
app.use("/api/v1/auth", authRouter);
// All job routes need auth, authenticateUser in front will apply to all job routes
app.use("/api/v1/jobs", authenticateUser, jobsRouter);

// Try all GET routes after the above routes have been tried
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./client/build", "index.html"));
});

// Not found - only looking for routes that don't exist
app.use(notFoundMiddleware);
// Error handler is looking for errors occurring in the existing routes (must be after not found)
app.use(errorHandlerMiddleware);

// 5000 since frontend is running on 3000
const port = process.env.PORT || 5000;
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port} 📡`)
    );
  } catch (error) {
    console.log(error);
  }
};
start();
