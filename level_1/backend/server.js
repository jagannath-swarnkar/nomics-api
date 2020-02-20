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
knex.schema.hasTable("curiencies_data").then(function(exists) {
  if (!exists) {
    return knex.schema.createTable("curiencies_data", function(table) {
      table
        .increments("id")
        .primary()
        .notNullable(),
        table.text("original_symbol"),
        table.text("name"),
        table.text("description"),
        table.text("website_url"),
        table.text("logo_url"),
        table.text("blog_url"),
        table.text("discord_url"),
        table.text("facebook_url"),
        table.text("github_url"),
        table.text("medium_url"),
        table.text("reddit_url"),
        table.text("telegram_url"),
        table.text("twitter_url"),
        table.text("youtube_url");
    });
  }
});

app.get("/", function(req, res) {
  console.log(req.query.pageSize)
  knex("curiencies_data")
    .where("id", "<=", (req.query.pageSize || 10))
    .then(mainData => {
      res.json(mainData);
    })
    .catch(err => console.error(err));
});

app.get("/post", function(request, response) {
  axios
    .get(
      "https://api.nomics.com/v1/currencies?key=7f8f43ac3ad7a4fd882ba8e0562d2f82"
    )
    .then(resp => {
      for (i of resp.data) {
        console.log(i.name)
        knex("curiencies_data")
          .insert({
            original_symbol: i.original_symbol,
            name: i.name,
            description: i.description,
            website_url: i.website_url,
            logo_url: i.logo_url,
            blog_url: i.blog_url,
            discord_url: i.discord_url,
            facebook_url: i.facebook_url,
            github_url: i.github_url,
            medium_url: i.medium_url,
            reddit_url: i.reddit_url,
            telegram_url: i.telegram_url,
            twitter_url: i.twitter_url,
            youtube_url: i.youtube_url
          })
          .then(data1 => {
            console.log("data inserted into db");
            response.json('data updated')
          })
          .catch(err => console.error(err));
      }

      response.json(resp.data);
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
