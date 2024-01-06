const express = require("express");
const router = express.Router();
const db = require("../config/db");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage });

router.put("/delivered", upload.single("file"), (req, res) => {
  let randomID = Math.floor(100000 + Math.random() * 900000);
  const id = `transaction${randomID}`;
  const { adoption_id, transaction_date, transaction_status } = req.body;
  const proofPicturePath = req.file ? req.file.originalname : null;

  const values = [
    id,
    adoption_id,
    transaction_date,
    transaction_status,
    proofPicturePath,
  ];

  db.query(
    "INSERT INTO transaction (`id`, `adoption_id`, `transaction_date`, `transaction_status`, `proof_picture_path`) VALUES (?)",
    [values],
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
              return res.status(500).send(err);
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
