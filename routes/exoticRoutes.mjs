import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import Exotics from "../models/exoticModel.mjs";
import pkg from "../utilities/data.js";

dotenv.config();
const { dogs, cats, exotics } = pkg;
await mongoose.connect(process.env.ATLAS_URL);

const router = express.Router();

//Add basic database data for exotics
router.route("/seed").get(async (req, res) => {
  await Exotics.deleteMany({});
  await Exotics.insertMany(exotics);

  res.send(`Database Seeded`);
});

router
  .route("/")
  //Get all exotics, limited to the 1st 10.
  .get(async (req, res) => {
    const allExotics = await Exotics.find({}).limit(10);
    res.json(allExotics);
  })
  //Add an exotic
  .post(async (req, res) => {
    try {
      let newExotic = new Exotics(req.body);
      await newExotic.save();
    } catch (err) {
      res.status(500).json({ msg: "" + err });
    }
  });

router.route("/sick").get(async (req, res) => {
  //get all sick or injured exotics
  let sickExotics = await Exotics.find(
    { "health_notes.is_sick": true },
    "name health_notes"
  ).exec();
  res.json(sickExotics);
});

router.route("/alphabetical").get(async (req, res) => {
  //get all exotics in alphabetical order, return only their names
  let alphaExotics = await Exotics.find({}, "name").sort({ name: 1 });
  res.json(alphaExotics);
});

router.route("/penspace").get(async (req, res) => {
  //Display information regarding all exotic pens. This shelter can only house exotics in pens 16 - 40.
  let pens = await Exotics.aggregate([
    {
      $group: { _id: "$pen_number", count: { $sum: 1 } },
    },
    {
      $project: { _id: 0, pen_number: "$_id", occupants: "$count" },
    },
    { $sort: { pen_number: 1 } },
  ]);
  res.send(pens);
});

//Intentional Bad routes that would cause the database validation to reject
router.route("/badpen").get(async (req, res) => {
  //The max amount of pens in this rescue is 40.
  try {
    let newExotic = new Exotics({
      name: "Eppy",
      breed: "Egret",
      type: "bird",
      age: 2,
      pen_number: 50,
      medidogion: ["none"],
      allergies: ["none"],
      health_notes: {
        supplements: [""],
        is_sick: false,
        progress: "not sick",
      },
    });
    await newExotic.save();
    res.send("OK");
  } catch (err) {
    res.status(500).json({ msg: "Error:" + err });
  }
});

router
  .route("/:id")
  .get(async (req, res) => {
    //Get an exotic with this ID
    try {
      let foundExotic = await Exotics.findById(req.params.id);
      res.send("Exotic found: " + JSON.stringify(foundExotic));
    } catch (err) {
      res.status(500).json({ msg: "Error:" + err });
    }
  })
  .delete(async (req, res) => {
    //Delete an exotic with this ID
    try {
      await Exotics.findByIdAndDelete(req.params.id);
      res.send("Exotic's records deleted");
    } catch (err) {
      res.status(500).json({ msg: "Error! Does that ID exist? " + err });
    }
  })
  .patch(async (req, res) => {
    //Update an exotic
    try {
      const updatedExotic = await Exotics.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
        }
      );
      res.send("The exotic was updated.");
    } catch (err) {
      res.status(500).json({ msg: "Error! Does that ID exist? Error:" + err });
    }
  });

export default router;
