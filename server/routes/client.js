const express = require("express");
const router = express.Router();
const db = require("../config/db");
const multer = require("multer");
const bcrypt = require('bcrypt')
const saltRounds = 10;

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage });

const EMAIL_FROM = "noreply.movaflex@gmail.com";

const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: EMAIL_FROM,
    pass: "nbnn ellt jxck zlbt",
  },
  tls: {
    rejectUnauthorized: false,
  },
});

router.post("/signup", (req, res) => {
  const { email, subject, name, password, user_type } = req.body;
  const otp = Math.floor(100000 + Math.random() * 900000);

  const mailOptions = {
    from: EMAIL_FROM,
    to: email,
    subject: `Account verification code: ${otp}`,
    html: `<div>
    <p>Welcome to E-Leporidae</p>
    <p>Please enter the code below to complete the registration.</p>
    <p>Thank you!</p>
    <h2>${otp}</h2>
  </div>`,
  };

  const checkEmailQuery = "SELECT * FROM user WHERE email = ?";
  db.query(checkEmailQuery, [email], (err, result) => {
    if (err) {
      return res.status(500).json("Error checking email");
    }
    if (result.length > 0) {
      return res.status(400).json("Email already exists");
    } else {
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log(error);
          return res.status(500).json("Error sending email verification");
        } else {
          console.log("Email sent: " + info.response);
          const insertUserQuery =
            "INSERT INTO user (`id`, `name`, `email`, `password`, `user_type`, `otp`, `is_verified`) VALUES (?, ?, ?, ?, ?, ?, ?)";
          let randomID = Math.floor(100000 + Math.random() * 900000);
          const id = `user${randomID}`;
          const hashPassword = bcrypt.hashSync(password, saltRounds); //how to hash password
          const values = [id, name, email, hashPassword, user_type, otp, false];
          db.query(insertUserQuery, values, (err, data) => {
            if (err) {
              return res.status(500).json("Error creating user");
            }
            return res.json(data);
          });
        }
      });
    }
  });
});

const getStoredVerificationCode = (verificationCode) => {
  return new Promise((resolve, reject) => {
    db.query(
      "SELECT * FROM user WHERE otp = ?",
      [verificationCode],
      (error, results) => {
        if (error) {
          reject(error);
        } else {
          if (results.length > 0) {
            resolve(results[0]);
          } else {
            reject(new Error("Verification code not found"));
          }
        }
      }
    );
  });
};

router.post("/verify-otp", async (req, res) => {
  const { verificationCode } = req.body;
  try {
    const userWithVerificationCode = await getStoredVerificationCode(
      verificationCode
    );
    const userId = userWithVerificationCode.id;
    db.query(
      "UPDATE user SET is_verified = true WHERE id = ?",
      [userId],
      (error, result) => {
        if (error) {
          return res
            .status(500)
            .json("Error updating user verification status");
        }
        userWithVerificationCode.is_verified = 1;
        return res.json(userWithVerificationCode);
      }
    );
  } catch (error) {
    return res.status(404).json(error.message);
  }
});

router.post("/login-client", (req, res) => {
  const sql =
    "SELECT * FROM user WHERE `email` = ? AND user_type='client' AND is_verified = true";
  db.query(sql, [req.body.email], (err, data) => {
    if (err) {
      return res.json({ Message: "Error" });
    }
    if (data.length > 0 && data[0].is_verified) {
      const result = JSON.parse(JSON.stringify(data));
      const o = result[0];
      const user = {
        id: o.id,
        name: o.name,
        email: o.email,
        Message: "Success",
      };

      if(bcrypt.compareSync(req.body.password, o.password)){
        return res.json(user);
      }else{
        return res.json({ Message: "Failed" });
      }

    }
    return res.json({ Message: "Failed" });
  });
});

router.get("/protected", verifyToken, (req, res) => {
  res.json({ message: "This is a protected route", user: req.user });
});

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

router.post("/send_us_message", (req, res) => {
  const email = req.body.email;
  const subject = req.body.subject;
  const message = req.body.message;
  const emailTo = "leonardonogra6@gmail.com";

  const emailOptions = {
    from: email,
    to: emailTo,
    subject: "Inquery",
    html: `<div>
      <p>Hi <b>Admin</b>,</p>
      <p>You've received a message from ${email}</p>
      <p><b>Subject:</b> ${subject}</p>
      <p><b>Message:</b> ${message}</p>
      <p>Thank you!</p>
      <p>E-Leporidae</p>
    </div>`,
  };

  transporter.sendMail(emailOptions, (error, info) => {
    if (error) {
      console.log(error);
      return res.status(500).json("Error sending confirmation email");
    } else {
      console.log("Confirmation Email sent: " + info.response);
      console.log("Successfully sent.");
      return res.json({ message: "Email sent successfully" });
    }
  });
});

