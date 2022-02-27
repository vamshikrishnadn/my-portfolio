import express from "express";
import Users from "../models/userModels";

const bcrypt = require("bcrypt");
const jws = require("jsonwebtoken");
const secret = "asfasfasfasdfasdfasfsadfdsa";

const router = express.Router();

router.get("/", async (req, res) => {
  const testimonial = await Users.find();
  try {
    res.status(200).send(testimonial);
  } catch (error) {
    console.log(error);
    res.status(409).send("Some thing went wrong in fetching Address");
  }
});

router.post("/signup", async (req, res) => {
  const { email, password, name, role, image, coverImage, about } = req.body;

  try {
    const existingUser = await Users.findOne({ email });

    if (existingUser) {
      return res
        .status(400)
        .json(`User Already Exist With this email: ${email}`);
    }
    const user = await new Users({
      email,
      password,
      name,
      role,
      image,
      coverImage,
      about,
    });
    const salt = await bcrypt.genSalt(12);
    user.password = await bcrypt.hash(password, salt);
    user.save();
    const token = jws.sign(
      { email: user.email, password: user.password },
      secret
    );
    res.status(201).json({
      token,
      email,
      password,
      name,
      role,
      image,
      coverImage,
      about,
    });
  } catch (error) {
    console.log(error);
    res.status(409).send("Some thing went wong in creating new user");
  }
});

router.post("/signin", async (req, res) => {
  console.log("calling");
  const { email, password, name, role, image, coverImage, about } = req.body;
  try {
    const existingUser = await Users.findOne({ email, name });
    if (!existingUser) {
      return res
        .status(400)
        .json(`User Does Not Exist With this email: ${email}`);
    }
    const passwordCompare = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!passwordCompare) {
      return res.status(400).send("Password Incorrect.");
    }
    const token = jws.sign(
      { email: existingUser.email, password: existingUser.password },
      secret
    );
    // res.status(200).send({ token });
    res
      .status(200)
      .cookie("portfolio-token", token)
      .send({ token, existingUser, image });
  } catch (error) {
    console.log(error);
    res.status(409).send("Some thing went wong in Signup user");
  }
});

router.patch("/:id", async (req, res) => {
  const id = req.params.id;
  const updateAddress = req.body;

  try {
    await Users.findByIdAndUpdate(id, updateAddress, {
      new: true,
    });
    res.json(updateAddress);
  } catch (error) {
    console.log(error);
    res.status(400).send("Some thing went wrong in updating post");
  }
});

router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    await Users.findByIdAndRemove(id);
    res.send("User Deleted Successfully");
  } catch (error) {
    console.log(error);
  }
});

router.get("/:id", async (req, res) => {
  {
    const post = req.params.id;
    const getPost = await Users.findById(post);

    try {
      res.status(200).send(getPost);
    } catch (error) {
      console.log(error);
      res.status(409).send("Some thing went wrong in fetching Product");
    }
  }
});

export default router;
