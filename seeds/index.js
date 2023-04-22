const mongoose = require("mongoose");
const Campground = require("../models/campground");
const cities = require("./cities");
const { descriptors, places } = require("./seedHelpers");

// connect to mongoose
main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/yelp-camp");
  console.log("Database connected");
}

// const sample = (array) => array[Math.floor(Math.random() * array.length)];

// const seedDB = async () => {
//   await Campground.deleteMany({});
//   for (let i = 0; i < 50; i++) {
//     const random1000 = Math.floor(Math.random() * 1000);
//     const camp = new Campground({
//       location: `${cities[random1000].city}, ${cities[random1000].state}`,
//       title: `${sample(descriptors)} ${sample(places)}`,
//     });
//     await camp.save();
//   }
// };

const randArrayElement = (array) =>
  array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 50; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const camp = new Campground({
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${randArrayElement(descriptors)} ${randArrayElement(places)}`,
    });
    await camp.save();
  }
};

seedDB().then(() => {
  // for closing connection
  mongoose.connection.close();
});
