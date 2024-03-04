import mongoose from "mongoose";

// Define the schema for exotics.
const exoticSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
  },
  breed: {
    type: String,
  },
  type: {
    type: String,
  },
  age: {
    type: Number,
  },
  pen_number: {
    type: Number,
    unique: true,
  },
  medication: {
    type: [String],
  },
  allergies: {
    type: [String],
  },
  health_notes: {
    supplements: {
      type: [String],
    },
    is_sick: {
      type: Boolean,
    },
    diagnosis: {
      type: String,
    },
    progress: {
      type: String,
    },
    details: {
      type: [String],
    },
  },
  last_updated: {
    type: Date,
    default: Date.now,
  },
});

//Searching up an exotic by name is definately a common thing to do, so exotic names are indexed.
exoticSchema.index({ name: 1 });
//Looking up which animals are sick is important for a shelter. They'll want to be able to easily update and check on sick animals. So this will be indexed too. These values will (hopefully!) not change enough to make indexing this value slow things down.
exoticSchema.index({ "health_notes.is_sick": 1 });

export default mongoose.model("Exotic", exoticSchema);
