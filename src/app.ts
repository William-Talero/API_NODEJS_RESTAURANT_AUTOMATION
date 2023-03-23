import express from "express";
import "dotenv/config";
import cors from "cors";
import { router } from "./routes";
import db from "./config/mongo";

const PORT = process.env.PORT || 3000;

const app = express();
app.use(
  cors({
    origin: "*",
  })
);

app.use(express.json());

app.use("/api", router);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

db().then(() => {
  console.log("DB connected");
});
