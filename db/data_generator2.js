const Sequelize = require('sequelize');
var faker = require("faker");

const sequelize = new Sequelize('mysql://root:password@localhost:3306/tripadvisor');
sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

const Availability = sequelize.define('availability', {
  hotel_id: {
    type: Sequelize.INTEGER,
    primaryKey: true
  },
  room_type_id: {
    type: Sequelize.INTEGER,
    primaryKey: true
  },
  date: {
    type: Sequelize.DATEONLY(6) ,
    primaryKey: true
  },
  brokerage_id: {
    type: Sequelize.INTEGER
  },
  reservation_id: {
    type: Sequelize.INTEGER,
    primaryKey: true
  },
  price: {
    type: Sequelize.INTEGER
  }
});

// force: true will drop the table if it already exists
Availability.sync({
  force: true
}).then(() => {
  // Table created
  Availability.create({
    hotel_id: 1,
    room_type_id: 1,
    date: faker.date.future(),
    brokerage_id: 1,
    reservation_id:1,
    price:100
  });
});

let availarr=[];

{
  hotel_id: 1,
  room_type_id: 1,
  date: faker.date.future(),
  brokerage_id: 1,
  reservation_id:1,
  price:100
}