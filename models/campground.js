const mongoose = require("mongoose");
const Review = require("./review");
const { string } = require("joi");
const { cloudinary } = require("../cloudinary");
// you can do the following line to shortened the code
const Schema = mongoose.Schema;

const CampgroundSchema = new Schema({
  title: String,
  images: [
    {
      url: String,
      filename: String,
    },
  ],
  price: Number,
  description: String,
  location: String,
  author: { type: Schema.Types.ObjectId, ref: "User" },
  reviews: [{ type: Schema.Types.ObjectId, ref: "Review" }],
});

// mongoose middleware
CampgroundSchema.post("findOneAndDelete", async function (doc) {
  if (doc) {
    // delete associated reviews
    await Review.deleteMany({ _id: { $in: doc.reviews } });
    // delete associated images from cloudinary
    for (let img of doc.images) {
      await cloudinary.uploader.destroy(img.filename);
    }
  }
});

module.exports = mongoose.model("Campground", CampgroundSchema);
