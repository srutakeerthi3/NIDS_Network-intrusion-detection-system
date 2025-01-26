// jshint esversion:6

require('dotenv').config();
currentYear = new Date().getFullYear();
const { parse, stringify } = require('flatted');
let { PythonShell } = require('python-shell');
const express = require("express");
var multer = require('multer');
const fs = require('fs');
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const session = require('express-session');
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
var GoogleStrategy = require('passport-google-oauth20').Strategy;
const findOrCreate = require('mongoose-findorcreate');
const app = express();

app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(session({
  secret: "Our little secret.",
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

// Updated MongoDB connection with useUnifiedTopology to remove the warning
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.set("useCreateIndex", true);

const userSchema = new mongoose.Schema({
  email: String,
  password: String,
  googleId: String,
});

userSchema.plugin(passportLocalMongoose);
userSchema.plugin(findOrCreate);

const User = new mongoose.model("User", userSchema);

passport.use(User.createStrategy());

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: process.env.GOOGLE_CALLBACK_URL,
  userProfileUrl: process.env.URL
},
  function (accessToken, refreshToken, profile, cb) {
    User.findOrCreate({ googleId: profile.id, username: profile.id }, function (err, user) {
      return cb(err, user);
    });
  }
));

let submitted_csv_file = "";
var storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './Uploaded_files');
  },
  filename: function (req, file, callback) {
    submitted_csv_file = file.originalname;
    console.log(submitted_csv_file);
    callback(null, file.originalname);
  }
});

var upload = multer({ storage: storage }).single('myfile');

app.get("/", function (req, res) {
  res.render("home");
});

// Add routes for additional pages
app.get("/features", function (req, res) {
  res.render("features");
});

app.get("/attacks", function (req, res) {
  res.render("attacks");
});

app.get("/about", function (req, res) {
  res.render("about");
});

app.get("/stats", function (req, res) {
  res.render("stats");
});
let complete_answer = "";  //defined globally
  // knn
  let knn_bin_cls = "";
  let knn_bin_table = "";
  let knn_mul_cls = "";
  let knn_table = "";
  let knn_desc = "";
  let knn_bin_acc = "0.9760368900303525";
  let knn_mul_acc = "0.9740368900303525";
  // random forest
  let rf_bin_cls = "";
  let rf_bin_table = "";
  let rf_mul_cls = "";
  let rf_table = "";
  let rf_desc = "";
  let rf_bin_acc = "0.9741029652113005";
  let rf_mul_acc = "0.9731029652113005";
  // cnn
  let cnn_bin_cls = "";
  let cnn_bin_table = "";
  let cnn_mul_cls = "";
  let cnn_table = "";
  let cnn_desc = "";
  let cnn_bin_acc = "0.9582535605883726";
  let cnn_mul_acc = "0.9506420733130982";
  // lstm
  let lstm_bin_cls = "";
  let lstm_bin_table = "";
  let lstm_mul_cls = "";
  let lstm_table = "";
  let lstm_desc = "";
  let lstm_bin_acc = "0.9562456222274107";
  let lstm_mul_acc = "0.9590940929255195";
app.get("/secrets", function (req, res) {
  

  res.render("secrets");

  let options = {
    args: []
  };
  console.log("entering!!");
  PythonShell.run('nids_random_updated.py', options, (err, response) => {
    if (err) console.log(err);
    if (response) {
      complete_answer = stringify(response);

      //knn
      let temp_knn_bin_cls = stringify(response[0]);
      knn_bin_cls = temp_knn_bin_cls.slice(2, -2);

      let temp_knn_bin_table = stringify(response[1]);
      knn_bin_table = temp_knn_bin_table.slice(2, -2);

      let temp_knn_mul_cls = stringify(response[2]);
      knn_mul_cls = temp_knn_mul_cls.slice(2, -2);

      let temp_knn_table = stringify(response[3]);
      knn_table = temp_knn_table.slice(2, -2);

      let temp_knn_desc = stringify(response[4]);
      knn_desc = temp_knn_desc.slice(2, -2);

      //random forest
      let temp_rf_bin_cls = stringify(response[5]);
      rf_bin_cls = temp_rf_bin_cls.slice(2, -2);

      let temp_rf_bin_table = stringify(response[6]);
      rf_bin_table = temp_rf_bin_table.slice(2, -2);

      let temp_rf_mul_cls = stringify(response[7]);
      rf_mul_cls = temp_rf_mul_cls.slice(2, -2);

      let temp_rf_table = stringify(response[8]);
      rf_table = temp_rf_table.slice(2, -2);

      let temp_rf_desc = stringify(response[9]);
      rf_desc = temp_rf_desc.slice(2, -2);

      //cnn
      let temp_cnn_bin_cls = stringify(response[10]);
      cnn_bin_cls = temp_cnn_bin_cls.slice(2, -2);

      let temp_cnn_bin_table = stringify(response[11]);
      cnn_bin_table = temp_cnn_bin_table.slice(2, -2);

      let temp_cnn_mul_cls = stringify(response[12]);
      cnn_mul_cls = temp_cnn_mul_cls.slice(2, -2);

      let temp_cnn_table = stringify(response[13]);
      cnn_table = temp_cnn_table.slice(2, -2);

      let temp_cnn_desc = stringify(response[14]);
      cnn_desc = temp_cnn_desc.slice(2, -2);

      //lstm
      let temp_lstm_bin_cls = stringify(response[15]);
      lstm_bin_cls = temp_lstm_bin_cls.slice(2, -2);

      let temp_lstm_bin_table = stringify(response[16]);
      lstm_bin_table = temp_lstm_bin_table.slice(2, -2);

      let temp_lstm_mul_cls = stringify(response[17]);
      lstm_mul_cls = temp_lstm_mul_cls.slice(2, -2);

      let temp_lstm_table = stringify(response[18]);
      lstm_table = temp_lstm_table.slice(2, -2);

      let temp_lstm_desc = stringify(response[19]);
      lstm_desc = temp_lstm_desc.slice(2, -2);

      console.log("entered!!");
    }
  });
});

