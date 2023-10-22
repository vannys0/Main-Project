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

//PostMapping
router.post("/add-rabbit", upload.single("image"), (req, res) => {
  console.log("add-rabbit");
  console.log(req.file);
  const result = JSON.parse(req.body.values);
  console.log(result);
  console.log(req.file.filename);

  const sql =
    "INSERT INTO rabbit (`name`, `age`, `sex`, `weight`, `image_path`) VALUES (?)";
  const values = [
    result.name,
    result.age,
    result.sex,
    result.weight,
    req.file.filename,
  ];

  db.query(sql, [values], (err, data) => {
    if (err) {
      console.log(err);
      return res.json("Error");
    }
    return res.json(data);
  });
});

//GetMapping
router.get("/rabbit", (req, res) => {
  db.query("SELECT * FROM rabbit where id = 1", (err, results) => {
    if (err) {
      console.error("Error fetching rabbit:", err);
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }
    return res.json(results);
  });
});

router.get("/rabbits", (req, res) => {
  db.query("SELECT * FROM rabbit", (err, results) => {
    if (err) {
      console.error("Error fetching rabbit:", err);
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }
    return res.json(results);
  });
});

// Get male rabbit
router.get("/rabbit/male", (req, res) => {
  db.query(`SELECT * FROM rabbit WHERE sex = "male"`, (err, results) => {
    if (err) {
      console.error("Error fetching rabbit:", err);
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }
    return res.json(results);
  });
});

// Get female rabbit
router.get("/rabbit/female", (req, res) => {
  db.query(`SELECT * FROM rabbit WHERE sex = "female"`, (err, results) => {
    if (err) {
      console.error("Error fetching rabbit:", err);
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }
    return res.json(results);
  });
});

router.get("/edit-rabbit/:id", (req, res) => {
  const id = req.params.id;
  db.query("SELECT * FROM rabbit WHERE id = ?", [id], (err, results) => {
    if (err) {
      console.error("Error fetching rabbit:", err);
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }
    return res.json(results);
  });
});

//PutMapping
router.put("/update-rabbit/:id", (req, res) => {
  const sql =
    "UPDATE rabbit SET `name` = ?, `age` = ?, `sex` = ?, `weight` = ? WHERE id = ?";
  const values = [req.body.name, req.body.age, req.body.sex, req.body.weight];
  const id = req.params.id;

  db.query(sql, [...values, id], (err, data) => {
    if (err) {
      return res.json("Error");
    }
    return res.json(data);
  });
});

router.put("/update-rehome/:id", (req, res) => {
  console.log(req.body);
  const sql = "UPDATE rabbit SET `rehome` = ? WHERE id = ?";
  const values = [req.body.rehome];
  const id = req.params.id;

  db.query(sql, [...values, id], (err, data) => {
    if (err) {
      return res.json("Error");
    }
    return res.json(data);
  });
});

//DeleteMapping
router.delete("/delete-rabbit/:id", (req, res) => {
  const id = req.params.id;
  db.query("DELETE FROM rabbit WHERE id = ?", [id], (err, result) => {
    if (err) {
      console.log(err);
    }
    res.json(result);
  });
});

router.post("/upload-file", upload.single("image"), (req, res) => {
  console.log(req.file.filename);
  // const sql = "INSERT INTO upload (`image`) VALUES (?)";
  // const values = [req.file.filename];

  // db.query(sql, [values], (err, data) => {
  //   if (err) {
  //     return res.json("Error");
  //   }
  //   return res.json(data);
  // });
});

module.exports = router;
