console.log('model:                        😅 entering Booking.model');

function BookingModel(seq, types) {

  const Booking = seq.define('Booking', {
<<<<<<< HEAD
    status: {
      type: types.STRING,
    },
    providerId: {
      type: types.STRING,
    },
=======
>>>>>>> feat: route for cloudinary + config
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
<<<<<<< HEAD
    sessionId: {
      type: types.STRING,
    },
=======
>>>>>>> feat: route for cloudinary + config
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

<<<<<<< HEAD
=======

>>>>>>> feat: route for cloudinary + config
module.exports = BookingModel
