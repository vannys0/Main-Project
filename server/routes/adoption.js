const express = require("express");
const router = express.Router();
const db = require("../config/db");

router.get("/adoption", (req, res) => {
  db.query("SELECT * FROM adoption where id = 8", (err, results) => {
    if (err) {
      console.error("Error fetching rabbit:", err);
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }
    return res.json(results);
  });
});

// All Adoption Request
router.get("/adoptions", (req, res) => {
  db.query(
    "SELECT a.*, u.name, u.email FROM adoption AS a LEFT JOIN user AS u ON a.user_id = u.id ORDER BY adoption_status DESC, adoption_date DESC",
    (err, results) => {
      if (err) {
        console.error("Error fetching :", err);
        res.status(500).json({ error: "Internal Server Error" });
        return;
      }
      return res.json(results);
    }
  );
});

// Adoption Request Deliver Option
router.get("/adoptions-deliver", (req, res) => {
  db.query(
    "SELECT a.*, u.name AS user_name FROM adoption AS a LEFT JOIN user AS u ON a.user_id = u.id WHERE a.id NOT IN (SELECT adoption_id FROM transaction) ORDER BY delivery_status DESC",
    (err, results) => {
      if (err) {
        console.error("Error fetching:", err);
        res.status(500).json({ error: "Internal Server Error" });
        return;
      }
      return res.json(results);
    }
  );
});

// Approve Adoption
router.put("/approve-adoption/:id", (req, res) => {
  const sql = "UPDATE adoption SET `adoption_status` = ? WHERE id = ?";
  const values = ["Approved"];
  const id = req.params.id;

  db.query(sql, [...values, id], (err, data) => {
    if (err) {
      return res.json("Error");
    }
    return res.json(data);
  });
});

// Approver Deliver
router.put("/approve-delivery/:id", (req, res) => {
  const sql = "UPDATE adoption SET `delivery_status` = ? WHERE id = ?";
  const values = ["Approved"];
  const id = req.params.id;

  db.query(sql, [...values, id], (err, data) => {
    if (err) {
      return res.json("Error");
    }
    return res.json(data);
  });
});

router.put("/decline-adoption/:id", (req, res) => {
  const sql =
    "UPDATE adoption SET `adoption_status` = ?, `comment` = ?  WHERE id = ?";
  const values = ["Declined"];
  const id = req.params.id;
  const comment = req.body.comment;
  console.log(comment);

  db.query(sql, [...values, comment, id], (err, data) => {
    if (err) {
      return res.json("Error");
    }
    return res.json(data);
  });
});

module.exports = router;
