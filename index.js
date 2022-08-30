import "dotenv/config";
import "./database/conection.js";
import express from "express";
import cookieParser from "cookie-parser";
import auth from "./routes/auth.route.js";
import notes from "./routes/notes.route.js";
import cors from "cors";

const app = express();

const safeOrigins = [process.env.ORIGIN_1, undefined];

app.use(
  cors({
    origin: function (origin, callback) {
      if (safeOrigins.includes(origin)) {
        return callback(null, origin);
      }

      return callback(`CORS error ${origin} 🗑`);
    },
  })
);
app.use(express.json());
app.use(cookieParser());
app.use("/api/auth/v1", auth);
app.use("/api/v1/notes", notes);
app.use(express.static("public"));

app.listen(process.env.PORT || 3001, () => {
  console.log(`Host runing in port ${process.env.PORT || 3001} 📟`);
});
