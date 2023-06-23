const mongoose = require("mongoose");
const Review = require("./review");
const { string } = require("joi");
const { cloudinary } = require("../cloudinary");
// you can do the following line to shortened the code
const Schema = mongoose.Schema;

// what we have
// https://res.cloudinary.com/dnx2g5cov/image/upload/v1686901510/YelpCamp/dn03onqwwzev6atjvrng.jpg
// what we want
// https://res.cloudinary.com/dnx2g5cov/image/upload/w_200/v1686901510/YelpCamp/dn03onqwwzev6atjvrng.jpg

const ImageSchema = new Schema({
  url: String,
  filename: String,
});

ImageSchema.virtual("thumbnail").get(function () {
  return this.url.replace("/upload", "/upload/w_200");
});

const CampgroundSchema = new Schema({
  title: String,
  images: [ImageSchema],
  price: Number,
  description: String,
  location: String,
  // from docs - https://mongoosejs.com/docs/geojson.html#using-geojson
  geometry: {
    type: {
      type: String,
      enum: ["Point"], // 'location.type' must be 'Point'
      required: true,
    },
    coordinates: {
      type: [Number],
      required: true,
    },
  },
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
