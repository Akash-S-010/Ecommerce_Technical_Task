import express from "express";
import dotenv from "dotenv";
import connectDB from "./src/config/db.js";
import apiRoutes from "./src/routes/index.js";
dotenv.config();

const app = express();
app.use(express.json());


// sample route to test server running
app.get("/test", (req, res) => {
    res.status(200).json({ message: "Server is running!" });
});

// API routes
app.use("/api", apiRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    connectDB();
});
