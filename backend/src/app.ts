import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import { errorResponse } from "./utils/response";
import userRoutes from "./routes/user.routes";

const app = express();

app.use(cors());
app.use(express.json());

// user routes
app.use("/api/users", userRoutes);

app.get("/", (req: Request, res: Response) => {
  res
    .status(200)
    .send("I am working form Full-Stack-Minimal-Library-Management-System");
});

app.use((req: Request, res: Response) => {
  res
    .status(404)
    .json({ success: false, message: "Route not found", data: null });
});

// eslint-disable-next-line
app.use((error: any, req: Request, res: Response, next: NextFunction) => {
  if (error) {
    if (error.name === "ValidationError") {
      errorResponse(res, 400, "Validation failed", {
        name: error.name,
        errors: error.errors,
      });
    } else
      errorResponse(res, 500, "Internal server error", {
        name: error.name,
        message: error.message,
      });

    return;
  }

  errorResponse(res, 500, "Internal server error", {
    name: "Error",
    message: "No error was detected",
  });
});

export default app;
