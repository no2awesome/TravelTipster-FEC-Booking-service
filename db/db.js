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
const brokerage = sequelize.define('brokerage', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true
    },
    name: {
      type: Sequelize.STRING
    }
  }
)

const Op = Sequelize.Op

brokerage.hasMany(Availability, {foreignKey: 'id'})
Availability.belongsTo(brokerage, {foreignKey: 'brokerage_id'})


exports.getAavilabilities = async (hotel_id, check_in_date, check_out_date, callback) => {
  check_out_date--;
  let result = await Availability.findAll({
    include: [{
      model: brokerage,
      required: true,
      attributes: ['name']
     }],
    attributes: ['room_type_id',  [sequelize.fn('SUM', sequelize.col('price')), 'price']],
    group: ['room_type_id', 'brokerage_id','name'],
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
  });
  // let result = await Availability.findAll({
  //   attributes: ['room_type_id', 'brokerage_id', [sequelize.fn('SUM', sequelize.col('price')), 'price']],
  //   group: ['room_type_id', 'brokerage_id'],
  //   where: {
  //     date: {
  //       [Op.between]: [check_in_date, check_out_date]
  //     },
  //     hotel_id: {
  //       [Op.eq]: hotel_id
  //     },
  //     reservation_id: {
  //       [Op.eq]: null
  //     }
  //   }
  // });
  callback(null, result);

}