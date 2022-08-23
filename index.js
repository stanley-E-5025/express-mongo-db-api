import "dotenv/config";
import "./database/conection.js";
import express from "express";
import router from "./routes/auth.route.js";

const app = express();

app.use(express.json());
app.use(router);

app.listen(process.env.PORT || 3001, () => {
  console.log("OK");
});
