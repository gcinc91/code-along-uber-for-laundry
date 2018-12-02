
const mongoose = require('mongoose');
const User = require('../models/Users');
const bcrypt = require("bcryptjs");
const saltRounds = 10;


mongoose
  .connect(
    "mongodb://localhost/lab-uber",
    { useNewUrlParser: true }
  );

  const makeHash = (password) => {
    const salt = bcrypt.genSaltSync(saltRounds);
    let hash = bcrypt.hashSync(password, salt);
    return hash;
  }


  const usuarios =  [
    
      {
        username: 'Pepe',
        password: makeHash("1234"),
        role: 'user'
      },
      {
        username: 'Juan',
        password: makeHash("1234"),
        role: 'user'
      },
      {
        username: 'Pedro',
        password: makeHash("1234"),
        role: 'launderer',
        fee: '5'
      }
  ]

  
User.collection.drop();

  User.create(usuarios, (err) => {
    if (err) { throw(err) }
    console.log(`Created ${usuarios.length} usuarios`)
    mongoose.connection.close()
  });