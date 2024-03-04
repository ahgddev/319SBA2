import express from "express";
import dotenv from "dotenv";
import path from "path";
import bodyParser from "body-parser";
import dogRoutes from "./routes/dogRoutes.mjs";
import catRoutes from "./routes/catRoutes.mjs";
import exoticRoutes from "./routes/exoticRoutes.mjs";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

//Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(".", "src")));

//Routing
app.use("/cats", catRoutes);
app.use("/dogs", dogRoutes);
app.use("/exotics", exoticRoutes);

//Server listening
app.listen(PORT, () => {
console.log("Listening....");
});