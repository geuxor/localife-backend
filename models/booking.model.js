console.log('model:                        😅 entering Booking.model');

function BookingModel(seq, types) {

  const Booking = seq.define('Booking', {
    status: {
      type: types.STRING,
    },
    userId: {
      type: types.STRING,
    },
    providerId: {
      type: types.STRING,
    },
    experienceId: {
      type: types.STRING,
    },
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
    sessionId: {
      type: types.STRING,
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
