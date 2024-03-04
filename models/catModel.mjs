import mongoose, { Model } from "mongoose";

// Define the schema for cats.
const catSchema = new mongoose.Schema({
  name: {
    type: "String",
    required: true,
  },
  breed: {
    type: "String",
    required: true,
  },
  type: {
    type: String,
    enum: ["cat"],
  },
  age: {
    type: mongoose.Types.Decimal128,
    max: 20,
    message: "The year must be lower than 20.",
    required: true,
  },
  pen_number: {
    type: "Number",
  },
  medication: {
    type: ["String"],
  },
  allergies: {
    type: ["String"],
  },
  pen_mate: [{ type: String }],
  health_notes: {
    supplements: {
      type: ["String"],
      required: true,
    },
    is_sick: {
      type: "Boolean",
    },
    diagnosis: {
      type: "String",
    },
    progress: {
      type: String,
      enum: ["not sick", "investigating", "healing", "healed"],
      message: "{VALUE} can't be a progress value!",
    },
    details: {
      type: ["String"],
    },
  },
  last_updated: {
    type: Date,
    default: Date.now,
  },
});

//Searching up a cat by name is definately a common thing to do, so cat names are indexed.
catSchema.index({ name: 1 });
//Looking up which animals are sick is important for a shelter. So this will be indexed too. These values will (hopefully!) not change enough to make indexing this value slow things down.
catSchema.index({ "health_notes.is_sick": 1 });

export default mongoose.model("Cat", catSchema);
