require('dotenv').config();
require('./strategies/discord');

const express = require('express');
const passport = require('passport');
const mongoose = require('mongoose');
const session = require('express-session');
const cors = require('cors');
const { join } = require("path");
const MongoStore = require('connect-mongo');

const app = express();
const PORT = process.env.DASHBOARD_PORT || 3002;
const routes = require('./routes');

mongoose.connect(process.env.MONGOOSE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.use(cors ({
    origin: ['http://localhost:3000'],
    credentials: true,
}))

app.use(session({
    secret: 'secret',
    cookie: {
        maxAge: 60000 * 60 * 24
    },
resave: false,
    saveUninitialized: false,
    store: MongoStore.create({mongoUrl: process.env.MONGOOSE_URL}),
}));
app.use(passport.initialize());
app.use(passport.session());

// app.use("/", express.static(join(__dirname,"public","js")));

app.use('/api', routes);

app.get("/", (req, res) => {
  res.sendFile(join(__dirname, "public", "index.html"));
});

app.get("/dashboard", (req, res) => {
  res.sendFile(join(__dirname, "public", "dashboard.html"));
});

app.get("/js/index.js", (req, res) => {
  res.sendFile(__dirname + "/public/js/index.js");
});

app.get("/js/now-ui-kit.min.js", (req, res) => {
  res.sendFile(__dirname + "/public/js/now-ui-kit.min.js");
});

app.get("/favicon.ico", (req, res) => {
  res.sendFile(__dirname + "/public/favicon.ico");
});

app.get("/assets/css/bootstrap.min.css", (req, res) => {
  res.sendFile(__dirname + "/public/assets/css/bootstrap.min.css");
});

app.get("/assets/css/bootstrap.min.css.map", (req, res) => {
  res.sendFile(__dirname + "/public/assets/css/bootstrap.min.css.map");
});

app.get("/assets/css/now-ui-dashboard.css", (req, res) => {
  res.sendFile(__dirname + "/public/assets/css/now-ui-dashboard.css");
});

app.get("/assets/css/now-ui-dashboard.css.map", (req, res) => {
  res.sendFile(__dirname + "/public/assets/css/now-ui-dashboard.css.map");
});

app.get("/assets/demo/demo.css", (req, res) => {
  res.sendFile(__dirname + "/public/assets/demo/demo.css");
});

app.get("/assets/js/core/jquery.min.js", (req, res) => {
  res.sendFile(__dirname + "/public/assets/js/core/jquery.min.js");
});

app.get("/assets/js/core/popper.min.js", (req, res) => {
  res.sendFile(__dirname + "/public/assets/js/core/popper.min.js");
});

app.get("/assets/js/core/bootstrap.min.js", (req, res) => {
  res.sendFile(__dirname + "/public/assets/js/core/bootstrap.min.js");
});

app.get("/assets/js/plugins/perfect-scrollbar.jquery.min.js", (req, res) => {
  res.sendFile(__dirname + "/public/assets/js/plugins/perfect-scrollbar.jquery.min.js");
});

app.get("/assets/js/plugins/chartjs.min.js", (req, res) => {
  res.sendFile(__dirname + "/public/assets/js/plugins/chartjs.min.js");
});

app.get("/assets/js/plugins/bootstrap-notify.js", (req, res) => {
  res.sendFile(__dirname + "/public/assets/js/plugins/bootstrap-notify.js");
});

app.get("/assets/js/now-ui-dashboard.min.js", (req, res) => {
  res.sendFile(__dirname + "/public/assets/js/now-ui-dashboard.min.js");
});

app.get("/assets/demo/demo.js", (req, res) => {
  res.sendFile(__dirname + "/public/assets/demo/demo.js");
});

app.get("/assets/fonts/nucleo-outline.woff2", (req, res) => {
  res.sendFile(__dirname + "/public/assets/fonts/nucleo-outline.woff2");
});

app.get("/assets/fonts/nucleo-outline.woff", (req, res) => {
  res.sendFile(__dirname + "/public/assets/fonts/nucleo-outline.woff");
});

app.get("/assets/fonts/nucleo-outline.ttf", (req, res) => {
  res.sendFile(__dirname + "/public/assets/fonts/nucleo-outline.ttf");
});

app.listen(PORT, () => console.log(`Running on Port ${PORT}`));
