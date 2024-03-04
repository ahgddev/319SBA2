// - Create GET routes for all data that should be exposed to the client, using appropriate query commands to retrieve the data from the database.
// - Create POST routes for data, as appropriate, using appropriate insertion commands to add data to the database. At least one data collection should allow for client creation via a POST request.
// - Create PATCH or PUT routes for data, as appropriate, using appropriate update commands to change data in the database. At least one data collection should allow for client manipulation via a PATCH or PUT request.
// - Create DELETE routes for data, as appropriate, using appropriate delete commands to remove data from the database. At least one data collection should allow for client deletion via a DELETE request.
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import Cats from '../models/catModel.mjs';
import pkg from "../utilities/data.js";

dotenv.config();
const {dogs, cats, others} = pkg;
await mongoose.connect(process.env.CAT_URL);

const router = express.Router();

router
.route("/seed")
.get(async (req, res) => {
    await Cats.deleteMany({});
    await Cats.create(cats);
  
    res.send(`Database Seeded`);
  });

export default router