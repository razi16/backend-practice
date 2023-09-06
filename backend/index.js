require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const app = express();
const path = require("path");
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
const userModel = require("./src/models/userModel");

mongoose.connect(process.env.DB_HOST);

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
    exposedHeaders: ["Set-Cookie"],
  })
);
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/image", express.static("images"));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "images"));
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
  console.log(req.headers.cookie);
  const token = decodeURIComponent(
    req.headers["cookie"]?.replace("token=Bearer%20", "")
  );
  /*  console.log(req.headers.cookie);  */
  console.log(token);
  if (token) {
    jwt.verify(token, "abcd", (err, decoded) => {
      if (err) {
        /*  console.log(err); */
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

app.post("/login", async (req, res) => {
  const findUser = await userModel.findOne({ email: req.body.email });
  if (!findUser) {
    res.json({
      message: "This email doesn't exist in our database",
    });
  } else {
    const checkPassword = await bcrypt.compare(
      req.body.password,
      findUser.password
    );
    if (!checkPassword) {
      res.json({
        message: "The password you entered is incorrect",
      });
    } else {
      const payload = {
        id: findUser._id,
        username: findUser.username,
        photo: findUser.photo,
      };
      jwt.sign(payload, "abcd", { expiresIn: 86400000 }, (err, token) => {
        if (err) {
          res.json({
            message: err,
          });
        } else {
          res.cookie("token", "Bearer " + token, {
            httpOnly: true,
            maxAge: 86400000,
            path: "/",
            // Other cookie options like expiration, secure, etc.
          });
          res.json({ message: "Success", token: "Bearer " + token });
        }
      });
    }
  }
});

app.get("/logout", verifyJWT, (req, res) => {
  res.clearCookie("token").send("Logout success");
});

app.post("/register", upload.single("photo"), async (req, res) => {
  console.log(req.file);
  const checkEmail = await userModel.findOne({ email: req.body.email });
  if (checkEmail) {
    res.json({
      message: "This email already exist in our database",
    });
  } else {
    const cryptedPassword = await bcrypt.hash(req.body.password, 10);
    const fileName = () => {
      if (req.file === undefined) {
        return "default.png";
      }
      return req.file.filename;
    };
    const data = await userModel.create({
      email: req.body.email,
      username: req.body.username,
      password: cryptedPassword,
      photo: fileName(),
    });
    await data.save();
    res.json({
      message: "User created",
    });
  }
});

app.get("/auth", verifyJWT, (req, res) => {
  res.json({
    isLoggedIn: true,
    id: req.user.id,
    username: req.user.username,
    photo: req.user.photo,
  });
});

const postRouter = require("./src/router/post");

app.use("/post", postRouter);

app.listen(4000);
