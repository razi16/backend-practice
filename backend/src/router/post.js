const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const jwt = require("jsonwebtoken");
const path = require("path");
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
const postModel = require("../models/postModel");
const userModel = require("../models/userModel");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../../images"));
  },
  filename: function (req, file, cb) {
    cb(null, uuidv4() + "-" + Date.now() + path.extname(file.originalname));
  },
});

const fileFilter = (req, file, cb) => {
  const allowedFileTypes = ["image/jpeg", "image/jpg", "image/png"];
  if (allowedFileTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

let upload = multer({ storage, fileFilter });

const verifyJWT = (req, res, next) => {
  /* const token = req.headers["cookie"]?.split("token=")[1]; */
  //console.log(req.headers.cookie);
  const token = decodeURIComponent(
    req.headers["cookie"]?.replace("token=Bearer%20", "")
  );
  /*  console.log(req.headers.cookie);  */
  //console.log(token);
  if (token) {
    jwt.verify(token, "abcd", (err, decoded) => {
      if (err) {
        console.log(err);
        res.json({
          isLoggedIn: false,
          message: "Authentication failed",
        });
      } else {
        req.user = {};
        req.user.id = decoded.id;
        req.user.username = decoded.username;
        req.user.photo = decoded.photo;
        next();
      }
    });
  } else {
    res.json({
      isLoggedIn: false,
      message: "Incorrect token given",
    });
  }
};

router.get("/", async (req, res) => {
  const data = await postModel.find();
  res.json({ posts: data });
});

router.get("/:id", async (req, res) => {
  const data = await postModel
    .findOne({ _id: req.params.id })
    .populate("uploadedBy");
  res.json({ post: data });
});

router.put("/:id/like", verifyJWT, async (req, res) => {
  const post = await postModel.findOne({ _id: req.params.id });
  const checkLike = post.like.includes(req.user.id);
  if (!checkLike) {
    post.like.push(req.user.id);
  } else {
    const index = post.like.indexOf(req.user.id);
    post.like.splice(index, 1);
  }
  await post.save();
  res.json(post.like);
});

router.post("/upload", verifyJWT, upload.single("image"), async (req, res) => {
  const data = await postModel.create({
    image: req.file.filename,
    caption: req.body.caption,
    uploadedBy: req.user.id,
  });
  await data.save();
  console.log(data);
  res.json({
    message: "image uploaded",
  });
  const user = await userModel.findOne({ _id: req.user.id });
  user.post.push(data._id);
  await user.save();
});

module.exports = router;
