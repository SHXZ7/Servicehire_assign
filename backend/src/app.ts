import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.routes";
import testRoutes from "./routes/test.routes";
import leadRoutes from "./routes/lead.routes";
import errorMiddleware from "./middleware/error.middleware";

const app = express();

app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/test", testRoutes);
app.use("/api/leads", leadRoutes);

app.get("/", (_, res) => {
  res.json({
    success: true,
    message: "API is running",
  });
});

app.use(errorMiddleware);

export default app;