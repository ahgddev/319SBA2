import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import Dogs from "../models/dogModel.mjs";
import pkg from "../utilities/data.js";

dotenv.config();
const { dogs, cats, others } = pkg;
await mongoose.connect(process.env.ATLAS_URL);

const router = express.Router();

//Helper function that will check pens when editing or adding dogs.
async function checkIfPenIsFull(penNumber) {
  let pens = await Dogs.find({ pen_number: penNumber }, "pen_number").exec();
  if (pens.length >= 2) {
    return true;
  }
  return false;
}

//Add basic database data for dogs
router.route("/seed").get(async (req, res) => {
  await Dogs.deleteMany({});
  await Dogs.insertMany(dogs);

  res.send(`Database Seeded`);
});

router
  .route("/")
  //Get all dogs, limited to the 1st 10.
  .get(async (req, res) => {
    const allDogs = await Dogs.find({}).limit(10);
    res.json(allDogs);
  })
  //Add a dog
  .post(async (req, res) => {
    try {
      let newCat = new Dogs(req.body);
      if (await checkIfPenIsFull(req.body.pen_number)) {
        throw Error("This pen is full. Choose another.");
      } else {
        await newCat.save();
      }
      res.send("The dog named " + req.body.name + " was added.");
    } catch (err) {
      res.status(500).json({ msg: "" + err });
    }
  });

router.route("/sick").get(async (req, res) => {
  //get all sick or injured dogs
  let sickDogs = await Dogs.find(
    { "health_notes.is_sick": true },
    "name health_notes"
  ).exec();
  res.json(sickDogs);
});

router.route("/alphabetical").get(async (req, res) => {
  //get all dogs in alphabetical order, return only their names
  let alphaDogs = await Dogs.find({}, "name").sort({ name: 1 });
  res.json(alphaDogs);
});

router.route("/penspace").get(async (req, res) => {
  //Display information regarding all dog pens. This shelter can only house dogs in pens 1 - 15.
  let pens = await Dogs.aggregate([
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
  //Dogs cannot be added to pens outside of 1 - 15.
  try {
    let newCat = new Dogs({
      name: "Monga",
      breed: "American Pitbull",
      type: "dog",
      age: 2,
      pen_number: 21,
      medidogion: ["none"],
      allergies: ["none"],
      pen_mate: [""],
      health_notes: {
        supplements: ["A", "B"],
        is_sick: false,
        progress: "not sick",
      },
    });
    await newCat.save();
    res.send("OK");
  } catch (err) {
    res.status(500).json({ msg: "Error:" + err });
  }
});

router
  .route("/:id")
  .get(async (req, res) => {
    //Get a dog with this ID
    try {
      let foundCat = await Dogs.findById(req.params.id);
      res.send("Cat found: " + JSON.stringify(foundCat));
    } catch (err) {
      res.status(500).json({ msg: "Error:" + err });
    }
  })
  .delete(async (req, res) => {
    //Delete a dog with this ID
    try {
      await Dogs.findByIdAndDelete(req.params.id);
      res.send("Cat's records deleted");
    } catch (err) {
      res.status(500).json({ msg: "Error! Does that ID exist? Error:" + err });
    }
  })
  .patch(async (req, res) => {
    //Update a dog
    try {
      const updatedCat = await Dogs.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
      res.send("The dog named " + req.body.name + " was updated.");
    } catch (err) {
      res.status(500).json({ msg: "Error! Does that ID exist? Error:" + err });
    }
  });

export default router;
