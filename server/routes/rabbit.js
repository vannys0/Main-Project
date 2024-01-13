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

router.post("/add-rabbit", upload.array("files", 5), (req, res) => {
  const result = JSON.parse(req.body.values);
  console.log(result);
  const imagePaths = req.files.map((file) => file.filename).join();
  const sql =
    "INSERT INTO rabbit (`id`, `name`, `date_of_birth`, `sex`, `rabbit_type`, `color`, `breed_type`,  `weight`, `image_path`, `breeding_pair_id`, `date_added`) VALUES (?)";
  let randomID = Math.floor(100000 + Math.random() * 900000);
  const id = `rabbit${randomID}`;
  const dateAdded = new Date()
  const values = [
    id,
    result.name,
    result.dateOfBirth,
    result.sex,
    result.type,
    result.color,
    result.breed,
    result.weight,
    imagePaths,
    result.breeding_pair_id,
    dateAdded
  ];

  db.query(sql, [values], (err, data) => {
    if (err) {
      console.log(err);
      return res.json("Error");
    }
    return res.json(data);
  });
});

router.post("/multi", upload.array("files", 5), (req, res) => {
  const files = req.files;
  const result = JSON.parse(req.body.values);
  const imagePaths = req.files.map((file) => file.filename);
  const values = [result.fname, result.lname, JSON.stringify(imagePaths)];
  const sql = "INSERT INTO try (`fname`, `lname`, `try_image`) VALUES (?)";
  if (Array.isArray(files) && files.length > 0) {
    const fileNames = files.map((file) => file.originalname);
    res.json({ files: fileNames });
  } else {
    res.status(400).send("No files were uploaded");
  }
  db.query(sql, [values], (err, data) => {
    if (err) {
      console.log(err);
      return res.json("Error");
    }
    return res.json(data);
  });
});

router.get("/rabbits", (req, res) => {
  db.query(
    "SELECT * FROM rabbit WHERE is_adopted = false ORDER BY rehome_status, date_added",
    (err, results) => {
      if (err) {
        console.error("Error fetching rabbit:", err);
        res.status(500).json({ error: "Internal Server Error" });
        return;
      }
      return res.json(results);
    }
  );
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

router.put("/update-rabbit/:id", (req, res) => {
  const sql =
    "UPDATE rabbit SET `name` = ?, `date_of_birth` = ?, `sex` = ?, `breed_type` = ?, `color` = ?, `rabbit_type` = ?, `weight` = ? WHERE id = ?";
  const values = [
    req.body.name,
    req.body.date_of_birth,
    req.body.sex,
    req.body.breed_type,
    req.body.color,
    req.body.rabbit_type,
    req.body.weight,
  ];
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
  const sql = "UPDATE rabbit SET `rehome_status` = ?, `price` = ? WHERE id = ?";
  const values = [req.body.rehome_status, req.body.price];
  const id = req.params.id;

  db.query(sql, [...values, id], (err, data) => {
    if (err) {
      return res.json("Error");
    }
    return res.json(data);
  });
});

router.delete("/delete-rabbit/:id", (req, res) => {
  const id = req.params.id;
  db.query("DELETE FROM rabbit WHERE id = ?", [id], (err, result) => {
    if (err) {
      console.log(err);
    }
    res.json(result);
  });
});

router.get("/get_sex", (req, res) => {
  const id = req.query.id;
  db.query("SELECT * FROM rabbit WHERE id = ?", [id], (err, results) => {
    if (err) {
      console.error("Error fetching rabbit:", err);
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }
    return res.json(results);
  });
});

router.get("/rabbit/:id", (req, res) => {
  const id = req.params.id;
  db.query("SELECT * FROM rabbit WHERE id = ?", [id], (err, results) => {
    if (err) {
      return err;
    }
    return res.json(results);
  });
});

router.get("/scan-rabbit", (req, res) => {
  const id = req.query.id;
  db.query("SELECT * FROM rabbit WHERE id = ?", [id], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    return res.json(results);
  });
});

module.exports = router;
