const Level2 = require("../models/Level2");

module.exports = sort => {
  sort.get("/:id", (req, res) => {
    let id = req.params.id;
    Level2.find({},null,{limit:parseInt(req.query.pageSize)})
      .sort(id)
      .then(data => {
        res.json(data);
      })
      .catch(err => console.log(err));
  });
};
