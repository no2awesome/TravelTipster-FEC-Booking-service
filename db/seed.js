var faker = require("faker");
let db = require("mysql");

var randomName = faker.name.findName(); // Rowan Nikolaus
var randomEmail = faker.internet.email(); // Kassandra.Haley@erich.biz
var randomCard = faker.helpers.createCard(); // random contact card containing many properties

let connection = db.createConnection({
  host: "aa1iibwgognyt5p.ccnl4smt7re2.us-west-2.rds.amazonaws.com",
  user: "root",
  password: "password",
  database: "traveltipster"
});

connection.connect();

for (let i = 0; i < 100; i++) {
  connection.query(`insert into hotel (id, name) values (${i}, ${connection.escape(faker.company.companyName())})`);
}

for (let i = 0; i < 100; i++) {
  for (let j = 0; j < 5; j++) {
    connection.query(
      `insert into hotel_room (hotel_id, room_type_id, name) values (${i}, ${j}, ${connection.escape(faker.random.word() + " room" )})`
    );
  }
}

connection.end();