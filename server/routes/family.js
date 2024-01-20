const express = require("express");
const router = express.Router();
const db = require("../config/db");


router.get("/family-rabbits", async  (req, res) => {
    const id = req.params.id;
     await db.query("SELECT * FROM rabbit", [id], (err, results) => {
      if (err) {
        console.error("Error fetching :", err);
        res.status(500).json({ error: "Internal Server Error" });
        return;
      }
      return res.json(results);
    });
});


router.get("/family-breeding", async  (req, res) => {
    const id = req.params.id;
    await db.query("SELECT * FROM breeding_pair", [id], (err, results) => {
      if (err) {
        console.error("Error fetching :", err);
        res.status(500).json({ error: "Internal Server Error" });
        return;
      }
      return res.json(results);
    });
});



module.exports = router;
