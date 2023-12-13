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
      } else {
        const is_adopted = true;
        const rabbit_id = req.body.rabbit_id;

        db.query(
          "UPDATE rabbit SET is_adopted = ? WHERE id = ?",
          [is_adopted, rabbit_id],
          (err, result) => {
            if (err) {
              return res.send(err);
            }

            console.log("Inserted into database:", result);
            return res
              .status(200)
              .json({ message: "Transaction updated successfully!", result });
          }
        );
      }
    }
  );
});

module.exports = router;
