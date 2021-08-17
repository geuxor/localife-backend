console.log('model:                        🥴 entering user.model');

function UserModel(seq, types) {

  const User = seq.define('User', {
    email: {
      type: types.STRING,
      allowNull: false,
      unique: true,
      isEmail: {
        msg: "Must be an email"
      },
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
      type: types.BOOLEAN
    }
  }, {
    // {
    //   validate: {
    //     emailcheck: function () {
    //       if ((this.email === null)) {
    //         throw new Error('Required')
    //       }
    //     }
    //   }
  });

  User.associate = function (models) {
    User.belongsTo(models.StripeData, {
      foreignKey: 'stripe_account_id'
    })
    User.hasMany(models.Experience);
  };
  return User
}

module.exports = UserModel
