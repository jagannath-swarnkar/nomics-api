var express = require("express");
var cors = require("cors");
var axios = require("axios");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

// Creating connections for mysql server with knex query;
var knex = require("knex")({
  client: "mysql",
  connection: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    password: process.env.DB_PASS
  },
  useNullAsDefault: true
});

// creating curiencies_data table
knex.schema.hasTable("level2").then(function(exists) {
  if (!exists) {
    return knex.schema.createTable("level2", function(table) {
      table
        .increments("id")
        .primary()
        .notNullable(),
        table.text("currency"),
        table.text("symbol"),
        table.text("logo_url"),
        table.text("rank"),
        table.text("price"),
        table.text("price_date"),
        table.text("market_cap"),
        table.text("circulating_supply"),
        table.text("max_supply"),
        table.text("high"),
        table.text("high_timestamp");
    });
  }
});

app.get("/", function(req, res) {
  console.log(req.query.pageSize);
  knex("level2")
    .where("id", "<=", req.query.pageSize || 10)
    .then(mainData => {
      res.json(mainData);
    })
    .catch(err => console.error(err));
});

app.get("/post", function(request, response) {
  axios
    .get(
      "https://api.nomics.com/v1/currencies/ticker?key=7f8f43ac3ad7a4fd882ba8e0562d2f82"
    )
    .then(resp => {
      // response.json(resp.data);
      for (i of resp.data) {
        console.log(i.name);
        knex("level2")
          .insert({
            currency: i.currency,
            symbol: i.symbol,
            logo_url: i.logo_url,
            rank: i.rank,
            price: i.price,
            price_date: i.price_date,
            market_cap: i.market_cap,
            circulating_supply: i.circulating_supply,
            max_supply: i.max_supply,
            high: i.high,
            high_timestamp: i.high_timestamp
          })
          .then(data1 => {
            console.log("data inserted into db");
            response.json("data updated", resp.data);
          })
          .catch(err => console.error(err));
      }
    })
    .catch(err => {
      console.log("Error fetching data from nomics", err);
    });
});

app.listen((PORT = 8001), err => {
  if (!err) {
    console.log(`Your level_1 backend is running on port : ${PORT}`);
  }
});
