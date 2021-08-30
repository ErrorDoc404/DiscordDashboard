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

mongoose.connect('mongodb+srv://discordbot:discordbot@cluster0.brlmz.mongodb.net/myFirstDatabase', {
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
    store: MongoStore.create({mongoUrl: 'mongodb+srv://discordbot:discordbot@cluster0.brlmz.mongodb.net/myFirstDatabase'}),
}));
app.use(passport.initialize());
app.use(passport.session());

// app.use("/", express.static(join(__dirname,"public","js")));

app.use('/api', routes);

app.get("/", (req, res) => {
  res.sendFile(join(__dirname, "public", "index.html"));
});

app.get("/css/bootstrap.min.css", (req, res) => {
  res.sendFile(__dirname + "/public/css/bootstrap.min.css");
});

app.get("/css/main.css", (req, res) => {
  res.sendFile(__dirname + "/public/css/main.css");
});

app.get("/css/now-ui-kit.css", (req, res) => {
  res.sendFile(__dirname + "/public/css/now-ui-kit.css");
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

app.get("/assets/menuIcon.svg", (req, res) => {
  res.sendFile(__dirname + "/public/assets/menuIcon.svg");
});

app.get("/assets/BotLogo.svg", (req, res) => {
  res.sendFile(__dirname + "/public/assets/BotLogo.svg");
});

app.get("/assets/BotLogoWord.svg", (req, res) => {
  res.sendFile(__dirname + "/public/assets/BotLogoWord.svg");
});

app.get("/assets/wavy-purple-by-nouridio.svg", (req, res) => {
  res.sendFile(__dirname + "/public/assets/wavy-purple-by-nouridio.svg");
});

app.get("/assets/wavy-dark-by-nouridio.svg", (req, res) => {
  res.sendFile(__dirname + "/public/assets/wavy-dark-by-nouridio.svg");
});

app.get("/assets/wavy-light-by-nouridio.svg", (req, res) => {
  res.sendFile(__dirname + "/public/assets/wavy-light-by-nouridio.svg");
});

app.listen(PORT, () => console.log(`Running on Port ${PORT}`));
