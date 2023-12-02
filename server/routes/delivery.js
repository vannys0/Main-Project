const express = require("express");
const router = express.Router();
const db = require("../config/db");

router.put("/delivered", (req, res) => {
  const { id, adoption_id, transaction_date, transaction_status } = req.body;

  const values = [id, adoption_id, transaction_date, transaction_status];

  db.query(
    "INSERT INTO transaction (`id`, `adoption_id`, `transaction_date`, `transaction_status`) VALUES (?, ?, ?, ?)",
    values,
    (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).send(err);
      }
      console.log("Inserted into database:", result);
      return res.status(200).send("Inserted successfully");
    }
  );
});

module.exports = router;
