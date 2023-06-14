const express = require("express");
const router = express.Router();
const catchAsync = require("../utilities/catchAsync");
const { isLoggedIn, validateCampground, isAuthor } = require("../middleware");
const campgrounds = require("../controllers/campgrounds");
const multer = require("multer");
const { storage } = require("../cloudinary");
const upload = multer({ storage });

router
  .route("/")
  .get(catchAsync(campgrounds.index))
  // // Now, our validation got screwed up. The main issue here is actually that Validate Campground is running before
  // // we run Multer Middleware. And Multer is responsible for adding the data onto request.body. This (validateCampground)
  // // depends on request.body.
  // .post(isLoggedIn, validateCampground, upload.array("image"), catchAsync(campgrounds.createCampground));

  // In a production environment, like in the real world, we definitely don't want to just upload our images before
  // we validate the other data. But the way that Multer works is that it's going to first upload everything. And while
  // it's parsing, then it sends us the past body and the files and everything that we have access to and request our
  // bodies. So we'll have to figure out some other option eventually.
  .post(
    isLoggedIn,
    upload.array("image"),
    validateCampground,
    catchAsync(campgrounds.createCampground)
  );

// "/campgrounds/new" route before "/campgrounds/:id"
router.get("/new", isLoggedIn, campgrounds.renderNewForm);

router
  .route("/:id")
  .get(catchAsync(campgrounds.showCampground))
  .put(
    isLoggedIn,
    isAuthor,
    validateCampground,
    catchAsync(campgrounds.updateCampground)
  )
  .delete(isLoggedIn, isAuthor, catchAsync(campgrounds.deleteCampground));

router.get(
  "/:id/edit",
  isLoggedIn,
  isAuthor,
  catchAsync(campgrounds.renderEditForm)
);

module.exports = router;
