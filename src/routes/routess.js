const express = require("express");
const { Router } = express;
const router = Router();
const actions = require("../controllers/controllers.js");


router.get("/", (req, res) => {
  res.send(actions.getAll());
});

router.get("/:id", (req, res) => {
  const {id} = req.params;
  res.send(actions.getOne(id));
});

router.post("/", (req, res) => {
  res.send(actions.add(req.body));
});

router.put("/:id", (req, res) => {
  const {id} = req.params
  const body = req.body
  res.send(actions.update(id, body));
});

router.delete("/:id", (req, res) => {
  res.send(actions.delete(req.params.id));
})

module.exports = router; 