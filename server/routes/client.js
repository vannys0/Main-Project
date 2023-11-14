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

router.post("/signup", (req, res) => {
  const email = req.body.email;
  const checkEmailQuery = "SELECT * FROM user WHERE email = ?";
  const insertUserQuery =
    "INSERT INTO user (`id`, `name`, `email`, `password`, `user_type`) VALUES (?)";
  const values = [
    req.body.id,
    req.body.name,
    email,
    req.body.password,
    req.body.user_type,
  ];

  // Check if the email already exists
  db.query(checkEmailQuery, [email], (err, result) => {
    if (err) {
      return res.status(500).json("Error");
    }

    if (result.length > 0) {
      // Email already exists, return an error response
      return res.status(400).json("Email already exists");
    } else {
      // Email is unique, insert the new user
      db.query(insertUserQuery, [values], (err, data) => {
        if (err) {
          return res.status(500).json("Error");
        }
        return res.json(data);
      });
    }
  });
});

router.post("/login-client", (req, res) => {
  const sql =
    "SELECT * FROM user WHERE `email` = ? AND `password` = ? AND user_type='client'";
  db.query(sql, [req.body.email, req.body.password], (err, data) => {
    if (err) {
      return res.json({ Message: "Error" });
    }
    if (data.length > 0) {
      // User is authenticated, generate a JWT token

      const result = JSON.parse(JSON.stringify(data));
      const o = result[0];
      const user = {
        id: o.id,
        name: o.name,
        email: o.email,
        Message: "Success",
      };

      // const token = jwt.sign(user, secretKey, { expiresIn: "1h" }); // Token expires in 1 hour
      return res.json(user);
    }
    return res.json({ Message: "Failed" });
  });
});

// Protected route example
router.get("/protected", verifyToken, (req, res) => {
  res.json({ message: "This is a protected route", user: req.user });
});

// Middleware function to verify the JWT token
function verifyToken(req, res, next) {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Invalid token" });
    }

    req.user = decoded;
    next();
  });
}

// Adopt
router.get("/adopt", (req, res) => {
  db.query(
    "SELECT * FROM rabbit WHERE rehome_status = 'Rehome'",
    (err, results) => {
      if (err) {
        console.error("Error fetching rabbits:", err);
        res.status(500).json({ error: "Internal Server Error" });
        return;
      }
      res.json(results);
    }
  );
});

// Rabbit Data
router.get("/rabbitdata/:id", (req, res) => {
  const sql = "SELECT * FROM rabbit WHERE id = ?";
  const id = req.params.id;
  db.query(sql, [id], (err, result) => {
    if (err) return res.json({ Message: "Error" });
    return res.json(result);
  });
});

//Adopt Form
router.post(
  "/rabbitdata/:id/adopt-form",
  upload.single("image"),
  (req, res) => {
    console.log("adopt-form");
    console.log(req.file);
    const result = JSON.parse(req.body.values);
    console.log(result);

    const values = [
      result.id,
      result.rabbit_id,
      result.date,
      result.fullname,
      result.email,
      result.phone,
      result.province.provDesc,
      result.city.citymunDesc,
      result.barangay,
      result.reason,
      result.otherpets,
      result.user_id,
      result.transaction_status,
      req.file.filename,
      result.serviceoption,
      result.price,
      result.mop,
      result.agprod,
      result.agprodprice
    ];

    const sql =
      "INSERT INTO adoption (`id`, `rabbit_id`, `adoption_date`, `fullname`, `email`, `phone`, `province`, `city`, `barangay`, `reason_for_adoption`, `other_pets`, `user_id`, `transaction_status`, `home_environment_image_path`, `service_option`, `price`, `mode_of_payment`, `agriculture_product`, `agriculture_product_price`) VALUES (?)";
    db.query(sql, [values], (error, results) => {
      if (error) {
        console.log(error);
        return res.json("Error");
      }
      console.log("Successfully inserted.");
      return res.json(results);
    });
  }
);

// routerlication list
router.get("/myrouterlication", (req, res) => {
  db.query("SELECT * FROM adoption", (err, result) => {
    if (err) {
      console.log(err);
      res.json(err);
      return;
    }
    return res.json(result);
  });
});

// Delete routerlication
router.delete("/delete_routerlication/:id", (req, res) => {
  const id = req.params.id;
  db.query("DELETE FROM adoption WHERE id = ?", [id], (err, result) => {
    if (err) {
      console.log(err);
    }
    res.json(result);
  });
});

router.get("/myapplication/:id", (req, res) => {
  const id = req.params.id;
  db.query("SELECT * FROM adoption WHERE user_id = ?", [id], (err, results) => {
    if (err) {
      console.error("Error fetching :", err);
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }

    return res.json(results);
  });
});

router.delete("/delete_application/:id", (req, res) => {
  const id = req.params.id;
  db.query("DELETE FROM adoption WHERE id = ?", [id], (err, result) => {
    if (err) {
      console.log(err);
    }
    res.json(result);
  });
});

module.exports = router;
