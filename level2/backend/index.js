var express = require("express");
var cors = require("cors");
var axios = require("axios");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());
require("./connection/db"); // importing database connection


// route for fetching/posting data
var route = express.Router();
require('./routes/fetch_data')(route);
app.use('/', route);

// route for fetching sorted data
var sort = express.Router();
require('./routes/sort_data')(sort);
app.use('/', sort);


app.listen((PORT = 8001), err => {
  if (!err) {
    console.log(`Your level_1 backend is running on port : ${PORT}`);
  }
});
