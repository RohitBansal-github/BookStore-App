import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";

dotenv.config();

import bookRoutes from "./route/book.route.js";
import userRoute from "./route/user.route.js";
import Stripe from "stripe";

const app = express();

// Middleware
app.use(cors({
  origin: ["https://book-store-app-beta-six.vercel.app", "http://localhost:5173"],
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  credentials: true
}));
app.use(express.json());
app.use(helmet());

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const PORT = process.env.PORT || 3000;
const URI = process.env.MongoDBURI;

// connect to mongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(URI);
    console.log("Connected to mongoDB");
  } catch (error) {
    console.error("Error connecting to mongoDB:", error);
    process.exit(1);
  }
};

// defining routes
app.use("/book", bookRoutes(stripe));
app.use("/user", userRoute);

const startServer = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
  });
};

app.get("/",(req,res)=>{
  res.send("Hello from server");
});

startServer();