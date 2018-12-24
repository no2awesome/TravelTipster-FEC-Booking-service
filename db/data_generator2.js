const Sequelize = require("sequelize");
var faker = require("faker");

const sequelize = new Sequelize(
  "mysql://root:password@localhost:3306/tripadvisor"
);
sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch(err => {
    console.error("Unable to connect to the database:", err);
  });

const Availability = sequelize.define("availability", {
  hotel_id: {
    type: Sequelize.INTEGER,
    primaryKey: true
  },
  room_type_id: {
    type: Sequelize.INTEGER,
    primaryKey: true
  },
  date: {
    type: Sequelize.INTEGER,
    primaryKey: true
  },
  brokerage_id: {
    type: Sequelize.INTEGER,
    primaryKey: true
  },
  reservation_id: {
    type: Sequelize.INTEGER,
  },
  price: {
    type: Sequelize.INTEGER
  }
});

// force: true will drop the table if it already exists
Availability.sync({
  force: true
})
  .then(() => {
    // Table created
    Availability.bulkCreate(availarr).then(()=>{
      sequelize.close();
    })
    .catch(errors => {
      console.log(errors);
      sequelize.close();
    });

    // for (let i = 0; i < 100; i++) {
    //   for (let j = 0; j < 5; j++) {
    //     for (let k = 0; k < 5; k++) {
    //       for (let l = 1; l < 5; l++) {
    //         Availability.create({
    //           hotel_id: i,
    //           room_type_id: j,
    //           date: new Date("2019-01-" + l.toString().padStart(2, "0")),
    //           brokerage_id: k,
    //           reservation_id: 0,
    //           price: Math.floor(Math.random() * 900 + 30)
    //         });
    //       }
    //     }
    //   }
    // }
  })
  

var availarr = [];
for (let i = 0; i < 100; i++) {
  for (let j = 0; j < 5; j++) {
    for (let k = 0; k < 5; k++) {
      for (let l = 1; l < 32; l++) {
        availarr.push({
          hotel_id: i,
          room_type_id: j,
          date: parseInt("201901" + l.toString().padStart(2, "0")),
          brokerage_id: k,
          reservation_id: null,
          price: Math.floor(Math.random() * 900 + 30)
        });
      }
    }
  }
}
// console.log('length:' ,availarr.length);
// console.table(availarr);
