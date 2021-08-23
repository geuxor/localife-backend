console.log('model:                        🥴 entering user.model');

function UserModel(seq, types) {

  const User = seq.define('User', {
    email: {
      type: types.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: types.STRING,
      allowNull: false
    },
    firstname: {
      type: types.STRING,
      allowNull: false
    },
    lastname: {
      type: types.STRING,
      allowNull: false
    },
    phone_number: {
      type: types.STRING,
      trim: true
    },
    country: {
      type: types.STRING
    },
    avatar: {
      type: types.STRING
    },
    stripe_session_id: {
      type: types.STRING
    },
    stripe_registration_complete: {
      type: types.STRING,
      // type: types.ENUM,
      // values: ['DENIED', 'PENDING', 'REJECTED', 'COMPLETED'],
      // defaultValue: 'DENIED'
    }
  }, {
  });

  User.associate = function (models) {
    User.belongsTo(models.StripeData, {
      foreignKey: 'stripe_account_id'
    })
    User.hasMany(models.Experience);
    User.hasMany(models.Booking);
  };
  return User
}

module.exports = UserModel
