const express = require("express");
const router = express.Router();
const db = require("../config/db");

router.get("/config/:name", (req, res) => {
  const name = req.params.name;
  db.query("SELECT * FROM config WHERE name = ?", [name], (err, results) => {
    if (err) {
      console.error("Error fetching :", err);
      return res;
    }
    return res.json(results);
  });
});

module.exports = router;
