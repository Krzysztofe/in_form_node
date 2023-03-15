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

  const transporter = nodeMailer.createTransport({
    host: "smtp.ethereal.email",
    port: "587",
    auth: {
      user: "kamille87@ethereal.email",
      pass: "yz7frFTFJbayQQsBrr",
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  // const transporter = nodeMailer.createTransport({
  //   host: "smtp.ethereal.email",
  //   port: 587,
  //   auth: {
  //     user: "melyna53@ethereal.email",
  //     pass: "FDZQEY5RUdvzneAzcY",
  //   },

  //   // to niby potrzebne gdy sie wysyla z localost
  //   tls: {
  //     rejectUnauthorized: false,
  //   },
  // });
  const mailOptions = {
    from: "deklaracja",
    to: "kamille87@ethereal.email",
    subject: `DEKLARACJA`,
    text: `Imie: ${req.body.name},
    Nazwisko: ${req.body.surname},
    Adres:${req.body.adress},
    Nr telefonu: ${req.body.phone},
    Email:${req.body.email},
    Pracodawca: ${req.body.employer}, 
    Pracodawca inny:${req.body.employerOther}, 
    Miejsce pracy: ${req.body.workplace},
    Miejsce pracy inny:${req.body.workplaceOther},
   Umowa: ${req.body.contract}, 
   Wymiar czasu pracy: ${req.body.workTime}, 
   Dział: ${req.body.department}, 
   Login ${req.body.login}, 
   Uzwiązkowienie: ${req.body.union}, 
    `,
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
