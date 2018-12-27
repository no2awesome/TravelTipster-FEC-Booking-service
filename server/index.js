const express = require('express');
const bodyParser = require('body-parser');

const db = require('../db/db');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(express.static(__dirname + '/../react-client/dist'));

app.get('/:hotel_id/vacancy', (req, res) => {
  //TODO - your code here!
  db.getAavilabilities(req.params.hotel_id, req.query.check_in_date,req.query.check_out_date, (err, result) => {
    if (err) {
      res.status(400).send({
        message: 'Error on reading database!'
      });
    } else {
      res.send(result);
    }
  });
});

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});