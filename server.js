const express = require("express");
const app = express();
const nodeMailer = require("nodemailer");

const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.static("public"));
app.use(express.json());

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/form.html");
});

app.post("/", (req, res) => {
  console.log("body", req.body);

  //   const transporter = nodeMailer.createTransport({
  //     service: "Gmail",
  //     auth: {
  //       user: "wolfbrigade36@gmail.com",
  //       pass: "25czerwca",
  //     },
  // tls: {
  //   rejectUnauthorized: false,
  // },

  const transporter = nodeMailer.createTransport({
    host: "poczta.interia.pl",
    port: 587,
    secure: false,
    auth: {
      user: "wolfbrigade36@interia.pl",
      pass: "25czerwca25czerwca",
    },

    //to niby potrzebne gdy sie wysyla z localost
    tls: {
      rejectUnauthorized: false,
    },
  });
  const mailOptions = {
    from: "wolfbrigade36@interia.pl",
    to: "wolfbrigade36@interia.pl",
    subject: `Message from ${req.body.name}: ${req.body.surname}`,
    text: req.body.surname,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log("errrrxx", error);
      res.send("errrcccc");
    } else {
      console.log("email send" + info.response);
      res.send("sukces");
    }
  });
});

app.listen(PORT, () => {
  console.log("", `run ${PORT}`);
});
