import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

import connectDB from "./databases/conn.js";

const PORT = process.env.PORT;

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    return res.status(200).json("Hello Mia");
});

connectDB()
  .then(
    app.listen(PORT, (er) => {
      if (er) {
        console.log(er);
      } else {
        console.log(`Connected to DB and Server Running on port: ${PORT}`);
      }
    })
  )
  .catch((er) => {
    console.log(er);
  });
