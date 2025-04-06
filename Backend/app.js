import express, { urlencoded } from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import applicationRouter from "./Routes/applicationRouter.js";
import jobRouter from "./Routes/jobRouter.js";
import userRouter from "./Routes/userRouter.js";
import errorMiddlware from "./Middlewares/error.middleware.js"

const app = express();
dotenv.config({ path: "./Config/.env" });

app.use(
  cors({
    origin: 'http://localhost:5173',
    methods: ["GET", "POST", "PUT", "DELETE" , "PATCH"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"], // Explicitly allow headers
  })
);


app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp",
  })
);

app.get("/", (req, res) => {
  console.log(cookieParser);

  res.send("hello world");
});

app.use("/api/v1/user" , userRouter )
app.use("/api/v1/application" , applicationRouter)
app.use("/api/v1/job" , jobRouter) 

app.use(errorMiddlware)
export default app;
