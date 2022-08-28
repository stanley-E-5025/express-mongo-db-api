import "dotenv/config";
import "./database/conection.js";
import express from "express";
import cookieParser from "cookie-parser";
import router from "./routes/auth.route.js";

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use("/api/auth/v1", router);
app.use(express.static("public"));

app.listen(process.env.PORT || 3001, () => {
  console.log("OK");
});
