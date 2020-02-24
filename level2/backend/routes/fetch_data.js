const Level2 = require("../models/Level2");
const axios = require("axios");

module.exports = route => {
  route.get("/", (req, res) => {
    let getData = new Promise((resolve, reject) => {
      resolve(getDataFromDB(req.query.pageSize));
    });
    getData.then(api_data => {
      if (api_data.length > 0) {
        res.json(api_data);
      } else {
        axios
          .get(
            "https://api.nomics.com/v1/currencies/ticker?key=7f8f43ac3ad7a4fd882ba8e0562d2f82"
          )
          .then(fetched_data => {
            console.log("data fetched");
            Level2.insertMany(fetched_data.data)
              .then(inserted_data => {
                console.log("data inserted to db");
                res.json(inserted_data);
              })
              .catch(err => console.log("err in inserting data to db"));
          })
          .catch(err => console.log("err in fetching data"));
      }
    });
    getData.catch(err => console.log(err));
  });

  // function to get data from db
  const getDataFromDB = pageSize => {
    return Level2.find({}, null, {
      limit: parseInt(pageSize)
    })
      .then(data => {
        return data;
      })
      .catch(err => console.log(err));
  };
};
