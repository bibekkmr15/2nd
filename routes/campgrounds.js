const express = require("express");
const router = express.Router();
const catchAsync = require("../utilities/catchAsync");
const { isLoggedIn, validateCampground, isAuthor } = require("../middleware");
const campgrounds = require("../controllers/campgrounds");
const multer = require("multer");
// store data in destination folder named uploads (bad idea), we are using this temporarily.
// it's best to use cloud storage like AWS or Cloudinary
const upload = multer({ dest: "uploads/" });

router
  .route("/")
  .get(catchAsync(campgrounds.index))
  // .post(
  //   isLoggedIn,
  //   validateCampground,
  //   catchAsync(campgrounds.createCampground)
  // );
  // // for single file
  // .post(upload.single("image"), (req, res) => {
  // console.log(req.body, req.file);
  // res.send("it worked");
  // for multiple files
  .post(upload.array("image"), (req, res) => {
    console.log(req.body, req.files);
    res.send("it worked");
  });

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
