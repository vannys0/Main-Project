const express = require("express");
const router = express.Router();
const db = require("../config/db");

router.get("/sales", (req, res) => {
  db.query("SELECT * FROM rabbit_sales", (err, results) => {
    if (err) {
      console.error("Error fetching :", err);
      return err;
    }
    return res.json(results);
  });
});

router.get("/chart-adoption", (req, res) => {
  const currentYear = new Date().getFullYear();
  db.query(
    "SELECT YEAR(adoption_date) AS year, MONTH(adoption_date) AS month, COUNT(*) AS count_adoption FROM adoption WHERE YEAR(adoption_date) = ?  GROUP BY year, month",
    [currentYear],
    (err, results) => {
      if (err) {
        console.error("Error fetching :", err);
        return err;
      }

      const m = new Map();
      //initilized m
      for (let i = 0; i < 12; i++) {
        const o = {
          name: new Date(currentYear, i).toLocaleString("en-US", {
            year: "numeric",
            month: "short",
          }),
          Adopt: 0,
        };
        m.set(o.name, o);
      }

      //update m
      results.forEach((e) => {
        const o = {
          name: new Date(e.year, e.month - 1).toLocaleString("en-US", {
            year: "numeric",
            month: "short",
          }),
          Adopt: e.count_adoption,
        };
        m.set(o.name, o);
      });
      return res.json(Array.from(m.values()));
    }
  );
});

router.get("/chart-monthly-sales", (req, res) => {
  const currentYear = new Date().getFullYear();
  db.query(
    "SELECT YEAR(transaction_date) AS year, MONTH(transaction_date) AS month, SUM(amount) AS sum FROM rabbit_sales WHERE YEAR(transaction_date) = ?  GROUP BY year, month",
    [currentYear],
    (err, results) => {
      if (err) {
        console.error("Error fetching :", err);
        return err;
      }

      const m = new Map();
      //initilized m
      for (let i = 0; i < 12; i++) {
        const o = {
          name: new Date(currentYear, i).toLocaleString("en-US", {
            year: "numeric",
            month: "short",
          }),
          n: 0,
          Sales: 0,
        };
        m.set(o.name, o);
      }

      //update m
      results.forEach((e) => {
        const o = {
          name: new Date(e.year, e.month - 1).toLocaleString("en-US", {
            year: "numeric",
            month: "short",
          }),
          n: e.sum,
          Sales: e.sum,
        };
        m.set(o.name, o);
      });
      return res.json(Array.from(m.values()));
    }
  );
});

module.exports = router;