app.get("/secrets_2", function (req, res) {
  // Ensure the data from secrets.ejs is passed to secrets_2.ejs
  res.render("secrets_2", {
    knn_bin_cls: knn_bin_cls,
    knn_bin_table: knn_bin_table,
    knn_mul_cls: knn_mul_cls,
    knn_desc: knn_desc,
    knn_table: knn_table,
    knn_bin_acc: knn_bin_acc,
    knn_mul_acc: knn_mul_acc,
    rf_bin_cls: rf_bin_cls,
    rf_bin_table: rf_bin_table,
    rf_mul_cls: rf_mul_cls,
    rf_table: rf_table,
    rf_desc: rf_desc,
    rf_bin_acc: rf_bin_acc,
    rf_mul_acc: rf_mul_acc,
    cnn_bin_cls: cnn_bin_cls,
    cnn_bin_table: cnn_bin_table,
    cnn_mul_cls: cnn_mul_cls,
    cnn_table: cnn_table,
    cnn_desc: cnn_desc,
    cnn_bin_acc: cnn_bin_acc,
    cnn_mul_acc: cnn_mul_acc,
    lstm_bin_cls: lstm_bin_cls,
    lstm_mul_cls: lstm_mul_cls,
    lstm_desc: lstm_desc,
    lstm_bin_acc: lstm_bin_acc,
    lstm_mul_acc: lstm_mul_acc
  });
});

app.get("/knn_bin_table", function (req, res) {
  res.render("knn_bin_table");
})

app.get("/knn_table", function (req, res) {
  res.render("knn_table");
})

app.get("/rf_bin_table", function (req, res) {
  res.render("rf_bin_table");
})

app.get("/rf_table", function (req, res) {
  res.render("rf_table");
})

app.get("/cnn_bin_table", function (req, res) {
  res.render("cnn_bin_table");
})

app.get("/cnn_table", function (req, res) {
  res.render("cnn_table");
})

app.get("/lstm_bin_table", function (req, res) {
  res.render("lstm_bin_table");
})

app.get("/lstm_table", function (req, res) {
  res.render("lstm_table");
})

app.get("/parameters", function (req, res) {
  res.render("parameters");
});

app.get("/paramsecrets", function (req, res) {
  // Ensure the data from parameters.ejs is passed to paramsecrets.ejs
  res.render("paramsecrets", {
    p_knn_bin_cls: knn_bin_cls,
    knn_bin_table: knn_bin_table,
    p_knn_mul_cls: knn_mul_cls,
    p_knn_desc: knn_desc,
    p_knn_bin_acc: knn_bin_acc,
    p_knn_mul_acc: knn_mul_acc,
    p_rf_bin_cls: rf_bin_cls,
    p_rf_mul_cls: rf_mul_cls,
    p_rf_desc: rf_desc,
    p_rf_bin_acc: rf_bin_acc,
    p_rf_mul_acc: rf_mul_acc,
    p_cnn_bin_cls: cnn_bin_cls,
    p_cnn_mul_cls: cnn_mul_cls,
    p_cnn_desc: cnn_desc,
    p_cnn_bin_acc: cnn_bin_acc,
    p_cnn_mul_acc: cnn_mul_acc,
    p_lstm_bin_cls: lstm_bin_cls,
    p_lstm_mul_cls: lstm_mul_cls,
    p_lstm_desc: lstm_desc,
    p_lstm_bin_acc: lstm_bin_acc,
    p_lstm_mul_acc: lstm_mul_acc
  });
});


app.get("/csv", function (req, res) {
  if (req.isAuthenticated()) {
    res.render("csv");
  } else {
    res.redirect("/login");
  }
});

final_ans = "";
app.post('/uploadjavatpoint', function (req, res) {
  upload(req, res, function (err) {
    if (err) {
      return res.end("Error uploading file.");
    }
    res.end("File is uploaded successfully!");
    console.log("hello");
    const submitted_model = req.body.selected_model;
    console.log(submitted_model);
    console.log(submitted_csv_file);

    let options = {
      args: [submitted_model, submitted_csv_file]
    };
    PythonShell.run('nids_csv_updated.py', options, (err, response) => {
      if (err) console.log(err);
      if (response) {
        let temp_final_ans = stringify(response[0]);
        final_ans = temp_final_ans.slice(2, -2);
        console.log("completed");
      }
    });
  });
});

app.get('/index', (req, res) => {
  if (final_ans === "completed!!") {
    console.log("yes");
    res.render('index');
  }
});

app.get('/download-file', (req, res) => {
  console.log("entered");
  let path = './Uploaded_files/';
  path += submitted_csv_file;
  res.download(path);
});

app.get("/auth/google",
  passport.authenticate('google', { scope: ['profile'] })
);

app.get("/auth/google/callback",
  passport.authenticate('google', { failureRedirect: "/login" }),
  function (req, res) {
    res.redirect("/submit");
  });

app.get("/login", function (req, res) {
  res.render("login");
});

app.get("/submit", function (req, res) {
  if (req.isAuthenticated()) {
    res.render("submit");
  } else {
    res.redirect("/login");
  }
});

app.get("/logout", function (req, res) {
  req.logout(function (err) {
    res.redirect("/");
  });
});

app.listen(3000, function () {
  console.log("Server started on port 3000.");
});
