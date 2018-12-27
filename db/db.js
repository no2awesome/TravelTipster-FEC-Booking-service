const Sequelize = require("sequelize");

const sequelize = new Sequelize(
  "mysql://root:password@localhost:3306/traveltipster"
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
const Op = Sequelize.Op

exports.getAavilabilities = (hotel_id, check_in_date, check_out_date, callback) => {
  Availability.findAll({
    attributes: ['room_type_id', 'date', 'brokerage_id', 'price'],
    where: {
      date: {
        [Op.between]: [check_in_date, check_out_date]
      },
      hotel_id: {
        [Op.eq]: hotel_id
      },
      reservation_id: {
        [Op.eq]: null
      }
    }
  }).then(results => {
    callback(null, results);
  })
}