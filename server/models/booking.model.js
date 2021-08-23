console.log('model:                        😅 entering Booking.model');

function BookingModel(seq, types) {

  const Booking = seq.define('Booking', {
    start_date: {
      type: types.DATE,
    },
    end_date: {
      type: types.DATE
    },
    price: {
      type: types.INTEGER,
    },
    quantity: {
      type: types.INTEGER
    },
    total: {
      type: types.INTEGER,
    },
  },
    {});
  Booking.associate = function (models) {
    Booking.belongsTo(models.User), {
    },
    Booking.belongsTo(models.Experience), {
    }
  };

  return Booking
}


module.exports = BookingModel
