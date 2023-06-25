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
  for (let i = 0; i < 300; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 1000) + 500;
    const camp = new Campground({
      // user id of the auther
      author: "646e4814ba39b4a4b41b5ddb",
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${randArrayElement(descriptors)} ${randArrayElement(places)}`,
      // image: "https://source.unsplash.com/collection/483251",
      description:
        "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Praesentium cupiditate distinctio hic, at temporibus ea dicta repellendus est veritatis nisi nemo nihil dolorum doloremque harum accusamus reprehenderit, voluptatum eum cum.",
      price,
      geometry: {
        type: "Point",
        coordinates: [
          cities[random1000].longitude,
          cities[random1000].latitude,
        ],
      },
      images: [
        {
          url: "https://res.cloudinary.com/dnx2g5cov/image/upload/v1686901510/YelpCamp/dn03onqwwzev6atjvrng.jpg",
          filename: "YelpCamp/dn03onqwwzev6atjvrng",
        },
        {
          url: "https://res.cloudinary.com/dnx2g5cov/image/upload/v1686901511/YelpCamp/cqhftidaokzzkkgzr5au.jpg",
          filename: "YelpCamp/cqhftidaokzzkkgzr5au",
        },
        {
          url: "https://res.cloudinary.com/dnx2g5cov/image/upload/v1686901513/YelpCamp/ndbiadt0mk8vg0zmlxby.jpg",
          filename: "YelpCamp/ndbiadt0mk8vg0zmlxby",
        },
      ],
    });
    await camp.save();
  }
};

seedDB().then(() => {
  // for closing connection
  mongoose.connection.close();
});
