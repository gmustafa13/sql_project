/** @format */

const express = require("express");
const passport = require('passport')
const route = express.Router();
const userModel = require("../model/User");

route.post("/user/save", async (req, res) => {
  try {
    let userData = await userModel.saveData(req.body);
    if (userData) {
      res.send(userData);
    }
  } catch (error) {
    res.json(error);
  }
});
route.post("/user/getOne", async (req, res) => {
  try {
    let userData = await userModel.getOne(req.body);
    if (userData) {
      res.json(userData);
    }
  } catch (error) {
    res.json(error);
  }
});
route.patch("/user/update", async (req, res) => {
  console.log("req.body", req.body);
  try {
    let updatedData = await userModel.updateOne(req.body);
    if (updatedData) {
      res.json(updatedData);
    }
  } catch (error) {
    res.json(error);
  }
});
route.get("/user/getAll", async (req, res) => {
  try {
    let getAllData = await userModel.getAll();
    if (getAllData) {
      res.json(getAllData);
    }
  } catch (error) {
    res.json(error);
  }
});
route.post("/login", passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login',
  failureFlash: true
}));

route.post("/register", async (req, res) => {
  console.log("req.body", req.body)
  try {
    let userExist = await userModel.getOne({
      email: req.body.email
    });
    if (userExist) {
      res.send({
        massage: "already exist"
      });
    } else {
      let userData = await userModel.saveData(req.body);
      if (userData) {
        res.redirect("/login");
      }
    }
  } catch (error) {
    res.redirect("/signup");
  }
});

module.exports = route;