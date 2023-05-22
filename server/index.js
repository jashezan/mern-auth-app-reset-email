// Importing Library
import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";

// Importing Modules
import connectDB from "./databases/conn.js";
import router from "./routers/route.js";

// Configuring ENV for backend
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan('tiny'))
app.disable('x-powered-by')

// Home Route
app.get("/", (req, res) => {
  return res.status(200).json("Home Coming");
});

// API Routes
app.use('/api', router)

// Getting PORT from env file
const PORT = process.env.PORT;
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
