const db = require('../models/index')

const searchResults = async (req, res) => {
  console.log('searchResults:', req.body);
  try {
    const experiences = await db.Experience.findAll({
      where: req.body,
      // returning: true,
      // plain: true
      include: {
        model: db.User,
        attributes: ['firstname', 'avatar']
      }
    });
    console.log('SearchResults: I found a total of ', experiences.length);
    res.status(201).json(experiences);
  } catch (err) {
    console.log('searchResults: err => ', err);
    res.status(400).json({
      err: err.message,
    });
  }
}

const getOneExperiences = async (req, res) => {
  console.log('getOneExperiences:', req.params);
  try {
    const experience = await db.Experience.findOne({
      where: req.body,
      // returning: true,
      // plain: true
      include: {
        model: db.User,
        attributes: ['firstname', 'avatar']
      }
    });
    console.log('Found one experience: ', experience.dataValues);
    res.status(200).json(experience)
  } catch (err) {
    console.log('getOneExperiences: err => ', err);
    res.status(400).json({
      err: err.message,
    });
  }
}

const allExperiences = async (req, res) => {
  console.log('allExperiences', req.body, req.query, req.params);
  try {
    const experiences = await db.Experience.findAll(
      {
        include: {
          model: db.User,
          attributes: ['firstname', 'avatar']
        } //include: [db.User]
      });
    console.log('allExperiences: I found a total of ', experiences.length);

    res.status(201).json(experiences);
  } catch (err) {
    console.log('allExperiences: err => ', err);
    res.status(400).json({
      err: err.message,
    });
  }
}

const mineExperiences = async (req, res) => {
  console.log('mineExperiences: req => ', req.body);
  const user = req.user
  try {
    const experiences = await db.Experience.findAll({
      where: { UserId: user.id },
    });

    console.log('I found ', experiences.length, ' experiences belonging to the logged in provider');
    if (!experiences.length) throw new Error('No Experiences found for user')
    res.status(201).json(experiences);
  } catch (err) {
    console.log('mineExperiences err => ', err);
    res.status(400).json({
      err: err.message,
    });
  }
}
//gst

const addExperience = async (req, res) => {

  try {
    const experience = await db.Experience.create(req.body);

    console.log('allExperiences: addExperience:', ' updated with ', experience.dataValues)
    res.status(201).json(experience);
  } catch (err) {
    console.log('allExperiences: err => ', err);
    res.status(400).json({
      err: err.message,
    });
  }
};

const addManyExperiences = async (req, res) => {
  console.log(req.body.length);

  try {
    for (let i = 0; i < req.body.length; i++) {
      const experience = await db.Experience.create(req.body[i]);
      console.log('allExperiences: addExperience:', ' updated with ', experience.dataValues)
    }
    res.status(201).json('you got it!');
  } catch (err) {
    console.log('allExperiences: err => ', err);
    res.status(400).json({
      err: err.message,
    });
  }
}


module.exports = { addExperience, addOnlyExperience, getOneExperiences, allExperiences, mineExperiences, addManyExperiences, searchResults }
