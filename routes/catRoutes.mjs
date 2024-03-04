import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import Cats from "../models/catModel.mjs";
import pkg from "../utilities/data.js";

dotenv.config();
const { dogs, cats, others } = pkg;
await mongoose.connect(process.env.ATLAS_URL);

const router = express.Router();

//Helper function that will check pens when editing or adding cats.
function penCheck(penNumber) {}

//Add basic database data for cats
router.route("/seed").get(async (req, res) => {
  await Cats.deleteMany({});
  await Cats.insertMany(cats);

  res.send(`Database Seeded`);
});

router
  .route("/")
  //Get all cats, limited to the 1st 10.
  .get(async (req, res) => {
    const allCats = await Cats.find({}).limit(10);
    res.json(allCats);
  })
  //Add a cat
  .post(async (req, res) => {
    try {
      let newCat = new Cats(req.body);
      await newCat.save();

      res.send("The cat named " + req.body.name + " was added.");
    } catch (err) {
      res.status(500).json({ msg: "Error:" + err });
    }
  });

router.route("/sick").get(async (req, res) => {
  //get all sick or injured cats
  let sickCats = await Cats.find(
    { "health_notes.is_sick": true },
    "name health_notes"
  ).exec();
  res.json(sickCats);
});

router.route("/alphabetical").get(async (req, res) => {
  //get all cats in alphabetical order, return only their names
  let alphaCats = await Cats.find({}, "name").sort({ name: 1 });
  res.json(alphaCats);
});

router.route("/penspace").get(async (req, res) => {
  //Display information regarding all cat pens. This shelter can only house cats in pens 1 - 15.
  let pens = await Cats.aggregate([
    {
      $group: { _id: "$pen_number", count: { $sum: 1 } },
    },
    {
      $project: { _id: 0, pen_number: "$_id", occupants: "$count" },
    },
    { $sort : { pen_number : 1 } }
  ]);
  res.send(pens);
});

//Intentional Bad routes that would cause the database validation to reject
router.route("/badname").get(async (req, res) => {
    //Names can contain spaces and the following special characters: -,&,@,~,!
    //Cori== isn't valid because names can't contain =
    try {
        let newCat = new Cats( {
            "name": "Cori==",
            "breed": "American Shorthair",
            "type": "cat",
            "age": 2,
            "pen_number": 6,
            "medication": ["none"],
            "allergies": ["none"],
            "pen_mate": [""],
            "health_notes": {
                "supplements": ["A","B"],
                "is_sick": false,
                "progress": "not sick"
            }
        });
        await newCat.save();
        res.send("OK")
      } catch (err) {
        res.status(500).json({ msg: "Error:" + err });
      }
  });

router
  .route("/:id")
  .get(async (req, res) => {
    //Get a cat with this ID
    try {
      let foundCat = await Cats.findById(req.params.id);
      res.send("Cat found: " + JSON.stringify(foundCat));
    } catch (err) {
      res.status(500).json({ msg: "Error:" + err });
    }
  })
  .delete(async (req, res) => {
    //Delete a cat with this ID
    try {
      await Cats.findByIdAndDelete(req.params.id);

      res.send(
        "The cat named " +
          req.body.name +
          " was deleted. Bye " +
          req.body.name +
          "!"
      );
    } catch (err) {
      res.status(500).json({ msg: "Error! Does that ID exist? Error:" + err });
    }
  })
  .patch(async (req, res) => {
    //Update a cat
    try {
      const updatedCat = await Cats.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
      res.send("The cat named " + req.body.name + " was updated.");
    } catch (err) {
      res.status(500).json({ msg: "Error! Does that ID exist? Error:" + err });
    }
  });

export default router;
