const express = require("express");
const mongoose = require('mongoose');
const bp = require('body-parser')
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config({ path: "./config.env" });
const app = express();

app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))

// var corsOptions = {
//   origin: "http://127.0.0.1:5173/"
// };

app.use(cors());


// mongodb connection
mongoose.set('strictQuery', false);
mongoose.connect(process.env.MONGO_URI).then(console.log('connected to mongodb')).catch(err => console.log(err));

// mongo schema
const userSchema = new mongoose.Schema({
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    batch: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
  });
const User = mongoose.model("USER", userSchema);

// app.get( "/",(req, res) => {
//     res.json({ message: "Welcome to backend." });
// })

app.post("/save", (req, res) => {
    const { fullName, email, batch, age } = req.body.data;
    const user = new User({
        fullName,
        email,
        batch,
        age
      });
    
      user
        .save()
        .then(() => {
            console.log("user registerd successfully!");
            return res
            .status(201)
            .json({ message: "user registerd successfully!", status: 201 });
        })
        .catch((error) => {
            console.log("failed to save in mongo"+error);
          return res.status(500).json({ error: "Failed to save details" });
        });
})


// static files (build of your frontend)
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.resolve(__dirname, './frontend', 'dist')));
  app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html'));
  })
}


const PORT = process.env.PORT || 5000;

if(process.env.NODE_ENV === 'production'){
  const path = require('path');
  app.use(express.static(path.join(__dirname, '../frontend', 'dist')));
}

app.listen(`${PORT}`, () => {
  console.log("Server started " + `localhost:${PORT}`);
});
