import express from "express";
import Users from "../models/userModels";

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

router.post("/", async (req, res) => {
  const data = req.body;
  // console.log(req.body);
  const newPost = new Users(data);

  try {
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    console.log(error);
    res.status(409).send("Some thing went wrong in creating new Address");
  }
});

export default router;
