
import express from 'express';
import configViewEngine from './config/viewEngine.js';
import webRoutes from'./routes/web.js';
import connection from './config/database.js';
import initAPIRoute from './routes/api.js'
import dotenv from "dotenv";
import { connectDB } from './config/mgdb.js';
import taskRoute from "./routes/tasksRouters.js";
import userRoute from "./routes/usersRouters.js";
import bannerRoute from "./routes/bannerRouters.js";
import authRoute from "./routes/accountRouters.js";
dotenv.config();
const app = express()
const port = process.env.PORT||8888;
const hostname = process.env.HOST_NAME;
configViewEngine(app);
app.use(express.json());
if (process.env.NODE_ENV !== "production") {
  app.use(cors({ origin: "http://localhost:8080" }));
}
app.use("/api/tasks", taskRoute);
app.use("/api/user", userRoute);
app.use("/api/banner", bannerRoute);
app.use("/api/auth", authRoute);
app.use(express.urlencoded({ extended: true }));
initAPIRoute(app);
app.use('/v1',webRoutes);
connectDB().then(() => {
  app.listen(port, () => {
    console.log(`server bắt đầu trên cổng ${port}`);
  });
});

