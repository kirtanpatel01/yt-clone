import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  }),
);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Import routes
import userRoutes from './routes/user.routers.js';

app.use('/api/v1/users', userRoutes);

app.use(express.static("public"));

export { app };
