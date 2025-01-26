require("dotenv").config();
const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const router = require("./router");

const app = express();
const PORT = 3000;


app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.use(
  session({
    secret: "alpha123",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }, 
  })
);


app.use("/", router);


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
