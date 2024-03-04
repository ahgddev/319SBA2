import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import Cats from "../models/catModel.mjs";
import pkg from "../utilities/data.js";

dotenv.config();
const { dogs, cats, others } = pkg;
await mongoose.connect(process.env.CAT_URL);

const router = express.Router();

//Add basic database data for cats
router.route("/seed").get(async (req, res) => {
  await Cats.deleteMany({});
  await Cats.create(cats);

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
        await Cats.findByIdAndDelete(
          req.params.id
        );
    
        res.send("The cat named " + req.body.name + " was deleted. Bye " + req.body.name + "!");
      } catch (err) {
        res.status(500).json({ msg: "Error! Does that ID exist? Error:" + err });
    }
})
  .patch(async (req, res) => {
    //Update a cat
    try {
        const updatedCat = await Cats.findByIdAndUpdate(
          req.params.id,
          req.body,
          { new: true }
        );
    
        res.send("The cat named " + req.body.name + " was updated.");
      } catch (err) {
        res.status(500).json({ msg: "Error! Does that ID exist? Error:" + err });
      }
  });

router.route("/sick").get(async (req, res) => {
  //get all sick or injured cats
});

router.route("/alphabetical").get(async (req, res) => {
    //get all cats in alphabetical order
  });

router.route("/penspace").get(async (req, res) => {
    //get all pens that either have only 1 cat inside or no cats inside. This shelter can only house cats in pens 1 - 15.
  });
export default router;
