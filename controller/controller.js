const path = require("path");
const db = require("../db/mysql_connect");

// Redirect root URL to login page
const redirectToLogin = (req, res) => {
  res.redirect("/login.html");
};

// Login logic
const login = (req, res) => {
  const { username, password } = req.body;
  if (username === "alpha" && password === "alpha") {
    req.session.user = username;
    res.redirect("/dashboard");
  } else {
    res.send("Geçersiz kullanıcı adı veya şifre");
  }
};

// Middleware to check if user is authenticated
const isAuthenticated = (req, res, next) => {
  if (req.session.user) {
    next();
  } else {
    res.redirect("/login.html");
  }
};

// Dashboard route logic
const dashboard = (req, res) => {
  res.sendFile(path.join(__dirname, "../public/dashboard.html"));
};

const getSituationData = (req, res) => {
  const query = "SELECT company_name, market_share FROM situation";
  db.query(query, (err, results) => {
    if (err) {
      console.error(err.message);
      res.status(500).json({ error: "Database query error" });
    } else {
      res.json(results);
    }
  });
};


const getNames = (req, res) => {
  const query = "SELECT DISTINCT name FROM model";
  db.query(query, (err, results) => {
      if (err) {
          console.error(err.message);
          res.status(500).json({ error: "Database query error" });
      } else {
          res.json(results.map(row => row.name));
      }
  });
};

const getSalesData = (req, res) => {
  const { name } = req.query;
  if (!name) {
      return res.status(400).json({ error: "Name parameter is required" });
  }

  const query = "SELECT name, year, sales FROM model WHERE name = ?";
  db.query(query, [name], (err, results) => {
      if (err) {
          console.error(err.message);
          res.status(500).json({ error: "Database query error" });
      } else {
          res.json(results);
      }
  });
};

// Fetch data logic
const getData = (req, res) => {
  const { type } = req.params;

  let query = "";
  switch (type) {
    case "salesamount":
      query = "SELECT year, sales_total AS value FROM salesamount";
      break;
    case "sales_germany":
      query = "SELECT year, sales_germany AS value FROM salesamount";
      break;
    case "sales_abroad":
      query = "SELECT year, sales_abroad AS value FROM salesamount";
      break;
    case "production_total":
      query = "SELECT year, production_total AS value FROM production";
      break;
    case "production_germany":
      query = "SELECT year, production_germany AS value FROM production";
      break;
    case "production_abroad":
      query = "SELECT year, production_abroad AS value FROM production";
      break;
    case "revenueCosts":
      query = "SELECT year, revenue, costs FROM sales";
      break;
    case "expenses":
      query = "SELECT year, gross_profit, personnel_expenses FROM expenses";
      break;
    default:
      return res.status(400).json({ error: "Invalid type" });
  }

  db.query(query, (err, results) => {
    if (err) {
      console.error(err.message);
      res.status(500).json({ error: "Database query error" });
    } else {
      res.json(results);
    }
  });
};

module.exports = {
  redirectToLogin,
  login,
  isAuthenticated,
  dashboard,
  getData,
  getSituationData,
  getNames,
  getSalesData,
};