router.get("/adoption-status/:rabbitId", (req, res) => {
  const rabbitId = req.params.rabbitId;

  db.query(
    "SELECT adoption_status FROM adoption WHERE rabbit_id = ?",
    [rabbitId],
    (err, results) => {
      if (err) {
        console.error("Error fetching adoption status:", err);
        res.status(500).json({ error: "Internal Server Error" });
        return;
      }

      if (results.length > 0) {
        res.json({ adoptionStatus: results[0].adoption_status });
      } else {
        res.json({ adoptionStatus: null });
      }
    }
  );
});

router.get("/adopt", async (req, res) => {
  try {
    const rabbits = await fetchAdoptableRabbits();
    const rabbitsWithAdoptionStatus = await Promise.all(
      rabbits.map(async (rabbit) => {
        const adoptionStatus = await fetchAdoptionStatus(rabbit.id);
        return { ...rabbit, adoptionStatus };
      })
    );

    res.json(rabbitsWithAdoptionStatus);
  } catch (error) {
    console.error("Error fetching adoptable rabbits:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

const fetchAdoptableRabbits = () => {
  return new Promise((resolve, reject) => {
    db.query(
      "SELECT * FROM rabbit WHERE rehome_status = 'Rehome' AND is_adopted = false",
      (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      }
    );
  });
};

// Helper function to fetch adoption status for a rabbit
const fetchAdoptionStatus = (rabbitId) => {
  return new Promise((resolve, reject) => {
    db.query(
      "SELECT adoption_status FROM adoption WHERE rabbit_id = ?",
      [rabbitId],
      (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results.length > 0 ? results[0].adoption_status : null);
        }
      }
    );
  });
};


router.get("/rabbitdata/:id", (req, res) => {
  const sql = "SELECT * FROM rabbit WHERE id = ?";
  const id = req.params.id;
  db.query(sql, [id], (err, result) => {
    if (err) return res.json({ Message: "Error" });
    return res.json(result);
  });
});

router.post(
  "/rabbitdata/:id/adopt-form",
  upload.single("image"),
  (req, res) => {
    console.log("adopt-form");
    console.log(req.file);
    const result = JSON.parse(req.body.values);
    console.log(result);

    let randomID = Math.floor(100000 + Math.random() * 900000);
    const id = `adoption${randomID}`;
    const values = [
      id,
      result.rabbit_id,
      result.date,
      result.phone,
      result.province.provDesc,
      result.city.citymunDesc,
      result.barangay,
      result.reason,
      result.otherpets,
      result.user_id,
      result.adoption_status,
      req.file.filename,
      result.serviceoption,
      result.price,
      result.mop,
      result.agprod,
      result.agprodprice,
    ];

    const userName = result.user_name;
    const userEmail = result.user_email;

    const emailOptions = {
      from: EMAIL_FROM,
      to: "leonardonogra6@gmail.com",
      subject: "Pending Adoption Request Status Inquiry",
      html: `<div>
      <p>Hi <b>Admin</b>,</p>
      <p>A new adoption request of <b>${id}</b> requires your attention. <b>${userName}</b> has submitted an adoption request for <b>${result.rabbit_id}</b>. Please review the details and progress accordingly.</p>
      <p>Thank you!</p>
      <p>E-Leporidae</p>
      </div>`,
    };

    transporter.sendMail(emailOptions, (error, info) => {
      if (error) {
        console.log(error);
        return res.json("Error sending confirmation email");
      } else {
        console.log("Confirmation Email sent: " + info.response);
        console.log("Successfully inserted.");
      }
    });

    const sql =
      "INSERT INTO adoption (`id`, `rabbit_id`, `adoption_date`, `phone`, `province`, `city`, `barangay`, `reason_for_adoption`, `other_pets`, `user_id`, `adoption_status`, `home_environment_image_path`, `service_option`, `price`, `mode_of_payment`, `agriculture_product`, `agriculture_product_price`) VALUES (?)";
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
  db.query(
    "SELECT * FROM adoption WHERE user_id = ? ORDER BY adoption_date",
    [id],
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

router.delete("/delete_application/:id", (req, res) => {
  const id = req.params.id;
  db.query("DELETE FROM adoption WHERE id = ?", [id], (err, result) => {
    if (err) {
      console.log(err);
    }
    res.json(result);
  });
});

router.post("/upload_profile/:id", upload.single("file"), (req, res) => {
  const id = req.params.id;
  const file = req.file;

  if (!file) {
    return res.status(400).send("No file uploaded.");
  }

  db.query(
    "UPDATE user SET `profile` = ? WHERE `id` = ?",
    [file.filename, id],
    (err, result) => {
      if (err) return res.status(500).send(err);
      else return res.status(200).send(result);
    }
  );
});

router.get("/get_user/:id", (req, res) => {
  const id = req.params.id;
  db.query("SELECT * FROM user WHERE `id` = ?", [id], (err, result) => {
    if (err) {
      res.send(err);
    }
    res.send(result);
  });
});

module.exports = router;
