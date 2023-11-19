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
router.post("/add-rabbit", upload.array("files", 5), (req, res) => {
  const result = JSON.parse(req.body.values);
  console.log(result);
  const imagePaths = req.files.map((file) => file.filename).join();
  const sql =
    "INSERT INTO rabbit (`id`, `name`, `date_of_birth`, `sex`, `rabbit_type`, `color`, `breed_type`,  `weight`, `image_path`) VALUES (?)";
  const values = [
    result.id,
    result.name,
    result.dateOfBirth,
    result.sex,
    result.type,
    result.color,
    result.breed,
    result.weight,
    imagePaths,
  ];

  db.query(sql, [values], (err, data) => {
    if (err) {
      console.log(err);
      return res.json("Error");
    }
    return res.json(data);
  });
});

// Try
router.post("/file", upload.single("file"), (req, res) => {
  const file = req.file;
  const value = req.files.filename;
  const sql = "INSERT INTO try (`try_image`) VALUES (?)";
  if (file) {
    res.json(file);
  } else {
    res.send("error");
  }
  db.query(sql, [value], (err, data) => {
    if (err) {
      console.log(err);
      return res.json("Error");
    }
    return res.json(data);
  });
});
// Multiple
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
  db.query("SELECT * FROM rabbit ORDER BY name", (err, results) => {
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
