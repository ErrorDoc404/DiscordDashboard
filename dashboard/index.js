require('dotenv').config();
require('./strategies/discord');
const path = require('path');
const http = require('http');
const express = require('express');
const passport = require('passport');
const mongoose = require('mongoose');
const session = require('express-session');
const cors = require('cors');
const MongoStore = require('connect-mongo');

const publicPath = path.join(__dirname, './public');
let app = express();
let server = http.createServer(app);

const PORT = process.env.DASHBOARD_PORT || 3000

app.use(express.static(publicPath));

const routes = require('./routes');

const stripe = require('stripe')(process.env.STRIPE_SECRET)

mongoose.connect(process.env.MONGOOSE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.use(cors({
  origin: ['http://localhost:3000'],
  credentials: true,
}))

app.use(session({
  secret: 'secret',
  cookie: {
    maxAge: 60000 * 60 * 1
  },
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: process.env.MONGOOSE_URL
  }),
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/api', routes);

app.get("/dashboard", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "dashboard.html"));
});

app.get("/dashboard/:id", (req, res) => {
  if (!req.user.guilds.find((x) => x.id == req.params.id))
    return res.redirect("/dashboard");
  res.sendFile(path.join(__dirname, "public", "server.html"));
});

app.get("/upgrade", (req, res) => {
  res.sendFile(__dirname + "/public/checkout.html");
});

app.post('/upgrade/1month', async (req, res) => {
  const checkout = await stripe.checkout.sessions.create({
    customer_email: req.user.email,
    line_items: [
      {
        price_data: {
          currency: 'inr',
          product_data: {
            name: '1 Month Sub',
          },
          unit_amount: 10000,
        },
        quantity: 1,
      },
    ],
    payment_method_types: [
      'card',
    ],
    mode: 'payment',
    success_url: `http://localhost:3000/success`,
    cancel_url: `http://localhost:3000/cancel`,
  });

  res.redirect(303, checkout.url)

});


app.post('/upgrade/3month', async (req, res) => {
  const checkout = await stripe.checkout.sessions.create({
    customer_email: req.user.email,
    line_items: [
      {
        price_data: {
          currency: 'inr',
          product_data: {
            name: '3 Month Sub',
          },
          unit_amount: 27500,
        },
        quantity: 1,
      },
    ],
    payment_method_types: [
      'card',
    ],
    mode: 'payment',
    success_url: `http://localhost:3000/success`,
    cancel_url: `http://localhost:3000/cancel`,
  });

  res.redirect(303, checkout.url)

});

app.post('/upgrade/12month', async (req, res) => {
  const checkout = await stripe.checkout.sessions.create({
    customer_email: req.user.email,
    line_items: [
      {
        price_data: {
          currency: 'inr',
          product_data: {
            name: '1 Year Sub',
          },
          unit_amount: 100000,
        },
        quantity: 1,
      },
    ],
    payment_method_types: [
      'card',
    ],
    mode: 'payment',
    success_url: `http://localhost:3000/success`,
    cancel_url: `http://localhost:3000/cancel`,
  });

  res.redirect(303, checkout.url)

});


server.listen(PORT, () => {
  console.log(`listening on port ${PORT}`)
})

module.exports = app;
