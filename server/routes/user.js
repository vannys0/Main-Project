const express = require("express");
const router = express.Router();
const db = require("../config/db");

router.get("/users", (req, res) => {
  db.query("SELECT * FROM user", (err, results) => {
    if (err) {
      console.error("Error fetching :", err);
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }
    return res.json(results);
  });
});

router.post("/login", (req, res) => {
  console.log(req.body);
  const email = req.body.LoginUserName;
  const password = req.body.LoginPassword;
  const values = [req.body.LoginUserName, req.body.LoginPassword];
  db.query(
    "SELECT * FROM user where email = ? AND password = ? AND user_type='admin'",
    [email, password],
    (err, results) => {
      if (err) {
        return err;
      }
      return res.json(results);
    }
  );
});

// Clients
router.get("/clients", (req, res) => {
  db.query("SELECT * FROM user ORDER BY user_type", (err, results) => {
    if (err) {
      console.error("Error fetching :", err);
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }
    return res.json(results);
  });
});

router.get("/client-profile/:id", (req, res) => {
  const id = req.params.id;
  db.query("SELECT * FROM user WHERE id = ?", [id], (err, results) => {
    if (err) {
      console.error("Error fetching :", err);
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }
    return res.json(results);
  });
});

module.exports = router;
