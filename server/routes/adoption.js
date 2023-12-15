const express = require("express");
const router = express.Router();
const db = require("../config/db");

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

router.get("/adoption/:id", (req, res) => {
  const id = req.params.id;
  db.query("SELECT * FROM adoption where id = ?", [id], (err, results) => {
    if (err) {
      console.error("Error fetching rabbit:", err);
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }
    return res.json(results);
  });
});

router.get("/adoptions", (req, res) => {
  db.query(
    "SELECT a.*, u.name, u.email FROM adoption AS a LEFT JOIN user AS u ON a.user_id = u.id ORDER BY adoption_status DESC, adoption_date DESC",
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

router.get("/adoptions-deliver", (req, res) => {
  db.query(
    "SELECT a.*, u.name AS user_name FROM adoption AS a LEFT JOIN user AS u ON a.user_id = u.id WHERE a.id NOT IN (SELECT adoption_id FROM transaction) AND a.adoption_status = 'Approved' ORDER BY delivery_status DESC",
    (err, results) => {
      if (err) {
        console.error("Error fetching:", err);
        res.status(500).json({ error: "Internal Server Error" });
        return;
      }
      return res.json(results);
    }
  );
});

router.put("/approve-adoption/:id", (req, res) => {
  const sql = "UPDATE adoption SET `adoption_status` = ? WHERE id = ?";
  const values = ["Approved"];
  const id = req.params.id;
  const user_name = req.body.user_name;
  const user_email = req.body.user_email;
  const rabbit_id = req.body.rabbit_id;

  const emailOptions = {
    from: EMAIL_FROM,
    to: user_email,
    subject: `Your adoption request ${id} has been approved.`,
    html: `<div>
      <p>Hello <b>${user_name}</b>,</p>
      <p>Your adoption request to <b>${rabbit_id}</b> has been approved. We have notified the owner to start the process of your request.</p>
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
      return res.json(results);
    }
  });

  db.query(sql, [...values, id], (err, data) => {
    if (err) {
      return res.json("Error");
    }
    return res.json(data);
  });
});

router.put("/approve-delivery/:id", (req, res) => {
  const sql = "UPDATE adoption SET `delivery_status` = ? WHERE id = ?";
  const values = ["Approved"];
  const id = req.params.id;

  db.query(sql, [...values, id], (err, data) => {
    if (err) {
      return res.json("Error");
    }
    return res.json(data);
  });
});

router.put("/decline-adoption/:id", (req, res) => {
  const sql = "UPDATE adoption SET `adoption_status` = ? WHERE id = ?";
  const values = ["Declined"];
  const id = req.params.id;
  const user_name = req.body.user_name;
  const user_email = req.body.user_email;
  const declineReason = `We are sorry, but your adoption request with an adoption id of <b>${id}</b> has been declined.`;
  const someText = "Please contact us for further information or to reapply.";

  const emailOptions = {
    from: EMAIL_FROM,
    to: user_email,
    subject: `Your adoption request ${id} has been declined.`,
    html: `<div>
      <p>Hello <b>${user_name}</b>,</p>
      <p>${declineReason} ${someText}</p>
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
      return res.json(results);
    }
  });

  db.query(sql, [...values, id], (err, data) => {
    if (err) {
      return res.json("Error");
    }
    return res.json(data);
  });
});

module.exports = router;
