const express = require("express");
const router = express.Router();
const db = require("../config/db");

router.get("/userCount", (req, res) => {
  db.query(
    "SELECT count(*) as userCount FROM user WHERE user_type='client'",
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
  db.query(
    "SELECT count(*) as pending FROM adoption where adoption_status = 'PENDING'",
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
  db.query(
    "SELECT count(*) as pairCount FROM breeding_pair",
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

router.get("/approveCount", (req, res) => {
  db.query(
    "SELECT count(*) as approveCount FROM adoption WHERE adoption_status = 'Approved'",
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

router.get("/recent-rabbit", (req, res) => {
  db.query("SELECT * FROM rabbit Limit 5", (err, results) => {
    if (err) {
      console.error("Error fetching rabbit:", err);
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }
    return res.json(results);
  });
});

// Clients
router.get("/recent-adoption", (req, res) => {
  db.query(
    "SELECT id, adoption_date, adoption_status FROM adoption ORDER BY adoption_date DESC LIMIT 5",
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

module.exports = router;
