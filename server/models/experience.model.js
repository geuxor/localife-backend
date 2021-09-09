console.log('model:                        😅 entering experience.model');

function ExperienceModel(seq, types) {

  const Experience = seq.define('Experience', {
    title: {
      type: types.STRING,
      allowNull: false,
    },
    subtitle: {
      type: types.STRING,
    },
    description: {
      type: types.TEXT,
      allowNull: false
    },
    location: {
      type: types.STRING,
    },
    city: {
      type: types.STRING,
    },
    country: {
      type: types.STRING,
    },
    price: {
      type: types.INTEGER,
      allowNull: false
    },
    image: {
      type: types.STRING,
    },
    from: {
      type: types.DATE
    },
    to: {
      type: types.DATE
    },
    quantity: {
      type: types.INTEGER
    },
    lon: {
      type: types.FLOAT
    },
    lat: {
      type: types.FLOAT
    }
   },
    {

    });
  Experience.associate = function (models) {
    Experience.belongsTo(models.User);
  };
  return Experience
}


module.exports = ExperienceModel
