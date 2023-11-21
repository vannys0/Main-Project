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

// Sign up
router.post("/register", (req, res) => {
  const values = [
    req.body.id,
    req.body.fullname,
    req.body.email,
    req.body.password,
    req.body.user_type,
  ];
  const sql =
    "INSERT INTO user (`id`, `name`, `email`, `password`, `user_type`) VALUES (?)";
  db.query(sql, [values], (err, result) => {
    if (err) {
      return err;
    }
    return res.json(result);
  });
});

// Clients.jsx
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

router.post(
  "/upload-profile-picture/:id",
  upload.single("file"),
  (req, res) => {
    const id = req.params.id;
    const file = req.file; // Access the uploaded file from req.file

    if (!file) {
      return res.status(400).send("No file uploaded.");
    }

    db.query(
      "UPDATE user SET `profile` = ? WHERE `id` = ?",
      [file.filename, id], // Assuming 'file.filename' contains the file name
      (err, result) => {
        if (err) return res.status(500).send(err);
        else return res.status(200).send(result);
      }
    );
  }
);

module.exports = router;
