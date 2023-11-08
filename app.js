const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv').config();
const errorController = require('./controllers/error');
const mongoose = require('mongoose');

const User = require('./models/user');
const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  User.findById("65465699dd7959e462dbd010")
    .then(user => {
      req.user = user;
      next();
    })
    .catch(err => console.log(err));
  // next();
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

mongoose.connect(process.env.DB).then(() => {
  console.log(process.env.DB);
  app.listen(3000);
  User.findOne().then(user => {
    if (!user) {
      User({
        name: 'Max',
        email: 'b5TbD@example.com',}).save();
    }else{
      console.log(user);
    }
  });
}).catch(err => {
  console.log(err);
});
