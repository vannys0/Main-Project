const express = require("express");
const router = express.Router();
const db = require("../config/db");

router.get("/userCount", (req, res) => {
  db.query("SELECT count(*) as userCount FROM user", (err, results) => {
    if (err) {
      console.error("Error fetching :", err);
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }
    return res.json(results);
  });
});

router.get("/requestCount", (req, res) => {
  db.query("SELECT count(*) as requestCount FROM adoption", (err, results) => {
    if (err) {
      console.error("Error fetching :", err);
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }
    return res.json(results);
  });
});
router.get("/userCount", (req, res) => {
  db.query("SELECT count(*) as userCount FROM user", (err, results) => {
    if (err) {
      console.error("Error fetching :", err);
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }
    return res.json(results);
  });
});

router.get("/pending-adoption", (req, res) => {
  db.query("SELECT count(*) as pending FROM adoption where transaction_status = 'PENDING'", (err, results) => {
    if (err) {
      console.error("Error fetching :", err);
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }
    return res.json(results);
  });
});

router.get("/countRabbits", (req, res) => {
  db.query("SELECT count(*) as rabbitCount FROM rabbit", (err, results) => {
    if (err) {
      console.error("Error fetching :", err);
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }
    return res.json(results);
  });
});

router.get("/pairCount", (req, res) => {
  db.query("SELECT count(*) as pairCount FROM breeding_pair", (err, results) => {
    if (err) {
      console.error("Error fetching :", err);
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }
    return res.json(results);
  });
});

router.get("/approveCount", (req, res) => {
  db.query("SELECT count(*) as approveCount FROM adoption WHERE transaction_status = 'APPROVE'", (err, results) => {
    if (err) {
      console.error("Error fetching :", err);
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }
    return res.json(results);
  });
});

module.exports = router;
