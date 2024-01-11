const express = require("express");
const router = express.Router();
const db = require("../config/db");

router.get("/breeding", (req, res) => {
  db.query("SELECT * FROM breeding_pair", (err, results) => {
    if (err) {
      console.error("Error fetching rabbit:", err);
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }
    return res.json(results);
  });
});

router.post("/pair-rabbit", (req, res) => {
  const checkPairSql =
    "SELECT * FROM breeding_pair WHERE buck_id = ? OR doe_id = ?";
  const checkPairValues = [
    req.body.male_rabbit_id,
    req.body.female_rabbit_id,
    req.body.female_rabbit_id,
    req.body.male_rabbit_id,
  ];

  db.query(checkPairSql, checkPairValues, (checkErr, checkData) => {
    if (checkErr) {
      return res.json("Error");
    }

    if (checkData && checkData.length > 0) {
      return res.json("Pair already exists");
    }

    const insertPairSql =
      "INSERT INTO breeding_pair (`id`, `buck_id`, `doe_id`, `note`, `pairing_date`, `expected_due_date` ) VALUES (?)";
    let randomID = Math.floor(100000 + Math.random() * 900000);
    const id = `pair${randomID}`;
    const insertValues = [
      id,
      req.body.male_rabbit_id,
      req.body.female_rabbit_id,
      req.body.note,
      req.body.date,
      req.body.expected_due,
    ];

    db.query(insertPairSql, [insertValues], (insertErr, insertData) => {
      if (insertErr) {
        return res.json("Error");
      }
      return res.json(insertData);
    });
  });
});

router.delete("/cancel_breeding/:id", (req, res) => {
  const id = req.params.id;
  db.query("DELETE FROM breeding_pair WHERE id = ?", [id], (err, result) => {
    if (err) {
      console.log(err);
    }
    res.json(result);
  });
});

module.exports = router;
