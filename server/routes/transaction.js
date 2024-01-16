const express = require("express");
const router = express.Router();
const db = require("../config/db");

router.get("/transactions", (err, res) => {
  let sql = `SELECT * FROM transaction`;
  db.query(sql, (err, data) => {
    if (err) {
      return res.json("Error");
    } else {
      return res.json(data);
    }
  });
});

module.exports = router;
