console.log('model:                       🙋 entering StripeData.model');

function StripeDataModel(seq, types) {
  const StripeData = seq.define('StripeData', {
    stripe_account_id: {
      primaryKey: true,
      type: types.STRING,
      allowNull: false,
      unique: true
    },
    stripe_user_id: {
      type: types.INTEGER,
      allowNull: false,
      unique: true,
    },
    charges_enabled: {
      type: types.BOOLEAN,
    },
    details_submitted: {
      type: types.BOOLEAN,
    },
    payouts_enabled: {
      type: types.BOOLEAN,
    },
    payout_schedule: {
      type: types.INTEGER,
    },
    capabilities_card_payments: {
      type: types.STRING,
    },
    capabilities_platform_payments: {
      type: types.STRING,
    },
    settings_url: {
      type: types.STRING,
    },
    country: {
      type: types.STRING
    },
    default_currency: {
      type: types.STRING
    },
    balance_pending_amount: {
      type: types.INTEGER
    },
    balance_pending_curr: {
      type: types.STRING
    },
    lifetime_volume: {
      type: types.INTEGER
    },
    fields_needed: {
      type: types.ARRAY(types.STRING)
    },
      timestamps: types.DATE
  }, {
  });
  StripeData.associate = function (models) {
    StripeData.hasOne(models.User, {
      foreignKey: 'stripe_account_id'
    });
  };
  return StripeData
}

module.exports = StripeDataModel
