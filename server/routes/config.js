const express = require("express");
const router = express.Router();
const db = require("../config/db");

// router.post("/login", (req, res) => {
//   console.log(req.body);
//   const email = req.body.LoginUserName;
//   const password = req.body.LoginPassword;
//   const values = [req.body.LoginUserName, req.body.LoginPassword];
//   db.query(
//     "SELECT * FROM user where email = ? AND password = ? AND user_type='admin'",
//     [email, password],
//     (err, results) => {
//       if (err) {
//         return err;
//       }
//       return res.json(results);
//     }
//   );
// });

router.get("/config/:name", (req, res) => {
  const name = req.params.name;
  db.query("SELECT * FROM config WHERE name = ?", [name], (err, results) => {
    if (err) {
      console.error("Error fetching :", err);
      return res;
    }
    return res.json(results);
  });
});

module.exports = router;
