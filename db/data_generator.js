var faker = require("faker");
let db = require("mysql");

var randomName = faker.name.findName(); // Rowan Nikolaus
var randomEmail = faker.internet.email(); // Kassandra.Haley@erich.biz
var randomCard = faker.helpers.createCard(); // random contact card containing many properties

let connection = db.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "tripadvisor"
});

connection.connect();

// connection.query(`delete from hotel`);
// connection.query(`delete from brokerage`);
// connection.query(`delete from availability`);

// for (let i = 0; i < 100; i++) {
//     connection.query(`insert into hotel (id, name) values (${i}, ${connection.escape(faker.company.companyName())})`);
// }

// for (let i = 0; i < 100; i++) {
//     connection.query(`insert into brokerage (id, name) values (${i}, ${connection.escape(faker.company.companyName())})`);
// }

// for (let i = 0; i < 100; i++) {
//   for (let j = 0; j < 5; j++) {
//     connection.query(
//       `insert into hotel_room (hotel_id, room_type_id, name) values (${i}, ${j}, ${connection.escape(faker.random.word() + " room" )})`
//     );
//   }
// }

for (let i = 0; i < 100; i++) {
  for (let j = 0; j < 5; j++) {
    for (let k = 0; k < 32; k++) {
      connection.query(
        `insert into availability (hotel_id, room_type_id, date, brokerage_id, reservation_id, price) values (${i}, ${j}, ${k.toString().padStart(2, "0") +
          "2019"}, ${Math.floor(Math.random() * 4) + 1}, ${Math.floor(Math.random() * 99) + 1}, ${Math.floor(Math.random() * 950) + 50} )`
      );
    }
  }
}

// console.log(faker.date.future());

console.log(
  "01" +
  (Math.floor(Math.random() * 29) + 1).toString().padStart(2, "0") +
  "2019"
);
let i = 1;
console.log(
  `insert into availability (hotel_id, room_type_id, date, brokerage_id, reservation_id, price) values (${i}, ${Math.floor(
    Math.random() * 4
  ) + 1}, ${"01" +
    (Math.floor(Math.random() * 29) + 1).toString().padStart(2, "0") +
    "2019"}, ${Math.floor(Math.random() * 4) + 1}, ${Math.floor(
    Math.random() * 99
  ) + 1}, ${Math.floor(Math.random() * 950) + 50} )`
);

// for (let i = 0; i < 100; i++) {
//     connection.query(`insert into availability (id, room_type_id, date, brokerage_id, reservation_id, price) values (${i}, ${(Math.floor(Math.random() * 4) + 1)}, )`);
// }